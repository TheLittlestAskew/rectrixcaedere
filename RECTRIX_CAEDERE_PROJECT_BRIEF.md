# RECTRIX CAEDERE — Dashboard Project Brief

## What This Is

Rectrix Caedere is a D&D roll statistics dashboard at **rectrixcaedere.com**, hosted via GitHub Pages from the `TheLittlestAskew/rectrixcaedere` repo. It visualizes dice roll data from multiple D&D Beyond campaigns, pulled from a Supabase backend (project: SystemHorizon, ID: `vtrtyagltwdrbastpppl`).

The dashboard has a strong, intentional brand identity — a dark celestial botanical tarot aesthetic — and the visual treatment is as important as the data. This is not a generic dashboard. It should feel like a premium oracle artifact: mystical, feminine, literary, strategic, and high-end.

## Owner

Taylor Ritchie (GitHub: TheLittlestAskew). Taylor has ADHD — keep instructions concrete, break large tasks into steps, and don't leave ambiguous loose ends.

## Repo Structure (current)

```
TheLittlestAskew/rectrixcaedere/
├── index.html          # HTML shell — all CSS lives here
├── app.js              # All React components, data, chart configs
├── tokens.css          # Design token system (CSS custom properties)
├── .design/            # Design reference files
├── CNAME               # rectrixcaedere.com
├── README.md
└── _placeholder.md     # cleanup artifact, can be deleted
```

## Tech Stack

- **React 18.2.0** via CDN (UMD build from cdnjs)
- **Recharts 2.12.7** via CDN (UMD build from unpkg — NOT v3.x, which is incompatible with React 18 UMD)
- **Pure `React.createElement`** calls — no JSX, no build step, no bundler
- **All CSS is vanilla** — no Tailwind, no preprocessors
- **GitHub Pages** deployment from `main` branch
- **Google Fonts** loaded via CDN link tag
- **Single-page app** — sidebar navigation is structural but only Overview page exists currently

### Critical CDN Constraint

Recharts 3.x does NOT work with React 18 loaded as a CDN UMD script. It throws a `ForwardRef` error. The working combination is:
```
React 18.2.0 from cdnjs + Recharts 2.12.7 from unpkg
```
Do not upgrade Recharts without testing the UMD compatibility. If React is upgraded to 19+, Recharts 3.x may become viable.

### File Size Constraint

The GitHub MCP `push_files` tool truncates content over ~15KB when passed inline. The site is split into `index.html` (~11KB CSS/shell) + `app.js` (~15KB React code) specifically to work around this. If either file grows beyond ~15KB, it will need to be split further or pushed via a different method (direct API, git clone+push, etc.).

## Data Architecture

### Current: Hardcoded

Campaign data is currently hardcoded in `app.js` as a JavaScript array. Four campaigns:

| Campaign | ID | Status | Rolls | Sessions |
|---|---|---|---|---|
| Sky Is The Limit (SITL) | 1 | active | 946 | 15 |
| Pacts & Power (P&P) | 2 | active | 2,907 | 72 |
| Ashfall Britannia (AFB) | 3 | active | 855 | 8 |
| Where the Flowers Forget (WTFF) | 4 | active | 0 | 0 |

### Future: Live Supabase

The data will eventually be fetched live from Supabase at runtime. Connection details:
- **Project URL:** `https://vtrtyagltwdrbastpppl.supabase.co`
- **Anon key:** available in `ddb_sync_supabase.js` in the SITL project knowledge
- **Primary view:** `sitl_session_rolls` (pre-filtered to SITL, includes `session_date` in ET)
- **Raw table:** `ddb_rolls` joined with `ddb_campaigns` for cross-campaign queries
- **Roll data schema:** Each row = one roll. Columns include `character`, `action`, `roll_type`, `roll_kind`, `total`, `individual_values` (JSONB), `timestamp_iso`, `roll_id` (links related rolls like to-hit + damage)

The sync script (`ddb_sync_supabase.js`) runs manually in a browser console to pull new rolls from D&D Beyond's API into Supabase.

## Brand System — CRITICAL

This is not optional styling. The brand is the product. Every element must feel like it belongs in a dark celestial botanical tarot system.

### Core Aesthetic

"Dark celestial botanical tarot with Art Nouveau framing, antique naturalist illustration, literary occult symbolism, and premium feminine strategy-brand energy."

**The strongest through-line:** beauty as ritual, growth as strategy, and softness with a blade hidden inside it.

### Color Palette

**Dark Ground (backgrounds):**
| Token | Hex | Use |
|---|---|---|
| `--bg-void` | `#050A0E` | Deepest background, near-black |
| `--bg-card` | `#0E1820` | Main card/surface background |
| `--bg-card-inner` | `#0B1219` | Inner panels |

**Gold Metallic System (the skeleton of the brand):**
| Token | Hex | Use |
|---|---|---|
| `--gold-dark` | `#68442F` | Lowlight metallic, shadows |
| `--gold-mid` | `#8C5D3F` | Primary gold linework |
| `--gold` | `#C7A369` | Main product gold |
| `--gold-bright` | `#DA9565` | Highlight gold |
| `--gold-pale` | `#E8C690` | Light text accent |

**For borders/linework, the best pairing is:**
- Base line: `#8C5D3F`
- Highlight: `#DA9565`
- Shadow: `#68442F`

**Semantic colors:**
| Token | Hex | Use |
|---|---|---|
| `--success` | `#4A9E6E` | Natural 20s, positive |
| `--danger` | `#B44A4A` | Natural 1s, negative |
| `--info` | `#6B8AAD` | Informational, to-hit |
| `--mystic` | `#8B6BB5` | Purple accent |
| `--warn` | `#D4943A` | Amber accent |

