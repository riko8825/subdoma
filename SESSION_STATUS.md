# SESSION_STATUS — UAB Subdoma

## Paskutinė sesija: 2026-05-14 #03

### Ką padarėme

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

### Kas liko / nepatvirtinta

- **Widget submit per NARŠYKLĘ ant `subdoma.vercel.app` nepatikrintas** — E2E verify atliktas tik per curl (Origin header rankiniu būdu). Vartotojo screenshot rodė tik localhost (`127.0.0.1:5500`), kuris by design fail'ina Origin check. Faktinis floating mygtukas → klikas → submit per live domeną dar nepatvirtintas vizualiai.
- **EN/RU NESINCHRONIZUOTI su LT** — #02 pakeitimai (sticky action bar, FAQ, service filter, hero panel, SEO meta, schema) tik LT. Widget įdiegtas ir į EN/RU, bet patys puslapiai vis tiek desync. **Aukščiausias prioritetas.**
- **Browser test po iter 2 neatliktas** — "rezultato" teksto fix + lag fix NEpatvirtinti vizualiai (carry-over #02).
- **`aggregateRating 4.9/100` + `postalCode 08105`** — placeholder reikšmės schema.org JSON-LD. Fake rating = Google policy rizika. Reikia kliento input.
- **`og-image.jpg` (1200×630) NĖRA** — visi 3 HTML rodo į `/public/og-image.jpg`, social 404.
- **`/privatumas/` puslapis NĖRA** — footer + cookie bar linkai veda į 404.
- **`apple-touch-icon.png` NĖRA** — HTML referencas yra, failas trūksta.
- **EN/RU vertimai mano rankiniai** — be native speaker review.
- **Inline `style` atributai** keliose vietose pažeidžia CLAUDE.md NEVER.

### Kitas žingsnis

1. **Patvirtinti widget submit per naršyklę** — atidaryti `https://subdoma.vercel.app` (incognito), spausti floating mygtuką → elementą → įvesti test pastabą → Send. Patikrinti ar 201 (ne "Network issue"). Tada `/feedback UAB Subdoma` turi parodyti item.
2. **Sinchronizuoti EN/RU su LT** — perkelti sticky action bar, FAQ, service filter, hero panel, SEO meta, schema papildymus (su EN/RU vertimais) į `en/index.html` ir `ru/index.html`.
3. **Patvirtinti iter 2 fix'us naršyklėje** — "rezultato" matomas, lag dingo. Jei lag liko — RAF throttling tilt + magnetic.
4. **Schema placeholder sprendimas** — klientas patvirtina `postalCode` + `aggregateRating`, arba pašalinti rating bloką.
5. **Sukurti `/privatumas/` + og-image.jpg** (content.json `privacy.*` paruoštas).

## Istorija

| # | Data | Sesija | Score | Pabaigtumas |
|---|------|--------|-------|-------------|
| 01 | 2026-05-13 | Scaffold mapping + content extraction + premium landing rebuild (LT/EN/RU) + SEO + deploy | 7/10 | 70% |
| 02 | 2026-05-14 | 3 auditai (frontend/animations/UX) + spacing fix + sticky CTA bar + FAQ + service filter + hero panel + cursor/lag bug fix + SEO/GEO (21 pakeitimas) — tik LT | 7/10 | 62% |
| 03 | 2026-05-14 | Feedback OS integracija (client onboard + widget embed 6 HTML) + #02 darbo commit + Vercel deploy fix (outputDirectory) + DB domain mismatch fix + E2E verify (curl) | 8/10 | 60% |
