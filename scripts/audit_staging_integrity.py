#!/usr/bin/env python3
"""Structural integrity audit for the public staging site.

Checks only objective breakage. It does not judge or rewrite editorial content.
"""

from __future__ import annotations

import argparse
import json
import posixpath
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

ROOT = Path(".")
STAGING_HOST = "staging.miterapiaregresiva.com"
PRODUCTION_HOST = "miterapiaregresiva.com"
SKIP_DIRS = {".git"}
SKIP_HTML_PREFIXES = ("templates/",)
SKIP_EXACT = set()

EXTERNAL_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript"}
ASSET_ATTRS = {"src", "poster"}
LINK_ATTRS = {"href"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.attrs = []
        self.ids = []
        self.h1_count = 0
        self.main_count = 0
        self.title_text = []
        self.in_title = False
        self.description = None
        self.canonical = None
        self.base_href = None
        self.meta_refresh = None
        self.lang = None
        self.srcsets = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html":
            self.lang = d.get("lang")
        if "id" in d:
            self.ids.append(d["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "main":
            self.main_count += 1
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            name = (d.get("name") or "").lower()
            if name == "description":
                self.description = d.get("content")
            if (d.get("http-equiv") or "").lower() == "refresh":
                self.meta_refresh = d.get("content")
        if tag == "link" and (d.get("rel") or "").lower() == "canonical":
            self.canonical = d.get("href")
        if tag == "base":
            self.base_href = d.get("href")
        if "srcset" in d:
            self.srcsets.append(d["srcset"])
        for key in ASSET_ATTRS | LINK_ATTRS:
            if key in d:
                self.attrs.append((tag, key, d[key]))

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_text.append(data)


def is_redirect_page(parser: PageParser) -> bool:
    return bool(parser.meta_refresh and re.search(r"\burl\s*=", parser.meta_refresh, re.I))


def url_to_local_path(page_path: str, raw: str, base_href: str | None):
    raw = (raw or "").strip()
    if not raw or raw.startswith("#"):
        return page_path, raw[1:] if raw.startswith("#") else None, "anchor"

    parsed = urlparse(raw)

    # Same-site absolute URLs can be validated locally. Production absolute URLs
    # remain external references in staging because they may be intentional.
    if parsed.scheme in {"http", "https"}:
        host = (parsed.hostname or "").lower()
        if host == STAGING_HOST:
            candidate = parsed.path or "/"
            frag = parsed.fragment or None
            return normalize_target(candidate, page_path, "/", frag)
        return None, None, "external"

    if parsed.scheme and parsed.scheme in EXTERNAL_SCHEMES:
        return None, None, "external"
    if parsed.scheme:
        return None, None, "external"

    return normalize_target(parsed.path, page_path, base_href, parsed.fragment or None)


def normalize_target(path: str, page_path: str, base_href: str | None, fragment: str | None):
    path = unquote(path or "")
    if base_href:
        # <base href="/"> is the dominant pattern in this site.
        effective = urljoin("https://example.invalid" + ("/" if base_href.startswith("/") else "/"), base_href)
        base_path = urlparse(effective).path
        resolved = posixpath.normpath(posixpath.join(base_path, path)) if not path.startswith("/") else posixpath.normpath(path)
    else:
        current_dir = posixpath.dirname("/" + page_path)
        resolved = posixpath.normpath(posixpath.join(current_dir, path)) if not path.startswith("/") else posixpath.normpath(path)

    if path.endswith("/") or resolved == "/":
        resolved = resolved.rstrip("/") + "/index.html"
    elif not posixpath.splitext(resolved)[1]:
        # If an extensionless target corresponds to a directory, treat as index.
        resolved = resolved.rstrip("/") + "/index.html"

    return resolved.lstrip("/"), fragment, "local"


def parse_srcset(value: str):
    for item in value.split(","):
        token = item.strip().split()[0] if item.strip() else ""
        if token:
            yield token


def collect_html():
    paths = []
    for p in ROOT.rglob("*.html"):
        rel = p.as_posix().lstrip("./")
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        paths.append(rel)
    return sorted(paths)


def parse_page(path: str):
    parser = PageParser()
    text = Path(path).read_text(encoding="utf-8")
    parser.feed(text)
    return parser


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    pages = collect_html()
    parsers = {p: parse_page(p) for p in pages}
    files = {p.as_posix().lstrip("./") for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts}

    errors = []
    warnings = []
    metrics = {
        "html_files": len(pages),
        "checked_pages": 0,
        "local_links": 0,
        "local_assets": 0,
        "local_anchors": 0,
        "redirect_pages": 0,
        "canonical_missing": 0,
    }

    for page, parser in parsers.items():
        if page in SKIP_EXACT or page.startswith(SKIP_HTML_PREFIXES):
            continue

        metrics["checked_pages"] += 1
        redirect = is_redirect_page(parser)
        if redirect:
            metrics["redirect_pages"] += 1

        title = "".join(parser.title_text).strip()
        if not title:
            errors.append(f"{page}: missing or empty <title>")
        if not parser.description:
            errors.append(f"{page}: missing meta description")
        if parser.lang != "es":
            warnings.append(f"{page}: html lang is {parser.lang!r}, expected 'es'")
        if not redirect:
            if parser.h1_count != 1:
                errors.append(f"{page}: expected exactly 1 H1, found {parser.h1_count}")
            if parser.main_count != 1:
                errors.append(f"{page}: expected exactly 1 <main>, found {parser.main_count}")

        dup_ids = sorted({x for x in parser.ids if parser.ids.count(x) > 1})
        if dup_ids:
            errors.append(f"{page}: duplicate id(s): {', '.join(dup_ids)}")

        if parser.canonical:
            chost = (urlparse(parser.canonical).hostname or "").lower()
            if chost == STAGING_HOST:
                errors.append(f"{page}: canonical points to staging host: {parser.canonical}")
        else:
            metrics["canonical_missing"] += 1
            warnings.append(f"{page}: no canonical (acceptable while noindex, but review before production)")

        targets = list(parser.attrs)
        for srcset in parser.srcsets:
            for item in parse_srcset(srcset):
                targets.append(("source", "srcset", item))

        for tag, attr, raw in targets:
            target, fragment, kind = url_to_local_path(page, raw, parser.base_href)
            if kind == "external":
                continue
            if kind == "anchor":
                metrics["local_anchors"] += 1
                if fragment and fragment not in parser.ids:
                    errors.append(f"{page}: broken same-page anchor #{fragment}")
                continue
            if not target:
                continue

            is_asset = attr in ASSET_ATTRS or attr == "srcset"
            if is_asset:
                metrics["local_assets"] += 1
            else:
                metrics["local_links"] += 1

            # Query strings are removed by urlparse; fragments validated below.
            if target not in files:
                errors.append(f"{page}: {attr}={raw!r} -> missing local target {target}")
                continue

            if fragment and target.endswith(".html"):
                metrics["local_anchors"] += 1
                target_parser = parsers.get(target)
                if target_parser and fragment not in target_parser.ids:
                    errors.append(f"{page}: {raw!r} -> missing anchor #{fragment} in {target}")

    result = {
        "ok": not errors,
        "metrics": metrics,
        "errors": sorted(set(errors)),
        "warnings": sorted(set(warnings)),
    }

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print("STAGING INTEGRITY AUDIT")
        print(json.dumps(metrics, indent=2))
        if warnings:
            print(f"\nWarnings ({len(set(warnings))}):")
            for item in sorted(set(warnings)):
                print(f" - {item}")
        if errors:
            print(f"\nErrors ({len(set(errors))}):", file=sys.stderr)
            for item in sorted(set(errors)):
                print(f" - {item}", file=sys.stderr)

    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
