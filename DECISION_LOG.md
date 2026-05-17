# DECISION_LOG — UAB Subdoma

## 2026-05-17 — Sesija #09: MailerLite, social icons, custom domain, nav refinements

### D-019: MailerLite Universal kraunamas TIK po Silktide `advertising` consent

**Sprendimas:** `assets.mailerlite.com/js/universal.js` NĖRA `<head>` arba `<body>` HTML statiškai. Vietoj to — `window.loadMailerLite()` funkcija `public/main.js`, kuri `consent-init.js` `advertising.onAccept` callback'e dinamiškai injectuoja `<script>` į DOM.

**Kontekstas:** MailerLite Universal nustato 1st-party + 3rd-party cookies tracking'ui (subscriber attribution, form analytics). GDPR LT/EU rinkoje toks tracking reikalauja **explicit opt-in** prieš krovinant script'ą. Default Silktide consent state — `advertising: false` (Consent Mode V2 default deny).

**Alternatyvos atmestos:**
- **Statiškai `<head>`** — pažeistų GDPR. Cookiebot scan'as flagintų kaip violation. Klientas (LT ūkininkų rinkoje) atsidurtų rizikoje gauti VDAI patikrą.
- **Tik per `defer` su consent check po DOMContentLoaded** — script'as vis tiek nukristų į HTML, vartotojas matytų request'us iki click'o. Nepilna privacy compliance.
- **Per Google Tag Manager** — papildomas GTM dependency, overhead. Klientas neturi GTM container'io.

**Pagrindimas:** Idempotent loader (`window.__mlLoaded` guard) — safe call multiple times. Forma iki consent'o rodo aiškų fallback su `<a data-open-consent>` link'u į Silktide preferences modal — vartotojas mato KODĖL formos nėra ir kaip ją įjungti. Po consent — `loadMailerLite()` pašalina `.newsletter__fallback` ir Embed div'as render'inasi.

**Trade-off:** Vartotojai, kurie atmetė marketing cookies, NEMATO formos UI (tik fallback). Trade-off už GDPR compliance + Cookiebot scan clean rating.

---

### D-020: MailerLite styling — MailerLite dashboard editor, NE CSS override svetainėje

**Sprendimas:** Branding (gold #C6A96B mygtukas, dark #1A1A1F card, Cormorant heading, Open Sans body) sukonfigūruotas MailerLite Forms editor'iuje (Form ID 50EEhc settings). Svetainės CSS pridėjau tik 5 wrapper taisykles (`.newsletter__grid`, `.newsletter__form`, `.newsletter__fallback`). Inicialiai parašiau 60+ eilučių `.newsletter__form .ml-form-embedContainer ... !important` override — pašalinau po editor styling.

**Kontekstas:** MailerLite default form (Open Sans / juodas tekstas / pilkas mygtukas) NESUDERINTAS su Subdoma brandinga (Cormorant serif / off-white / gold). Reikėjo pasirinkti: stilizuoti per CSS override `!important` arba per native editor.

**Alternatyvos atmestos:**
- **CSS override `!important`** (60 eilučių) — atrodė gerai svetainėje, bet:
  - MailerLite preview link'as (`preview.mailerlite.io/...`) rodė default styling
  - Jei klientas vėliau įjungs MailerLite pop-up'us, jie atrodytų default — desync
  - `!important` paskolina specificity wars
  - Sunkiau debug'inti, jei MailerLite pakeis class names
- **Iframe (su sandbox styling)** — MailerLite nepalaiko iframe embed'o native'iškai

**Pagrindimas:** Single source of truth — MailerLite dashboard. Vienas style across embed, pop-up, preview URLs. CSS svetainėje liko švarus (~30 eilučių `.newsletter*` klasės) — tik wrapper'io spacing/layout, ne form internals.

**Trade-off:** Klientas (Gintarė) turi MailerLite paskyrą. Jei kažkas pakeis form ID arba sukurs naują formą, reikės dar kartą sukonfigūruoti styling editor'iuje (~10 min). Ne developer task.

---

### D-021: Custom domain — `www.subdoma-projektai.lt` production + apex 307 redirect, NE atvirkščiai

**Sprendimas:** Vercel projekte `www.subdoma-projektai.lt` pažymėtas kaip **production**, apex `subdoma-projektai.lt` daro **307 Temporary Redirect → www**. DNS Hostinger'yje: `A @ → 216.198.79.1` + `CNAME www → 8982ba0e0037c787.vercel-dns-017.com`.

**Kontekstas:** Klientė turi Hostinger'yje registruotą `subdoma-projektai.lt` (galioja iki 2027-12-24). DNS dar rodė į senus Webflow records (A 198.202.211.1, CNAME cdn.webflow.com). Reikėjo pasirinkti — apex vs www kaip production canonical.

**Alternatyvos atmestos:**
- **Apex `subdoma-projektai.lt` production, www → apex redirect** — DNS lygmenyje apex domeną sunkiau scale'inti (negali padaryti CNAME ant apex per RFC, tik ALIAS/ANAME jei provider'is palaiko). Vercel rekomenduoja www production būtent dėl šito.
- **Be redirect'o, abu live** — duplicate content SEO penalty. Google indeksuotų abu URLs atskirai.
- **301 Permanent Redirect (vietoj 307)** — Vercel default 307. 301 būtų aggressive caching browser'iuose. 307 leidžia keisti production'į ateity be cache invalidation skausmo.

