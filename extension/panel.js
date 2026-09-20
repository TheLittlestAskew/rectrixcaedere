// panel.js — The Siphon (roll sync + auto-enrichment) + Marginalia (session notes)
// 2026-09-20: ported enrichRoll() back in from the archived popup.js (it had
// quietly stopped running once the side panel replaced the popup as the real
// UI) and removed the TEMP DIAGNOSTIC block that was logging roll context on
// every sync.

// ─── Config ──────────────────────────────────────────────────────
const SUPABASE_URL = 'https://vtrtyagltwdrbastpppl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnR5YWdsdHdkcmJhc3RwcHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTY5NTAsImV4cCI6MjA5MTkzMjk1MH0.hnpwjHGIqiUN_VmmIkOAAFGGCKsyYgl7AO3FW5vDIeM';
const DDB_USER_ID = 107965379;

const CAMPAIGNS = {
  'Sky Is The Limit':           { supabaseId: 1, gameId: 6907990, status: 'active' },
  'Pacts & Power':              { supabaseId: 2, gameId: 3661522, status: 'active' },
  'Ashfall Brittania':          { supabaseId: 3, gameId: 7170962, status: 'active' },
  'Where the Flowers Forget':   { supabaseId: 4, gameId: 7853407, status: 'active' },
};

// ─── Auto-enrichment lookups (ported 2026-09-20 from the archived popup.js) ──
const SKILL_ABILITY = {
  'acrobatics':'DEX','animal handling':'WIS','arcana':'INT','athletics':'STR',
  'deception':'CHA','history':'INT','insight':'WIS','intimidation':'CHA',
  'investigation':'INT','medicine':'WIS','nature':'INT','perception':'WIS',
  'performance':'CHA','persuasion':'CHA','religion':'INT',
  'sleight of hand':'DEX','stealth':'DEX','survival':'WIS',
};
const SKILL_NAMES = Object.keys(SKILL_ABILITY);

const ABILITY_NAMES = ['strength','dexterity','constitution','intelligence','wisdom','charisma',
                       'str','dex','con','int','wis','cha'];
const ABILITY_SHORT = {
  'strength':'STR','str':'STR','dexterity':'DEX','dex':'DEX',
  'constitution':'CON','con':'CON','intelligence':'INT','int':'INT',
  'wisdom':'WIS','wis':'WIS','charisma':'CHA','cha':'CHA',
};

// Known spells (from party build data + common cantrips/spells across all 4 campaigns)
const KNOWN_SPELLS = new Set([
  'aid','burning hands','channel divinity: radiance of the dawn','chill touch',
  'chromatic orb','cure wounds','divine intervention','eldritch blast',
  'ensnaring strike','fire bolt','fireball','flame blade','flaming sphere',
  'frostbite','guiding bolt','hail of thorns','halo of spores','healing word',
  'holy word','hunter\'s mark','lightning bolt','magic missile','magic weapon',
  'mass cure wounds','mass healing word','mind sliver','moonbeam','poison spray',
  'prayer of healing','primal savagery','raulothim\'s psychic lance','sacred flame',
  'scorching ray','searing smite','shatter','shillelagh','shocking grasp',
  'spell attack','spellfire flare','spirit guardians','spiritual weapon',
  'starry wisp','steps of the fey','tasha\'s mind whip','thorn whip',
  'thunderwave','toll the dead','vicious mockery','wall of fire','witch bolt',
]);

// Known feats/features
const KNOWN_FEATS = new Set([
  'bardic inspiration','breath weapon','force breath','lunar vitality',
  'sneak attack','stone\'s endurance','superiority dice','tactical mind',
]);

