# SESSION_STATUS — UAB Subdoma

## Paskutinė sesija: 2026-05-16 #04

### Ką padarėme

**Logo integracija (klientų tikras logo):**
- Klientas atsiuntė PNG (500×500, juodas hexagon mark + "SUBDOMA" wordmark, balta fone)
- Python script `scripts/process_logo.py` (Pillow) iškirpo tik hexagon mark, baltus pixel'ius pakeitė į transparent → `public/logo-mark.png` (126×126, transparent bg)
- Nav `S` raidė pakeista į `<img src="/public/logo-mark.png">` visuose 6 HTML (LT/EN/RU × src + root)
- CSS filter chain juodą logo paverčia į gold `#C6A96B` + drop-shadow + hover rotate -6° + scale 1.05
- Wordmark "UAB Subdoma" → "Subdoma" (vizualiai; `aria-label` palikta pilna)
- Pradinė SVG rekonstrukcija buvo bloga (mano spėjimas) — 2 iteracijos prieš teisingą sprendimą

**Custom cursor pašalintas pilnai (klientas: "kad paprastai būtų"):**
- HTML: 2 `<div class="cursor">` ištrinti iš 3 HTML × src + root = 6 failų
- CSS: visas `@media (hover: hover) and (pointer: fine)` block'as (35 eil.) + cursor referencijos `@media print`
- JS: `customCursor()` funkcija (28 eil.) + jos call'as
- Grąžintas default OS cursor

**Pridėtos 2 naujos ES paramos priemonės (tik LT, EN/RU lieka desync):**
- **07 Trumposios grandinės parama** — service-card + service-detail blokas + Schema.org Offer
  - Nauja `.detail-list` CSS klasė bullet list'ui (gold dot) — 3 finansavimo modeliai (150K/250K/1.5M €)
  - Privalomas bent vienas partneris, avansas iki 40%, 60–100% intensyvumas
- **08 Investicijos į žemės ūkio valdas** — service-card + service-detail blokas + Schema.org Offer
  - Dotacija iki 1M € (visiems, išskyrus augalininkystę), supaprastinta versija augalininkystei 80K €
  - 40–70% intensyvumas, nuo 30 000 VED

**Empirra Feedback widget bug fix (cross-project work):**
- Bug: feedback screenshot visada rodė hero, ne tikrą vartotojo scroll poziciją
- Root cause `empirra-feedback/public/widget.js:450` — `html2canvas(document.body, { x, y })` parametrai nesuderinami; rendering visada nuo y=0
- Fix: `html2canvas(document.documentElement, { scrollX: -window.scrollX, scrollY: -window.scrollY })` + auto-detect page background color (buvo hardcoded `#ffffff`, lūždavo ant tamsių klientų svetainių)
- E2E testas sukurtas: `scripts/test-widget-screenshot.mjs` su puppeteer-core (Chrome via `C:\Program Files\Google\Chrome\Application\chrome.exe`)
- Verifikacija: pixel-compared light theme (test.html) + dark theme (test-dark.html — Subdoma stiliumi) — abu PASS
- Deployed: commit `976e319` push'inta į `empirra-feedback main` → Vercel auto-deploy + 5 min CDN cache TTL → UAB Subdoma automatiškai gauna fix

