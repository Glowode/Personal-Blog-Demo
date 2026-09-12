# About Component & Test Contract

## Status
Contract defined in TASK-1113. Implementation is intentionally **out of scope** for this task.

## Repository Conventions (as inspected)

### Module system
- `package.json` does **not** set `"type": "module"`, so plain `.js` files are loaded as **CommonJS** by Node.
- Existing tests (`test/footer-design.test.js`, `src/components/Footer.test.js`) use CommonJS: `const { test } = require('node:test');` and `require('node:assert')`.
- Package scripts are plain Node invocations, e.g. `"test": "node --test test/footer-design.test.js"`.
- Source components under `src/` are authored as **ESM + JSX** (e.g. `import { useEffect, useState } from 'react';` in `src/components/PostDetail.jsx`, `import styles from './Footer.module.css';` in `src/components/Footer.jsx`). The bundler (Vite) transpiles these; Node itself does not load `.jsx` directly.

### Component conventions
- One component per file under `src/components/`, PascalCase filename matching the component name.
- Components are declared as `function <Name>() { ... }` and exposed via `export default <Name>;` (see `src/App.jsx`, `src/components/PostDetail.jsx`).
- Styling uses CSS Modules (`<Name>.module.css`) imported as `import styles from './<Name>.module.css';`.

### Routing / link convention
- There is **no router dependency** (no `react-router` in `package.json`).
- Existing in-repo navigation is the plain platform primitive: `<a href="/">` style anchors. `src/components/PostDetail.jsx` reads `window.location.pathname` directly rather than using a router Link.
- Therefore the home-page link in `About.jsx` **must** use a plain anchor: `<a href="/">...</a>`. Do **not** import a router `Link` component (none is available).

## Deliverables (exact paths)

| Path | Purpose |
| --- | --- |
| `src/components/About.jsx` | The About React component. |
| `test/about.test.js` | The Node test contract for the About component. |

No other files are part of this contract. No implementation files are created or modified by TASK-1113.

## `src/components/About.jsx` Contract

1. **Default export**: the module must default-export a function **named `About`**:
   ```jsx
   function About() { /* ... */ }
   export default About;
   ```
   The function must be a declaration whose `.name === 'About'`.
2. **Bio paragraph**: renders a short author bio as a paragraph (a `<p>` element) containing visible text.
3. **Home link**: renders a link back to the home page using the existing convention: `<a href="/">...` (plain anchor, no router `Link`).
4. **Authoring style**: ESM + JSX, consistent with the other files in `src/components/`.
5. **Styling (optional)**: if styling is needed it must follow the CSS Module convention (`About.module.css`). Not required by this contract.

## `test/about.test.js` Contract

- **Runner**: `node:test` (`const { test } = require('node:test');`).
- **Assertions**: `node:assert/strict` (`const assert = require('node:assert/strict');`).
- **Language**: CommonJS, matching the repo (package.json has no `"type": "module"`).
- **Strategy**: Because Node cannot `import`/`require` a `.jsx` file directly (no loader registered in `package.json` scripts), the test uses the **static source assertion** strategy already established by `src/components/Footer.test.js`:
  1. Assert the component file exists via `fs.existsSync(path.join(__dirname, '..', 'src', 'components', 'About.jsx'))`.
  2. Read the file with `fs.readFileSync(..., 'utf8')` and assert on its source:
     - it declares and default-exports a function named `About`, e.g. match `/function\s+About\s*\(/` and `/export\s+default\s+About\s*;/`;
     - it renders a paragraph (`/<p[\s>]/`);
     - it renders a home link (`/<a\s[^>]*href="\/"|<a\s[^>]*href=\{"\/"\}/`).
- **Dynamic import alternative**: if a JSX-capable loader is later added to the repo scripts, a JSX-compatible dynamic `import()` of `../src/components/About.jsx` asserting `typeof mod.default === 'function' && mod.default.name === 'About'` is preferred. Until then, the static source assertion strategy is authoritative.
- **Wiring**: the test must be runnable via `node --test test/about.test.js`; adding it to the package `test` script is a separate implementation concern and not part of this task.

## Acceptance Criteria Mapping

- [x] Contract names exact paths `src/components/About.jsx` and `test/about.test.js`.
- [x] Contract specifies `About.jsx` must default-export a function named `About`.
- [x] Contract specifies bio and home-link rendering requirements.
- [x] Contract specifies `node:test` / `node:assert/strict` assertion strategy and the repo module system.
- [x] No implementation files are changed (this task only adds this design document).
