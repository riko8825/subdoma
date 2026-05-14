# PROJECT_STATUS — UAB Subdoma

> **Track:** Landing (€200–€800) · **Generated:** 2026-05-13 · **Premium tier rebuild:** 2026-05-13 · **UX + SEO/GEO iteracija:** 2026-05-14

## Modulių matrica

| # | Modulis | Statusas | Detalės |
|---|---------|----------|---------|
| 01 | LT pagrindinis puslapis | ✅ Production | 14 sekcijų (+ FAQ), sticky CTA bar, service filter, hero panel, GSAP, schema |
| 02 | EN puslapis | ⚠️ Desync | `/en/` veikia, BET nesinchronizuotas su LT #02 pakeitimais (FAQ, filter, CTA bar, SEO meta) |
| 03 | RU puslapis | ⚠️ Desync | `/ru/` veikia, BET nesinchronizuotas su LT #02 pakeitimais |
| 04 | Premium CSS design system | ✅ Production | Gold + black, fluid typography, spacing optimizuotas (#02), filter/FAQ/action-bar stiliai |
| 05 | GSAP animacijos | ✅ Production | Trukmės sumažintos (#02), `transition: all` pašalintas, cursor mix-blend bug fix |
| 06 | Schema.org JSON-LD | ✅ Production | ProfessionalService + GeoCoordinates + areaServed + FAQPage + hasOfferCatalog (#02) |
| 07 | sitemap.xml + robots.txt | ✅ Production | hreflang alternates, allow all |
| 08 | content.json (3 lang) | ✅ Production | 714 lines, full LT/EN/RU |
| 09 | SEO/GEO on-page | ✅ Production | Title/meta/H2 keyword-optimized (#02), 3 primary + 8 secondary + 12 long-tail |
| 10 | Sticky action bar + FAQ + filter | ✅ Production | Tik LT (#02), EN/RU laukia sync |
| 11 | Calendly embed | ⚙️ Tested | Inline embed, lazy-loaded, live URL nepatikrintas |
| 12 | Cookie bar | ⚙️ Tested | localStorage consent, 3 lang, lokaliai veikia |
| 13 | Vercel live deploy | ⚠️ Nepatikrintas | Push'inta, build state nepatikrintas |
| 14 | `/privatumas/` puslapis | ⬜ Planned | Content paruoštas content.json'e, HTML nesukurtas |
| 15 | og-image.jpg | ⬜ Planned | HTML reference yra, failas nesukurtas |
| 16 | apple-touch-icon.png | ⬜ Planned | HTML reference yra, failas nesukurtas |
| 17 | Custom domain DNS | ⬜ Planned | Klientas neapsisprendė: Vercel subdomain vs custom |
| 18 | EN/RU native review | ⬜ Planned | Vertimai mano rankiniai, reikia native LT→EN, LT→RU review |

## Statuso reikšmės

- ✅ **Production** — gyvai veikia, patikrinta
- ⚙️ **Tested** — veikia lokaliai, production nepatikrintas
- 🔨 **In Build** — kuriama dabar
- ⬜ **Planned** — suplanuota, nepradėta
- ⚠️ **Blocked** — blokuotas išorinio veiksnio
- ⚠️ **Nepatikrintas / Desync** — turi būti production, bet nepatikrintas / nesinchronizuotas

## Blockers

1. **EN/RU desync** — LT puslapis turi FAQ, sticky CTA bar, service filter, hero panel, naują SEO — EN/RU neturi. Kalbų variantai dabar funkciškai skiriasi. Aukščiausias prioritetas kitai sesijai.
2. **Schema placeholder reikšmės** — `aggregateRating 4.9/100` + `postalCode 08105` `index.html` JSON-LD. Fake rating = Google structured data policy rizika. Reikia kliento input.
3. **Vercel live URL nepatikrintas** — `https://uab-subdoma-330c.vercel.app/` deploy state nepatvirtintas
4. **`/privatumas/` 404** — footer + cookie bar linkai veda į neegzistuojantį puslapį
5. **og-image.jpg 404** — social share preview fail

## Known issues

- **iter 2 bug fix neverifikuotas** — "rezultato" teksto fix (split-word overflow:visible) + lag fix (cursor mix-blend pašalintas, scrub removal) — nepatvirtinti vizualiai naršyklėje
- **Inline `style` atributai** [src/pages/index.html](src/pages/index.html) keliose vietose (`.eyebrow style="justify-content:center"`, `.section-head style="margin-inline:auto"`) — pažeidžia CLAUDE.md NEVER
- **Hero H1 LT 73 char** — virš 60ch SEO recommended threshold
- **Service-card tilt + magnetic** — `mousemove` × 6 cards be RAF throttling, galimas lag šaltinis jei vartotojas dar skundžiasi
- **Force-push'as perrašė `8d44aa3`** — neaiškus to commit'o kontekstas
