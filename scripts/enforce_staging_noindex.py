#!/usr/bin/env python3
"""Enforce anti-indexing directives on every HTML file in the public staging site."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

DIRECTIVES = "noindex,nofollow,noarchive,nosnippet,noimageindex"
BOT_NAMES = ("robots", "googlebot", "bingbot")

META_RE = re.compile(
    r"<meta\b(?=[^>]*\bname\s*=\s*[\"'](?:robots|googlebot|bingbot)[\"'])[^>]*>\s*",
    re.IGNORECASE,
)
CHARSET_RE = re.compile(r"<meta\b[^>]*\bcharset\s*=\s*[\"'][^>]+>", re.IGNORECASE)
HEAD_RE = re.compile(r"<head\b[^>]*>", re.IGNORECASE)
CANONICAL_STAGING_RE = re.compile(
    r"<link\b(?=[^>]*\brel\s*=\s*[\"']canonical[\"'])[^>]*"
    r"staging\.miterapiaregresiva\.com[^>]*>",
    re.IGNORECASE,
)


def protected_meta() -> str:
    return "".join(
        f'<meta name="{name}" content="{DIRECTIVES}">'
        for name in BOT_NAMES
    )


def normalize_html(text: str) -> str:
    cleaned = META_RE.sub("", text)
    injection = protected_meta()

    charset = CHARSET_RE.search(cleaned)
    if charset:
        pos = charset.end()
        return cleaned[:pos] + injection + cleaned[pos:]

    head = HEAD_RE.search(cleaned)
    if head:
        pos = head.end()
        return cleaned[:pos] + injection + cleaned[pos:]

    raise ValueError("HTML file has no <head> element")


def html_files(root: Path):
    for path in sorted(root.rglob("*.html")):
        if ".git" in path.parts:
            continue
        yield path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    root = Path(".")
    changed: list[str] = []
    errors: list[str] = []

    for path in html_files(root):
        original = path.read_text(encoding="utf-8")
        try:
            normalized = normalize_html(original)
        except ValueError as exc:
            errors.append(f"{path}: {exc}")
            continue

        if CANONICAL_STAGING_RE.search(normalized):
            errors.append(f"{path}: canonical points to staging.miterapiaregresiva.com")

        if normalized != original:
            changed.append(str(path))
            if not args.check:
                path.write_text(normalized, encoding="utf-8")

    if errors:
        print("STAGING INDEXING GUARD: errors", file=sys.stderr)
        for item in errors:
            print(f" - {item}", file=sys.stderr)
        return 1

    if args.check and changed:
        print("STAGING INDEXING GUARD: files without normalized anti-indexing metadata", file=sys.stderr)
        for item in changed:
            print(f" - {item}", file=sys.stderr)
        return 1

    if changed:
        print(f"Protected {len(changed)} HTML file(s).")
    else:
        print("All HTML files are protected against indexing.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
