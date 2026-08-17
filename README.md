# Egytaltex — Website

A modern, bilingual (English / Arabic RTL) rebuild of the Egytaltex site —
the Egyptian Italian Company for Textiles & Garments.

Built with **React + Vite + Tailwind CSS + Framer Motion**, in an elegant,
premium aesthetic with smooth scroll animations and full RTL support.

## Pages

- **Home** — animated hero, stats counters, pillars, process timeline, CTA
- **Company** — story, values, history timeline
- **Products** — product range grid + made-to-order feature
- **Clients** — clientele, testimonial, sister companies
- **Contact** — animated form + contact details

## Run locally

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Language toggle

Click **ع / EN** in the navbar to switch between English (LTR) and
Arabic (RTL). The choice is saved to `localStorage`.

## Customising content

All site copy lives in [`src/i18n/translations.js`](src/i18n/translations.js)
(both languages) and contact details in the `contactInfo` export there.
Colours, fonts and animations are defined in
[`tailwind.config.js`](tailwind.config.js).

> Note: product names, client marks, and the timeline are illustrative
> placeholders — swap them in `translations.js` for the real catalogue.
