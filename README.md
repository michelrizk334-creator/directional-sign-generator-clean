# Kuwait Directional Sign Generator — Code Only Static App

This is a clean Phase 1 web app prototype for a Kuwait Road Code directional sign generator.

It is intentionally built as a static HTML/CSS/JavaScript application to avoid build errors and dependency issues.
There are no media files, no images, no videos, and no TypeScript files.

## What it does

- User enters sign content, not final sign dimensions.
- User enters x height in millimeters.
- Layout dimensions are calculated proportionally from x.
- User selects arrows by code from a code-driven arrow list.
- App generates:
  - calculated width and height
  - 2D sign front preview
  - basic 3D sign board preview with thickness
  - JSON export
  - basic DXF export foundation

## Files

```text
index.html
css/styles.css
js/app.js
js/data/kuwaitArrows.js
js/data/sampleSign.js
js/lib/spacingRules.js
js/lib/textMeasure.js
js/lib/generateSignLayout.js
js/lib/generate3DSign.js
js/lib/exportDXF.js
js/components/renderInputs.js
js/components/renderArrowPreview.js
js/components/renderOutput.js
js/components/renderSign2D.js
js/components/renderSign3D.js
```

## Local use

Open `index.html` in a browser.

For best results with JavaScript modules, run a simple local server from the project folder:

```bash
python -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

## GitHub upload

Upload the contents of this folder directly to the root of your GitHub repository.
The repository root should show:

```text
index.html
css/
js/
README.md
MANIFEST.txt
.gitignore
```

## Vercel deployment

Create a new Vercel project from the GitHub repository.
Use:

```text
Framework Preset: Other
Build Command: leave empty
Output Directory: leave empty or use .
```

This is a static app, so there is no `npm install`, no `npm run build`, and no dependency build step.

## Important Phase 1 limitation

The arrow geometries and text measurement are placeholders for the MVP.
The next phases should replace them with exact Kuwait Road Code vector geometry and Arabic/English character measurement tables from the existing Excel/PDF source material.
