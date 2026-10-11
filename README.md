# Egytaltex — Website

A modern, trilingual (English / Italian / Arabic RTL) rebuild of the
Egytaltex site — the Egyptian Italian Company for Textiles & Garments.

Built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 +
shadcn/ui + next-intl + Motion**, in an elegant, premium aesthetic with smooth
scroll animations and full RTL support.

## Pages

- **Home** — animated hero, stats counters, pillars, process timeline, CTA
- **Company** — story, real production facts (export markets, daily
  output), values, history timeline (2001 → 2019)
- **Products** — product range grid, made-to-order feature panel, and a
  "from our floor" gallery of real factory photography
- **Clients** — real client logos (OVS, Coin, Delta Galil, Bob Company,
  Roy Roger's, La Société, Del Mare 1911, Klevy), testimonial, sister
  companies
- **Contact** — form (sent via Resend, see below), contact details,
  embedded Google Map

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run start                # serve the production build
npm run lint
```

## Languages

Each language has its own URL, so all three are indexed by search engines:

| Language | URL prefix |
| --- | --- |
| English (default) | `/` |
| Italiano | `/it` |
| العربية (RTL) | `/ar` |

Routing lives in [`i18n/routing.ts`](i18n/routing.ts) and
[`proxy.ts`](proxy.ts); the language pill in the navbar switches between
them on the same page.

## Contact form

Submissions go through a Server Action
([`lib/contact-action.ts`](lib/contact-action.ts)) that emails the team with
[Resend](https://resend.com). Set these in `.env.local` (and in your host's
environment variables):

- `RESEND_API_KEY` — from the Resend dashboard
- `EMAIL_FROM` — sender; its domain must be verified in Resend
- `CONTACT_TO` — inbox that receives enquiries (defaults to `egytaltex@yahoo.com`)

Without `RESEND_API_KEY`, submissions show the "something went wrong" state.

## Customising content

- **Site copy**: [`messages/en.json`](messages/en.json),
  [`messages/it.json`](messages/it.json), [`messages/ar.json`](messages/ar.json).
- **Contact details**: [`lib/contact.ts`](lib/contact.ts).
- **Images & client logos**: [`public/products/`](public/products) and
  [`public/clients/`](public/clients), wired up in
  [`content/images.ts`](content/images.ts).
- **Logo / favicon**: [`public/logo.png`](public/logo.png) and
  [`public/favicon.png`](public/favicon.png).
- **Colours, fonts and utilities**: [`app/globals.css`](app/globals.css)
  (Tailwind v4 `@theme`); fonts are loaded in
  [`app/[locale]/layout.tsx`](app/[locale]/layout.tsx).