### Typography

| Role | Family | Weight | Use |
|---|---|---|---|
| Display titles | Cinzel | 400–700 | Campaign names, section headers |
| Ornate display | Cinzel Decorative | 400, 700 | "RECTRIX CAEDERE" header only |
| Body text | Raleway | 300–700 | All body copy, descriptions |
| Labels/small caps | Alegreya Sans SC | 400–700 | Stat labels, meta text, nav items |
| Serif/italic | EB Garamond | 400–600, italic | Subtitles, chart descriptions, taglines |

### Visual DNA

| Element | Rule |
|---|---|
| Background | Dark navy, textured (subtle grain overlay), never flat black |
| Borders | Thin antique gold lines, double-border inner glow |
| Corner flourishes | SVG paths with leaf/botanical details, always at 20–30% opacity |
| Celestial dividers | Moon + diamond stars + connecting lines between sections |
| Stat card interiors | Ghost SVG illustrations at 4% opacity (star, clock, person shapes) |
| Panel hover | Lift + gold glow shadow |
| Animations | Subtle fadeUp on load, staggered delays |
| Grain | Fixed noise overlay at 3.5% opacity, mix-blend-mode: overlay |

### Design Hierarchy (from Brand Guide)

- **Level 1 (Clean):** Logo, sidebar, nav — minimal, high contrast, strong silhouette
- **Level 2 (Decorative):** Card panels, stat cards, headers — ornate but structured, gold frame + celestial accents
- **Level 3 (Full illustration):** Future card designs, detailed symbolic compositions
- **Level 4 (Backgrounds):** Textures, subtle stars, botanical corners, gold overlays — quiet, reusable

### What NOT to Do

- No neon colors, glossy 3D effects, or cartoon outlines
- No generic "dark dashboard" styling (Inter font, purple gradient, rounded cards)
- No uniformly perfect vector lines — the gold should feel aged, coppery, printed
- No bright white backgrounds
- No clutter — "let the symbol be simple, let the frame carry the magic"
- Gold should never look yellow — always copper/amber warmth

## Design Target

The aspirational design target is the ChatGPT mockup image (available in project knowledge as `ChatGPT_Image_May_25__2026__12_31_39_PM.png`). Key features from the mockup that the live site should approach:

1. **Ornate header bar** with "RECTRIX CAEDERE" in Cinzel Decorative, flanked by blade logos and celestial icon buttons
2. **Stat cards with illustrated interiors** — botanical/celestial illustrations inside each card (lotus, moon, snake, flowers at low opacity)
3. **Elaborate double-line corner flourishes** with leaf/vine details on every panel
4. **Stronger gold border glow** — visible accent line at top of every panel
5. **Rich celestial ornament** — crescent moons, star shapes, botanical curves between sections
6. **Warm gold atmosphere** — more gold tones bleeding through via gradients and border glow

The mockup is AI-generated concept art and cannot be literally replicated in HTML/CSS. The goal is to capture the *energy and density* of the ornament, not pixel-match it.

## Current Page: Campaign Overview

The only built page so far. It shows:
- Left sidebar with blade logo, campaign switcher, and nav links
- Top header bar with title and celestial icon buttons
- Campaign name + metadata (sessions, characters, total rolls)
- Timeline bar (first roll date → last roll date with duration)
- Celestial divider
- 5 stat cards: Total Rolls, Sessions, Characters, Natural 20s, Natural 1s
- Full-width area chart: Rolls per Session (or Rolls by Quarter for P&P)
- Two-column row: Roll Type Breakdown (donut chart) + Action Categories (horizontal bar chart)
- Footer with ornamental divider

Clicking campaign names in the sidebar switches all data. WTFF (4) is active and clickable; its roll/session counts read 0 until the DDB roll archive is wired (game_id 7853407).

## Planned Pages (Not Yet Built)

| Page | Purpose |
|---|---|
| Characters | Per-character roll breakdowns, hit rates, damage averages |
| Combat | Encounter analysis, attack/damage distributions, initiative patterns |
| Skills & Spells | Skill check success rates, spell usage frequency |
| Luck & Trends | d20 distribution, natural 20/1 streaks, hot/cold analysis |
| Session Explorer | Drill into individual sessions, chronological roll timeline |

## Known Issues / Tech Debt

1. **Data is hardcoded** — needs Supabase integration for live data
2. **`_placeholder.md`** in repo — leftover from a push workaround, can be deleted
3. **No responsive testing** — mobile breakpoints exist in CSS but haven't been verified
4. **Sidebar nav links are decorative** — only "Overview" is highlighted, other pages don't exist yet
5. **Chart tooltips** use custom components but haven't been thoroughly tested across all campaigns
6. **P&P quarterly aggregation** — the quarterly grouping is hardcoded, should be computed from raw data once Supabase is connected

## Working With This Project

### To push changes:
Split changes across `index.html` (CSS/shell) and `app.js` (components/data). Keep each file under ~15KB to avoid GitHub MCP truncation. Push both files in a single `push_files` commit.

### To test locally:
Open `index.html` in a browser. All dependencies are CDN-loaded, so it works without a server (though some browsers may block cross-origin font loading from file://).

### To verify deployment:
After pushing, wait 2–5 minutes for GitHub Pages to rebuild. Hard refresh (Ctrl+Shift+R) to bypass cache.

### Design iteration workflow:
1. Make changes locally or in an artifact
2. Verify the CDN scripts load (React, ReactDOM, Recharts)
3. Push to GitHub
4. Verify on rectrixcaedere.com
5. Compare against the mockup image and brand guide