**Pagrindimas:** `www` subdomenas tradiciškai stabilesnis (CNAME flexible, lengviau migruoti DNS provider'ius), Vercel native recommendation, didžiosios LT svetainės (delfi.lt, vz.lt) naudoja tą patį patterną.

**Trade-off:** Vartotojai įvedę `subdoma-projektai.lt` browser'yje gauna 307 redirect (1 round-trip). Akceptuojama už ilgalaikę DNS stabilumą.

---

### D-022: Empirra Feedback widget pašalintas (NE deprecate)

**Sprendimas:** `<script src="https://empirra-feedback.vercel.app/widget.js" data-client="31f5d3de-...">` pilnai pašalintas iš visų 8 HTML failų. Klientė `clients.json` lieka (žr. `~/.claude/skills/feedback/clients.json`) — galima reaktyvuoti, bet HTML kode niekur neminima.

**Kontekstas:** Klientas (Gintarė) confirmavo svetainę galutinai. Feedback collection tool (skirtas dev-to-client communication) nebereikalingas production'e. Widget'as **showed** "Feedback" mygtuką su geltonu taško indicator'iumi apačioje kairėje — vizualus šiukšlinimas finished svetainei.

**Alternatyvos atmestos:**
- **Palikti widget'ą su `display: none`** — script vis tiek užkrautų (CSS nesvarbus), HTTP request'as išliktų. Performance hit be vertės.
- **Deprecate per data attribute (`data-disabled="true"`)** — widget'as šitokio flag nepalaiko, reikėtų widget code fork.
- **Conditional load based on env** — pridėtinis sudėtingumas paprastame statiniame projekte.

**Pagrindimas:** Static site = static deliverable. Klientui pristatant svetainę — viskas turi būti production-clean, jokio internal tooling matomai vietai.

**Trade-off:** Jei klientas vėliau pranešti naują problemą — niekur nebėra greito kanalo. Mitigation: klientas turi mūsų email/WhatsApp, ne urgent.

---

## 2026-05-17 — Sesija #05: footer credit, WhatsApp FAB, Silktide consent, privatumo politika

### D-011: Silktide Consent Manager, NE custom cookie banner ar Cookiebot SaaS

**Sprendimas:** Naudoti Silktide Consent Manager v2.0 (MIT OSS) kaip Empirra produkcijos stack'e, ne tęsti seno custom `localStorage` cookie-bar arba pereiti į komercinį Cookiebot/OneTrust SaaS.

**Konteksis:** User'is paprašė "tas pats ką Empirra turi su cookies". Subdoma turėjo savadarbį dviejų mygtukų bar'ą (Sutinku/Atmesti) be Google Consent Mode V2 integracijos — neatitiktų GDPR/EAA Consent Mode V2 reikalavimų, jei klientas vėliau pridės GA4.

**Alternatyvos atmestos:**
- **Cookiebot/OneTrust SaaS** — €€/mėn, vendor lock-in, neproporcinga Landing track'ui (€200–€800).
- **Custom rewrite su Consent Mode V2** — papildomas darbas, kuris jau parašytas Silktide. Nebūtų vienodumo su Empirra puslapiu.
- **Vien tik dabartinis localStorage bar** — neturi kategorijų, neperduoda signalo Google Consent Mode V2, GDPR audit fail.

**Pagrindimas:** Silktide yra production-tested ant empirra.com (su Consent Mode V2 callbacks tiek `gtag('consent', 'update', { analytics_storage })`, tiek advertising group'ėms). MIT licencija = saugu komerciniam naudojimui. Vendor failai self-hosted `public/` (53 KB JS + 12 KB CSS) — jokio external CDN dependency, niekas neegzistuoja kol vartotojas neapsilanko svetainėje.

**Trade-off:** +66 KB JS/CSS overhead virš plonio custom bar'o. Akceptuojama už GDPR atitiktį + būsimą GA4 integraciją.

---

### D-012: Privacy puslapio turinys perrašytas iš nulio, NE imituojant content.json

**Sprendimas:** Naujam `/privatumas/` puslapiui perrašyti turinį nuo nulio su REALIAIS šiandien naudojamais trečiosios šalies servisais. Content.json privacy sekcija liekti pasenusi (nepalikta, nedeprecate'inta — tik dokumentuota Known issues).

**Konteksis:** Sesijos #01 metu WebFetch'intas https://www.subdoma-projektai.lt/privacy → content.json privacy sekcija (484-668 eil.) minėjo Webflow (hosting), MailerLite (naujienlaiškiai), Telegram bot, TikTok, LinkedIn — **bet šiandieninis stack'as** = Vercel + Calendly + Empirra Feedback widget + Silktide + WhatsApp deep link + GSAP cdnjs. Naudoti content.json kaip yra → mintų servisai, kurių svetainė nenaudoja (GDPR audit fail rizika).

**Alternatyvos atmestos:**
- **Naudoti content.json be modifikacijų** — siūlyta `AskUserQuestion`'e su ⚠️ ženklu, user pasirinko "Perrašyti tiksliai". GDPR rizika per didelė.
- **Pirma atnaujinti content.json, paskui generate'inti HTML** — content.json yra build'as 3 kalbomis. Užtrūktų ~2x ilgiau, EN/RU vis tiek liks desync su LT (BLOCKER #1). Neproporcinga šios sesijos scope'ui.

**Pagrindimas:** GDPR atitiktis > content.json kanoniškumas. Privacy puslapis perskaitytas auditoriaus arba VDAI privalo aprašyti TIK realiai naudojamus servisus. Naujasis turinys (13 BDAR sekcijų) eksplicitiškai aprašo Vercel + Calendly + Google + WhatsApp/Meta + Cloudflare cdnjs + Empirra + Silktide ir kontretizuoja saugomus cookies (`silktideCookieChoices`, `empf_reporter_v1`).

**Pasekmė:** Content.json privacy sekcija dabar yra **stale**. Jei ateityje kuriamas `/en/privacy/` arba `/ru/privacy/` — NEšiautu iš content.json, perrašyti su realiais servisais. Pridėta Known issues įrašas, kad būsimi dev'ai (ir aš pats) tai matytų.

---

### D-013: WhatsApp FAB pakelimas (.is-lifted) sync per esamą actionBar() listener, ne atskirą MutationObserver

**Sprendimas:** WhatsApp FAB lift state'as (kai action-bar pasirodo) toggle'inamas tiesiogiai iš `actionBar()` scroll listener'io tame pačiame `if (shouldShow !== visible)` bloke, ne per atskirą `MutationObserver`.

**Konteksis:** Reikia, kad WhatsApp FAB (bottom-right, ~90px nuo apačios) nelįstų po sticky action-bar (apatinė juosta, ~60px tall, pasirodo po hero scroll). Du sprendimai: (a) FAB pats stebi action-bar `.is-visible` klasę per MutationObserver, (b) actionBar() funkcija toggle'ina abi klases iš karto.

**Alternatyvos atmestos:**
- **MutationObserver** — extra observer + node lookup + cleanup. Du atskiri callbacks, kurie keičia state. Decoupled, BET more complexity.
- **Atskiras scroll listener WhatsApp FAB'e** — duplicate scroll event handler, du atskiri threshold computations, race condition rizika.

**Pagrindimas:** `actionBar()` jau turi single source of truth dėl visibility (`visible` boolean + threshold). Pridedant 1 `if (fab) fab.classList.toggle(...)` eilutę — jokios papildomos sąnaudos, jokio decoupling overhead. Abu elementai keičiasi tame pačiame frame'e — vizualiai sync'rone. Kainos: tightly coupled, bet abu elementai gyvena tame pačiame `main.js` faile ir tarnauja tam pačiam UX tikslui (apatinė overlay zona).

**Trade-off:** Jei kada FAB veikia puslapyje BE action-bar (pvz. privacy puslapis — joks `#action-bar` elementas), `fab` constant'ą gauname, bet `bar` early-return'ina (`if (!bar) return;`) → FAB lieka default'inėje pozicijoje. ✅ Verifikuota privacy puslapyje.

---

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

**Sprendimas:** UAB Subdoma registruotas Feedback OS su vienu `client_id`. `add-client` įvedė `domain: www.subdoma-projektai.lt`, vėliau pataisyta į faktinį `subdoma.vercel.app` (Supabase row update).

**Priežastis:** `cors.ts domainMatches()` lygina request Origin host su DB `feedback_clients.domain`. Mismatch → 403 `origin_not_allowed` → widget "Network issue". Pamoka: **registruoti klientą TIK po to, kai žinomas tikrasis deploy URL** — kitaip reikia DB update ciklo. Arisa pavyzdys naudoja 2 client_id (canonical + Vercel preview) multi-domain atvejui; UAB Subdoma kol kas turi tik vieną Vercel domeną, todėl vienas client_id pakanka.

**Alternatyvos:** Multi-domain setup (2 client_id) — nereikalingas, kol klientas neturi custom domeno. Pridėti, kai bus DNS swap.