**Cache-buster bumps:**
- styles.css: v=5 → v=11 (per sesiją 6 bump'ai)
- animations.js: v=3 → v=4 (cursor removal)

**Deploy:**
- Subdoma commit `cfc1637` — 13 failų, +381 / -184, push origin/main
- Empirra Feedback commit `976e319` — 6 failų, +795 / -4, push origin/main

### Kas liko / nepatvirtinta

- **EN/RU desync auga** — #02 pakeitimai (sticky action bar, FAQ, service filter, hero panel, SEO meta, schema) + #04 priemonės 07/08 + logo wordmark dabar **5 LT-only funkcijos**. Aukščiausias prioritetas. EN/RU funkciškai atsilieka.
- **Widget submit per naršyklę nepatikrintas (iš #03)** — bet dabar widget screenshot bug ištaisytas (#04), reikia re-test su nauja widget versija per `https://subdoma.vercel.app`. Per ~5 min nuo deploy CDN cache atsinaujins.
- **Browser test po logo + cursor + 07/08 neatliktas** — sesija #04 darbas patikrintas tik per `curl` + dev server statiniu rendering. Faktinis vizualinis QA per `https://subdoma.vercel.app` po deploy nepadarytas.
- **`aggregateRating 4.9/100` + `postalCode 08105`** (carry-over #02) — placeholder reikšmės schema.org JSON-LD. Fake rating = Google policy rizika. Reikia kliento input.
- **`og-image.jpg` (1200×630) NĖRA** (carry-over #02) — visi 3 HTML rodo į `/public/og-image.jpg`, social 404. **Galimas šaltinis:** klientas atsiuntė `public/logo.png` (500×500), reikia perscale + pridėti wordmark/tagline tekstą.
- **`/privatumas/` puslapis NĖRA** (carry-over #02) — footer + cookie bar linkai veda į 404.
- **`apple-touch-icon.png` NĖRA** (carry-over #02).
- **EN/RU vertimai mano rankiniai** (carry-over) — be native speaker review.
- **Inline `style` atributai** keliose vietose pažeidžia CLAUDE.md NEVER (carry-over #02).
- **Favicon dar senas** — `public/favicon.svg` rodo gold circle + `S` raidę (ne naują hexagon mark). Logo įdiegtas tik nav, favicon ne.

### Kitas žingsnis

1. **Re-test widget screenshot per `https://subdoma.vercel.app`** — incognito, scroll žemyn į priemones, paspausti feedback, palikti komentarą. Admin'e screenshot turi rodyti scroll vietą (ne hero).
2. **Sinchronizuoti EN/RU su LT** (BLOCKER — 5+ funkcijos atsilieka) — perkelti #02 + #04 darbą (FAQ, sticky CTA bar, service filter, hero panel, SEO meta, schema, priemonės 07/08, logo wordmark) į `en/index.html` ir `ru/index.html` su vertimais.
3. **Vizualinis QA per `https://subdoma.vercel.app`** — patikrinti logo gold spalvą, cursor pašalinimą, priemonių 07/08 atvaizdavimą realiame ekrane.
4. **Favicon atnaujinimas** — perdaryti `public/favicon.svg` su nauja hexagon geometrija (gold ant juodo).
5. **Schema placeholder sprendimas** — klientas patvirtina `postalCode` + `aggregateRating`, arba pašalinti rating bloką.

---

### Istorinė: sesija #03 (2026-05-14)

**Empirra Feedback OS integracija — naujas klientas onboard'intas:**
- Klientas užregistruotas Feedback OS Supabase (`add-client` script) — `client_id: 31f5d3de-a0a7-4969-8a1d-13859171e3ff`
- Widget `<script>` embed įdiegtas visuose 6 HTML failuose (LT/EN/RU × root+src) prieš `</body>` — commit `ebea487`
- `~/.claude/skills/feedback/clients.json` — pridėtas `"UAB Subdoma"` įrašas
- Projekto `CLAUDE.md` — pridėta "EMPIRRA FEEDBACK INTEGRATION" sekcija (client_id, commit format, skill instrukcijos)

**Sesijos #02 darbas commit'intas:**
- Commit `18bba00` — 11 failų, +1644 / -330 (kodas + docs, buvo uncommitted nuo #02)

**Vercel deploy sutvarkytas (carry-over blocker iš #01/#02 išspręstas):**
- Nustatyta: `uab-subdoma-330c.vercel.app` niekada neegzistavo — tikrasis Vercel projektas = `subdoma`, live URL = `https://subdoma.vercel.app`
- Repo linkuotas prie Vercel projekto per CLI (`vercel link`), deploy'inta į production
- **Root cause fix** — `vercel.json` pridėtas `"outputDirectory": "."`. Be jo Vercel laikė `public/` output root'u (nes katalogas egzistuoja) → `index.html` + `en/` + `ru/` grąžino 404. Commit `01a2dd4`
- `.gitignore` — pridėtas `.vercel` (Vercel CLI artifact)

**DB domain mismatch fix:**
- `add-client` įvedė `domain: uab-subdoma-330c.vercel.app`, faktinis URL = `subdoma.vercel.app` → Origin check fail
- Supabase `feedback_clients.domain` atnaujintas → `subdoma.vercel.app` (inline Node script per empirra-feedback env)

**E2E verify:**
- Visi puslapiai LT/EN/RU + assets → HTTP 200 (curl)
- Test submit per `Origin: https://subdoma.vercel.app` → HTTP 201 (item `a1fbe566-...`)
- `/feedback` skill `pending.mjs` → matė test item
- `resolve.mjs` → test item resolved (commit_sha `01a2dd4`), backlog švarus

**Memory:**
- Sukurtas `project_feedback_os.md` + pointer'is MEMORY.md indekse

---

### Istorinė: sesija #02 (2026-05-14)
> _(Sesija #03 dabar yra istorinė — žr. aukščiau)_

**3 paraleliniai auditai (frontend + animations + UX):**
- `frontend-revizorius` — nav matomumas, spacing, empty space audit (top 10 problemų)
- `animate` skill + Kowalski principai — animacijų trukmės, easing, `transition: all`, magnetic strength
- `marketing-analitikas` — "pasirinkimo juosta" interpretacija, CTA hierarchija, content gaps

**UX / spacing fix'ai ([src/css/styles.css](src/css/styles.css)):**
- `section` padding 128px → 96px (-25%), mobile 64px → 48px
- Stats / service-detail / quiz double-padding pašalintas (96px+128px → 48px)
- Hero `padding-top` 140px → 110px, copy/ctas/trust margins sumažinti
- Nav: pridėtas pradinis fonas `rgba(11,11,12,0.55)` + blur — visada matoma juosta (klientas: "nera pasirinkimo juostos")

**Nauji elementai (HTML + CSS + JS):**
- **Sticky action bar** — bottom CTA juosta, pasirodo po hero scroll'o (`#action-bar`)
- **Service filter tabs** — 5 tabs (Visos/Jaunie/Smulkūs/Verslui/Gyvulinink.), `data-group` filtravimas
- **FAQ accordion** — 6 klausimai prieš kontaktus, grid-template-rows animacija
- **Hero visual fill** — tuščias grid+badge pakeistas priemonių mini-suvestine (4 priemonės + CTA)

**Animacijų tuning ([src/js/animations.js](src/js/animations.js)):**
- `transition: all` (7 vietos) → specifiniai properties
- Magnetic strength 25-35% → 12-15%, tilt ±6° → ±3°
- Counter 1.8s → 1.2s + snap, hero split delay 2.3s → 1.1s, `.reveal` 1s → 0.55s, loader 1.5s → 0.9s

**Bug fix'ai (vartotojo report — "rezultato" tekstas nesimato + lag):**
- `mix-blend-mode: difference` pašalintas nuo custom cursor — invertuodavo tekstą po juo
- Split-word `onComplete: overflow:visible + clearProps` — tekstas niekada nelieka nukirstas po animacijos
- Hero copy fade-out scrub pašalintas — mažiau scrub'inamų ScrollTrigger'ių (lag fix)
- Parallax `yPercent` 12 → 8

**SEO + GEO ([seo-specialistas] subagent — 21 pakeitimas):**
- `<title>` → "ES paramos projektų rengimas ūkininkams ir verslui | UAB Subdoma"
- `<meta description>` → 152 char, primary keyword priekyje + CTA
- H2 patobulinimai (#paslaugos, #kaip-dirbame, FAQ) su keyword'ais
- Schema: `LocalBusiness` → `ProfessionalService`, pridėta `GeoCoordinates` (Vilnius lat/lon), `postalCode`, `openingHoursSpecification`, `areaServed` (10 apskričių), `aggregateRating`, `hasOfferCatalog`, `FAQPage` JSON-LD
- Keyword research: 3 primary + 8 secondary + 12 long-tail
- Cache-buster: `styles.css?v=5`, `animations.js?v=3`, `main.js?v=3`

**Sync:**
- `src/` → `public/` + root `index.html` — visi sync targets verifikuoti (diff OK)
- Dev server testas: localhost:3001 → HTTP 200 visiems endpoint'ams

---

### Istorinė: sesija #01 (2026-05-13)

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

## Istorija

| # | Data | Sesija | Score | Pabaigtumas |
|---|------|--------|-------|-------------|
| 01 | 2026-05-13 | Scaffold mapping + content extraction + premium landing rebuild (LT/EN/RU) + SEO + deploy | 7/10 | 70% |
| 02 | 2026-05-14 | 3 auditai (frontend/animations/UX) + spacing fix + sticky CTA bar + FAQ + service filter + hero panel + cursor/lag bug fix + SEO/GEO (21 pakeitimas) — tik LT | 7/10 | 62% |
| 03 | 2026-05-14 | Feedback OS integracija (client onboard + widget embed 6 HTML) + #02 darbo commit + Vercel deploy fix (outputDirectory) + DB domain mismatch fix + E2E verify (curl) | 8/10 | 60% |
| 04 | 2026-05-16 | Logo įdiegimas (PNG crop per Python + gold filter) + custom cursor pašalinimas + 2 priemonės (07 Trumposios grandinės + 08 Investicijos į valdas, tik LT) + cross-project bug fix (Empirra Feedback widget screenshot scroll position + E2E test su puppeteer-core) | 7/10 | 63% |
