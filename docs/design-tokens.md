# Design Tokens & Page Structure

This document defines the visual style tokens and the component architecture for the Personal Blog Demo. The design follows the Claude.ai visual language: clean, modern, with generous whitespace, soft warm neutrals, and a restrained amber accent.

## 1. Color Palette

### Core neutral / background tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg-primary` | `#FFFFFF` | Page background |
| `--color-bg-secondary` | `#FAFAF9` | Subtle section background, sidebar background |
| `--color-bg-tertiary` | `#F5F5F4` | Card hover / code block background |
| `--color-border` | `#E7E5E4` | Hairlines, dividers, card borders |
| `--color-border-strong` | `#D6D3D1` | Focus borders, active nav underline |

### Text tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-text-primary` | `#1C1917` | Headings, body copy |
| `--color-text-secondary` | `#57534E` | Secondary paragraphs, labels |
| `--color-text-muted` | `#A8A29E` | Dates, metadata, placeholders |
| `--color-text-on-accent` | `#FFFFFF` | Text on accent buttons |

### Accent tokens (soft amber / warm gray)

| Token | Value | Usage |
| --- | --- | --- |
| `--color-accent` | `#D97706` | Primary links, buttons, active states |
| `--color-accent-hover` | `#B45309` | Hover state for accent elements |
| `--color-accent-soft` | `#FDE68A` | Soft highlight, selected tags |
| `--color-accent-bg` | `#FFFBEB` | Tinted callout / alert background |
| `--color-warm-gray` | `#D6D3D1` | Neutral warm gray, secondary borders |

### Semantic usage

- Light mode only for this iteration. Dark mode tokens can be added later under `[data-theme="dark"]`.
- All text must meet WCAG AA contrast against its background.

## 2. Typography

### Font stacks

| Token | Value |
| --- | --- |
| `--font-sans` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace` |

System UI fallbacks are intentional: the site must feel native even before the Inter webfont is loaded.

### Type scale

| Token | Size / Line height | Usage |
| --- | --- | --- |
| `--text-xs` | `0.75rem / 1.5` | Captions, footnotes |
| `--text-sm` | `0.875rem / 1.5` | Metadata, sidebar labels |
| `--text-base` | `1rem / 1.7` | Article body |
| `--text-lg` | `1.125rem / 1.6` | Lead paragraphs |
| `--text-xl` | `1.25rem / 1.4` | Card titles |
| `--text-2xl` | `1.5rem / 1.3` | Section headings |
| `--text-3xl` | `1.875rem / 1.25` | Page titles |
| `--text-4xl` | `2.25rem / 1.2` | Article hero titles |

### Style direction

- Weights: `400` for body, `500` for emphasized labels, `600` for section headings, `700` for article titles.
- Letter-spacing: `-0.02em` for large display headings; `0.01em` for uppercase eyebrow labels.

## 3. Spacing

Base unit: **4px**

| Token | Value | Usage |
| --- | --- | --- |
| `--space-1` | `4px` | Tight icon gaps |
| `--space-2` | `8px` | Compact controls, tag padding |
| `--space-3` | `12px` | Small card padding |
| `--space-4` | `16px` | Default control padding |
| `--space-6` | `24px` | Card padding, section inner gaps |
| `--space-8` | `32px` | Component gaps |
| `--space-12` | `48px` | Section spacing |
| `--space-16` | `64px` | Page-section separation |
| `--space-24` | `96px` | Hero / large page blocks |

### Layout widths

| Token | Value | Usage |
| --- | --- | --- |
| `--container-max` | `1200px` | Full page container |
| `--container-content` | `720px` | Article reading column |
| `--container-sidebar` | `320px` | Sidebar width |
| `--container-gutter` | `24px` | Side gutter on small screens |

## 4. Radius

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `6px` | Small buttons, tags |
| `--radius-md` | `10px` | Cards, inputs, nav links |
| `--radius-lg` | `16px` | Featured cards, modals |
| `--radius-full` | `9999px` | Avatars, pills, icon buttons |

## 5. Shadow

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.05)` | Subtle raised elements |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)` | Sticky header, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.03)` | Hover cards, floating panels |
| `--shadow-focus` | `0 0 0 3px rgb(217 119 6 / 0.25)` | Focus ring for links / inputs |

Shadows are deliberately soft and low-contrast to keep the interface light and airy.

## 6. Page Layout Hierarchy

The application is a single React shell (`src/App.jsx`) with three main zones: navigation, content, and footer.

```
App (root shell)
├── TopNavigation
│   ├── Logo
│   ├── NavLinks (Home / Posts / About)
│   └── MobileMenuButton
├── PageContainer
│   ├── Main
│   │   ├── BlogListPage
│   │   │   └── ArticleList
│   │   │       └── ArticleCard (repeated)
│   │   └── BlogDetailPage
│   │       └── ArticleDetail
│   │           ├── ArticleHeader (title, date, tags)
│   │           ├── ArticleBody
│   │           └── ArticleMeta (author, read time)
│   └── Sidebar
│       ├── AuthorCard
│       ├── Categories
│       ├── Tags
│       ├── RecentPosts
│       └── NewsletterCard
└── Footer
    ├── FooterLinks
    └── Copyright (`© {currentYear} {appName}`)
```

### Component responsibilities

- **TopNavigation**: sticky, translucent white (`rgba(255,255,255,0.85)`) with a subtle bottom hairline; contains the primary site navigation.
- **Main**: dynamic route area for the blog list and article detail views.
- **BlogListPage**: renders `ArticleList`, each item as `ArticleCard` with title, excerpt, date, and tag preview.
- **BlogDetailPage**: renders a single `ArticleDetail` in a centered reading column (`--container-content`).
- **Sidebar**: secondary complementary column, sticky on desktop; contains author, taxonomy, recent posts, and newsletter content.
- **Footer**: existing component `src/components/Footer.jsx`, styled with the tokens above, placed after `<main>` in the shell.

### Layout rules

- On desktop (`≥1024px`): content + sidebar grid is `1fr 320px` with a `64px` gutter, inside a `1200px` container.
- On mobile: sidebar collapses below the article content; gutters shrink to `16px`.
- White space is the primary design tool: cards and sections use `--space-8` / `--space-12`, never decorative borders for their own sake.
- Sticky header: `position: sticky; top: 0; backdrop-filter: blur(8px);` with `--shadow-sm` on scroll.

## 7. Implementation Notes

- Tokens should be declared as CSS custom properties on `:root` in a global stylesheet, then consumed by CSS Modules or inline via `var(...)`.
- This token set is the single source of truth for colors, type, spacing, radius, and shadows in all future component tasks.
- Follow-up tasks should reference this document when building navigation, article list/detail pages, and the sidebar.