// Classify a normalized roll row into action_category / skill / ability /
// spell / feat / nat20-nat1, so downstream dashboards don't have to re-parse
// the raw `action` string. Falls through to 'Custom' if nothing matches —
// that's a valid, expected outcome for freeform DM-prompted rolls, not a bug.
function enrichRoll(row) {
  const action = (row.action || 'custom').trim();
  const actionLower = action.toLowerCase().replace(/\s*\([^)]*\)\s*/g, '').replace(/[*,]/g, '').trim();
  const rollType = (row.roll_type || 'roll').toLowerCase();

  const enriched = {};

  if (row.total != null) {
    enriched.dice_raw_total = (row.total || 0) - (row.modifier || 0);
  }

  const notation = row.dice_notation || '';
  const diceMatch = notation.match(/(\d+)d(\d+)/i);
  if (diceMatch) {
    enriched.dice_count = parseInt(diceMatch[1], 10);
    enriched.dice_type = 'd' + diceMatch[2];
  }

  if (enriched.dice_type === 'd20' && enriched.dice_count === 1) {
    const rawVal = enriched.dice_raw_total;
    enriched.is_nat_20 = rawVal === 20;
    enriched.is_nat_1 = rawVal === 1;
  }

  // 1. Skills
  const skillMatch = SKILL_NAMES.find(s => actionLower === s || actionLower.startsWith(s + ' '));
  if (skillMatch) {
    enriched.action_category = 'Skill';
    enriched.roll_subtype = 'skill check';
    enriched.skill = skillMatch.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    enriched.ability = SKILL_ABILITY[skillMatch];
    return enriched;
  }

  // 2. Initiative
  if (actionLower === 'initiative') {
    enriched.action_category = 'Initiative';
    enriched.roll_subtype = 'Ability Check';
    enriched.ability = 'DEX';
    return enriched;
  }

  // 3. Ability checks and saves
  for (const ab of ABILITY_NAMES) {
    if (actionLower === ab || actionLower.startsWith(ab + ' ')) {
      enriched.ability = ABILITY_SHORT[ab];
      if (actionLower.includes('save') || actionLower.includes('saving')) {
        enriched.action_category = 'Ability';
        enriched.roll_subtype = 'Saving Throw';
      } else {
        enriched.action_category = 'Ability';
        enriched.roll_subtype = 'Ability Check';
      }
      return enriched;
    }
  }
  // Short-form ability saves/checks from DDB (e.g. action="wis", roll_type="save")
  if (ABILITY_SHORT[actionLower] && rollType === 'save') {
    enriched.action_category = 'Ability';
    enriched.roll_subtype = 'Saving Throw';
    enriched.ability = ABILITY_SHORT[actionLower];
    return enriched;
  }
  if (ABILITY_SHORT[actionLower] && rollType === 'check') {
    enriched.action_category = 'Ability';
    enriched.roll_subtype = 'Ability Check';
    enriched.ability = ABILITY_SHORT[actionLower];
    return enriched;
  }

  // 4. Death Saving Throw
  if (actionLower === 'death saving throw') {
    enriched.action_category = 'Death Saving Throw';
    enriched.roll_subtype = 'Saving Throw';
    return enriched;
  }

  // 5. Hit Dice
  if (actionLower.startsWith('hit dic') || actionLower === 'hit die' || actionLower === 'abovevtt') {
    enriched.action_category = 'Hit Dice';
    enriched.roll_subtype = 'heal';
    return enriched;
  }

  // 6. Spells
  if (KNOWN_SPELLS.has(actionLower)) {
    enriched.action_category = 'Spell';
    enriched.roll_subtype = rollType; // preserve to hit / damage / heal
    enriched.spell = action.replace(/\s*\([^)]*\)\s*$/, '').trim();
    return enriched;
  }

  // 7. Known feats/features
  const featMatch = [...KNOWN_FEATS].find(f => actionLower === f || actionLower.startsWith(f));
  if (featMatch) {
    enriched.action_category = 'Feat';
    enriched.roll_subtype = rollType;
    enriched.feat = featMatch.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    return enriched;
  }

  // 8. Potion of Healing
  if (actionLower === 'potion of healing') {
    enriched.action_category = 'Object Interaction';
    enriched.roll_subtype = 'heal';
    enriched.item = 'Potion of Healing';
    return enriched;
  }

  // 9. Weapons (anything with roll_type "to hit" or "damage" that isn't a spell/feat/skill)
  if (rollType === 'to hit' || rollType === 'damage') {
    enriched.action_category = 'Attack';
    enriched.roll_subtype = rollType;
    if (actionLower !== 'custom' && actionLower !== 'roll') {
      enriched.weapon = action.replace(/\s*\([^)]*\)\s*$/, '').replace(/[*]/g, '').trim();
    }
    return enriched;
  }

  // 10. Ability Score rolls (character creation)
  if (actionLower === 'ability score') {
    enriched.action_category = 'Custom';
    enriched.roll_subtype = 'roll';
    return enriched;
  }

  // 11. Fallback: Custom
  enriched.action_category = 'Custom';
  enriched.roll_subtype = rollType || 'roll';
  return enriched;
}

