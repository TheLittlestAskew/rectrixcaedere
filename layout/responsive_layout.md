Build a responsive React dashboard layout that recreates the attached Rectrix Caedere dashboard mockup as closely as possible.

Goal:
Create the dashboard structure, spacing, panels, labels, and visual hierarchy. This is a UI recreation task, not a data integration task yet. Use placeholder data, but name every section according to the Supabase/campaign data it will eventually display.

Visual Style:
Use a premium dark celestial botanical tarot aesthetic:
- Midnight navy / blue-black textured background
- Antique copper-gold linework
- Thin ornate borders with rounded corners
- Cream/gold serif headings
- Small-caps labels
- Muted botanical accents
- Celestial details: crescent moons, stars, orbit rings, dotted arcs
- Art Nouveau-inspired frame details
- Elegant, restrained, not cluttered
- Avoid neon, bright yellow gold, cartoon fantasy, or glossy 3D effects

Use CSS variables for the palette:
--starless-navy: #050A0E;
--deep-blue-black: #111A24;
--smoked-navy: #162230;
--midnight-cardstock: #0D141C;
--aged-copper-gold: #8C5D3F;
--moonlit-apricot: #DA9565;
--burnished-copper: #68442F;
--burnt-coral: #B7634D;
--muted-salmon: #D58A69;
--moonlit-sapphire: #1F3F5B;
--storm-teal: #24495A;
--dusty-mauve: #73596B;
--muted-sage: #56644C;
--cream-ink: #F3E8D0;

Recommended typography:
- Display/headings: Cinzel, Cormorant Garamond, or similar elegant serif
- Utility/body labels: Work Sans, Inter, or similar clean sans serif
- Use generous letter spacing on major headings

Canvas Reference:
The source mockup is 1672px wide by 941px tall. Recreate the layout using CSS Grid with these measured positions and proportions.

Overall Layout:
- Full canvas: 1672 × 941 px reference
- Left sidebar: x 7, y 9, width 209, height 923
- Main content area: x 228, y 9, width 1437, height 923
- Use approximately 12px gutters throughout
- Use a fixed 209px sidebar on desktop
- Main content should use named CSS grid areas so it can become responsive later

Desktop Grid:
.dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 209px 1fr;
  gap: 12px;
  padding: 9px 7px;
}

.main {
  display: grid;
  grid-template-rows: 74px 263px 302px 229px;
  gap: 12px;
}

Top Header:
Approximate position: x 242, y 15, width 1408, height 74
Include:
- Brand title: RECTRIX CAEDERE
- Subtitle: Suggested dashboard layout from your Supabase campaign data
- Center decorative moon ornament
- Top-right filter chip: Filter by campaign / session / character
- Three circular icon buttons: compass/star, bell, crescent moon

Left Sidebar:
Approximate full panel: x 7, y 9, width 209, height 923
Internal sections:
- Logo / brand area: x 37, y 35, width 142, height 180
- Menu list area: x 8, y 228, width 208, height 407
- Bottom profile/workspace card: x 54, y 654, width 111, height 203

Sidebar navigation labels:
- OVERVIEW
- SESSIONS
- ROLLS
- CHARACTERS
- ENCOUNTERS
- NPCS
- QUESTS
- LOOT
- FACTIONS
- SETTINGS

Bottom sidebar card:
- Use a mystical emblem placeholder
- Text: CUTTER
- Subtext: Analytics Workspace

Top KPI + Chart Row:
Use grid columns close to:
grid-template-columns: 188px 197px 187px 177px 612px;
gap: 12px;

Panels:
1. KPI Card: TOTAL ROLLS
   - Position reference: x 242, y 99, width 188, height 262
   - Big value: 12,842
   - Data label: roll_log.total_count
   - Subtext: compare by date

2. KPI Card: SESSIONS LOGGED
   - Position reference: x 442, y 99, width 197, height 262
   - Big value: 87
   - Data label: sessions.session_number
   - Subtext: + session_date

3. KPI Card: NAT 20 RATE
   - Position reference: x 651, y 99, width 187, height 262
   - Big value: 14.2%
   - Data label: roll_log.d20_result
   - Subtext: / crit flag

4. KPI Card: OPEN QUESTS
   - Position reference: x 849, y 99, width 177, height 262
   - Big value: 18
   - Data label: quest_tracker.status =
   - Subtext: open or in progress

5. Large Chart Panel: ROLL ACTIVITY OVER TIME
   - Position reference: x 1038, y 98, width 612, height 263
   - Include a placeholder line chart
   - Caption: X: session_date | Y: roll_count | optional split: campaign or character

Middle Row:
Use grid columns close to:
grid-template-columns: 371px 325px 306px 370px;
gap: 12px;

