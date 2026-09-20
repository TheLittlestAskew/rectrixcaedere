// background.js
// Captures TWO separate Bearer tokens, each scoped to one DDB microservice:
//   - game-log-rest-live.dndbeyond.com → dice rolls (unchanged)
//   - character-service.dndbeyond.com  → character sheets, for snapshots
// DDB issues a different, service-scoped token per service, same two-token
// discipline as the Aftermath Meridian Pump. Neither token goes anywhere but
// back to D&D Beyond; only the derived rows panel.js builds go to Supabase.
//
// To (re)capture the roll token: scroll the dice/roll log on any campaign.
// To (re)capture the character token: open a character sheet (this also
// records its character id, below, so you never type one in).

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders?.find(
      h => h.name.toLowerCase() === 'authorization'
    );
    if (authHeader && authHeader.value.startsWith('Bearer ')) {
      const token = authHeader.value.slice('Bearer '.length).trim();
      chrome.storage.local.set({
        ddb_bearer_token: token,
        ddb_token_captured_at: Date.now(),
        ddb_token_source: details.url,
      });
    }
  },
  { urls: ['https://game-log-rest-live.dndbeyond.com/*'] },
  ['requestHeaders']
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders?.find(
      h => h.name.toLowerCase() === 'authorization'
    );
    if (authHeader && authHeader.value.startsWith('Bearer ')) {
      const token = authHeader.value.slice('Bearer '.length).trim();
      chrome.storage.local.set({
        ddb_character_token: token,
        ddb_character_token_captured_at: Date.now(),
      });
    }
    const m = details.url.match(/\/character\/v5\/character\/(\d+)/);
    if (m) rememberCharacterId(parseInt(m[1], 10));
  },
  { urls: ['https://character-service.dndbeyond.com/*'] },
  ['requestHeaders', 'extraHeaders']
);

// Characters are tagged with whichever campaign is selected in the panel's
// Marginalia dropdown AT THE MOMENT the sheet is opened — that's the only
// signal this tool has for "which campaign does this character belong to."
// Re-opening the same sheet later with a different campaign selected updates
// the tag, so it always reflects the most recent capture.
async function rememberCharacterId(id) {
  if (!Number.isInteger(id)) return;
  const { ddb_characters = [], marginalia_campaign = null } =
    await chrome.storage.local.get(['ddb_characters', 'marginalia_campaign']);
  const existing = ddb_characters.find((c) => c.id === id);
  if (existing) {
    existing.campaignId = marginalia_campaign;
  } else {
    ddb_characters.push({ id, campaignId: marginalia_campaign });
  }
  await chrome.storage.local.set({ ddb_characters });
}

// ─── UI wiring only — nothing below this line touches DDB or any token ───
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));