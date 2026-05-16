# DECISION_LOG — UAB Subdoma

## 2026-05-16 — Sesija #04: logo, cursor, priemonės 07/08, widget bug fix

### D-008: Logo įdiegimas per PNG + Python crop, ne SVG perpiešimas

**Sprendimas:** Naudoti klientų pateiktą PNG kaip `<img>` su CSS filter (juodas → gold), o ne perpiešti į SVG.

**Konteksis:**
- Klientas atsiuntė 500×500 PNG (juodas hexagon mark + "SUBDOMA" wordmark, balta fone)
- Bandžiau perpiešti SVG hexagon + inner pattern — geometrija per 2 iteracijas buvo bloga (vartotojas: "neatitinka logo ka turime")

**Alternatyvos:**
- SVG perpiešimas — geriausia kokybė + auto-rekoloravimas per `currentColor`, BET reikia tikslios geometrijos arba SVG/AI/PDF originalo (kurio nebuvo)
- PNG `<img>` su CSS filter — naudoja TIKRĄ klientų geometriją, bet:
  - PNG turi baltą foną → filter pavers visa kvadratu (bug pirmoje iteracijoje)
  - Wordmark "SUBDOMA" yra PNG viduje → dvigubas tekstas šalia HTML wordmark

**Pagrindimas:** Python script (`scripts/process_logo.py`, Pillow) automatizavo PNG apdorojimą:
1. Iškirpo tik hexagon mark (top portion bbox detection)
2. Baltus pixel'ius pakeitė į transparent
3. Įcentravo į kvadratą
4. Output: `public/logo-mark.png` (126×126, transparent bg)

CSS filter chain juodą paverčia į gold `#C6A96B`. Veikia ant tamsaus nav fono. Filter chain ne 100% tikslus gold atspalvis, bet skirtumas mažas.

**Reusable:** Klientas gali atsiųsti naują logo versiją ateityje, ir scriptas vėl iškirps tik mark dalį.

---

### D-009: Empirra Feedback widget screenshot capture fix

**Sprendimas:** `empirra-feedback/public/widget.js` html2canvas params perdaryti — `document.documentElement` target + `scrollX/scrollY` (su minusu) vietoj `document.body` + `x/y` crop.

**Konteksis:** Bug — feedback screenshot visada rodė hero, ne tikrą vartotojo scroll poziciją. Klientas (UAB Subdoma) ir kiti widget naudotojai negaudavo tikslo screenshot konteksto.

**Root cause:** `html2canvas(document.body, { windowWidth, windowHeight, x: scrollX, y: scrollY, width: innerWidth, height: innerHeight })` — html2canvas šituos params su `document.body` target'u interpretuoja taip, kad rendering visada pradedamas nuo y=0 dokumento, ignoruojant `x/y` (kurie yra crop iš ready canvas, ne render offset).

**Alternatyvos atmestos:**
- Native browser `getDisplayMedia()` — reikalauja vartotojo permission, blogas UX
- Server-side puppeteer screenshot — reikia keisti widget į pranešimą serveriui, ne client-side capture
- Patikslinti `document.body` ir paduoti `scrollX/scrollY` — ištestuota, neveikia (body element nepriima šių params kaip render offset)

**Pagrindimas:** `documentElement` target + `scrollX: -window.scrollX, scrollY: -window.scrollY` yra html2canvas oficialiai dokumentuotas būdas viewport-only screenshot'ams. Pridėtas auto-detect page background color (buvo hardcoded `#ffffff`, lūždavo ant dark theme svetainių kaip Subdoma).

**Testavimas:** Sukurtas E2E testas (`scripts/test-widget-screenshot.mjs` su puppeteer-core, naudoja sistemos Chrome). Pixel-compared light theme + dark theme — abu PASS. Deployed į `empirra-feedback main` (commit `976e319`).

---

### D-010: Custom cursor pašalintas pagal kliento prašymą

**Sprendimas:** Pašalinti pilnai (HTML divs + CSS @media block + JS funkcija), grąžinti default OS cursor.

**Konteksis:** Klientas: "nuo peles ta auskini burbula nuimk. kad paprastai butu".

**Alternatyvos:**
- Palikti, bet su switch'u (klientas vėliau gali norėti) — overengineering, klientas aiškiai pasakė "paprastai"
- Tik išjungti per `display: none` — visi resursai vis tiek užsikrauna, JS vis tiek registruoja event listener'ius
- Pilnas removal — švarus, mažesnis JS bundle (28 eil. mažiau), mažiau event listener'ių, default cursor patikimas