Panels:
1. ROLL TYPE BREAKDOWN
   - Position reference: x 242, y 373, width 371, height 302
   - Include a donut/radial chart placeholder
   - Legend:
     Attack 38%
     Save 19%
     Skill 17%
     Damage 13%
     Initiative 8%
     Other 5%
   - Caption: Source: roll_log.roll_type
   - Bottom note: Best for seeing how often each type of roll appears

2. TOP CHARACTERS
   - Position reference: x 625, y 373, width 325, height 302
   - Table columns: Character, Rolls, Avg Total, +/- Trend
   - Placeholder rows:
     Aric Velloren | 1,842 | 16.3 | ▲ 2.1
     Liora Sunblade | 1,621 | 15.7 | ▲ 1.4
     Thorne Blackwell | 1,401 | 14.8 | ▼ -0.6
     Kaelen Stormborn | 1,239 | 17.2 | ▲ 0.9
     Mira Undertide | 1,083 | 13.9 | ▼ -1.2
   - Caption: Source: character_name, roll_total, session_id

3. RECENT SESSION HIGHLIGHTS
   - Position reference: x 962, y 373, width 306, height 302
   - Activity feed rows:
     Defeated the Night Hag in The Weeping Fen | Session 87 | 2h ago
     “The price of mercy is memory.” — Liora | Session 87 | 2h ago
     Aric rolled a natural 20 on Persuasion | Session 87 | 3h ago
     New quest: Echoes of the Sunken Bell | Session 87 | 4h ago
     Met with Captain Veyra of the Dusk Watch | Session 86 | 1d ago
   - Caption: Use summary notes, encounter notes, quotes, NPC mentions, and quest updates

4. CAMPAIGN SNAPSHOT
   - Position reference: x 1280, y 373, width 370, height 302
   - Include a central sword/blade sigil inside a circular wreath/halo
   - Status lines:
     Current Arc: Shadows Over Valewatch
     Last Session: May 25, 2024 (Session 87)
     Active PCs: 5
     Open Threads: 7
     Faction Standing: Silver Accord: Friendly
   - Add small circular avatar placeholders at the bottom
   - Caption: High-level health/status card

Bottom Row:
Use grid columns close to:
grid-template-columns: 423px 338px 619px;
gap: 12px;

Panels:
1. RECENT SESSIONS
   - Position reference: x 242, y 686, width 423, height 229
   - Rows:
     May 25 | 87. The Weeping Fen | Valewatch Marshes | Victory
     May 18 | 86. Council of Shadows | Ebonspire Keep | Partial Success
     May 11 | 85. Trail of Ashes | Greyhold Pass | Failure
   - Caption: Source: sessions table / encounter summary / location

2. QUOTE BOARD / NOTABLE MOMENTS
   - Position reference: x 677, y 686, width 338, height 229
   - Center quote:
     “We do not fear the dark.
     We are the dark.
     We shape what others fear.”
     — Thorne Blackwell
   - Caption: Source: quote tracker, speaker, session reference

3. RESOURCE CARDS CONTAINER
   - Position reference: x 1031, y 687, width 619, height 228
   - Contains four framed cards:
     NPC TRACKER
     LOOT TRACKER
     FACTION & REP
     QUEST BOARD
   - Each card sublabel: quick-link summary cards

Resource card positions inside the container:
- NPC Tracker: x 1054, y 710, width 121, height 179
- Loot Tracker: x 1192, y 710, width 124, height 179
- Faction & Rep: x 1332, y 710, width 125, height 179
- Quest Board: x 1474, y 710, width 123, height 179

Component Requirements:
Create reusable React components:
- DashboardShell
- Sidebar
- Header
- TarotPanel
- KpiCard
- LineChartPanel
- DonutChartPanel
- CharacterTable
- ActivityFeed
- CampaignSnapshot
- RecentSessions
- QuoteBoard
- ResourceCard

Styling Requirements:
- Use CSS modules, Tailwind, or plain CSS. Prefer CSS variables and named grid areas.
- Every major card should use the same TarotPanel component with:
  - dark navy surface
  - thin copper-gold border
  - rounded corners
  - subtle inset border
  - small corner flourishes or pseudo-elements
  - small star glyph near the panel title
- Add subtle texture using layered gradients/noise if possible.
- Keep the text legible. Do not sacrifice readability for decoration.
- Do not use real image assets unless provided. Use CSS, SVG icons, lucide-react icons, or inline decorative SVGs.
- Use placeholder charts built with CSS/SVG or recharts.
- Make the desktop layout visually match the 1672 × 941 reference as closely as possible.

Responsive Behavior:
- Desktop ≥ 1400px: preserve the full multi-column dashboard layout.
- Tablet 900–1399px: keep sidebar but allow rows to wrap into fewer columns.
- Mobile < 900px: stack panels vertically and collapse sidebar into a top nav or compact rail.
- Preserve the tarot styling at all breakpoints.

Important:
Do not make this look like a generic SaaS dashboard. It should feel like a mystical campaign analytics dashboard built from ornate tarot cards, but still function like a clean data dashboard.