const NOTE_TYPES = [
  {
    id: 'moment', label: 'Moment', color: '#c89b3c',
    contentLabel: 'What happened', contentPlaceholder: 'What happened…',
    showWho: true, whoLabel: 'Who was involved',
  },
  {
    id: 'npc', label: 'NPC', color: '#6a8caf',
    showTitle: true, titleLabel: 'Name', titlePlaceholder: 'NPC name',
    showRelationship: true,
    contentLabel: 'Details', contentPlaceholder: 'Who they are, where you met them…',
  },
  {
    id: 'quote', label: 'Quote', color: '#8fb0a0',
    contentLabel: 'Quote', contentPlaceholder: 'What was said…',
    showWho: true, whoLabel: 'Said by',
  },
  {
    id: 'quest', label: 'Quest', color: '#c9954a', tracksResolved: true,
    showTitle: true, titleLabel: 'Quest', titlePlaceholder: 'Quest name',
    contentLabel: 'Details', contentPlaceholder: 'What needs doing…',
    showWho: true, whoLabel: "Who's involved",
  },
  {
    id: 'question', label: 'Question', color: '#c17a7a', tracksResolved: true,
    contentLabel: 'Question', contentPlaceholder: 'What are we wondering…',
    showWho: true, whoLabel: 'Related to',
  },
  {
    id: 'loot', label: 'Loot', color: '#a6935f',
    showTitle: true, titleLabel: 'Item', titlePlaceholder: 'Item name',
    showQuantity: true,
    contentLabel: 'Notes', contentPlaceholder: 'Where found, needs identifying…',
    showWho: true, whoLabel: 'Who has it',
  },
];

// ─── Logging (shared) ─────────────────────────────────────────────
const logEl = document.getElementById('log');

function log(msg, type = 'info') {
  const line = document.createElement('div');
  line.className = type;
  line.textContent = msg;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

function clearLog() {
  logEl.innerHTML = '';
}

// ─── Siphon: campaign list ─────────────────────────────────────────
function renderCampaigns() {
  const container = document.getElementById('campaign-list');
  container.innerHTML = '';
  for (const [name, cfg] of Object.entries(CAMPAIGNS)) {
    const row = document.createElement('div');
    row.className = 'campaign-row';
    row.id = `campaign-${cfg.supabaseId}`;
    row.innerHTML = `
      <span class="name">${name}</span>
      <span class="badge ${cfg.status}">${cfg.status}</span>
      <span class="sync-status" id="status-${cfg.supabaseId}">—</span>
    `;
    container.appendChild(row);
  }
}

function setCampaignStatus(supabaseId, msg, type = 'info') {
  const el = document.getElementById(`status-${supabaseId}`);
  if (el) {
    el.textContent = msg;
    el.style.color = type === 'ok' ? '#4d4' : type === 'error' ? '#f66' : '#888';
  }
}

// ─── Siphon: token status ──────────────────────────────────────────
function updateTokenStatus(token, capturedAt) {
  const el = document.getElementById('token-status');
  const btn = document.getElementById('btn-sync-all');
  if (!token) {
    el.className = 'token-status warn';
    el.textContent = '⏳ No token yet — open any D&D Beyond page first.';
    btn.disabled = true;
  } else {
    const age = capturedAt ? Math.round((Date.now() - capturedAt) / 60000) : '?';
    el.className = 'token-status ok';
    el.textContent = `✅ Token captured (${age}m ago) — ready to sync.`;
    btn.disabled = false;
  }
}

// ─── Siphon: collapse toggle ────────────────────────────────────────
function setSiphonCollapsed(collapsed, body, chevron) {
  body.classList.toggle('collapsed', collapsed);
  chevron.classList.toggle('collapsed', collapsed);
}

function initSiphonToggle() {
  const header = document.getElementById('siphon-header');
  const body = document.getElementById('siphon-body');
  const chevron = document.getElementById('siphon-chevron');

  const toggle = () => {
    const collapsed = !body.classList.contains('collapsed');
    setSiphonCollapsed(collapsed, body, chevron);
    header.setAttribute('aria-expanded', String(!collapsed));
    chrome.storage.local.set({ siphon_collapsed: collapsed });
  };

  chrome.storage.local.get(['siphon_collapsed'], (r) => {
    const collapsed = !!r.siphon_collapsed;
    setSiphonCollapsed(collapsed, body, chevron);
    header.setAttribute('aria-expanded', String(!collapsed));
  });

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
}
// ─── Supabase helpers (shared by Siphon and Marginalia) ────────────
async function supabaseRequest(path, method, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'resolution=merge-duplicates,return=minimal' : 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase ${method} ${path}: ${res.status} ${err}`);
  }
  return res;
}

async function supabaseGet(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase GET ${path}: ${res.status} ${err}`);
  }
  return res.json();
}

async function getLastSyncedUnix(campaignId) {
  const data = await supabaseGet(
    `ddb_rolls?campaign_id=eq.${campaignId}&select=timestamp_unix&order=timestamp_unix.desc&limit=1`
  );
  return data.length > 0 ? data[0].timestamp_unix : 0;
}

