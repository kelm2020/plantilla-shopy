# plantilla-shopy

Conversion-focused Shopify Online Store 2.0 starter structure inspired by Dawn architecture, tailored for one-product brands.

## Folder structure

```text
.
├── assets/
│   ├── base.css
│   ├── component-sticky-atc.css
│   ├── product-form.js
│   ├── sticky-atc.js
│   └── theme.js
├── config/
├── customers/
├── layout/
│   └── theme.liquid
├── locales/
├── sections/
│   ├── before-after.liquid
│   ├── comparison-table.liquid
│   ├── faq.liquid
│   ├── main-product.liquid
│   └── testimonials.liquid
├── snippets/
└── templates/
    ├── index.json
    └── product.json
```

## Architecture notes

- **Mobile-first CSS**: shared design tokens, large typography scales, and layout primitives live in `assets/base.css`.
- **Sticky Add to Cart**: behavior styles in `assets/component-sticky-atc.css`; interaction logic in `assets/sticky-atc.js`.
- **Modular JS**:
  - `assets/theme.js` → global, lightweight event hooks.
  - `assets/product-form.js` → product form UX states.
  - `assets/sticky-atc.js` → sticky CTA visibility and click proxy behavior.
- **OS 2.0 JSON templates**:
  - `templates/index.json` composes homepage sections for one-product storytelling.
  - `templates/product.json` keeps a high-conversion product detail flow.
- **Schema-driven sections**: all custom sections include editor-friendly schema settings and blocks.
