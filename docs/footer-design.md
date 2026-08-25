# Footer Design

## Status
Implemented in TASK-1090.

## Current Repository Structure
As of this task, the repository contains the root layout file `src/App.jsx` as the main shell component.

## Chosen Integration File
- **File:** `src/App.jsx`
- **Rationale:** `src/App.jsx` is the root layout/main shell component that owns the page structure and renders the footer after the main content.

## Footer Placement
- The `<Footer />` component is rendered **after** the <main> content element inside `src/App.jsx`.
- It is the last element in the root layout so it appears at the bottom of the page.

## Copyright String
- Format: `© {currentYear} {appName}`
- The `{currentYear}` value is resolved dynamically at runtime:
  ```js
  const currentYear = new Date().getFullYear();
  ```
- Placeholder app name: `{appName}` (to be replaced by the final product name, e.g., `Acme Engineering`).
- Example rendered output: `© 2025 Acme Engineering`

## Styling Approach
- Use a dedicated CSS Module: `src/components/Footer.module.css`.
- The footer will use semantic class names (e.g., `.footer`, `.copyright`) and will not rely on inline styles.
- Styling will be applied by importing the CSS module into `Footer.jsx`.

## Out of Scope
- Creating `src/App.jsx` and implementing the footer in `Footer.jsx` will be completed in a follow-up implementation task.