**Pagrindimas:** Custom cursor'ai dažnai sukelia problemas (accessibility, hover state confusion, performance). Klientas turėjo aiškią opiniją. Geriausia praktika — gerbti kliento sprendimą be ginčo.

---

## 2026-05-13 — Premium tier rebuild architektūra

### D-001: Animacijų biblioteka = GSAP 3.12 + ScrollTrigger

**Sprendimas:** Naudoti GSAP 3.12 + ScrollTrigger CDN per cdnjs.cloudflare.com.

**Alternatyvos:**
- Motion One + Lenis — mažesnis bundle (12KB), bet mažiau power'io sudėtingom timeline'om
- Pure CSS + Intersection Observer — 0 bundle, bet sudėtingom orchestracijom (stagger, scrub) reiks rankomis

**Priežastis:** Original subdoma-projektai.lt (Webflow) jau naudoja GSAP — stilistinis tęstinumas. Industry standard premium agency stack'as. ScrollTrigger leidžia scroll-driven animacijas, SplitText hero copy reveal'ams.

### D-002: Multi-language = 3 atskiri HTML failai

**Sprendimas:** `index.html` (LT), `en/index.html`, `ru/index.html` — kiekvienas su savo `<html lang>`, canonical, hreflang alternates.

**Alternatyvos:**
- Vienas HTML + JS language switcher per `?lang=en` query — paprasta palaikyti, bet SEO silpnesnis (Google sunkiau indexuoja JS-rendered turinį kitų kalbų)
- Tik LT dabar, EN/RU vėliau — saugiausias scope, bet klientas pasakė "premium" + 3 kalbos iškart

**Priežastis:** Maksimalus SEO — Google indexuoja 3 atskirus puslapius su skirtingais lang attributes ir canonical URLs.

### D-003: Forma = Calendly inline embed + tel/mailto linkai

**Sprendimas:** Calendly inline widget per `https://calendly.com/projektai/30min` (sutampa su originalu) + tel/mailto linkai contacts sekcijoje. Be Formspree.

**Alternatyvos:**
- Formspree + Calendly — custom kontaktų forma (vardas/email/žinutė), bet reikia Formspree endpoint'o setup
- Tik Calendly + Telegram bot — minimalu, bet praleidžia tradicinį email lead capture

**Priežastis:** 1:1 atitinka originalą subdoma-projektai.lt. Jokio backend'o, jokio kliento API setup'o. Calendly turi savo GDPR compliance.

### D-004: Sync script praplėstas 3 HTML + 3 assets

**Sprendimas:** [package.json](package.json) `sync` script dabar:
```
mkdir -p en ru &&
cp src/pages/index.html ./index.html &&
cp src/pages/en/index.html ./en/index.html &&
cp src/pages/ru/index.html ./ru/index.html &&
cp src/css/styles.css public/styles.css &&
cp src/js/main.js public/main.js &&
cp src/js/animations.js public/animations.js
```

**Priežastis:** Naujos struktūros mapping reikalauja, kad src/ būtų edit'inami, public/ ir root/en/ru — sync'inami. Galimas patobulinimas: konvertuoti į Node.js build script vietoj POSIX `cp` (Windows compatibility).

### D-005: Force-push'as ant remote `8d44aa3`

**Sprendimas:** `git push --force-with-lease origin main` perrašė remote commit'ą `8d44aa3 Add files via upload`.

**Priežastis:** `git diff main origin/main --stat` parodė, kad remote'as turėjo tik fragmentinę šios sesijos darbo versiją (be `en/`, `ru/`, `animations.js`, `content.json`). User'is autorizavo force-push.

**Risk:** Jei `8d44aa3` turėjo kliento manualias pataisas — jos prarastos. Reikia patikrinti su klientu, ar jis ką nors keitė GitHub web UI prieš mūsų sesiją.

---

## 2026-05-14 — UX iteracija + SEO/GEO

### D-006: Custom cursor be `mix-blend-mode: difference`

**Sprendimas:** Pašalinti `mix-blend-mode: difference` nuo `.cursor` — pakeista į `opacity: 0.85` gold dot.

**Priežastis:** Vartotojas pranešė, kad hero H1 "rezultato" teksto dalis nesimato. Root cause — `mix-blend-mode: difference` invertuodavo spalvas po cursor'iumi, sukurdamas nekontroliuojamus flip'us virš gold teksto/elementų. Kowalski animacijų auditas tą patį pažymėjo kaip "amateur leak".