async function upsertRolls(rows) {
  // Collapse rows that share the composite conflict key. A single game-log
  // message can hold several rolls with the same rollId+rollType+notation, which
  // would make Postgres try to ON CONFLICT-update the same row twice in one
  // statement (error 21000). The unique constraint only keeps one such row
  // anyway, so we keep the last occurrence. Rows with a null dice_notation are
  // left as-is (NULLs are treated as distinct by the unique key).
  const byKey = new Map();
  const deduped = [];
  for (const r of rows) {
    if (r.dice_notation == null) { deduped.push(r); continue; }
    const key = `${r.campaign_id}|${r.roll_id}|${r.roll_type}|${r.dice_notation}`;
    if (byKey.has(key)) deduped[byKey.get(key)] = r;
    else { byKey.set(key, deduped.length); deduped.push(r); }
  }

  // PostgREST bulk insert (PGRST102 "All object keys must match") requires
  // every object in the POSTed array to carry an IDENTICAL key set. enrichRoll()
  // emits a different subset of columns per roll type (skill/spell/weapon/
  // nat-flags/dice_* are all conditional), so a mixed batch has heterogeneous
  // keys and the whole POST is rejected. Union every key seen across the batch
  // and backfill missing ones with null so all objects match. Only keys that
  // already appear on some row are added — no phantom columns are invented.
  const allKeys = new Set();
  for (const r of deduped) for (const k of Object.keys(r)) allKeys.add(k);
  const normalized = deduped.map(r => {
    const full = {};
    for (const k of allKeys) full[k] = r[k] ?? null;
    return full;
  });

  const BATCH = 500;
  let inserted = 0;
  for (let i = 0; i < normalized.length; i += BATCH) {
    const chunk = normalized.slice(i, i + BATCH);
    await supabaseRequest(
      'ddb_rolls?on_conflict=campaign_id,roll_id,roll_type,dice_notation',
      'POST',
      chunk
    );
    inserted += chunk.length;
    if (normalized.length > BATCH) {
      log(`  ↳ Upserted ${inserted}/${normalized.length} rolls...`);
    }
  }
  return inserted;
}

async function updateCampaignSync(campaignId, lastUnix) {
  const iso = new Date(lastUnix).toISOString();
  await supabaseRequest(
    `ddb_campaigns?id=eq.${campaignId}`,
    'PATCH',
    { last_synced_iso: iso, last_synced_unix: lastUnix }
  );
}

// ─── DDB API helpers ─────────────────────────────────────────────
async function fetchDDBRolls(gameId, bearerToken, afterUnix = 0) {
  const messages = [];
  let lastEvaluatedKey = null;
  let page = 0;
  let done = false;

  while (!done) {
    page++;
    log(`  ↳ Fetching page ${page}...`);
    let url = `https://game-log-rest-live.dndbeyond.com/v1/getmessages?gameId=${gameId}&userId=${DDB_USER_ID}`;
    if (lastEvaluatedKey) url += `&lastEvaluatedKey=${encodeURIComponent(lastEvaluatedKey)}`;

    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${bearerToken}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`DDB API error: ${res.status} ${errText}`);
    }

    const json = await res.json();
    const batch = json.data || [];
    if (batch.length === 0) break;

    for (const msg of batch) {
      const ts = parseInt(msg.dateTime, 10) || 0;
      if (ts <= afterUnix) { done = true; break; }
      if (msg.eventType === 'dice/roll/fulfilled' && msg.data?.rolls?.length) {
        messages.push(msg);
      }
    }

    const nextKey = json.lastKey?.dateTime_eventType_userId || null;
    if (!nextKey) break;
    lastEvaluatedKey = nextKey;
    if (page > 300) { log('  ⚠️ Hit 300 page limit', 'warn'); break; }
    await new Promise(r => setTimeout(r, 250));
  }

  return messages;
}

function buildDiceNotation(dn) {
  if (!dn) return null;
  const parts = (dn.set || []).map(s => {
    const die = s.dieType || (s.dice && s.dice[0] && s.dice[0].dieType) || '';
    const count = s.count || (s.dice ? s.dice.length : 1);
    return `${count}${die}`;
  });
  let notation = parts.join('+');
  const c = dn.constant || 0;
  if (c > 0) notation += `+${c}`;
  else if (c < 0) notation += `${c}`;
  return notation || null;
}

function normalizeMessage(msg, campaignId) {
  const ts = parseInt(msg.dateTime, 10) || 0;
  const d = msg.data || {};
  const ctx = d.context || {};
  const base = {
    campaign_id: campaignId,
    timestamp_iso: new Date(ts).toISOString(),
    timestamp_unix: ts,
    character: ctx.name || null,
    user_id: msg.userId ? parseInt(msg.userId, 10) : null,
    action: d.action || 'custom',
    source: (msg.source || 'web').toLowerCase(),
    set_id: d.setId || null,
    roll_id: d.rollId || msg.id || null,
  };
  return (d.rolls || []).map(r => {
    const row = {
      ...base,
      roll_type: r.rollType || 'roll',
      roll_kind: r.rollKind || '',
      dice_notation: buildDiceNotation(r.diceNotation),
      modifier: (r.diceNotation && r.diceNotation.constant) || 0,
      total: r.result?.total ?? null,
      individual_values: r.result?.values ? JSON.stringify(r.result.values) : null,
    };
    return { ...row, ...enrichRoll(row) };
  });
}

