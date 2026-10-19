#!/usr/bin/env python3
"""Static checks for wrongdata.md: HTML parses strictly, JSON-LD is valid JSON,
every root-relative link/asset resolves to a file, every page has exactly one <h1>,
hreflang sets are complete. Run from the repository root. Exit code 1 on any failure."""
import glob, json, os, re, sys
try:
    import html5lib
except ImportError:
    sys.exit("pip install html5lib")
pages = ["index.html", "404.html"] + sorted(glob.glob("*/index.html")) + sorted(glob.glob("*/*/index.html"))
errors = []
for f in pages:
    s = open(f, encoding="utf-8").read()
    try:
        html5lib.HTMLParser(strict=True).parse(s)
    except Exception as e:
        errors.append(f"{f}: HTML parse error: {str(e)[:120]}")
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try: json.loads(block)
        except Exception as e: errors.append(f"{f}: invalid JSON-LD: {e}")
    if len(re.findall(r"<h1[\s>]", s)) != 1:
        errors.append(f"{f}: expected exactly one <h1>")
    for ref in set(re.findall(r'(?:href|src|poster)="(/[^"#?]*)"', s)):
        p = ref.lstrip("/")
        p = p + "index.html" if (p == "" or p.endswith("/")) else p
        if not os.path.exists(p):
            errors.append(f"{f}: broken link {ref}")
    if f != "404.html":
        langs = set(re.findall(r'<link rel="alternate" hreflang="([^"]+)"', s))
        if langs != {"en", "ro", "ru", "x-default"}:
            errors.append(f"{f}: hreflang set is {sorted(langs)}")
for e in errors: print("FAIL", e)
print(f"{len(pages)} pages checked, {len(errors)} problem(s)")
sys.exit(1 if errors else 0)
