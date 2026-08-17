# Egytaltex — Website

A modern, trilingual (English / Italian / Arabic RTL) rebuild of the
Egytaltex site — the Egyptian Italian Company for Textiles & Garments.

Built with **React + Vite + Tailwind CSS + Framer Motion**, in an elegant,
premium aesthetic with smooth scroll animations and full RTL support.

## Pages

- **Home** — animated hero, stats counters, pillars, process timeline, CTA
- **Company** — story, real production facts (export markets, daily
  output), values, history timeline (2001 → 2019)
- **Products** — product range grid, made-to-order feature panel, and a
  "from our floor" gallery of real factory photography
- **Clients** — real client logos (OVS, Coin, Delta Galil, Bob Company,
  Roy Roger's, La Société, Del Mare 1911, Klevy), testimonial, sister
  companies
- **Contact** — form (wired to Formspree, see below), contact details,
  embedded Google Map

## Run locally

```bash
npm install
npm run dev              # start dev server (http://localhost:5173)
npm run dev -- --host    # also expose it on your LAN, to test on mobile
npm run build             # production build → dist/
npm run preview           # preview the production build
```

## Language switcher

Click the language pill in the navbar (**EN / IT / ع**) to switch between
English, Italian, and Arabic (RTL). The choice is saved to `localStorage`.

## Contact form setup

The contact form posts to Formspree. Before it will actually deliver
messages, create a free form at [formspree.io](https://formspree.io) and
replace the placeholder endpoint in
[`src/pages/Contact.jsx`](src/pages/Contact.jsx):

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
```

Until that's set, submissions will show the "something went wrong" error
state instead of silently failing.

## Customising content

- **Site copy**: [`src/i18n/translations.js`](src/i18n/translations.js)
  (all three languages) and contact details in the `contactInfo` export
  there.
- **Product photography**: [`public/products/`](public/products), wired
  up in [`src/data/productImages.js`](src/data/productImages.js).
- **Client logos**: [`public/clients/`](public/clients), listed in
  [`src/pages/Clients.jsx`](src/pages/Clients.jsx).
- **Home page imagery**: [`src/data/homeImages.js`](src/data/homeImages.js).
- **Logo / favicon**: [`public/logo.png`](public/logo.png) and
  [`public/favicon.png`](public/favicon.png), rendered via
  [`src/components/Logo.jsx`](src/components/Logo.jsx).
- **Colours, fonts and animations**:
  [`tailwind.config.js`](tailwind.config.js).