// ─── Sync logic ──────────────────────────────────────────────────
async function syncCampaign(campaignName, bearerToken) {
  const cfg = CAMPAIGNS[campaignName];
  if (cfg.status !== 'active') {
    setCampaignStatus(cfg.supabaseId, 'skipped');
    return;
  }
  if (!cfg.gameId || cfg.gameId === 0) {
    log(`❌ No gameId for "${campaignName}"`, 'error');
    setCampaignStatus(cfg.supabaseId, 'no gameId', 'error');
    return;
  }

  log(`\n🎲 ${campaignName}`, 'head');
  setCampaignStatus(cfg.supabaseId, 'syncing…');

  try {
    const lastUnix = await getLastSyncedUnix(cfg.supabaseId);
    if (lastUnix > 0) {
      log(`  ↳ Last sync: ${new Date(lastUnix).toISOString()}`);
    } else {
      log('  ↳ Full sync (no existing data)');
    }

    const rawRolls = await fetchDDBRolls(cfg.gameId, bearerToken, lastUnix);
    log(`  ↳ ${rawRolls.length} new rolls found`);

    if (rawRolls.length === 0) {
      log('  ✅ Already up to date', 'ok');
      setCampaignStatus(cfg.supabaseId, 'up to date', 'ok');
      return;
    }

    const rows = rawRolls.flatMap(m => normalizeMessage(m, cfg.supabaseId));
    const count = await upsertRolls(rows);
    const maxUnix = Math.max(...rows.map(r => r.timestamp_unix));
    await updateCampaignSync(cfg.supabaseId, maxUnix);

    log(`  ✅ Synced ${count} rolls (auto-enriched)`, 'ok');
    setCampaignStatus(cfg.supabaseId, `+${count}`, 'ok');
  } catch (e) {
    log(`  ❌ ${e.message}`, 'error');
    setCampaignStatus(cfg.supabaseId, 'error', 'error');
  }
}

async function syncAll(bearerToken) {
  const btn = document.getElementById('btn-sync-all');
  btn.disabled = true;
  btn.textContent = '⏳ Syncing…';
  clearLog();
  log('══════════════════════════════', 'head');
  log('DDB Roll Sync → Supabase', 'head');
  log('══════════════════════════════', 'head');

  for (const name of Object.keys(CAMPAIGNS)) {
    await syncCampaign(name, bearerToken);
  }

  log('\n🏁 Sync complete!', 'ok');
  btn.disabled = false;
  btn.textContent = '⚡ Sync All Campaigns';
}

// ─── Character Snapshot ─────────────────────────────────────────
// Pulls a character's mechanical stats from DDB's character-service, reduces
// the ~48kB sheet payload to ~22 scalars (ported verbatim from the Aftermath
// Meridian Pump's character-snapshot.js — never stores the raw blob), and
// upserts into character_snapshots. One latest row per character.

const ABILITY_IDS = { str: 1, dex: 2, con: 3, int: 4, wis: 5, cha: 6 };
const ABILITY_SUBTYPE = {
  1: 'strength-score', 2: 'dexterity-score', 3: 'constitution-score',
  4: 'intelligence-score', 5: 'wisdom-score', 6: 'charisma-score',
};

function pickStat(arr, abilityId) {
  if (!Array.isArray(arr)) return null;
  const row = arr.find((s) => s?.id === abilityId);
  return typeof row?.value === 'number' ? row.value : null;
}

function allModifiers(modifiers) {
  if (!modifiers || typeof modifiers !== 'object') return [];
  return Object.values(modifiers).flatMap((list) => (Array.isArray(list) ? list : []));
}

// 🛑 Same rule as the Pump: never compute Max HP or AC. base_hit_points stays raw.
function computeFinal(data, abilityId) {
  const base = pickStat(data?.stats, abilityId);
  if (base == null) return null;

  const override = pickStat(data?.overrideStats, abilityId);
  if (override != null) return override;

  let final = base;
  const bonus = pickStat(data?.bonusStats, abilityId);
  if (bonus != null) final += bonus;

  const subType = ABILITY_SUBTYPE[abilityId];
  let setFloor = null;
  for (const m of allModifiers(data?.modifiers)) {
    if (m?.subType !== subType) continue;
    if (m?.type === 'bonus' && typeof m.value === 'number') final += m.value;
    else if (m?.type === 'set' && typeof m.value === 'number') {
      setFloor = setFloor == null ? m.value : Math.max(setFloor, m.value);
    }
  }
  if (setFloor != null) final = Math.max(final, setFloor);

  return final;
}

