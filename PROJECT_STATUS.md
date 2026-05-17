# PROJECT_STATUS — UAB Subdoma

> **Track:** Landing (€200–€800) · **Generated:** 2026-05-13 · **Premium tier rebuild:** 2026-05-13 · **UX + SEO/GEO iteracija:** 2026-05-14 · **Feedback OS + Vercel deploy:** 2026-05-14 · **Logo + cursor removal + priemonės 07/08:** 2026-05-16 · **Footer credit + WhatsApp FAB + Silktide consent + privatumo politika:** 2026-05-17 · **EN/RU pilna UI sync + footer centravimas (#06):** 2026-05-17 · **Frontend polish a11y/LCP (#07):** 2026-05-17 · **Social sameAs schema.org (#08):** 2026-05-17

## Modulių matrica

| # | Modulis | Statusas | Detalės |
|---|---------|----------|---------|
| 01 | LT pagrindinis puslapis | ✅ Production | 14 sekcijų (+ FAQ), sticky CTA bar, service filter, hero panel, GSAP, schema, **8 priemonės** (06→08), tikras logo, **be custom cursor**, **footer "Sukūrė Empirra" credit (#05)**, **WhatsApp FAB (#05)**, **a11y polish (#07): skip link CSS klasė, faqAccordion aria-controls, serviceFilter aria-selected, LCP preload** |
| 02 | EN puslapis | ✅ Production | `/en/` UI-paritetiškas su LT po **#06 sync** (hero panel, filter, FAQ, sticky action-bar, priemonės 07/08). **#07 polish:** skip-to-content link "Skip to content", LCP preload, perteklinis ARIA cleanup, footer privacy link su hreflang=lt. **#08:** schema.org `sameAs` 4 URL (LinkedIn/TikTok/IG/YT). **Schema.org dar nepilnas** (LT turi FAQPage/Service/hasOfferCatalog, EN ne) — SEO desync |
| 03 | RU puslapis | ✅ Production | `/ru/` UI-paritetiškas su LT po **#06 sync**. **#07 polish:** skip-to-content link "Перейти к содержимому", LCP preload, perteklinis ARIA cleanup, footer privacy link su hreflang=lt. **#08:** schema.org `sameAs` 4 URL. **Schema.org dar nepilnas** (analogiška EN) |
| 04 | Premium CSS design system | ✅ Production | Gold + black, fluid typography, spacing optimizuotas (#02), filter/FAQ/action-bar stiliai, `.detail-list` nauja (#04), `.footer__credit` + `.wa-fab` + `.privacy` 239 eil (#05), **`.section-head--center` + `.eyebrow--center` + `.eyebrow--mb-lg` + `.visually-hidden` (#07)** — inline styles 0 |
| 05 | GSAP animacijos | ✅ Production | Trukmės sumažintos (#02), `transition: all` pašalintas, **custom cursor pašalintas (#04)** |
| 06 | Schema.org JSON-LD | ✅ Production | ProfessionalService + GeoCoordinates + areaServed + FAQPage + hasOfferCatalog (8 offers po #04). Privacy puslapyje — WebPage schema (#05). **#08: `sameAs` masyvas su 4 socialiniais tinklais (LinkedIn, TikTok, Instagram, YouTube) per LT/EN/RU root+src.** EN/RU vis dar trūksta FAQPage/Service/hasOfferCatalog (desync su LT) |
| 07 | sitemap.xml + robots.txt | ✅ Production | hreflang alternates, allow all, `/privatumas/` lastmod 2026-05-17 (#05) |
| 08 | content.json (3 lang) | ✅ Production | 714 lines, full LT/EN/RU (priemonės 07/08 dar nepridėtos į content.json). **Pastaba: privacy turinys content.json'e — pasenęs (fiktyvūs servisai); naujasis /privatumas/ puslapis perrašytas neproasidžiojant nuo content.json** |
| 09 | SEO/GEO on-page | ✅ Production | Title/meta/H2 keyword-optimized (#02), 3 primary + 8 secondary + 12 long-tail |
| 10 | Sticky action bar + FAQ + filter | ✅ Production | LT + **EN/RU po #06 sync**. WhatsApp FAB sync'ina `.is-lifted` su `.action-bar.is-visible` (#05). **#07: serviceFilter aria-selected dinamiškas, faqAccordion aria-controls + role=region runtime** |
| 11 | Calendly embed | ⚙️ Tested | Inline embed, lazy-loaded, live URL nepatikrintas |
| 12 | ~~Cookie bar~~ Senas cookie-bar PAŠALINTAS (#05) | — | Pakeistas Silktide Consent Manager (žr. #23) |
| 13 | Vercel live deploy | ✅ Production | `https://subdoma.vercel.app` — LT/EN/RU + assets HTTP 200. `vercel.json` outputDirectory: "." fix. **Commit `10c3328` push'inta (#05) — Vercel auto-deploy triggered, browser QA dar nepatikrintas** |
| 14 | `/privatumas/` puslapis | ✅ Production | **Sukurtas (#05)** — `privatumas/index.html` + `src/pages/privatumas/index.html`, 20 KB, 13 BDAR sekcijų LT. Perrašyta su realiais 3rd-party servisais (Vercel, Calendly, Google, WhatsApp/Meta, Cloudflare cdnjs, Empirra, Silktide). TOC nav, `[data-open-consent]` mygtukas reopen Silktide modal, VDAI nuoroda. EN/RU privacy — NĖRA |
| 15 | og-image.jpg | ⬜ Planned | HTML reference yra, failas nesukurtas. **Galimas šaltinis:** klientas atsiuntė logo.png (#04) |
| 16 | apple-touch-icon.png | ⬜ Planned | HTML reference yra, failas nesukurtas |
| 17 | Custom domain DNS | ⬜ Planned | Klientas neapsisprendė: Vercel subdomain vs custom |
| 18 | EN/RU native review | ⬜ Planned | Vertimai mano rankiniai, reikia native LT→EN, LT→RU review |
| 19 | Empirra Feedback OS integracija | ✅ Production | Widget embed 6 HTML + privacy puslapis (#05), client_id `31f5d3de-...`. **Widget screenshot scroll position bug ištaisytas (#04)** — `empirra-feedback` commit `976e319`, deployed |
| 20 | Logo (klientų brand mark) | ✅ Production | `public/logo.png` (originalas) + `public/logo-mark.png` (transparent hexagon ekstraktas via `scripts/process_logo.py`). Nav 3 lang × src + root + privacy, CSS gold filter. Wordmark "UAB" → "Subdoma" |
| 21 | Priemonės 07 + 08 | ✅ Production | LT: service-card + service-detail + Schema Offer. **EN/RU: service-card + service-detail įdiegti po #06 sync** (terminologija mano rankinis vertimas, native review pending) |
| 22 | Favicon | ⚠️ Senas | `public/favicon.svg` — gold circle + `S` raidė. Reikia perdaryti su nauja hexagon geometrija (logo style) |
| 23 | Silktide Consent Manager | ✅ Production | **Naujas (#05)** — vendor `silktide-consent-manager.js` (54 KB) + `.css` (12 KB) iš empirra.com + `consent-init.js` LT lokalizuotas (3 kategorijos: Būtini/Analitiniai/Rinkodaros). Google Consent Mode V2 default deny + GA4 placeholder. 6 HTML + privacy. Senas cookie-bar (#12) pašalintas |
| 24 | Footer "Sukūrė Empirra" credit | ✅ Production | **Naujas (#05)** — 6 HTML, lokalizuota 3 kalbomis (LT/EN/RU), `.footer__credit` gold link → empirra.com |
| 25 | WhatsApp FAB | ✅ Production | **Naujas (#05)** — 6 HTML + privacy. `https://wa.me/37067508128`. 56×56 (52×52 mobile), gold ring, env(safe-area-inset-bottom), `.is-lifted` sync su action-bar, CSS-only gold pulse |

## Statuso reikšmės

- ✅ **Production** — gyvai veikia, patikrinta
- ⚙️ **Tested** — veikia lokaliai, production nepatikrintas
- 🔨 **In Build** — kuriama dabar
- ⬜ **Planned** — suplanuota, nepradėta
- ⚠️ **Blocked** — blokuotas išorinio veiksnio
- ⚠️ **Nepatikrintas / Desync** — turi būti production, bet nepatikrintas / nesinchronizuotas

## Blockers

1. **Browser QA carry-over 3 sesijų** (#05, #06, #07) — visi sprendimai patikrinti tik per `curl` + `grep` smoke testus. Faktinis vizualinis verify per `https://subdoma.vercel.app` nepadarytas. Šiuo metu nežinoma ar viskas tikrai veikia naršyklėje (Tab key skip link reveal, filter aria-selected, FAQ aria-controls runtime, LCP preload impact).
2. **~~EN/RU desync~~** ✅ **IŠSPRĘSTA (#06)** — UI-paritetinis su LT. **Lieka:** schema.org desync (LT turi FAQPage/Service/hasOfferCatalog, EN/RU ne), native review (terminologija mano rankinė), EN/RU privatumas puslapio NĖRA (hreflang=lt nuoroda į LT).
3. **Schema placeholder reikšmės** (carry-over #02) — `aggregateRating 4.9/100` + `postalCode 08105`. Fake rating = Google structured data policy rizika. Reikia kliento input.
4. **~~`/privatumas/` 404~~** ✅ **IŠSPRĘSTA (#05)** — naujas LT puslapis sukurtas su 13 BDAR sekcijų.
5. **og-image.jpg 404** (carry-over #02) — social share preview fail. Klientas atsiuntė `public/logo.png` (#04) — galimas šaltinis perscale + tekstas
6. **GA4 Measurement ID NĖRA** (naujas #05) — Consent Mode V2 default'ai įdiegti, bet realaus gtag config nėra. Klientas turės pateikti ID, kad analytics pradėtų veikti. Placeholder `G-XXXXXXXXXX` komentare visuose 6 HTML + privacy.

## Known issues

- **Browser QA po #05 darbo NEATLIKTAS** — footer credit, WhatsApp FAB (lift logic, hover, pulse), Silktide banner (load, click handlers, gtag consent update), privacy puslapis (TOC anchor offset, "Slapukų nustatymai" mygtuko Silktide modal fallback chain) — visi tik per `curl` + `grep` smoke testai.
- **Silktide `[data-open-consent]` mygtuko fallback grandinė nepatestuota** (#05) — `consentReopen()` bandys `.silktide-cookie-icon` selector → `getInstance().toggleModal(true)` → `createModal()`. Jei Silktide v2 cookie icon selector kitokios klasės, fallback'as turi gražiai sugauti, bet reikia live test.
- **content.json privacy turinys pasenęs (#05)** — content.json'e mini Webflow/MailerLite/Telegram/TikTok/LinkedIn (fiktyvūs servisai). Naujasis `/privatumas/` puslapis NEšiautas iš content.json — perrašytas su realiais servisais. **Jei kitas dev'as bandys regenerate'inti iš content.json — gaus pasenusį turinį.** TODO: atnaujinti content.json privacy sekcijas arba pažymėti kaip deprecated.
- **Image.png untracked** (#05) — 666×82 PNG (618 B) liko repo root'e, neaiški kilmė. Ne commit'inta. Reikia ištrinti arba ignore'inti.
- **Browser test po #04 darbo neatliktas** — logo (gold spalva, geometrija), cursor pašalinimas, priemonės 07/08 — visi tik per `curl` + dev server. Faktinis vizualinis QA per `https://subdoma.vercel.app` po deploy nepadarytas.
- **Widget naršyklės submit nepatikrintas** (iš #03) — bet dabar widget bug ištaisytas (#04, `empirra-feedback` commit `976e319`). Reikia re-test su nauja widget versija (5 min CDN cache TTL po deploy).
- **iter 2 bug fix neverifikuotas** (carry-over #02) — "rezultato" teksto fix (split-word overflow:visible) + lag fix — nepatvirtinti vizualiai naršyklėje
- **~~Inline `style` atributai~~** ✅ **IŠSPRĘSTA (#07)** — visi `style="margin-inline:auto"`, `style="justify-content:center"`, `style="position:absolute"` pakeisti į CSS klases (`.section-head--center`, `.eyebrow--center`, `.eyebrow--mb-lg`, `.visually-hidden`). Verify: grep 0 matches.
- **Hero H1 LT 73 char** (carry-over #02) — virš 60ch SEO recommended threshold
- **Service-card tilt + magnetic** (carry-over #02) — `mousemove` × 6 cards be RAF throttling, galimas lag šaltinis
- **Force-push'as perrašė `8d44aa3`** (carry-over #01) — neaiškus to commit'o kontekstas
- **Widget įdiegtas į desync EN/RU** — `en/index.html` + `ru/index.html` turi widget snippet, bet patys puslapiai vis tiek nesinchronizuoti su LT
- **content.json desync** — priemonės 07 + 08 pridėtos HTML, bet **NE** content.json. EN/RU sync metu reikės manualiai vertimą rašyti, ne kopijuoti iš content.json
- **Favicon dar senas** (#04) — `public/favicon.svg` rodo gold circle + `S`, ne naują hexagon mark
