# SESSION_STATUS — UAB Subdoma

## Paskutinė sesija: 2026-05-13 #01

### Ką padarėme

**Scaffold mapping + structure fix:**
- Patikrintas projekto scaffold ([src/pages/index.html](src/pages/index.html), [src/css/styles.css](src/css/styles.css), package.json sync script)
- JS perkeltas iš `src/js/` į `public/` (Vercel clean URL'ų konsistencija)
- CLAUDE.md WORKFLOW sync skiltis išplėsta (3 cp commands)
- package.json `sync` script atnaujintas su HTML + CSS + JS

**Content extraction:**
- WebFetch'intas https://www.subdoma-projektai.lt/ (homepage + privacy page)
- Sukurta [src/data/content.json](src/data/content.json) (714 lines, 71KB) — visas LT turinys + EN + RU vertimai
- 6 services su pilnais detail blocks (kas tai, kam skirta, ką finansuoja, kaip mokama, intensyvumas)
- Pilna privacy policy (13 sekcijų) per kiekvieną kalbą

**Premium landing rebuild:**
- [src/css/styles.css](src/css/styles.css) (1359 lines) — premium design system: gold #C6A96B + deep black #0B0B0C, Cormorant Garamond + Inter, fluid typography clamp(), 7-step shadow system
- [src/js/animations.js](src/js/animations.js) (366 lines) — GSAP 3.12 + ScrollTrigger: hero split-text reveal, parallax, counter increment, 3D tilt cards, magnetic buttons, custom cursor (desktop), scroll progress bar, loader curtain
- [src/js/main.js](src/js/main.js) (145 lines) — nav scroll state, mobile menu, cookie bar, smooth scroll, Calendly lazy embed via IntersectionObserver
- 3 HTML failai: [src/pages/index.html](src/pages/index.html) LT (865 lines), [src/pages/en/index.html](src/pages/en/index.html) EN (584), [src/pages/ru/index.html](src/pages/ru/index.html) RU (582)
- 13 sekcijų per puslapį: hero + stats + intro + process + 6 service cards + mini quiz + 6 service details + contacts + footer

**SEO foundation:**
- Schema.org JSON-LD: Organization + LocalBusiness + WebSite + 6 Service entities (14 @type refs LT puslapyje)
- 3 hreflang alternates + x-default per kiekvieną HTML
- Canonical URLs per kalbą
- Open Graph + Twitter Card meta per kalbą
- [sitemap.xml](sitemap.xml) su xhtml:link hreflang alternatives
- [robots.txt](robots.txt) (allow all, disallow /src/)
- [public/favicon.svg](public/favicon.svg) — gold gradient brand mark

**Git + deploy:**
- Git remote prijungtas (`https://github.com/riko8825/subdoma`)
- Commit `5b0f4f3` — 18 files, +8474 / -235 lines
- Force-push'inta į `main` (perrašytas `8d44aa3 Add files via upload`)
- Vercel auto-deploy triggered

**Memory:**
- Sukurti 5 memory failai: MEMORY.md (index), project_state.md, project_sync_workflow.md, project_open_questions.md, reference_intake_submission.md, feedback_public_sync_header.md

### Kas liko / nepatvirtinta

- **Vercel live URL nepatikrintas** — `https://uab-subdoma-330c.vercel.app/` deploy state ir HTTP 200 response nepatvirtintas
- **`og-image.jpg` (1200×630) NĖRA** — visi 3 HTML rodo į `/public/og-image.jpg`, social tinklai gaus 404
- **`/privatumas/` puslapis NĖRA** — footer linkai + cookie bar linkai veda į 404
- **`apple-touch-icon.png` NĖRA** — HTML referencas yra, failas trūksta
- **EN/RU vertimai mano rankiniai** — be native speaker review, teisinis privacy text rizikingas
- **`8d44aa3 Add files via upload`** — neaiškus to commit'o kontekstas, force-push'as galimai prarado kliento manualias pataisas
- **Inline `style` atributai** keliose vietose pažeidžia CLAUDE.md NEVER taisyklę (eyebrow centered, section-head margin-inline:auto) — reikia perkelti į CSS klases

### Kitas žingsnis

1. **Patikrinti Vercel deploy state** — atidaryti `https://uab-subdoma-330c.vercel.app/` ir 3 lang variantai. Jei klaida — debug Vercel build logs.
2. **Sukurti `/privatumas/` puslapį** — content.json `privacy.lt/en/ru` jau yra paruoštas, reikia HTML šablono atskira sesija.
3. **og-image.jpg** — sukurti 1200×630 PNG (Figma export arba programatic), patalpinti `public/og-image.jpg`.
4. **Inline `style` cleanup** — perkelti į CSS klases (`.eyebrow--centered`, `.section-head--centered`).

## Istorija

| # | Data | Sesija | Score | Pabaigtumas |
|---|------|--------|-------|-------------|
| 01 | 2026-05-13 | Scaffold mapping + content extraction + premium landing rebuild (LT/EN/RU) + SEO + deploy | 7/10 | 70% |