function primaryClass(classes) {
  if (!Array.isArray(classes) || classes.length === 0) return null;
  return [...classes].sort((a, b) => {
    const byLevel = (b?.level || 0) - (a?.level || 0);
    if (byLevel !== 0) return byLevel;
    return (b?.isStartingClass ? 1 : 0) - (a?.isStartingClass ? 1 : 0);
  })[0];
}

function reduceCharacter(data) {
  if (!data || typeof data !== 'object') return null;

  const classes = Array.isArray(data.classes) ? data.classes : [];
  const totalLevel = classes.reduce((sum, c) => sum + (c?.level || 0), 0) || null;
  const primary = primaryClass(classes);

  return {
    ddb_character_id: data.id ?? null,
    ddb_user_id: data.userId ?? null,
    character_name: data.name ?? null,
    class_name: primary?.definition?.name ?? null,
    subclass_name: primary?.subclassDefinition?.name ?? null,
    total_level: totalLevel,
    base_hit_points: data.baseHitPoints ?? null,
    current_xp: data.currentXp ?? null,
    status_slug: data.statusSlug ?? null,
    ddb_date_modified: data.dateModified ?? null,
    base_str: pickStat(data.stats, ABILITY_IDS.str),
    base_dex: pickStat(data.stats, ABILITY_IDS.dex),
    base_con: pickStat(data.stats, ABILITY_IDS.con),
    base_int: pickStat(data.stats, ABILITY_IDS.int),
    base_wis: pickStat(data.stats, ABILITY_IDS.wis),
    base_cha: pickStat(data.stats, ABILITY_IDS.cha),
    final_str: computeFinal(data, ABILITY_IDS.str),
    final_dex: computeFinal(data, ABILITY_IDS.dex),
    final_con: computeFinal(data, ABILITY_IDS.con),
    final_int: computeFinal(data, ABILITY_IDS.int),
    final_wis: computeFinal(data, ABILITY_IDS.wis),
    final_cha: computeFinal(data, ABILITY_IDS.cha),
  };
}

async function fetchCharacterSheet(characterId, charToken) {
  const url = `https://character-service.dndbeyond.com/character/v5/character/${characterId}?includeCustomItems=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${charToken}` } });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`character-service ${res.status} ${t}`);
  }
  const json = await res.json();
  return json?.data ?? null;
}

async function snapshotOneCharacter(characterId, campaignId, charToken) {
  const data = await fetchCharacterSheet(characterId, charToken);
  const reduced = reduceCharacter(data);
  if (!reduced || reduced.ddb_character_id == null) {
    log(`  ❌ character ${characterId}: no usable sheet data`, 'error');
    return false;
  }
  const row = { ...reduced, campaign_id: campaignId, captured_at: new Date().toISOString() };
  await supabaseRequest('character_snapshots?on_conflict=ddb_character_id', 'POST', row);
  log(`  ✅ ${reduced.character_name} — L${reduced.total_level} ${reduced.class_name ?? ''}`.trimEnd(), 'ok');
  return true;
}

async function snapshotAll() {
  const btn = document.getElementById('btn-snapshot');
  btn.disabled = true;
  btn.textContent = '⏳ Snapshotting…';
  clearLog();
  log('══════════════════════════════', 'head');
  log('Character Snapshot → Supabase', 'head');
  log('══════════════════════════════', 'head');

  const { ddb_character_token, ddb_characters = [] } =
    await chrome.storage.local.get(['ddb_character_token', 'ddb_characters']);

  if (!ddb_character_token) {
    log('❌ No character token yet — open a D&D Beyond character sheet first.', 'error');
  } else if (!activeCampaignId) {
    log('❌ Pick a campaign first.', 'error');
  } else {
    // Only characters tagged to the campaign currently selected above — not
    // every character this browser has ever seen. Swap campaigns, and this
    // list changes with it.
    const ids = ddb_characters
      .filter((c) => c.campaignId === activeCampaignId)
      .map((c) => c.id);

    if (ids.length === 0) {
      log('❌ No characters seen yet for this campaign — open its D&D Beyond sheet first (with this campaign selected above).', 'error');
    } else {
      let saved = 0;
      for (const id of ids) {
        log(`\n📸 character ${id}`, 'head');
        try {
          if (await snapshotOneCharacter(id, activeCampaignId, ddb_character_token)) saved++;
        } catch (e) {
          log(`  ❌ ${e.message}`, 'error');
        }
      }
      log(`\n🏁 Snapshot complete! ${saved}/${ids.length} saved.`, 'ok');
    }
  }

  btn.disabled = false;
  btn.textContent = '📸 Snapshot Characters';
}

