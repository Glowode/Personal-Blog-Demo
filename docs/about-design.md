# About Component & Test Contract

## Status
Contract defined in TASK-1113. Implementation is intentionally **out of scope** for this task.
No implementation files were changed. This document is the single source of truth for the
later implementation tasks that create `src/components/About.jsx` and `test/about.test.js`.

## Repository Conventions (as inspected)

### Module system
- `package.json` does **not** set `"type": "module"`, so plain `.js` files are loaded as
  **CommonJS** by Node.
- Existing tests (`test/footer-design.test.js`) use CommonJS:
  `const { test } = require('node:test');` and `require('node:assert/strict');`.
- Package scripts are plain Node invocations, e.g.
  `"test": "node --test test/footer-design.test.js"`.
- Source components under `src/` are authored as **ESM + JSX**
  (e.g. `import { useEffect, useState } from 'react';` in `src/components/PostDetail.jsx`,
  `import styles from './Footer.module.css';` in `src/components/Footer.jsx`).
  The bundler (Vite) transpiles these; Node itself cannot load `.jsx` directly.
- Consequently `test/about.test.js` is **CommonJS** (`.js`) and must not `require()` the
  `.jsx` source directly. It uses the static source-assertion strategy below.

### Component conventions
- One component per file under `src/components/`, PascalCase filename matching the
  component name.
- Components are declared as `function <Name>() { ... }` and exposed via
  `export default <Name>;` (see `src/App.jsx`, `src/components/PostDetail.jsx`).
- `src/App.jsx` additionally does `export { App };`; a named export alongside the default
  export is acceptable but the default export is what the contract requires.
- Styling uses CSS Modules (`<Name>.module.css`) imported as
  `import styles from './<Name>.module.css';` (optional for About).

### Routing / link convention
- There is **no router dependency** (no `react-router` in `package.json`).
- Existing in-repo navigation is the plain platform primitive: `<a href="/">` style anchors.
  `src/components/PostDetail.jsx` reads `window.location.pathname` directly rather than
  using a router `Link`.
- Therefore the home-page link in `About.jsx` **must** use a plain anchor:
  `<a href="/">...</a>`. Do **not** import a router `Link` component (none is available).

## Deliverables (exact paths)

| Artifact | Path | Owner task |
| --- | --- | --- |
| Component | `src/components/About.jsx` | implementation task (not TASK-1113) |
| Test | `test/about.test.js` | implementation task (not TASK-1113) |

These two paths are **exact** and must not be renamed, relocated, or split.

## Contract: `src/components/About.jsx`

1. **Format**: JSX authored as ESM, matching `src/App.jsx` and `src/components/PostDetail.jsx`.
2. **Default export**: the module must `export default About;`.
3. **Named function**: the default-exported value must be a `function` whose `.name` is
   `About`, i.e. declared as:
   ```jsx
   function About() {
     // ...
   }

   export default About;
   ```
   (A named function expression assigned to the default export is also acceptable as long
   as the resulting default export is a function named `About`.)
4. **Bio paragraph**: `About` must render a short author bio as a paragraph element,
   i.e. it must return JSX containing a `<p>` element with non-empty text content.
5. **Home-page link**: `About` must render a link back to the home page using the plain
   anchor convention:
   ```jsx
   <a href="/">Back to home</a>
   ```
   The anchor text is not contractually fixed, but the `href="/"` target is mandatory and
   no router `Link` import may be used.
6. **No routing imports**: `About.jsx` must not import from `react-router` or any other
   router package (none is installed).
7. **Scope**: `About.jsx` is a presentational component. It must not read `window.location`,
   fetch data, or perform side effects unless a later task explicitly extends the contract.

### Reference shape (illustrative, not prescriptive styling)
```jsx
function About() {
  return (
    <section>
      <h1>About</h1>
      <p>Short author bio goes here.</p>
      <a href="/">Back to home</a>
    </section>
  );
}

export default About;
```

## Contract: `test/about.test.js`

1. **Module system**: CommonJS (`.js`), matching `test/footer-design.test.js`.
2. **Test harness**: Node's built-in test runner via
   `const { test } = require('node:test');`.
3. **Assertions**: Node's strict assert via
   `const assert = require('node:assert/strict');`.
4. **Loading strategy**: because Node cannot load `.jsx` directly (no `"type": "module"`,
   no JSX loader configured), the test **must not** `require()`/`import()` `About.jsx`.
   Instead it uses a **static source-assertion strategy**: read the component file as text
   with `node:fs` and assert against the source string.
   ```js
   const fs = require('node:fs');
   const path = require('node:path');

   const componentPath = path.join(__dirname, '..', 'src', 'components', 'About.jsx');
   const source = fs.existsSync(componentPath)
     ? fs.readFileSync(componentPath, 'utf8')
     : '';
   ```
   If a JSX-compatible dynamic-import strategy (e.g. a configured loader/transpiler) is
   later made available in the repo, the test may switch to dynamically importing the
   component and asserting on the export; the static strategy is the required fallback and
   the default for this contract.
5. **Required assertions**:
   - **File exists**: `assert.ok(fs.existsSync(componentPath), ...)`.
   - **Default-exports a function**: assert that the source declares `export default` and
     that the default-exported symbol is a function named `About`, e.g.
     `assert.match(source, /export\s+default\s+About\s*;/)` combined with
     `assert.match(source, /function\s+About\s*\(/)`.
   - **Bio rendered**: assert the source contains a paragraph element, e.g.
     `assert.match(source, /<p[\s>]/)`.
   - **Home link rendered**: assert the source contains an anchor to the home page, e.g.
     `assert.match(source, /<a\s[^>]*href=["']\/["']/)`.
6. **Style**: follow `test/footer-design.test.js` — one `test(...)` per behaviour with a
   descriptive name, and no test-order dependencies.
7. **Wiring**: the implementation task is responsible for adding `test/about.test.js` to the
   `test` script in `package.json` (e.g.
   `"test": "node --test test/footer-design.test.js test/about.test.js"`). The test file
   itself must be runnable standalone via `node --test test/about.test.js`.

## Out of scope
- Creating `src/components/About.jsx` or `test/about.test.js` (that is a separate task).
- Modifying `package.json`, `src/App.jsx`, or any existing component.
- Adding routing libraries or changing the module system.