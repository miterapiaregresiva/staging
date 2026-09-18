#!/usr/bin/env python3
"""Compare routable HTML between staging and a checked-out production tree.

This is informational only: differences are expected during development.
"""

from __future__ import annotations
import argparse, json
from pathlib import Path

EXCLUDE_PREFIXES = ("templates/",)
EXCLUDE_EXACT = {"404.html"}

def route_for(rel: str) -> str:
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[:-len("index.html")]
    return "/" + rel

def routes(root: Path):
    out = {}
    for p in root.rglob("*.html"):
        rel = p.relative_to(root).as_posix()
        if rel in EXCLUDE_EXACT or rel.startswith(EXCLUDE_PREFIXES):
            continue
        out[route_for(rel)] = rel
    return out

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("production_root")
    ap.add_argument("--json-out")
    ap.add_argument("--md-out")
    args=ap.parse_args()

    stage=routes(Path("."))
    prod=routes(Path(args.production_root))

    s=set(stage); p=set(prod)
    result={
        "staging_count": len(s),
        "production_count": len(p),
        "common_count": len(s & p),
        "only_staging": sorted(s-p),
        "only_production": sorted(p-s),
    }

    if args.json_out:
        Path(args.json_out).write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

    md=[
        "# Staging ↔ producción · diff de rutas",
        "",
        f"- Staging: **{len(s)}** rutas HTML",
        f"- Producción: **{len(p)}** rutas HTML",
        f"- Comunes: **{len(s & p)}**",
        "",
        "## Solo en staging",
        "",
    ]
    md += [f"- `{x}`" for x in result["only_staging"]] or ["- Ninguna"]
    md += ["", "## Solo en producción", ""]
    md += [f"- `{x}`" for x in result["only_production"]] or ["- Ninguna"]
    md += [
        "",
        "> Este informe no implica que las diferencias sean errores. Sirve como control previo a promoción para revisar altas, bajas y cambios de slug de forma explícita.",
        "",
    ]
    content="\n".join(md)
    if args.md_out:
        Path(args.md_out).write_text(content,encoding="utf-8")
    else:
        print(content)
    return 0

if __name__=="__main__":
    raise SystemExit(main())