// ─── Marginalia: session notes ─────────────────────────────────────

let activeCampaignId = null;
let sessionLabel = '';
let activeNoteType = 'moment';
const characterCache = {}; // campaignId -> [names]

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

async function fetchCharacterSuggestions(campaignId) {
  if (characterCache[campaignId]) return characterCache[campaignId];
  try {
    const rows = await supabaseGet(
      `ddb_rolls?campaign_id=eq.${campaignId}&select=character&character=not.is.null&limit=1000`
    );
    const names = [...new Set(rows.map(r => r.character).filter(Boolean))].sort();
    characterCache[campaignId] = names;
    return names;
  } catch (e) {
    log(`  ⚠️ Couldn't load character list: ${e.message}`, 'warn');
    return [];
  }
}

async function populateWhoList(campaignId) {
  const names = await fetchCharacterSuggestions(campaignId);
  const datalist = document.getElementById('who-suggestions');
  datalist.innerHTML = names.map(n => `<option value="${escapeHtml(n)}"></option>`).join('');
}

function noteTypeById(id) {
  return NOTE_TYPES.find(t => t.id === id) || NOTE_TYPES[0];
}

function renderNotesFeed(rows) {
  const feed = document.getElementById('notes-feed');
  if (rows.length === 0) {
    feed.innerHTML = '<span class="info">No notes yet this sitting.</span>';
    return;
  }
  feed.innerHTML = rows.map(r => {
    const type = noteTypeById(r.note_type);
    const whoTag = r.who ? `<span class="note-who">${escapeHtml(r.who)}</span>` : '';
    const relTag = r.relationship ? `<span class="note-who">${escapeHtml(r.relationship)}</span>` : '';
    const resolvedTag = type.tracksResolved
      ? `<span class="note-resolved ${r.resolved ? 'yes' : 'no'}">${r.resolved ? '✓ resolved' : 'open'}</span>`
      : '';
        const delBtn = `<button class="note-del" data-id="${r.id}" title="Delete" aria-label="Delete note">×</button>`;
    const titleLine = r.title
      ? `<div class="note-title">${escapeHtml(r.title)}${r.quantity ? ` ×${r.quantity}` : ''}</div>`
      : '';
    const bodyLine = r.content ? `<div class="note-body">${escapeHtml(r.content)}</div>` : '';
    return `
      <div class="note-row" style="border-left-color:${type.color}">
        <div class="note-head">
          <span class="note-type" style="color:${type.color}">${type.label}</span>
          ${whoTag}${relTag}${resolvedTag}${delBtn}
        </div>
        ${titleLine}
        ${bodyLine}
      </div>`;
  }).join('');
  feed.querySelectorAll('.note-del').forEach(btn => {
    btn.addEventListener('click', () => deleteNote(btn.dataset.id));
  });
}

async function loadNotesForSitting() {
  const feed = document.getElementById('notes-feed');
  if (!activeCampaignId) { feed.innerHTML = ''; return; }
  feed.innerHTML = '<span class="info">Loading…</span>';
  try {
    let path = `session_notes?campaign_id=eq.${activeCampaignId}&order=timestamp_unix.asc`;
    if (sessionLabel) path += `&session_label=eq.${encodeURIComponent(sessionLabel)}`;
    const rows = await supabaseGet(path);
    renderNotesFeed(rows);
  } catch (e) {
    feed.innerHTML = `<span class="error">Couldn't load notes: ${e.message}. Did you run the session_notes SQL yet?</span>`;
  }
}

async function addNote() {
  const contentEl = document.getElementById('note-content');
  const whoEl = document.getElementById('note-who');
  const titleEl = document.getElementById('note-title');
  const relationshipEl = document.getElementById('note-relationship');
  const quantityEl = document.getElementById('note-quantity');
  const resolvedEl = document.getElementById('note-resolved');

  const type = noteTypeById(activeNoteType);
  const content = contentEl.value.trim();
  const title = type.showTitle ? titleEl.value.trim() : '';

  // Content is required unless this type has a title field and it's filled
  // (e.g. logging an NPC or a loot item by name with no details yet).
  if (!content && !title) { log('  ⚠️ Note is empty', 'warn'); return; }
  if (!activeCampaignId) { log('  ❌ Pick a campaign first', 'error'); return; }

  const who = type.showWho ? (whoEl.value.trim() || null) : null;
  const relationship = type.showRelationship ? (relationshipEl.value || null) : null;
  const quantityRaw = type.showQuantity ? quantityEl.value.trim() : '';
  const parsedQty = parseInt(quantityRaw, 10);
  const quantity = quantityRaw && !Number.isNaN(parsedQty) ? parsedQty : null;
  const resolved = type.tracksResolved ? resolvedEl.checked : null;
  const now = Date.now();

  const row = {
    campaign_id: activeCampaignId,
    session_label: sessionLabel || null,
    note_type: activeNoteType,
    title: title || null,
    content,
    who,
    relationship,
    quantity,
    resolved,
    timestamp_iso: new Date(now).toISOString(),
    timestamp_unix: now,
  };

  try {
    await supabaseRequest('session_notes', 'POST', row);
    contentEl.value = '';
    whoEl.value = '';
    titleEl.value = '';
    relationshipEl.value = '';
    quantityEl.value = '';
    resolvedEl.checked = false;
    log(`  📝 ${type.label} noted`, 'ok');
    loadNotesForSitting();
  } catch (e) {
    log(`  ❌ ${e.message}. Did you run the session_notes SQL yet?`, 'error');
  }
}

