# Atsou Paul LOLO — Portfolio (Data · Marketing Ops · BI)

Static site in plain HTML / CSS / JavaScript. No framework, no build step, no backend — it can be deployed on Netlify as is.

## File structure

```
paul-lolo-portfolio/
├── index.html            ← page structure: Home, About, Skills, section titles, Contact, SEO tags
├── 404.html              ← "page not found"
├── css/style.css         ← all styling (colours at the top, in :root)
├── js/
│   ├── data.js           ← ✏️ CONTENT: projects, dashboards, marketing ops, experience  (edit this one most often)
│   ├── charts.js         ← built-in dashboard demos (fictitious data)
│   └── main.js           ← behaviour: menu, terminal, cards, dialog, filters
├── assets/
│   ├── favicon.svg
│   ├── og-image.png      ← image shown when the link is shared (LinkedIn, WhatsApp…)
│   └── dashboards/       ← put dashboard screenshots here
├── netlify.toml          ← Netlify config (publish folder + headers)
├── robots.txt / sitemap.xml
└── README.md
```

## Preview locally

Double-click `index.html`, or for a closer-to-production preview:

```bash
cd paul-lolo-portfolio
python3 -m http.server 8000     # then open http://localhost:8000
```

## Deploy on Netlify

**Option A — drag & drop (fastest, no account setup beyond sign-up)**
1. Log in at https://app.netlify.com
2. *Sites → Add new site → Deploy manually*.
3. Drag the whole `paul-lolo-portfolio` folder (not the .zip) into the drop zone.
4. Netlify gives a URL such as `random-name-123.netlify.app`. Rename it in *Site configuration → Change site name* (e.g. `paul-lolo`).

To update later: *Deploys* tab → drag the folder again.

**Option B — via GitHub (recommended for frequent updates)**
1. Push the folder to a GitHub repository (e.g. `lolopaul208/portfolio`).
2. Netlify: *Add new site → Import an existing project → GitHub* → choose the repo.
3. Build command: *(leave empty)* — Publish directory: `.`
4. Every `git push` redeploys automatically.

**After the first deploy — update the site URL.** The SEO/Open Graph tags assume `https://paul-lolo.netlify.app/`. If the final address differs (or you add a custom domain), replace that URL in:
- `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`)
- `robots.txt` and `sitemap.xml`

## Editing content

All projects, dashboards and experiences live in **`js/data.js`**. Edit the text between quotes, keep the commas between items.

### Add a project
Copy a block in `projects: [ … ]` and change the fields:
```js
{
  id: "my-new-project",              // unique, no spaces
  name: "Project name",
  type: "Personal project",          // or "Entrepreneurial project", "Academic project"
  tagline: "One-line summary",
  description: "2–3 sentences.",
  focus: ["What I did #1", "What I did #2"],
  skills: ["SQL", "Power BI"],
  links: [{ label: "View on GitHub", url: "https://…" }],
  accent: "cyan"                     // cyan | blue | violet (card colour)
},
```

### Edit the Marketing Ops section
Cards live in `marketingOps: [ … ]` in `js/data.js` (title, text, tasks, tools, optional `usedOn` for the projects where the skill was applied). Icons available: `search`, `ads`, `console`, `plausible`, `tracking`, `crm`. The 4-step workflow (Audit → Track → Optimize → Report) is in `index.html` under `id="marketing-ops"`.

### Add an experience
Add a block at the top of `experience: [ … ]` (most recent first). `current: true` highlights the dot in the timeline.

### Texts in About / Skills / Contact
Edit directly in `index.html` (search for the section, e.g. `id="about"`).

## Adding dashboards & screenshots

Each dashboard is a block in `dashboards: [ … ]` in `js/data.js`.

1. **Export the screenshot** from Power BI / Tableau (PNG or JPG, ideally 1600×1000 px, under ~400 KB — compress on https://squoosh.app if needed).
2. **Check confidentiality** (see below), then save it in `assets/dashboards/`, e.g. `assets/dashboards/crm-churn.png`. Use lowercase names without spaces.
3. **Add a block** in `js/data.js`:
```js
{
  id: "pbi-crm-churn",
  title: "CRM Churn Analysis",
  tool: "Power BI",                               // "Power BI", "Tableau" or "Python" (used by the filter buttons)
  dataStatus: "Anonymized data",                  // see list below — always fill this in
  demo: null,
  image: "assets/dashboards/crm-churn.png",       // screenshot shown on the card
  githubUrl: null,                                // e.g. "https://github.com/lolopaul208/my-analysis"
  tableauPublicUrl: null,                         // e.g. "https://public.tableau.com/app/profile/…"
  powerBiUrl: null,                               // e.g. a "Publish to web" link
  embedUrl: null,                                 // optional: interactive embed shown inside the case study
  problem: "The business question the dashboard answers.",
  data: "Which data, what period, how it was prepared.",
  kpis: ["Churn rate", "Customer lifetime value"],
  insights: ["Takeaway #1", "Recommendation #2"]
},
```
4. Save, preview, redeploy.

- A card shows the **screenshot** if `image` is set, otherwise the **built-in demo** (`demo: "sales"` or `"marketing"`), otherwise a "Preview coming soon" placeholder.
- **Tableau Public embed:** on Tableau Public, *Share → Embed code*, take the URL in the `src`/`name` attribute and add `?:showVizHome=no&:embed=true`, put it in `embedUrl`.
- **Power BI:** only *Publish to web* links are publicly viewable — never publish a report containing company data that way.

### Confidentiality rules (`dataStatus`)
Use exactly one of:
| Label | When |
|---|---|
| `Public data (Kaggle)` | Open dataset used as is (cite the source) |
| `Fictitious data` | Data invented for the demo |
| `Anonymized data` | Real structure, but names / identifiers / amounts masked or scaled |
| `Reconstructed from public data` | Rebuilt from open datasets (data.gouv.fr, Kaggle…) |
| `Real data (authorized)` | Only with written permission from the data owner |

Before publishing a screenshot of work done for an employer or client (Danone, Keyrus, freelance clients…): remove logos, client names, real figures and file paths, or rebuild the dashboard on fictitious data with the same design. When in doubt, ask the manager.

> The two built-in demos (Power BI commercial dashboard and Tableau marketing dashboard) are drawn in the browser by `js/charts.js` with **fictitious figures**, labelled as such on the card and in the case study. Once real screenshots exist, set `image` on those blocks (or replace them).

## Changing colours / fonts
At the top of `css/style.css`, the `:root` block holds every colour (`--blue`, `--cyan`, `--bg`…) and the three fonts (Space Grotesk, Inter, JetBrains Mono, loaded from Google Fonts in `index.html`).

## Before going live — checklist
- [ ] Re-read all texts (About, project descriptions, experience titles) and adjust wording
- [ ] Confirm the site URL and update SEO tags (see Deploy section)
- [ ] Test every external link (projects, LinkedIn, email)
- [ ] Check on a phone