**Alternatyvos:** Palikti mix-blend, bet apriboti `isolation` kontekstu — sudėtinga, nenuspėjama virš skirtingų fonų.

### D-007: Sticky action bar — "pasirinkimo juosta" interpretacija

**Sprendimas:** Pridėti bottom sticky CTA bar (`#action-bar`), pasirodantį po hero scroll'o, su "Skambinti" + "Nemokama konsultacija".

**Priežastis:** Vartotojo skundas "nera pasirinkimo juostos". `marketing-analitikas` auditas interpretavo dvejopai: (a) nav per silpna, (b) trūksta nuolatinio CTA / service selektoriaus. Įgyvendinti abu — nav pradinis fonas + sticky action bar + service filter tabs.

### D-008: Service filter tabs su `data-group` (be JS framework)

**Sprendimas:** 5 filter tabs (Visos/Jaunie/Smulkūs/Verslui/Gyvulinink.) filtruoja `.service-card[data-group]` per `is-hidden` klasę. Vanilla JS `serviceFilter()` [src/js/main.js](src/js/main.js).

**Priežastis:** CLAUDE.md NEVER draudžia React/Vue. Kortelės gali priklausyti kelioms grupėms (`data-group="gyvuliai smulkus"`). Paprastas `classList.toggle` užtenka 6 kortelėms.

### D-009: Schema.org placeholder reikšmės — PALIKTOS su rizikos žyma

**Sprendimas:** `seo-specialistas` pridėjo `aggregateRating 4.9/100` ir `postalCode 08105` į `index.html` JSON-LD. Paliktos faile, bet pažymėtos kaip blocker PROJECT_STATUS'e.

**Risk:** `aggregateRating` su išgalvotais skaičiais pažeidžia Google structured data policy (gali sukelti manual action). `postalCode` apytikris. **PRIEŠ production deploy** — klientas turi patvirtinti realius skaičius arba `aggregateRating` blokas pašalinamas.

**Priežastis nepašalinti dabar:** Schema struktūra teisinga, tik reikšmės placeholder. Pašalinti lengva, pridėti atgal su realiais duomenimis — irgi. Sprendimas atidėtas kliento input'ui.

## 2026-05-14 — Feedback OS integracija + Vercel deploy

### D-010: Vercel `outputDirectory: "."` — eksplicitiškai repo root

**Sprendimas:** `vercel.json` pridėtas `"outputDirectory": "."`.

**Priežastis:** Vercel default'as ("`public` if it exists, or `.`") palaikė `public/` katalogą deploy output root'u, nes jis egzistuoja. Bet šiame projekte `public/` = CSS/JS sync target'ai (kopijos iš `src/`), NE deploy output. Rezultatas — `index.html` + `en/` + `ru/` nebuvo publikuojami, visi puslapiai grąžino 404 (tik `/en/`, `/ru/` redirectai 308, nes katalogai egzistavo, bet failai ne). `vercel.json` jau turėjo `/public/(.*)` header rule — patvirtina, kad `public/` turi būti servinamas kaip svetainės dalis, ne kaip root.

**Alternatyvos:** (a) pervadinti `public/` → `assets/` — palietų sync workflow, package.json script, CLAUDE.md, visus HTML referencus. (b) Pašalinti `public/` ir servinti tiesiai iš `src/` — laužo esamą sync architektūrą. Eksplicitinis `outputDirectory` — vienos eilutės fix be struktūrinių pakeitimų.

### D-011: Feedback OS klientas — vienas client_id, domenas po deploy

**Sprendimas:** UAB Subdoma registruotas Feedback OS su vienu `client_id`. `add-client` įvedė `domain: uab-subdoma-330c.vercel.app`, vėliau pataisyta į faktinį `subdoma.vercel.app` (Supabase row update).

**Priežastis:** `cors.ts domainMatches()` lygina request Origin host su DB `feedback_clients.domain`. Mismatch → 403 `origin_not_allowed` → widget "Network issue". Pamoka: **registruoti klientą TIK po to, kai žinomas tikrasis deploy URL** — kitaip reikia DB update ciklo. Arisa pavyzdys naudoja 2 client_id (canonical + Vercel preview) multi-domain atvejui; UAB Subdoma kol kas turi tik vieną Vercel domeną, todėl vienas client_id pakanka.

**Alternatyvos:** Multi-domain setup (2 client_id) — nereikalingas, kol klientas neturi custom domeno. Pridėti, kai bus DNS swap.
