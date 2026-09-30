# TOOLS — rectrixcaedere

> What this project uses and what for. Maintained by the handoff motion: whenever
> a tool is used here, add or bump its row.
> Types: `Skill` · `MCP` · `CLI` · `App` · `Service` · `Site` · `Library` · `Data` · `Task`
> A `~` before a date means inferred, not observed. `—` means unknown.

## Active

| Tool | Type | Used for | Access | Last used | Cost | Notes |
|---|---|---|---|---|---|---|
| **React** | Library | All dashboard components | CDN UMD, pinned **18.2.0** | 2026-08-31 | Free | 🛑 `React.createElement` only — no JSX, no build step |
| **Recharts** | Library | Every chart on the dashboard | CDN UMD, pinned **2.12.7** | 2026-08-31 | Free | 🛑 Do NOT upgrade — Recharts 3.x breaks with React 18 UMD |
| **prop-types** | Library | Required by the Recharts UMD build | CDN UMD | 2026-08-31 | Free | ⚠️ Script order React → ReactDOM → prop-types → Recharts. Missing it = black screen |
| **Supabase** | Service | `Rectrix_Caedere` — roll, session, and character data for all four campaigns | project `vtrtyagltwdrbastpppl` | 2026-09-30 | Free tier | Read direct from the browser in `app.js` and the per-campaign pages. 🛑 **`public_sessions` anon policy is `published = true`** — a row that exists is not a row the site can see, which is why S16–S19 are invisible despite having notes and audio |
| **Cloudflare R2** | Service | Serving the SITL session recordings the audio player streams | `pub-33596be843004e7282ae8a9069ae9b82.r2.dev/Recordings/sitl/` | 2026-09-29 | Free tier | `RECBASE` in `sky-is-the-limit/session.html`. ✅ **2026-09-29: keyed by SESSION NUMBER** (`S14.mp3`, `S25-pt1.mp3`), written by `sitl_vault/Workflows/scripts/r2_sync_recordings.mjs`. 🛑 **The old human-filename keys are retained as aliases — do not delete them**, links to them have been shared. ⚠️ **Public and unauthenticated**, filenames guessable; Taylor ruled 2026-09-29 to leave it public for now, but the audio is the source the DM's redacted medical detail came from. Revisit when the planned DM login lands |
| **public_session_panels** | Data | Per-panel session content the page renders; one row per panel, independently publishable | Supabase `vtrtyagltwdrbastpppl` | 2026-09-29 | Free tier | Written by `sitl_vault/Workflows/scripts/extract_session_panels.mjs` + `load_session_panels.mjs`. 🛑 Anon has **SELECT only**, and only when the panel AND its parent `public_sessions` row are both published. Writing needs the service role key, deliberately: the anon key is public in this site's source |
| **supabase-cutter** | MCP | Schema + query access to `Rectrix_Caedere` | local MCP server | 2026-09-30 | Free | 🛑 **PostgREST caps every REST response at 1000 rows and silently overrides a larger `limit=`** — check `Content-Range` and **page with `order=id.asc`**, or pages quietly under-count. ⚠️ `individual_values` comes back as a JSON **string** for some rows and a real **array** for others (574 of 2,087), so keep the `typeof v==='string'` guard before `JSON.parse`.|
| **claude-in-chrome** | MCP | Verifying what the live pages actually render | Chrome extension | 2026-09-15 | Free | 🛑 **Required for testing this site.** Every page builds its content client-side from GitHub + Supabase, so a static fetch returns only the loading shell or the stale hardcoded fallback and reads as a bug that isn't there. Serve the repo locally (`python -m http.server`) and load it in Chrome — absolute `/assets/` paths mean **serve from the repo root**, not the campaign folder |
| **chrome-devtools** | MCP | Driving the live pages in a real browser to verify a change rendered | `mcp__plugin_chrome-devtools-mcp` | 2026-09-30 | Free | 🛑 **Same standing requirement as `claude-in-chrome` below, different server** — this is the one actually used on 2026-09-30, so that row was deliberately NOT date-bumped. Pattern that worked: `python -m http.server` **from the repo root** (absolute `/assets/` and `/sky-is-the-limit/data/` paths need it), then `evaluate_script` to assert on the rendered DOM. 📌 **Assert on values, not on "it looks right"** — the private-vault break was invisible to a screenshot because `index.html` falls back to plausible baked-in numbers, and only comparing 25 sessions against the stale 15 proved it was live. `list_console_messages` is the cheap second check |
| **publish_site_assets.mjs** | CLI | Publishes the SITL session index, PC sheets and quote board out of the private vault into `sky-is-the-limit/data/` | `sitl_vault/Workflows/scripts/` | 2026-09-30 | Free | Lives in the vault, writes **here**. ⚠️ **`sky-is-the-limit/data/` is generated — do not hand-edit it.** 🛑 The PC sheets are a **whitelisted subset**: `## Inner Life & Evolution`, `## POV Journal`, every `**DDB userId:**` and `Character_id`/`user_id` are withheld, and the script asserts their absence in `--self-test`. **If a panel renders empty, add the heading to its allow list — never repoint the page at a raw vault URL to get the full note.** Keep its `PUBLISHED_PCS` list in step with `character.html`'s `PCS` map |
| **Python 3** | CLI | `python -m http.server` to serve this repo locally for browser verification | local install | 2026-09-30 | Free | 🛑 **Serve from the repo ROOT, not the campaign folder** — every page uses absolute `/assets/` and `/sky-is-the-limit/data/` paths and will 404 its own assets otherwise |
| **/handoff** | Skill | Banking work, the Status pointer, friction log, this table | `~/.claude/skills/handoff` | 2026-09-30 | Free | 🛑 **This file uses the legacy `## Status` / `## Next Steps` shape, not `## ▶ DO NEXT`.** The skill says preserve whatever headings a file already has, and `septentrion-sync` has a parse fallback for this shape — **do not convert it** as a side effect of another change |
| **GitHub Pages** | Service | Hosting the live site | rectrixcaedere.com | 2026-08-31 | Free | Custom domain via root `CNAME` |
| **GitHub** | Service | Remote host for `TheLittlestAskew/rectrixcaedere` | github.com | 2026-09-30 | Free | ⚠️ Push API truncates files over ~15 KB — split rather than grow a file |
| **git** | CLI | Version control, handoff motion | `C:\Program Files\Git` | 2026-09-30 | Free | — |
| **/rc-brand** | Skill | Applying the Rectrix Caedere brand system | `~/.claude/skills` | ~2026-08-31 | Free | Brand guide lives in `.design/rc/` |
| **impeccable** | Skill | Frontend design/critique passes | `.claude/commands/impeccable.md`, locked in `skills-lock.json` | ~2026-08-31 | Free | Source `pbakaus/impeccable`, hash-pinned |
| **design-tokens** | Skill | Generating and maintaining `tokens.css` | locked in `skills-lock.json` | ~2026-08-31 | Free | Source `julianoczkowski/designer-skills`, hash-pinned |
| **Claude Code** | App | Component work, parser fixes, publish waves, handoffs | CLI / IDE extension | 2026-09-30 | Paid | — |
| **ddb-roll-sync** | App | Chrome extension feeding rolls into `Rectrix_Caedere` | unpacked MV3 extension | ~2026-07-22 | Free | PGRST102 mixed-key bulk-POST bug fixed 2026-07-22 |
| **D&D Beyond** | Site | Source of the roll data | dndbeyond.com | ~2026-08-31 | Paid | — |
| **septentrion-sync** | Skill | Feeds handoff state to the vault + SystemHorizon heartbeat | `~/.claude/skills/septentrion-sync` | 2026-09-02 | Free | In both `REPOS` and `TOOLS_REPOS` |

## Retired

| Tool | Type | Was used for | Retired | Why |
|---|---|---|---|---|
| ~~**Hardcoded campaign data in `app.js`**~~ | Data | Campaign stats before the Supabase wiring | ~2026-08-31 | ✅ Replaced by live Supabase reads; a hardcoded `FALLBACK` config still survives in the map script |
| ~~**Two-DB roll copy**~~ | Service | Staging rolls in a second Supabase project before copying here | 2026-07-22 | ✅ `ddb-roll-sync` writes direct to `Rectrix_Caedere` now |
