# SESSION_STATUS — UAB Subdoma

## Paskutinė sesija: 2026-05-17 #09

### Ką padarėme

**7 commits push'inti, 7 production deploy'ai į Vercel:**

**1. MailerLite newsletter integration (consent-gated)** — `9881aa4` + `b16518c` (~~ +401 / -142 ~~ )
- `<section class="newsletter">` tarp FAQ ir Contacts visuose 6 HTML (LT/EN/RU × root+src)
- Embed div `<div class="ml-embedded" data-form="50EEhc">` (form "ES paramos naujienlaiškis", 1993875 account)
- `window.loadMailerLite()` loader `public/main.js`
- Silktide `advertising.onAccept` hook → kraunamas MailerLite Universal script
- Fallback UI kai consent denied (link → Silktide preferences modal)
- Brand styling perkeltas į MailerLite dashboard (gold #C6A96B mygtukas, dark card #1A1A1F, Cormorant Garamond heading)
- CSS override (60+ eilučių) pašalintas po editor design — švaresnis kodas

**2. Social ikonos footer'yje** — `7be2d14` (+166 / -8)
- Inline SVG monochrome gold (LinkedIn, TikTok, Instagram, YouTube)
- 36px apvalūs mygtukai, gold border, hover glow background
- Localized aria-label per kalbą (LT/EN/RU)
- Mobile <600px centered

**3. Custom domain migration** — `6417b27` (+121 / -121)
- DNS: A `@` → `216.198.79.1`, CNAME `www` → `8982ba0e0037c787.vercel-dns-017.com` (Hostinger DNS Zone)
- Senų Webflow records pašalinta (A + CNAME + TXT verification)
- Vercel: `www.subdoma-projektai.lt` production + apex 307 → www, SSL auto-provisioned
- 126 nuorodų atnaujinta 14 failuose (canonical, sitemap, og:url, schema.org @id/url/image, hreflang)
- **Kritinis SEO fix:** prieš tai canonical rodė į `uab-subdoma-330c.vercel.app` (DEPLOYMENT_NOT_FOUND) — Google būtų deindeksavęs

**4. Empirra Feedback widget removed** — `8d1759f` (+8 / -40)
- Visi 8 HTML failai išvalyti nuo `<script src="https://empirra-feedback.vercel.app/widget.js">`
- Klientas pristatė svetainę, feedback collection nebereikalingas

**5. Newsletter navigation links** — `6c046fb` + `93b5894` (+52 / -16)
- Top nav: "Naujienlaiškis" / "Newsletter" / "Рассылка" tarp Results ir Contact
- Sticky action bar: pridėtas 3-ias mygtukas (envelope ikona) tarp Skambinti ir Nemokama konsultacija
- WhatsApp FAB nuleistas: desktop 90px→60px, mobile 80px→50px (lifted 160→130, 140→110)
- Mobile <480px: paslėpta `.action-bar__msg` (vietos 3 CTAs)

**Cache-busters bumpinti:** `styles.css v17→v21`, `main.js v6/v7→v9`

### Kas liko / nepatvirtinta

- **Browser manual QA — 4 sesijų carry-over (#05, #06, #07, #08, #09)** — NIEKAS nepadarė vizualinio test'o naršyklėje:
  - MailerLite forma render'inasi po `advertising` consent? Gold mygtukas, dark card?
  - WhatsApp FAB 60px nepersidengia su action bar?
  - Mobile <480px: 3 ghost CTAs telpa į iPhone SE 375px viewport?
  - Newsletter sekcijos `data-reveal="scale"` — jei consent denied, ar fallback UI atrodo intentional?
- **MailerLite realus subscribe test'as** — niekas neįvedė test email
- **GA4 Measurement ID** — neįdiegtas (`G-XXXXXXXXXX` placeholder visuose 8 HTML)
- **Asset gaps** — og-image.jpg (1200×630), apple-touch-icon, favicon hexagon — vis dar placeholderiai
- **Schema.org `aggregateRating`** — fake data, niekas neperžiūrėjo
- **LinkedIn URL** (#08 carry-over) — naudota `/in/subdoma` (personal); klientas nepatvirtino ar reikia `/company/subdoma`
- **EN/RU schema.org pilnumas** (#07 carry-over) — `FAQPage`, `Service`, `hasOfferCatalog` trūksta EN/RU
- **WhatsApp FAB `is-lifted` thresholds** (130/110px) parinkti spėjimu — neišmatuota su 3-mygtukių bar height
- **`image.png`** — sesijos pradžioje pateko į workspace (random screenshot), liko untracked. Nesvarbu, bet warto ištrinti

### Kitas žingsnis

1. **PRIVALU: Browser QA naršyklėje** — atidaryti `https://www.subdoma-projektai.lt/` ir patikrinti:
   - MailerLite forma po Cookie accept (marketing) → atrodo brand-aligned
   - Mobile responsive (iPhone SE viewport) — 3 ghost CTAs telpa, FAB neuždengia
   - Newsletter nav link smooth scroll'ina į sekciją
   - Visi 4 social ikonos footer'yje hover/click veikia
2. **MailerLite subscribe test'as** — įvesti test email, patikrinti MailerLite dashboard'e ar atsiranda subscriber
3. **Klientui paklausti:**
   - LinkedIn `/in/subdoma` vs `/company/subdoma`?
   - GA4 Measurement ID?
   - aggregateRating: ar yra realių klientų atsiliepimų ar šalinti schema.org?
4. **Asset finalize:** og-image, apple-touch-icon, favicon (žr. #07 carry-over)
5. **EN/RU schema.org carry-over** — FAQPage + Service + hasOfferCatalog (#07 task)

### Sesijos #09 commits

| Commit | Aprašymas | +/- |
|---|---|---|
| `9881aa4` | MailerLite integration (consent-gated) | +387/-18 |
| `b16518c` | CSS override cleanup (MailerLite styled in dashboard) | +14/-124 |
| `7be2d14` | Social icons footer (4 inline SVG) | +166/-8 |
| `6417b27` | Domain migration (URLs → www.subdoma-projektai.lt) | +121/-121 |
| `8d1759f` | Remove Empirra Feedback widget | +8/-40 |
| `6c046fb` | Newsletter top nav link | +6/-0 |
| `93b5894` | Newsletter CTA in action bar + WhatsApp FAB lower | +46/-16 |

---

## Istorinė: sesija #08 (2026-05-17)

### Ką padarėme

**Socialinių tinklų schema.org `sameAs` įdiegimas (6 HTML, +36/-8):**

Klientas pateikė 4 socialinių tinklų URL:
- LinkedIn: `https://www.linkedin.com/in/subdoma`
- TikTok: `https://www.tiktok.com/@subdoma`
- Instagram: `https://www.instagram.com/_es_projektu_rengimas_/` (jau buvo)
- YouTube: `https://www.youtube.com/@subdoma` (jau buvo)

**Pakeitimai:**
- **LT root + LT src:** `sameAs` papildyta nuo 2 iki 4 URL (LinkedIn + TikTok pridėti)
- **EN root + EN src:** naujas `sameAs` blokas pridėtas į `Organization` (anksčiau neturėjo)
- **RU root + RU src:** naujas `sameAs` blokas pridėtas į `Organization` (anksčiau neturėjo)

**Tracking parametrai pašalinti:** `?igsh=...&utm_source=qr&_t=...&_r=1` — Google parser jų nereikia, švarus canonical URL.

**Linter side-effect:** cache-buster `styles.css ?v=17 → v=18` visuose 8 HTML (4 root + 4 src) — sync OK.

**Deploy:** Commit `1feb587` push'intas į `origin/main` (`a47c8e8..1feb587`), Vercel auto-deploy triggered.

**Verify:** `grep` "linkedin|tiktok|youtube|instagram" — 6 failai × 4 URL = 24 matches (visi sync).

### Kas liko / nepatvirtinta

- **Google Rich Results Test po deploy NEPATIKRINTAS** — schema.org sameAs validacija per `https://search.google.com/test/rich-results`
- **LinkedIn URL klausimas** — naudotas `/in/subdoma` (personal profile slug). Jei klientas turi LinkedIn Company Page (`/company/subdoma`), reikės pakeisti — neklausiau patvirtinimo
- **Footer/UI socialinės ikonos NĖRA** — `sameAs` tik schema.org SEO sluoksniui. Vartotojas pasirinko tik schema (ne footer ikonos)
- **Visi #07 carry-over likę** — žr. žemiau sesijos #07 sekcijoje

### Kitas žingsnis

1. **Verify schema per Google Rich Results Test** (~2 min po Vercel deploy) — `https://subdoma.vercel.app` + `/en/` + `/ru/`, tikrinti `Organization.sameAs` masyvą
2. **Klientui patvirtinti LinkedIn URL** — `/in/subdoma` (personal) ar `/company/subdoma` (company page)?
3. **PRIVALU: Browser QA per `https://subdoma.vercel.app`** (4 sesijų carry-over — #05, #06, #07, #08): Tab skip link, filter aria-selected, FAQ aria-controls, LCP score, footer/FAB/Silktide/privacy
4. **EN/RU schema.org pilnumas** (carry-over #07) — pridėti `FAQPage` + `Service` + `hasOfferCatalog` (LT turi, EN/RU ne)
5. **Asset gaps pack** — og-image (1200×630), apple-touch-icon (180×180), favicon hexagon redesign
6. **Klientui pateikti:** postalCode patvirtinimas, aggregateRating sprendimas, GA4 Measurement ID

---

### Istorinė: sesija #07 (2026-05-17) — Frontend polish (a11y + LCP + cleanup)

**Frontend polish (frontend-revizorius audit + 10 fix'ų, 12 failų, +172/-70):**
- **C-01:** inline `style="margin-inline:auto;text-align:center"` + `style="justify-content:center"` → naujos CSS klasės `.section-head--center`, `.eyebrow--center`, `.eyebrow--mb-lg` (3 HTML × process + quiz sekcijos)
- **C-02:** `.visually-hidden` CSS klasė pridėta (su focus-visible reveal gold bg), inline `style="position:absolute;left:-9999px"` skip link'e pašalintas (LT)
- **H-01:** Skip-to-content link pridėtas EN ("Skip to content") + RU ("Перейти к содержимому") — keyboard nav WCAG 2.4.1
- **H-02:** `serviceFilter()` JS dabar dinamiškai keičia `aria-selected` atributą filter tabs su `role="tab"` (anksčiau lieko `false` ant visų po click)
- **H-05:** EN/RU footer privacy link papildyta `hreflang="lt" lang="lt" title="..."` — SR ir SEO clarity, kad link veda į LT-only puslapį
- **M-01:** `<link rel="preload" as="image" href="/public/logo-mark.png" fetchpriority="high">` pridėtas 3 HTML — LCP optimizacija
- **M-04/M-05:** Perteklinis `role="banner"` (ant `<header>`) ir `role="navigation"` (ant `<nav>`) pašalintas (4 HTML, įsk. privacy) — HTML5 implicit roles užtenka
- **M-06:** `faqAccordion()` JS dabar runtime'u sukuria `id="faq-answer-N"` + `aria-controls` + `role="region"` ryšį tarp trigger ir answer (vietoj 18 HTML edit'ų — JS lygmens fix)
- **L-01:** `animations.js?v=4` cache-buster sync'intas EN/RU (anksčiau buvo be `?v=`)
- **+extra:** `apple-touch-icon.png` reference pridėtas EN/RU; cache-buster bump `styles.css v=16→17`, `main.js v=6→7`; `role="region"` FAQ atsakymams

**Audit klaida (NE problema):** C-03 (`§` simboliai hero h1) — `animations.js:69` `splitHeroTitle()` jau apdoroja per `<span class="accent">`. Praleidau.

**Deploy:**
- Commit `b9a5c12` push'intas į origin/main, Vercel auto-deploy triggered
- Verify: curl + grep — inline styles=0, perteklinis role=0, cache-buster sync OK, src==root identiški

### Kas liko / nepatvirtinta

- **Browser QA per `https://subdoma.vercel.app` po #07 deploy NEPATIKRINTAS** (3 sesijų carry-over — #05, #06, #07). Visi sprendimai patikrinti tik per `curl` + `grep`. Šios sesijos polish (skip link Tab key reveal, FAQ aria-controls runtime, filter aria-selected, LCP preload Lighthouse impact) — vizualiai neverifikuoti
- **EN/RU native review nepadarytas** (#06 carry-over) — priemonės 07/08 terminologija mano rankinis vertimas, hero panel labels taip pat
- **Schema placeholder reikšmės** (carry-over #02) — `aggregateRating 4.9/100` + `postalCode 08105`. Fake rating = Google policy rizika. Reikia kliento input
- **og-image.jpg, apple-touch-icon.png, logo.svg fiziškai NĖRA** — `<link>` references rodo į neegzistuojančius failus (HTML 200 OK, bet asset 404)
- **Favicon senas** (carry-over #04) — gold circle + S, ne hexagon
- **EN/RU schema.org nepilnas** — LT turi FAQPage + Service + hasOfferCatalog, EN/RU tik Organization + WebSite. SEO desync. Iš audit'o (H-08)
- **EN/RU privatumo puslapis NĖRA** — footer nuorodos su hreflang=lt veda į LT puslapį (dabar bent SR aiškiai supranta)
- **`image.png` repo root'e untracked** (carry-over #05) — 666×82 PNG 618B, nepašalintas

### Kitas žingsnis

1. **PRIVALU: Browser QA per `https://subdoma.vercel.app`** (3 sesijų carry-over) — incognito, Lighthouse audit:
   - Tab key fokusas → skip link reveal'as 3 kalbose (gold bg, top-left)
   - Filter tabs LT/EN/RU — click → DevTools inspect → `aria-selected="true"` aktyviame
   - FAQ accordion 3 kalbose — `aria-controls` + answer `id` + `role="region"` runtime sukurti
   - LCP score (logo-mark preload impact) — turėtų pagerinti
   - Footer "Sukūrė Empirra" + WhatsApp FAB + Silktide + privacy (#05/#06 carry-over)
2. **EN/RU native review** — priemonės 07/08 + hero panel labels (#06 carry-over)
3. **Asset gaps pack** — og-image (1200×630 iš logo.png), apple-touch-icon (180×180), favicon hexagon, logo.svg
4. **Klientui pateikti:** postalCode patvirtinimas, aggregateRating sprendimas (realūs Google reviews vs pašalinti bloką), GA4 Measurement ID

---

### Istorinė: sesija #06 (2026-05-17) — EN/RU pilna UI sync su LT + footer credit centravimas

**Footer "Sukūrė Empirra" centravimas (8 HTML × LT/EN/RU root+src):**
- Perkelta į atskirą eilutę `.footer__credit-line` po pagrindiniu `.footer__inner`
- Gold separator border-top, centered, lokalizuota 3 kalbomis

**EN/RU pilna UI sync su LT (visa LT-only funkcionalumas perkeltas į EN + RU root + src/pages):**
- Hero panel kortelės (Young farmers €60K, Small farms €25K, Modernisation €200K, Business growth €500K + CTA) — **fix screenshot problem'os, kai dešinė hero pusė buvo tuščia**
- Filter-bar su 5 mygtukais + data-group atributai 6 esamoms service-cards
- 2 naujos priemonės: 07 (Short chains / Поддержка коротких цепей) + 08 (Holdings investments / Инвестиции в сельхозхозяйства) — service-card + pilnas service-detail blokas
- FAQ section (6 klausimai)
- Sticky action-bar po footer'io
- Cache-buster: styles.css v=15 → v=16 per 8 HTML failus

**Deploy:** Commit `6184e8e` — +982/-88 eilutės per 10 failų, push'inta į origin/main

### Istorinė: sesija #05 (2026-05-17) — Footer credit, WhatsApp FAB, Silktide consent, privatumo politika

**Footer "Sukūrė Empirra" credit (6 HTML × LT/EN/RU root+src):**
- Inline su copyright po `· `: LT "Sukūrė Empirra", EN "Made by Empirra", RU "Сайт создан Empirra"
- Link į `https://empirra.com`, `target="_blank" rel="noopener"`
- Nauja `.footer__credit` CSS klasė — gold spalva, 85% opacity, hover'is full opacity + gold underline

**WhatsApp FAB (6 HTML + CSS + JS):**
- Floating apvalus mygtukas (56×56 desktop / 52×52 mobile) bottom-right
- Linkas: `https://wa.me/37067508128` (klientas: `+370 675 08 128`), `target="_blank"`
- Empirra premium style: gradient `#141416→#0B0B0C`, gold border, drop shadow + gold glow on hover
- Inline SVG WhatsApp ikona (~1KB, vienas path, no external fetch)
- `bottom: calc(90px + env(safe-area-inset-bottom, 0px))` — iOS safe area + virš Feedback widget
- `.is-lifted` klasė → `bottom: 160px` (140px mobile) kai action-bar visible (sync'inta su `actionBar()` toggle)
- CSS-only gold pulse ring (`@keyframes wa-pulse`, 2.6s)
- Hover: `translateY(-3px) scale(1.06)` + gold glow + border bright
- `prefers-reduced-motion` — disable animacijos
- Lokalizuoti aria-labels: LT "Rašykite mums per WhatsApp", EN "Chat with us on WhatsApp", RU "Написать нам в WhatsApp"

**Silktide Consent Manager (PAKEITĖ seną cookie-bar):**
- Vendor failai kopija iš empirra.com (tas pats stack'as):
  - `public/silktide-consent-manager.js` (54 KB) — Silktide v2.0, MIT
  - `public/silktide-consent-manager.css` (12 KB)
- `public/consent-init.js` (3 KB) — **LT lokalizuota** config, 3 kategorijos:
  - "Būtini" (required, su silktideCookieChoices + empf_reporter_v1)
  - "Analitiniai" (optional, gtag analytics_storage callback)
  - "Rinkodaros" (optional, gtag ad_storage + ad_user_data + ad_personalization)
- `<head>` per 6 HTML: Google Consent Mode V2 default deny (visi 4 storage) + `wait_for_update: 500` + GA4 placeholder komentaras (`G-XXXXXXXXXX`)
- `<body>` per 6 HTML: `<script defer src="/public/silktide-consent-manager.js">` + `consent-init.js`
- **Pašalinta:** senas `<div class="cookie-bar">` markup iš 6 HTML, `cookieBar()` funkcija iš `main.js` (-24 eil), `.cookie-bar` CSS blokas (-39 eil)
- `@media print` atnaujinta — `.cookie-bar` selektorius pakeistas į `#silktide-wrapper`, `#silktide-cookie-icon-button`, `.wa-fab`

**Privatumo politikos puslapis `/privatumas/` (carry-over #02 BLOCKER išspręstas):**
- Naujas LT-only puslapis `privatumas/index.html` + `src/pages/privatumas/index.html` (20 KB)
- **Turinys perrašytas iš nulio** — NE copy iš seno `content.json`. Pašalinti fiktyvūs servisai (Webflow, MailerLite, Telegram bot, TikTok, LinkedIn), pridėti REALŪS šiandien naudojami:
  - Vercel (hosting), Calendly (booking), Google (Gmail + Fonts), WhatsApp/Meta, Cloudflare cdnjs (GSAP), Empirra (Feedback widget), Silktide (consent)
- 13 BDAR sekcijų LT: bendra info, valdytojas, duomenys, šaltiniai, tikslai, teisinis pagrindas (BDAR 6 str. a/b/f), saugojimo terminai (3m/10m/12mėn/30d), gavėjai, perdavimas už ES, jūsų teisės, saugumas, slapukai (3 kategorijos kortelėse su konkrečiais cookie pavadinimais), kontaktai + VDAI nuoroda
- TOC nav viršuje (13 anchor link'ų, 2-col grid → 1-col mobile)
- "Slapukų nustatymai" mygtukas → atidaro Silktide preferences modal per `[data-open-consent]` hook (3-tier fallback: cookie-icon click → getInstance().toggleModal → createModal)
- Naršyklės slapukų išvalymo instrukcijų link'ai (Chrome/Firefox/Safari)
- WhatsApp FAB + Feedback widget + nav lang-switch (LT active) + footer su `is-active` ant privacy link'o
- Schema.org WebPage JSON-LD su Organization referencija
- +239 eilutės CSS: `.privacy`, `.privacy__title` (display serif), `.privacy__toc` (gold-line border), `.privacy__list` (gold dot bullet), `.privacy__list--detailed` (rotated square pin), `.privacy__cookies` grid (3 kortelės, hover lift), `code` (gold tinted bg)
- `main.js` +18 eilutės: `consentReopen()` funkcija

**Footer link sync (6 landing HTML):**
- `/privatumas/#cookies` → `/privatumas/#slapukai` (LT anchor matching naują puslapį)

**Sitemap:** `/privatumas/` lastmod 2026-05-13 → 2026-05-17

**Cache-buster bumps:**
- styles.css: v=11 → v=15 (per sesiją 4 bump'ai)
- main.js: v=3 → v=6 (per sesiją 3 bump'ai; EN/RU pirmą kartą gauna `?v=`)

**Deploy:**
- Commit `10c3328` — 16 failų, +3875 / -189
- `git push origin main` — 01988d2..10c3328 → Vercel auto-deploy triggered

### Kas liko / nepatvirtinta

- **Faktinis browser QA per `https://subdoma.vercel.app` po deploy NEPATIKRINTAS.** Visi sprendimai (footer credit, WhatsApp FAB lift logic, Silktide banner pasirodymas, gtag consent update, privacy puslapio scroll-margin-top anchor offset, `[data-open-consent]` mygtukas) patikrinti tik per `curl` + `grep` smoke testus. **Šiuo metu nežinoma ar viskas tikrai veikia naršyklėje.**
- **Silktide "Slapukų nustatymai" mygtuko fallback grandinė** — `consentReopen()` bandys 3 metodus eilės tvarka. Jei Silktide v2 cookie icon selector skiriasi nuo `.silktide-cookie-icon`/`#silktide-cookie-icon-button`, fallback'as eis į `getInstance().toggleModal(true)`. Reikia live test.
- **EN/RU desync AUGA** — pridėtas dar 1 LT-only puslapis (`/privatumas/`). Dabar EN/RU atsilieka **6+ funkcijos**: FAQ, sticky CTA bar, service filter, hero panel, SEO meta, priemonės 07/08, logo wordmark, privatumas puslapis. EN/RU footer'iai vis dar veda į LT `/privatumas/` (intencionaliai).
- **GA4 ID nėra** — `<head>` turi placeholder `G-XXXXXXXXXX` komentare, Consent Mode V2 default'ai įdiegti, bet realaus gtag config nėra. Klientas turės pateikti Measurement ID, kad analytics pradėtų veikti.
- **EN/RU privatumo politika NĖRA** — content.json turi EN + RU vertimus, bet ir jie su tais pačiais fiktyviais servisais. Reikės perrašyti su realiais servisais EN + RU prieš kuriant `/en/privacy/` + `/ru/privacy/`.
- **Widget re-test po screenshot fix dar nepadarytas (carry-over #04)** — `empirra-feedback` commit `976e319` deployed prieš sesiją #04, bet faktinis test su nauja widget versija per Subdoma incognito + scroll dar nepadarytas.
- **`aggregateRating 4.9/100` + `postalCode 08105`** (carry-over #02) — placeholder reikšmės schema.org JSON-LD landing puslapyje. Fake rating = Google policy rizika.
- **`og-image.jpg` (1200×630) NĖRA** (carry-over #02) — visi 4 HTML rodo į `/public/og-image.jpg`, social 404.
- **`apple-touch-icon.png` NĖRA** (carry-over #02).
- **Favicon dar senas** (carry-over #04) — `public/favicon.svg` rodo gold circle + `S`, ne hexagon mark.
- **Inline `style` atributai** keliose vietose pažeidžia CLAUDE.md NEVER (carry-over #02).

### Kitas žingsnis

1. **PRIVALU: Browser QA per `https://subdoma.vercel.app` po šios sesijos deploy** — incognito naršyklė, patikrinti:
   - Footer "Sukūrė Empirra" link veikia ir atrodo subtilus
   - WhatsApp FAB pasirodo bottom-right, click atidaro WhatsApp web/app
   - Scroll žemyn → sticky action bar pasirodo + FAB pakyla aukščiau (`.is-lifted`)
   - Silktide cookie banner pasirodo per ~1 sek po load (bottom-left), 3 mygtukai veikia, "Tik būtini" + "Sutinku su visais" + "Nustatymai" lokalizuoti
   - `/privatumas/` puslapis renderuojasi, TOC anchor'iai skroll'ina į teisingas sekcijas, "Slapukų nustatymai" mygtukas atidaro Silktide modal
   - DevTools Network: po "Sutinku su visais" → `dataLayer` turi `consent update` su `analytics_storage: 'granted'`
2. **Sinchronizuoti EN/RU su LT** (BLOCKER #1, 6+ funkcijos atsilieka) — aukščiausias prioritetas
3. **Favicon atnaujinimas** — perdaryti `public/favicon.svg` su hexagon geometrija (logo style)
4. **Schema placeholder sprendimas** — klientas patvirtina `postalCode` + `aggregateRating`, arba pašalinti rating bloką

---

### Istorinė: sesija #04 (2026-05-16) — Logo, cursor removal, priemonės 07/08

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
- Nustatyta: `www.subdoma-projektai.lt` niekada neegzistavo — tikrasis Vercel projektas = `subdoma`, live URL = `https://subdoma.vercel.app`
- Repo linkuotas prie Vercel projekto per CLI (`vercel link`), deploy'inta į production
- **Root cause fix** — `vercel.json` pridėtas `"outputDirectory": "."`. Be jo Vercel laikė `public/` output root'u (nes katalogas egzistuoja) → `index.html` + `en/` + `ru/` grąžino 404. Commit `01a2dd4`
- `.gitignore` — pridėtas `.vercel` (Vercel CLI artifact)

**DB domain mismatch fix:**
- `add-client` įvedė `domain: www.subdoma-projektai.lt`, faktinis URL = `subdoma.vercel.app` → Origin check fail
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
| 05 | 2026-05-17 | Footer "Sukūrė Empirra" credit (3 lang) + WhatsApp FAB (56×56, gold ring, safe-area-inset-bottom, .is-lifted sync su action-bar) + Silktide Consent Manager (vendor iš empirra.com + LT lokalizuotas init + Google Consent Mode V2 + senos cookie-bar pašalinimas) + privatumo politikos puslapis /privatumas/ (13 BDAR sekcijų, perrašyta nuo nulio su realiais 3rd-party servisais) | 8/10 | 67% |
| 06 | 2026-05-17 | Footer credit centravimas atskira eilute (8 HTML) + EN/RU pilna UI sync su LT (hero panel kortelės, filter-bar, priemonės 07/08 service-card+detail, FAQ, sticky action-bar) — 10 failų, +982/-88 | 8/10 | 80% |
| 07 | 2026-05-17 | Frontend polish: frontend-revizorius audit + 10 a11y/LCP/cleanup fix'ų (inline styles → CSS klasės, skip link EN/RU, serviceFilter aria-selected, faqAccordion aria-controls per JS, LCP preload, perteklinis ARIA roles cleanup, cache-buster sync) — 12 failų, +172/-70 | 8/10 | 85% |
| 08 | 2026-05-17 | Socialinių tinklų schema.org `sameAs` įdiegimas (LinkedIn + TikTok + Instagram + YouTube): LT papildyta 2→4 URL, EN/RU pridėtas naujas sameAs blokas Organization — 6 HTML, +36/-8. Linter sync cache-buster styles.css v=17→v=18 (8 HTML). | 8/10 | 76% |
