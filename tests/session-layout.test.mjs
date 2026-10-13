// Verification for the shared session layout and the four campaign pages.
//
//   node tests/session-layout.test.mjs          offline checks only
//   node tests/session-layout.test.mjs --live   also runs each page's real load()
//                                               against GitHub raw + Supabase
//
// No test framework: the repo has no build step, so this is plain node:assert.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const SL = require(path.join(root, 'assets/session-layout.js'));
const t = SL._t;
const PAGES = ['sky-is-the-limit', 'ashfall-britannia', 'where-the-flowers-forget', 'pacts-and-power'];
let passed = 0;
function check(name, fn) { fn(); passed++; console.log('ok  ' + name); }

// ── the POV journal is collapsed by default and says it can be opened ──
t.setConfig({ campaign: 'Test & Co', home: '/t/', archive: { href: '/t/a.html', label: 'Archive' }, povLabel: 'POV' });
const shell = t.shell();
check('POV <details> has no open attribute', () => {
  const tag = /<details class="pov"[^>]*>/.exec(shell);
  assert.ok(tag, 'POV details element is present');
  assert.ok(!/\bopen\b/.test(tag[0]), 'POV must start collapsed');
});
check('POV summary carries a labelled expand control', () => {
  assert.match(shell, /class="when-closed"[^>]*>Read the journal</);
  assert.match(shell, /class="when-open">Close the journal</);
});
check('campaign name is escaped in the chrome', () => assert.ok(shell.includes('Test &amp; Co') && !shell.includes('Test & Co')));
check('no page hardcodes the POV open, or carries its own copy of the layout', () => {
  for (const p of PAGES) {
    const html = readFileSync(path.join(root, p, 'session.html'), 'utf8');
    assert.ok(!/<details class="pov"/.test(html), p + ' must not carry its own POV markup');
    assert.ok(html.includes('/assets/session-layout.css') && html.includes('/assets/session-layout.js'), p + ' uses the shared layout');
    assert.ok(html.includes('<div id="session"></div>'), p + ' has the mount point');
  }
});

// ── helpers, including the edge cases ──
check('esc handles null, numbers and markup', () => {
  assert.equal(t.esc(null), '');
  assert.equal(t.esc(7), '7');
  assert.equal(t.esc('<b>&'), '&lt;b&gt;&amp;');
});
check('fmtDate formats in UTC and passes through non-ISO labels', () => {
  assert.equal(t.fmtDate('2026-03-01'), 'March 1, 2026');
  assert.equal(t.fmtDate('~March 11, 2026'), '~March 11, 2026');
  assert.equal(t.fmtDate(null), '');
});
check('censor stars one middle letter, even on a one-letter word', () => {
  assert.equal(t.censor('damn'), 'da*n');
  assert.equal(t.censor('a'), 'a*');
});
check('countNats: any 20 is a nat 20, a nat 1 needs every die on 1', () => {
  const rows = [
    { dice_notation: '2d20kh1', individual_values: '[20,3]' },   // advantage, counts
    { dice_notation: '2d20kh1', individual_values: [1, 14] },    // one die on 1 is not a nat 1
    { dice_notation: '1d20', individual_values: [1] },
    { dice_notation: '1d8', individual_values: [1] },            // not a d20
    { dice_notation: '1d20', individual_values: 'not json' },    // malformed, skipped
    { dice_notation: null, individual_values: null }
  ];
  assert.deepEqual(t.countNats(rows), { total: 6, n20: 1, n1: 1 });
  assert.deepEqual(t.countNats([]), { total: 0, n20: 0, n1: 0 });
});
check('renderPanel covers missing, empty and unknown-key panels', () => {
  assert.match(t.renderPanel(undefined, 'narrative'), /Not recorded for this session/);
  assert.match(t.renderPanel({ kind: 'list', items: [] }, 'npcs'), /&mdash;/);
  assert.match(t.renderPanel({ kind: 'list', items: [{ A: 'x' }] }, 'no-such-renderer'), /<th>A<\/th>/);
});
check('buildWhere drops empty values and renders nothing when all are empty', () => {
  assert.equal(t.buildWhere([['Region', ''], ['Arc', undefined]]), '');
  assert.equal(t.buildWhere(null), '');
  const html = t.buildWhere([['Region', 'North'], ['Arc', '']]);
  assert.ok(html.includes('Region') && !html.includes('Arc'));
});

