# Bülent Usta — House Painter Website

A local-SEO focused marketing site for a house painter based in Darıca, Kocaeli (Turkey).

Built to do one job well: rank for local searches like *"Darıca boyacı"* (Darıca painter)
and turn that traffic into phone calls.

![Site preview](public/og-image.jpg)

> **Note:** The site content and the in-repo documentation (`docs/`) are in Turkish,
> since that is the audience. This README is in English.

---

## Measured results

| Metric | Value |
|---|---|
| Lighthouse — Accessibility | **100** |
| Lighthouse — Best Practices | **100** |
| Lighthouse — SEO | **100** |
| LCP (4× CPU throttle + Slow 4G) | **1.38 s** |
| CLS | **0.00** |
| Client-side JavaScript | **0 KB** |
| Pages | 21 |
| Internal links / broken | 953 / **0** |

Lighthouse was run against six distinct page types (home, service detail, region detail,
gallery, contact, about) — all returned 100/100/100 with zero failed audits.
Core Web Vitals were measured with a Chrome DevTools performance trace, not estimated.

---

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | [Astro](https://astro.build) (static output) | 7.1.6 |
| Styling | [Tailwind CSS](https://tailwindcss.com) (CSS-first `@theme`) | 4.3.3 |
| Images | [sharp](https://sharp.pixelplumbing.com) → WebP + responsive `srcset` | 0.35.3 |
| Sitemap | `@astrojs/sitemap` | 3.7.3 |
| Language | TypeScript (strict) | 5.9 |

**Why Astro?** For a local business site the only metrics that matter are search
visibility and load speed. Astro ships static HTML with zero JavaScript by default —
a React-based stack would have added ~90 KB of bundle for no user-facing benefit.

---

## Features

### Zero JavaScript
The entire site runs without a single byte of client-side JS:

| Feature | Implementation |
|---|---|
| Mobile navigation | native `<details>` / `<summary>` |
| FAQ accordion | native `<details name="...">` |
| Gallery category filter | hidden radio inputs + CSS `:has()` |
| Image lightbox | CSS `:target` |

### SEO
- Unique `<title>`, meta description and canonical URL on every page
- Open Graph + Twitter Card metadata
- JSON-LD structured data: [`HousePainter`](https://schema.org/HousePainter)
  (the schema.org subtype specific to painters), plus `Service`, `FAQPage`,
  `BreadcrumbList`, `ImageGallery` and `WebSite`
- Auto-generated `sitemap-index.xml` with per-route priorities
- One `<h1>` per page, hierarchical headings, descriptive Turkish `alt` text
- Service and region landing pages, each targeting a distinct keyword

### Accessibility
- WCAG AA contrast throughout — the CTA orange and WhatsApp green were both
  deliberately darkened, since their brand colours only reach 3.6:1 and 2.3:1
  against white text
- Touch targets ≥ 44 px on mobile
- Visible focus rings, skip-to-content link, `prefers-reduced-motion` support

### Mobile-first
- Designed at 375 px first, then scaled up — zero horizontal overflow on any page
- Sticky bottom bar with tap-to-call and WhatsApp
- Floating WhatsApp button on tablet and desktop, with the message pre-filled
  based on the current page

---

## Project structure

```
├── assets/                  Original photographs — DO NOT DELETE (see assets/README.md)
├── docs/                    Project documentation (Turkish)
│   ├── 00-PROJE.md          Overview + decision log
│   ├── 01-GOREVLER.md       Task checklist — the single source of truth on progress
│   ├── 02-ICERIK.md         All site copy, including the client's original notes
│   ├── 03-SEO.md            Keyword→page map, post-launch checklist
│   └── 04-BEKLEYEN-BILGI.md Information still pending from the client
├── public/                  robots.txt, favicon, OG image, manifest
├── scripts/
│   ├── prepare-images.mjs   assets/*.jpeg → src/assets/isler/*.webp
│   ├── generate-brand-assets.mjs  favicon PNG + 1200×630 OG card
│   └── seo-check.mjs        Automated audit (see below)
├── src/
│   ├── assets/isler/        Optimised WebP images
│   ├── components/          UI components
│   ├── config/site.ts       Single source of truth: name, phone, services, regions
│   ├── data/works.ts        Gallery data (image + alt + caption + category)
│   ├── layouts/             Base layout with SEO head and JSON-LD
│   ├── pages/               Routes (service and region pages are dynamic)
│   └── styles/_base.css     The entire theme: @theme tokens, base and component layers
└── CLAUDE.md                Conventions and handover notes for AI sessions
```

### Two ideas hold this together

**1. One source of truth for data.** Business details, the seven services and the six
service regions all live in `src/config/site.ts`. Service and region pages are generated
from those arrays via dynamic routes — adding a new service means adding one object,
not copying a file.

**2. One source of truth for design.** Every colour, font size, radius, shadow and
spacing value is a `@theme` token in `src/styles/_base.css`. No component contains a
hard-coded value like `bg-[#1e40af]`. Changing the site's look means editing one file.

---

## Getting started

Requires Node.js ≥ 20.3.

```bash
npm install
npm run dev          # dev server at localhost:4321
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run seo` | **Audit the build** — run this after every change |
| `npm run check` | TypeScript + Astro diagnostics |
| `npm run images` | Convert `assets/*.jpeg` → optimised WebP |
| `npm run brand` | Regenerate favicon and OG share card |

After any change: `npm run build && npm run seo`

---

## The SEO audit script

`scripts/seo-check.mjs` inspects the built HTML and fails the build on real problems.
It was written because these mistakes are invisible during development but expensive
in production — and it caught several during this project.

It checks:

1. **Duplicate titles, descriptions and canonicals** — two pages competing for the same
   keyword suppress each other. This caught the homepage and the Darıca region page
   sharing a title.
2. **Title and description length** — flags text that search results would truncate.
3. **Heading structure** — exactly one `<h1>` per page.
4. **Missing `alt` attributes.**
5. **Doorway-page risk** — computes word-level similarity between every pair of region
   pages. Near-duplicate location pages are a documented Google penalty. Current average
   similarity: **39%** (threshold: 65%).
6. **Malformed JSON-LD.**
7. **Broken internal links** — 953 links verified.
8. **Lost whitespace around inline tags** — Astro trims the newline after `</strong>`,
   producing run-on text like `detay?Çünkü`.

---

## Deliberate omissions

Two things are missing on purpose, and should stay missing until real data exists:

- **No review or star-rating markup.** There are no genuine customer reviews yet.
  Fabricated `aggregateRating` structured data violates Google's spam policy and,
  if detected, disables *all* rich results for the domain. It also misleads visitors.
- **No unverifiable claims.** No "15 years of experience", no "1500+ happy customers",
  no invented opening hours. Where a fact was not confirmed by the client, the site
  simply does not state it. Pending items are tracked in `docs/04-BEKLEYEN-BILGI.md`.

---

## Before going live

Three values are still placeholders — update `src/config/site.ts` (and the `site` field
in `astro.config.mjs` for the domain), and they propagate everywhere:

- [ ] Owner's surname
- [ ] Business address
- [ ] Domain name

Then, in rough order of impact on local search ranking:

1. **Create a Google Business Profile.** For searches like "boyacı", the map pack sits
   above the organic results. No amount of on-site optimisation substitutes for this.
2. Verify the site in Google Search Console and submit the sitemap.
3. Start collecting genuine customer reviews.
4. Keep name, address and phone identical across the site, Google Business Profile and
   any directory listings.

Full checklist: `docs/03-SEO.md`.

A realistic note: no technical work can guarantee a #1 ranking. This repository handles
the part that is actually under our control — and does it thoroughly.

---

## Deployment

The build output in `dist/` is fully static and works on any static host.
Cloudflare Pages or Netlify are both a good fit (free tier, CDN close to Turkey):

```
Build command:      npm run build
Output directory:   dist
Node version:       20 or higher
```

### Temporary preview on GitHub Pages

A preview build is deployed to GitHub Pages for review purposes:
**https://halil-kaplan.github.io/house-painter/**

The source code assumes the site lives at the **root** of its own domain, which is
where it will end up. A GitHub Pages *project* site lives under a subdirectory, so
`scripts/ghpages-patch.mjs` rewrites root-relative URLs in `dist/` immediately before
deployment. Nothing in `src/` is touched — the codebase stays correct for the real domain.

The same script also sets `noindex` on every page and writes a disallow-all `robots.txt`.
This matters: an indexed preview copy would compete with the real site as duplicate
content once it launches.

`.github/workflows/deploy-ghpages.yml` runs this on every push to `main`.
Delete the workflow and the script once the site moves to its own domain.
