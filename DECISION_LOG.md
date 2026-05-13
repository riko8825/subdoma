# DECISION_LOG — UAB Subdoma

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