// ── live: run each page's own load() and check the shape the layout expects ──
function pageConfig(page) {
  const html = readFileSync(path.join(root, page, 'session.html'), 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  assert.equal(scripts.length, 1, page + ' has exactly one inline script');
  let cfg = null;
  const ctx = {
    SessionLayout: { SB: SL.SB, HDRS: SL.HDRS, mount: c => { cfg = c; } },
    marked: {}, fetch, console, Date, JSON, Promise, encodeURIComponent, parseFloat, parseInt, RegExp, Object, Array, String, Error,
    location: { pathname: '/' + page + '/session.html', search: '' },
    document: { getElementById: () => null, addEventListener: (_e, fn) => fn() }
  };
  ctx.window = ctx;
  vm.runInNewContext(scripts[0], ctx, { filename: page + '/session.html' });
  assert.ok(cfg, page + ' called SessionLayout.mount');
  return cfg;
}
check('every page mounts with a complete config', () => {
  for (const p of PAGES) {
    const c = pageConfig(p);
    for (const k of ['campaign', 'home', 'povLabel', 'rollView']) assert.equal(typeof c[k], 'string', p + ' config.' + k);
    assert.ok(c.archive && c.archive.href && c.archive.label, p + ' config.archive');
    assert.ok(Array.isArray(c.roster) && c.roster.length, p + ' config.roster');
    assert.ok(Array.isArray(c.nav) && c.nav.some(x => x[0] === 'rolllog'), p + ' config.nav includes the roll log');
    assert.equal(typeof c.load, 'function', p + ' config.load');
  }
});

if (process.argv.includes('--live')) {
  const SAMPLE = { 'sky-is-the-limit': ['25', '01'], 'ashfall-britannia': ['17', '04.5', '01'], 'where-the-flowers-forget': ['05', '01'], 'pacts-and-power': ['12', '01', '20'] };
  for (const p of PAGES) {
    const c = pageConfig(p);
    for (const n of SAMPLE[p]) {
      const d = await c.load(n);
      assert.equal(String(d.label), n, p + ' label');
      assert.ok(d.title && d.date, p + ' ' + n + ' has a title and a roll date');
      assert.ok(Array.isArray(d.sessions) && d.sessions[d.idx] && String(d.sessions[d.idx].label) === n, p + ' ' + n + ' pager position');
      assert.ok(d.pov === null || (d.pov.byline && d.pov.md), p + ' ' + n + ' pov is null or complete');
      const keys = Object.keys(d.panels);
      for (const k of keys) {
        const panel = d.panels[k];
        assert.ok(panel.kind === 'prose' ? typeof panel.body_md === 'string' && panel.body_md : Array.isArray(panel.items), p + ' ' + n + ' panel ' + k + ' is well formed');
        const text = JSON.stringify(panel);
        assert.ok(!/\[\[|\]\]/.test(panel.kind === 'prose' ? panel.body_md : text) || p === 'sky-is-the-limit', p + ' ' + n + ' panel ' + k + ' leaks a raw wikilink');
      }
      passed++;
      console.log('ok  live ' + p + ' ?n=' + n + '  pov=' + (d.pov ? 'yes' : 'none') + '  panels=' + keys.join(','));
    }
    await assert.rejects(() => c.load('no-such-session'), Error, p + ' rejects an unknown session');
    passed++;
    console.log('ok  live ' + p + ' rejects an unknown session');
  }
}
console.log('\n' + passed + ' checks passed');
