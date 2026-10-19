# WRONG DATA website

Static, multi-page website ready for GitHub Pages. No build process or backend is required.

## Pages

- `index.html` — home (overview + hub linking to the 5 pages below)
- `solutions/index.html` → `/solutions/`
- `technology/index.html` → `/technology/`
- `fleet/index.html` → `/fleet/`
- `drone-port/index.html` → `/drone-port/`
- `company/index.html` → `/company/`

Each subpage lives in its own folder as `index.html`, so GitHub Pages serves it at the clean URL above with no `.html` in the address bar. **All internal links, and every asset path (`styles.css`, `script.js`, `assets/...`), use root-relative paths (starting with `/`)** — this only works when the site is served from the domain root (which is the case for `wrongdata.md`). If you ever preview a page by double-clicking the file locally, root-relative links won't resolve — use a local server instead (e.g. `python3 -m http.server`) or just test on the live domain.

## Publish with GitHub Pages

1. Create a GitHub repository named `wrong-data-website`.
2. Upload **the contents of this folder** (not the folder itself) into the repository root — **including the `solutions/`, `technology/`, `fleet/`, `drone-port/` and `company/` folders**, each with its `index.html` inside. GitHub's drag-and-drop upload sometimes drops nested folders — check the upload preview lists all 5 folders before committing.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main`, folder `/(root)`, then click **Save**.
6. GitHub will show the public address in the same screen after it finishes publishing.

## Attach wrongdata.md

In GitHub **Settings → Pages → Custom domain**, enter `wrongdata.md`. GitHub will show the DNS record required at nic.md. Do not change DNS until the GitHub Pages site is visible on its default `github.io` address.

## Before publishing

- Contact email in `index.html` is `alexandr@wrongdata.md`; update it if this changes.
- Replace the LinkedIn URL if the final page uses another URL.

## Technical notes (Oct 2026)

- **Fonts** are self-hosted in `assets/fonts/` (Space Grotesk and Inter, variable WOFF2, SIL OFL) — no requests to Google Fonts. The two Latin files are preloaded in every page `<head>`.
- **Structured data**: every page carries a JSON-LD block (`Organization`, `WebSite`, `WebPage` + `BreadcrumbList`). Update the organization block in `index.html` if the address, email or LinkedIn URL changes.
- **Accessibility**: skip link, visible `:focus-visible` outlines, `aria-current="page"` on the active nav link, mobile menu is a real `<button>` with `aria-expanded` (toggled in `script.js`, closes on Escape / outside click).
- **Hero logo**: `wrong-data-logo-600.png` + `-1200.png` via `srcset`; the 1600px original was removed.
- **`404.html`** is served automatically by GitHub Pages for unknown URLs.
- **`sitemap.xml`**: bump `<lastmod>` on the page you edit.

## Stage 2 (Oct 2026): scenarios, contact, status

- **`/scenarios/`** — both simulation films (`assets/video/*.mp4`, H.264 720p, `preload="none"`, poster JPGs) with the eight cases written out as steps and rules. `VideoObject` JSON-LD included.
- **`/contact/`** — contact page. The buttons are prefilled `mailto:` links. To add a real form, drop in a Formspree/Web3Forms endpoint (`<form action="https://formspree.io/f/XXXX" method="POST">`) — no backend needed on Pages.
- **`/company/#status`** — status & roadmap table. Four stages: FLIGHT-TESTED · BENCH / CODE · DESIGN · CONCEPT. Move a row up only when the milestone is actually passed.
- Navigation order: Solutions → Technology → Fleet → Drone Port → Scenarios → Company → Contact. Section numbers follow this order.
- Fleet copy now says "groups of three" rather than a fixed drone count; the home stat bar shows drones per group, airframes in build, and scenario count.

## Stage 3 (Oct 2026): Romanian and Russian versions

- English lives at the root; Romanian at `/ro/...`, Russian at `/ru/...` — same structure, same assets. Every page carries `hreflang` links for en / ro / ru / x-default, and `sitemap.xml` lists all three with `xhtml:link` alternates.
- A language switcher (EN · RO · RU) sits in the header of every page and links to the same page in the other language.
- Cyrillic is served from Inter subsets (`assets/fonts/inter-cyrillic*.woff2`); Space Grotesk has no Cyrillic glyphs, so the `@font-face` block maps Cyrillic ranges of the "Space Grotesk" family to Inter — no per-language CSS needed.
- **Editing text:** edit the English page, then apply the same change in `/ro/` and `/ru/`. The localized pages are plain HTML — there is no build step.
- **`tools/check_site.py`** validates HTML, JSON-LD, internal links, `<h1>` count and hreflang sets; it runs in GitHub Actions on every push (`.github/workflows/check.yml`). Run it locally with `python3 tools/check_site.py` (needs `pip install html5lib`).

## Stage 4 (Oct 2026): business-card content

- **Solutions** → "How we work" (assessment → pilot → deployment → operation) and "What a site needs".
- **Technology** → architecture diagram (inline SVG, `.arch-*` classes) and the failsafe table "What happens when something fails".
- **Company** → founder block, "Flying legally, by design" (airspace, registration, geofence, privacy, safety, insurance), "For partners and investors".
- **`/faq/`** — 12 questions with `FAQPage` JSON-LD; **`/privacy/`** — privacy notice. Both linked from the footer on every page (header nav unchanged).
- All of the above exists in EN, RO and RU. New strings were added to the translation dictionaries used to generate `/ro/` and `/ru/`.
- Facts to keep true as the company changes: timelines in "How we work", the insurance sentence, the pricing model in the FAQ, and the founder paragraph.

## Stage 5 (Oct 2026): landing redesign

- Home is now a short landing: hero with a muted 9-second loop from the simulation (`assets/video/hero-loop.mp4`, poster fallback, no autoplay for reduced-motion / data-saver), one headline, two CTAs; Detect · Respond · Report strip; one playable demo video; four "who it's for" tiles; Fleet / Drone Port / Technology cards; honest status strip; closing CTA.
- The "Conventional drone vs WRONG DATA" table moved from home to Technology (`#difference`). Solutions articles have anchors (`#security`, `#agriculture`, `#industrial`, `#smart-property`).
- Every subpage ends with a "Tell us about your site" band before the pager.