async function deleteNote(id) {
  try {
    await supabaseRequest(`session_notes?id=eq.${id}`, 'DELETE');
    loadNotesForSitting();
  } catch (e) {
    log(`  ❌ Couldn't delete note: ${e.message}`, 'error');
  }
}

function updateFieldVisibility() {
  const type = noteTypeById(activeNoteType);

  document.getElementById('title-row').classList.toggle('field-hidden', !type.showTitle);
  document.getElementById('note-title-label').textContent = type.titleLabel || 'Name';
  document.getElementById('note-title').placeholder = type.titlePlaceholder || '';

  document.getElementById('quantity-wrap').classList.toggle('field-hidden', !type.showQuantity);

  document.getElementById('relationship-row').classList.toggle('field-hidden', !type.showRelationship);

  document.getElementById('note-content-label').textContent = type.contentLabel || 'Content';
  document.getElementById('note-content').placeholder = type.contentPlaceholder || '';

  document.getElementById('who-row').classList.toggle('field-hidden', !type.showWho);
  document.getElementById('note-who-label').textContent = type.whoLabel || 'Who';

  document.getElementById('resolved-row').classList.toggle('field-hidden', !type.tracksResolved);
}

function renderNoteTypeTabs() {
  const container = document.getElementById('note-type-tabs');
  container.innerHTML = NOTE_TYPES.map(t =>
    `<button class="type-tab ${t.id === activeNoteType ? 'active' : ''}" data-type="${t.id}" style="--tab-color:${t.color}">${t.label}</button>`
  ).join('');
  container.querySelectorAll('.type-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeNoteType = btn.dataset.type;
      renderNoteTypeTabs();
      updateFieldVisibility();
    });
  });
}

function initMarginalia() {
  const campaignSelect = document.getElementById('note-campaign');
  campaignSelect.innerHTML = Object.entries(CAMPAIGNS)
    .map(([name, cfg]) => `<option value="${cfg.supabaseId}">${name}</option>`).join('');

  chrome.storage.local.get(['marginalia_campaign', 'marginalia_session'], (r) => {
    activeCampaignId = r.marginalia_campaign || CAMPAIGNS[Object.keys(CAMPAIGNS)[0]].supabaseId;
    sessionLabel = r.marginalia_session || '';
    campaignSelect.value = activeCampaignId;
    document.getElementById('note-session').value = sessionLabel;
    chrome.storage.local.set({ marginalia_campaign: activeCampaignId });
    populateWhoList(activeCampaignId);
    loadNotesForSitting();
  });

  campaignSelect.addEventListener('change', () => {
    activeCampaignId = parseInt(campaignSelect.value, 10);
    chrome.storage.local.set({ marginalia_campaign: activeCampaignId });
    populateWhoList(activeCampaignId);
    loadNotesForSitting();
  });

  document.getElementById('note-session').addEventListener('change', (e) => {
    sessionLabel = e.target.value.trim();
    chrome.storage.local.set({ marginalia_session: sessionLabel });
    loadNotesForSitting();
  });

  renderNoteTypeTabs();
  updateFieldVisibility();
  document.getElementById('btn-add-note').addEventListener('click', addNote);
}

// ─── Init ────────────────────────────────────────────────────────
renderCampaigns();

chrome.storage.local.get(['ddb_bearer_token', 'ddb_token_captured_at'], (result) => {
  updateTokenStatus(result.ddb_bearer_token, result.ddb_token_captured_at);
});

document.getElementById('btn-sync-all').addEventListener('click', () => {
  chrome.storage.local.get(['ddb_bearer_token'], (result) => {
    if (!result.ddb_bearer_token) {
      log('❌ No token — open a D&D Beyond page first.', 'error');
      return;
    }
    syncAll(result.ddb_bearer_token);
  });
});

document.getElementById('btn-clear-log').addEventListener('click', clearLog);
document.getElementById('btn-snapshot').addEventListener('click', snapshotAll);

initSiphonToggle();
initMarginalia();
