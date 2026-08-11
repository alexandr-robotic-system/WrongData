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
