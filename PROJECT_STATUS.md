# PROJECT_STATUS — UAB Subdoma

> **Track:** Landing (€200–€800) · **Generated:** 2026-05-13 · **Premium tier rebuild:** 2026-05-13

## Modulių matrica

| # | Modulis | Statusas | Detalės |
|---|---------|----------|---------|
| 01 | LT pagrindinis puslapis | ✅ Production | 13 sekcijų, GSAP animacijos, schema.org, hreflang |
| 02 | EN puslapis | ✅ Production | `/en/` route, full translation, hreflang |
| 03 | RU puslapis | ✅ Production | `/ru/` route, full translation, hreflang |
| 04 | Premium CSS design system | ✅ Production | Gold + black brand, Cormorant Garamond + Inter, fluid typography |
| 05 | GSAP animacijos | ✅ Production | Hero split-text, parallax, counter, 3D tilt, magnetic, cursor |
| 06 | Schema.org JSON-LD | ✅ Production | Organization + LocalBusiness + 6 Services |
| 07 | sitemap.xml + robots.txt | ✅ Production | hreflang alternates, allow all |
| 08 | content.json (3 lang) | ✅ Production | 714 lines, full LT/EN/RU |
| 09 | Calendly embed | ⚙️ Tested | Inline embed, lazy-loaded, live URL nepatikrintas |
| 10 | Cookie bar | ⚙️ Tested | localStorage consent, 3 lang, lokaliai veikia |
| 11 | Vercel live deploy | ⚠️ Nepatikrintas | Push'inta, build state nepatikrintas |
| 12 | `/privatumas/` puslapis | ⬜ Planned | Content paruoštas content.json'e, HTML nesukurtas |
| 13 | og-image.jpg | ⬜ Planned | HTML reference yra, failas nesukurtas |
| 14 | apple-touch-icon.png | ⬜ Planned | HTML reference yra, failas nesukurtas |
| 15 | Custom domain DNS | ⬜ Planned | Klientas neapsisprendė: Vercel subdomain vs custom |
| 16 | EN/RU native review | ⬜ Planned | Vertimai mano rankiniai, reikia native LT→EN, LT→RU review |

## Statuso reikšmės

- ✅ **Production** — gyvai veikia, patikrinta
- ⚙️ **Tested** — veikia lokaliai, production nepatikrintas
- 🔨 **In Build** — kuriama dabar
- ⬜ **Planned** — suplanuota, nepradėta
- ⚠️ **Blocked** — blokuotas išorinio veiksnio
- ⚠️ **Nepatikrintas** — turi būti production, bet nepatikrintas

## Blockers

1. **Vercel live URL nepatikrintas** — klientas turi patvirtinti, kad `https://uab-subdoma-330c.vercel.app/` veikia (ir 3 lang variantai)
2. **`/privatumas/` 404** — footer ir cookie bar linkai veda į puslapį, kurio nėra. SEO + UX rizika.
3. **og-image.jpg 404** — social share preview fail (LinkedIn, Facebook, Telegram). Brand reputation issue.

## Known issues

- **Inline `style` atributai** [src/pages/index.html](src/pages/index.html) keliose vietose (`.eyebrow style="justify-content:center"`, `.section-head style="margin-inline:auto"`) — pažeidžia CLAUDE.md NEVER taisyklę "Inline `<style>` arba `<script>` HTML'e"
- **Hero H1 LT 73 char** — virš 60ch SEO recommended threshold
- **Force-push'as perrašė `8d44aa3`** — neaiškus to commit'o kontekstas
