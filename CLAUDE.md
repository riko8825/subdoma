# CLAUDE.md — UAB Subdoma

> **Track:** Landing (€200–€800) · **Generated:** 2026-05-13 · **Intake submission:** `0f220984-3481-49f6-b44c-c34cb60135be`

## PROJECT
**Name:** UAB Subdoma
**Slug:** `uab-subdoma-330c`
**Client email:** info.projekturengimas@gmail.com
**Tagline:** Projektų rengimas ir apskaita ūkininkams

## BRAND
- **Primary color:** `#C6A96B`
- **Background:** `#0B0B0C`
- **Tone of voice:** Professional
- **Languages:** Lietuvių, Anglų, Rusų

## TECH STACK (Landing — biudžetinis)
- **Frontend:** HTML / CSS / JS (vanilla, no framework)
- **Hosting:** Vercel (static deploy, free tier)
- **Forms:** Formspree arba Cal.com booking widget
- **Domain:** Klientas pateikė savo arba Empirra subdomain

**NĖRA:**
- Edge Functions / serverless (Landing — pure static)
- Database (Supabase) — neprijungta
- AI automatizacijų — nenaudojama Landing track'e
- E-commerce — neprijungta

## SCOPE
- 1–3 puslapiai (žr. intake `pages_count` answer)
- Empirra šablonas + brand customization
- 5–10 darbo dienų terminas (default)
- Mobile-first, Core Web Vitals must pass

## STRUCTURE
```
uab-subdoma-330c/
├── CLAUDE.md              ← šis failas
├── README.md              ← setup + deploy instrukcijos
├── .gitignore
├── .env.example           ← (jei reikia env vars)
├── package.json
├── vercel.json            ← Vercel static deploy config
├── public/
│   └── styles.css         ← compiled CSS (sync iš src/css/)
└── src/
    ├── pages/
    │   └── index.html     ← starter HTML su brand colors
    ├── css/
    │   └── styles.css     ← source CSS
    └── js/
        └── main.js
```

## DEPLOYMENT

### Vercel setup
1. `gh repo create uab-subdoma-330c --private --source=. --remote=origin --push`
2. Vercel Dashboard → Import GitHub repo
3. Framework Preset: **Other** (static HTML)
4. Build command: (palik tuščia)
5. Output dir: (palik tuščia — root)
6. Deploy → gausi `uab-subdoma-330c.vercel.app`

### Custom domain (jei klientas turi)
1. Vercel → Project → Settings → Domains → Add
2. Klientas DNS'e: CNAME `cname.vercel-dns.com`
3. Auto-SSL per ~24h

## WORKFLOW

```
1. Skaityk klienta atsakymus → intake submission 0f220984-3481-49f6-b44c-c34cb60135be
2. Edit src/pages/index.html (turinys iš `offer`, `target_audience` answer)
3. Edit src/css/styles.css (brand colors #C6A96B + #0B0B0C)
4. Sync:
   cp src/pages/index.html ./index.html
   cp src/css/styles.css public/styles.css
   cp src/js/main.js public/main.js
5. git add . && git commit -m "<msg>" && git push
6. Verify Vercel deploy (auto-trigger po push)
7. Klientui send'inti staging URL → approval
8. Production deploy + DNS swap (jei custom domain)
```

## EMPIRRA FEEDBACK INTEGRATION

**Client ID:** `31f5d3de-a0a7-4969-8a1d-13859171e3ff`
**API:** https://empirra-feedback.vercel.app
**Widget admin:** https://empirra-feedback.vercel.app/admin

Widget įdiegtas visuose 6 HTML failuose (LT/EN/RU × root+src) prieš `</body>`.
Klientas live svetainėje per floating mygtuką (apačioje dešinėje) palieka pastabas + screenshot.

Kai vartotojas paleidžia `/feedback UAB Subdoma` — Claude pull'ina pending items
iš `GET /api/agent?action=pending&client_id=31f5d3de-...` ir taiso šio repo failus.

**Commit format (PRIVALOMA):** kiekvienas fix'as commit'inamas su footer'iu:

```
fix: <comment summary>

feedback-id: <UUID>
```

Po `git push` — `/feedback UAB Subdoma` automatiškai paskambina
`POST /api/agent?action=batch-resolve` ir item statusą atnaujina į `resolved`.

**Skill reads:** `~/.claude/skills/feedback/clients.json` (key = `"UAB Subdoma"`).

## CONTACT
- Empirra: hello@empirra.com
- Klientas: info.projekturengimas@gmail.com

## NEVER
- Pridėti AI automatizacijų (Landing track scope'e nėra)
- Pridėti e-commerce (Landing track scope'e nėra)
- Naudoti React / Vue / Next.js (Landing = vanilla HTML/CSS/JS)
- Inline `<style>` arba `<script>` HTML'e
- Commit'inti `.env` failo
