# Footer Design

## Status
Decided for TASK-1088 (architecture decision only; footer is not implemented in this task).

## Chosen Integration File
- **File:** `src/App.jsx`
- **Rationale:** `src/App.jsx` will serve as the root layout/main shell component of the frontend app. Currently the repository contains only `src/components/Footer.jsx`, so `src/App.jsx` is the planned shell that will render the page structure.

## Footer Placement
- The `<Footer />` component will be rendered **after** the `<main>` content element inside `src/App.jsx`.
- It will be the last element in the root layout so it appears at the bottom of the page.

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
- Actual footer implementation in `Footer.jsx` will be completed in a follow-up implementation task.
