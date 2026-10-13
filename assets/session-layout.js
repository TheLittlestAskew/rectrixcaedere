/* Session-note layout shared by every campaign session.html.

   This is the page sky-is-the-limit/session.html was rebuilt into on 2026-09-29,
   lifted out so the other campaigns use the SAME shell instead of a copy that
   drifts. A campaign page supplies only a config and a `load(n)` that returns its
   data in one shape; where that data comes from (Supabase for SKITL, a public
   vault note for the others) is the page's business, not this file's.

   SessionLayout.mount({
     campaign, home, archive:{href,label},   names and links for the chrome
     povLabel,                               eyebrow on the POV card
     povEmpty,                               optional HTML shown when a session has no POV
     rollView,                               Supabase view holding this campaign's rolls
     rollSummary,                            true appends initiative + heaviest hits to the roll log
     recBase,                                R2 folder for recordings ('' if none)
     roster, pcColors, charHref(name),       left-rail party discs
     dispo,                                  optional {npcName:'enemy'|'friendly'}; omit for no legend
     nav:[[panelKey,label],...],             left-rail sections, in order
     load: async function(n) -> {
       sessions:[{label,title}], idx,        ordered list + position, for the pager
       label, title, titleClass, date, dateLabel,
       where:[[term,value]], recording, present, guests, tags:[text],
       pov:{byline,md}|null,
       panels:{key:{kind:'prose',body_md}|{kind:'list',items:[]}}
     }                                       throws Error(message) when the session cannot load
   }) */
var SessionLayout=(function(){
var SB='https://vtrtyagltwdrbastpppl.supabase.co';
var AK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnR5YWdsdHdkcmJhc3RwcHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTY5NTAsImV4cCI6MjA5MTkzMjk1MH0.hnpwjHGIqiUN_VmmIkOAAFGGCKsyYgl7AO3FW5vDIeM';
var HDRS={apikey:AK,Authorization:'Bearer '+AK};
var C=null; /* the mounted campaign config */

/* ── small helpers ── */
function esc(s){return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
/* Inline markdown for table cells and short strings that must not become
   block-level HTML. This delegates to marked rather than hand-rolling regexes:
   the hand-rolled version used `[^*]+`, which cannot match NESTED emphasis, so
   real cells like `**temporary *"as long as you want it to be."***` rendered
   with literal asterisks. marked also escapes HTML in text nodes, so this is
   not a weaker guarantee than the old escape-then-promote order. */
function inl(s){
  if(s==null)return'';
  var t=String(s);
  if(typeof marked==='undefined'||!marked.parseInline)return esc(t);
  try{return marked.parseInline(t);}catch(e){return esc(t);}
}
/* Vault prose carries real tables (encounters, initiative), so wrap them or a
   wide one pushes the centre column into a horizontal page scroll. */
function md(t){ return t?marked.parse(String(t)).replace(/<table>/g,'<div class="tbl-wrap"><table>').replace(/<\/table>/g,'</table></div>'):''; }
function el(id){return document.getElementById(id);}
function fmtDate(iso){
  var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso||''));
  if(!m)return String(iso||'');
  /* UTC on purpose: formatting an ET session date in local time rolls it back a
     day, which would label the session wrong and query the wrong day's rolls. */
  return new Date(Date.UTC(+m[1],+m[2]-1,+m[3])).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
}
function getN(){var m=location.search.match(/[?&]n=([^&]+)/);return m?decodeURIComponent(m[1]):null;}
function censor(w){var i=Math.max(1,Math.floor(w.length/2));return w.slice(0,i)+'*'+w.slice(i+1);}

/* ── audio ── */
function paFmt(t){if(!isFinite(t)||t<0)t=0;t=Math.floor(t);var h=Math.floor(t/3600),m=Math.floor((t%3600)/60),s=t%60;var ss=(s<10?'0':'')+s;return h?h+':'+(m<10?'0':'')+m+':'+ss:m+':'+ss;}
/* `&` is legal in a path but R2 treats the rest as a query on some filenames
   ("01 P&P 071325.mp3"), so it is escaped by hand; encodeURI leaves it alone. */
function paUrl(u){return /^https?:|^blob:|^data:/.test(u)?u:encodeURI(C.recBase+u).replace(/&/g,'%26');}
function mountAudio(rec){
  var card=el('player'),a=el('audio');
  var parts=[];
  if(rec){ if(typeof rec==='string')parts=[{lbl:'Recording',url:rec}]; else if(Array.isArray(rec))parts=rec.slice(); }
  var playable=parts.filter(function(p){return p.url&&!p.lost;});
  if(!parts.length||(!playable.length&&!parts.some(function(p){return p.lost;}))){card.hidden=true;return;}
  card.hidden=false;
  var multi=parts.length>1,current=-1;
  function setToggle(on){card.querySelector('.ic-play').style.display=on?'none':'';card.querySelector('.ic-pause').style.display=on?'':'none';el('play').setAttribute('aria-label',on?'Pause recording':'Play recording');}
  function loadPart(i){current=i;var p=parts[i];Array.prototype.forEach.call(el('parts').children,function(c,ci){c.classList.toggle('on',ci===i&&!parts[ci].lost);});a.src=paUrl(p.url);setToggle(false);el('fill').style.width='0%';el('knob').style.left='0%';el('cur').textContent='0:00';el('dur').textContent='0:00';}
  el('parts').innerHTML='';
  if(multi||parts.some(function(p){return p.lost;})){
    parts.forEach(function(p,i){
      var b=document.createElement(p.lost?'span':'button');
      b.className='part'+(p.lost?' lost':'');b.type='button';
      b.textContent=p.lbl+(p.lost?' · lost':'');
      if(!p.lost)b.onclick=function(){if(i!==current)loadPart(i);a.play();};
      el('parts').appendChild(b);
    });
  }
  if(!playable.length){el('pbar').hidden=true;el('lostnote').hidden=false;el('lostnote').textContent='Recording unavailable for this session.';return;}
  el('play').onclick=function(){if(a.paused)a.play();else a.pause();};
  a.onplay=function(){setToggle(true);};
  a.onpause=function(){setToggle(false);};
  a.onended=function(){setToggle(false);el('fill').style.width='0%';el('knob').style.left='0%';a.currentTime=0;};
  a.onloadedmetadata=function(){el('dur').textContent=paFmt(a.duration);};
  a.ontimeupdate=function(){var p=a.duration?(a.currentTime/a.duration*100):0;el('fill').style.width=p+'%';el('knob').style.left=p+'%';el('cur').textContent=paFmt(a.currentTime);el('track').setAttribute('aria-valuenow',Math.round(p));};
  el('track').onclick=function(e){var r=el('track').getBoundingClientRect();var p=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));if(a.duration)a.currentTime=p*a.duration;};
  el('track').onkeydown=function(e){
    if(!a.duration)return;
    if(e.key==='ArrowRight'){a.currentTime=Math.min(a.duration,a.currentTime+5);e.preventDefault();}
    else if(e.key==='ArrowLeft'){a.currentTime=Math.max(0,a.currentTime-5);e.preventDefault();}
    else if(e.key===' '||e.key==='Enter'){el('play').onclick();e.preventDefault();}
  };
  loadPart(parts.indexOf(playable[0]));
}

/* ── roll stats ──
   A nat 20 is ANY d20 showing 20; a nat 1 requires EVERY d20 to be 1. The old
   /^1d20/ test excluded every advantage roll, which is the bug archive.html was
   fixed for on 2026-09-15. Every campaign page now shares this one rule. */
function ivArr(v){ if(v==null)return null; if(typeof v==='string'){try{v=JSON.parse(v);}catch(e){return null;}} return Array.isArray(v)?v:null; }
function countNats(rows){
  var s={total:rows.length,n20:0,n1:0};
  rows.forEach(function(x){
    if(!/\d*d20/.test(x.dice_notation||''))return;
    var a=ivArr(x.individual_values);
    if(!a||!a.length)return;
    if(a.indexOf(20)>=0)s.n20++;
    if(a.every(function(v){return v===1;}))s.n1++;
  });
  return s;
}
async function rollStats(date){
  try{
    var r=await fetch(SB+'/rest/v1/'+C.rollView+'?session_date=eq.'+date+'&select=dice_notation,individual_values&limit=2000',{headers:HDRS});
    if(!r.ok)return null;
    return countNats(await r.json());
  }catch(e){return null;}
}
/* Initiative order and the five heaviest hits, derived from the same rows as the
   log. Ashfall and WtFF showed these beside their old roll log. */
function rollSummary(rows){
  var init=rows.filter(function(x){return /initiative/i.test(x.roll_type||'')||/initiative/i.test(x.action||'');})
    .map(function(x){return {Character:x.character||'—',Total:x.total};}).sort(function(a,b){return b.Total-a.Total;});
  var hits=rows.filter(function(x){return x.roll_type==='damage';})
    .map(function(x){return {Character:x.character||'—',Damage:x.total||0};}).sort(function(a,b){return b.Damage-a.Damage;});
  var dealt=hits.reduce(function(n,h){return n+h.Damage;},0);
  return '<div class="prose"><h3>Initiative</h3></div>'+(init.length?rowsTable(init):'<p class="muted">No initiative rolls logged.</p>')
    +'<div class="prose"><h3>Heaviest hits</h3></div>'
    +(hits.length?rowsTable(hits.slice(0,5))+'<p class="muted">'+dealt+' damage dealt in total.</p>':'<p class="muted">No damage logged.</p>');
}
async function rollLog(date){
  try{
    var r=await fetch(SB+'/rest/v1/'+C.rollView+'?session_date=eq.'+date+'&select=character,action,roll_type,dice_notation,modifier,total,individual_values,roll_id,timestamp_unix&order=timestamp_unix.asc&limit=2000',{headers:HDRS});
    if(!r.ok)return '<p class="muted">Roll log unavailable.</p>';
    var rows=await r.json(),order=[],g={};
    rows.forEach(function(x){if(!g[x.roll_id]){g[x.roll_id]=[];order.push(x.roll_id);}g[x.roll_id].push(x);});
    var body=order.map(function(id){
      var grp=g[id],pr=null;
      for(var i=0;i<grp.length;i++){if(grp[i].roll_type!=='damage'){pr=grp[i];break;}}
      if(!pr)pr=grp[0];
      var dmg=grp.filter(function(x){return x.roll_type==='damage';}).map(function(x){return x.total;});
      var cls='';
      if(/d20/.test(pr.dice_notation||'')){
        var a=ivArr(pr.individual_values);
        if(a&&a.length){ if(a.indexOf(20)>=0)cls='up'; else if(a.every(function(v){return v===1;}))cls='dn'; }
      }
      return '<tr><td>'+esc(pr.character||'')+'</td><td>'+esc(pr.action||'—')+'</td><td>'+esc(pr.roll_type||'')+'</td>'
        +'<td><span class="'+cls+'">'+esc(pr.total)+(dmg.length?' <span class="muted">/ '+esc(dmg.join(', '))+' dmg</span>':'')+'</span></td></tr>';
    }).join('');
    if(!body)return '<p class="muted">No D&amp;D Beyond rolls synced for this date. Players on physical dice never reach the archive.</p>';
    return '<div class="tbl-wrap"><table><thead><tr><th>Character</th><th>Action</th><th>Type</th><th>Result</th></tr></thead><tbody>'+body+'</tbody></table></div>'
      +(C.rollSummary?rollSummary(rows):'');
  }catch(e){return '<p class="muted">Roll log unavailable.</p>';}
}

/* ── panel renderers ──
   One renderer per shape. A panel whose shape has no renderer falls back to the
   generic table/prose path rather than rendering nothing. */
function rowsTable(items){
  if(!items.length)return '<p class="muted">&mdash;</p>';
  var head=Object.keys(items[0]);
  return '<div class="tbl-wrap"><table><thead><tr>'+head.map(function(h){return '<th>'+esc(h)+'</th>';}).join('')
    +'</tr></thead><tbody>'+items.map(function(r){return '<tr>'+head.map(function(h){return '<td>'+inl(r[h])+'</td>';}).join('')+'</tr>';}).join('')
    +'</tbody></table></div>';
}
var RENDER={
  scenes:function(items){
    return items.map(function(s){
      var ts=s.start?esc(s.start)+'<br>'+esc(s.end||''):'';
      return '<div class="scene"><div class="ts">'+ts+'</div><div><h3 class="st">'+inl(s.title)+'</h3><div class="sb">'+inl(s.body)+'</div></div></div>';
    }).join('');
  },
  quests:function(items){
    return items.map(function(q){
      var d=(q.detail||[]).map(function(x){return '<li>'+inl(x)+'</li>';}).join('');
      return '<div class="quest"><div class="qh"><span class="qt">'+inl(q.title)+'</span>'
        +'<span class="qs'+(q.done?' done':'')+'">'+esc(q.status||(q.done?'Completed':'Open'))+'</span></div>'
        +(d?'<ul>'+d+'</ul>':'')+'</div>';
    }).join('');
  },
  quotes:function(items){
    return items.map(function(q){
      var sp=q.Speaker||q.speaker||'',tx=q.Quote||q.quote||'',tg=q.Tag||q.tag||'';
      /* Speaker and tag carry markdown too: real tags include "**title quote**".
         esc() left those as literal asterisks in the citation line. */
      return '<blockquote class="q">'+inl(tx)+'<cite>&mdash; '+inl(sp)+(tg?' · '+inl(tg):'')+'</cite></blockquote>';
    }).join('');
  },
  profanity:function(items){
    var byWord={},order=[];
    items.forEach(function(r){
      var w=(r['Curse Word']||r.word||'').trim(); if(!w)return;
      if(!byWord[w]){byWord[w]=[];order.push(w);}
      byWord[w].push({who:(r.Speaker||'').replace(/\s*\(.*?\)\s*/,'').trim(),n:parseInt(r.Frequency||'1',10)||1});
    });
    if(!order.length)return rowsTable(items);
    return order.map(function(w){
      return '<div class="word"><div class="w">'+esc(censor(w))+'</div><div class="says">'
        +byWord[w].map(function(e){return '<span>'+esc(e.who)+' ×'+e.n+'</span>';}).join('')+'</div></div>';
    }).join('');
  }
};
function renderPanel(p,key){
  if(!p)return '<p class="muted">Not recorded for this session.</p>';
  if(p.kind==='prose')return '<div class="prose">'+md(p.body_md)+'</div>';
  var items=p.items||[];
  if(!items.length)return '<p class="muted">&mdash;</p>';
  return (RENDER[key]||rowsTable)(items);
}

/* Right rail: reference material that stays visible while the centre changes. */
var REFSPEC=[['loot','Loot & Artifacts'],['npcs','NPCs & Companions'],['locations','Locations'],['profanity','Profanity Record']];

/* Region / waypoint / arc belong with the title, not in the reference rail:
   they describe the session, and keeping them out of the rail is what lets
   Loot & Artifacts sit at the top of it, level with the centre panel. */
function buildWhere(pairs){
  var where=(pairs||[]).filter(function(x){return x[1];});
  if(!where.length)return '';
  return '<dl class="kv where">'+where.map(function(x){
    return '<dt>'+esc(x[0])+'</dt><dd>'+inl(x[1])+'</dd>';
  }).join('')+'</dl>';
}

function buildRefs(byKey){
  var out='';
  REFSPEC.forEach(function(spec,i){
    var p=byKey[spec[0]]; if(!p)return;
    var inner;
    /* A vault note may write loot or locations as a paragraph instead of a table. */
    if(p.kind==='prose'){
      inner=renderPanel(p,spec[0]);
    }else if(spec[0]==='npcs'){
      /* Dots and legend only where a campaign actually records dispositions; an
         all-neutral column would claim a judgement nobody made. */
      inner=(C.dispo?'<div class="legend"><span><i class="dot enemy"></i>Enemy</span><span><i class="dot friendly"></i>Friendly</span><span><i class="dot neutral"></i>Neutral</span></div>':'')
        +(p.items||[]).map(function(r){
          var nm=r.Name||r.name||'';
          return '<div class="item"><span class="t">'+(C.dispo?'<i class="dot '+(C.dispo[nm]||'neutral')+'"></i>':'')+inl(nm)+'</span><span class="m">'+inl(r.Status||'')+'</span></div>';
        }).join('');
    }else if(spec[0]==='loot'){
      inner=(p.items||[]).map(function(r){
        var own=r['Character/Owner']||'',item=r['Item/Artifact']||'',st=r['State/Context']||'';
        return '<div class="item"><span class="t">'+inl(item)+'</span><span class="m">'+inl(st)+(own?(st?' · ':'')+inl(own):'')+'</span></div>';
      }).join('');
    }else if(spec[0]==='locations'){
      inner=(p.items||[]).map(function(r){
        var k=Object.keys(r);
        return '<div class="item"><span class="t">'+inl(r[k[0]])+'</span>'+(k[1]?'<span class="m">'+inl(r[k[1]])+'</span>':'')+'</div>';
      }).join('');
    }else{
      inner=renderPanel(p,spec[0]);
    }
    out+='<details class="card"'+(i===0?' open':'')+'><summary>'+esc(spec[1])+'<span class="caret" aria-hidden="true">&#9662;</span></summary><div class="body">'+inner+'</div></details>';
  });
  var quotes=byKey.quotes;
  if(quotes){
    out+='<details class="card" open><summary>Quotes<span class="caret" aria-hidden="true">&#9662;</span></summary><div class="body">'+renderPanel(quotes,'quotes')+'</div></details>';
  }
  return out;
}

/* `present` is who was at the table (null = the page has no attendance record,
   so nobody is dimmed). `guests` are at the table but not in the standing party.
   The roll archive is NOT a substitute for either: players on physical dice never
   appear in it, so deriving presence from rolls would mark real attendees absent. */
function buildRoster(present,guests){
  guests=guests||[];
  var norm=function(s){return String(s).toLowerCase().replace(/[^a-z]/g,'');};
  var pset=present?present.map(norm):null,gset=guests.map(norm);
  var names=(C.roster||[]).slice();
  (present||[]).concat(guests).forEach(function(n){ if(!names.some(function(k){return norm(k)===norm(n);}))names.push(n); });
  el('roster').innerHTML=names.map(function(n){
    var guest=gset.indexOf(norm(n))>=0;
    var here=!pset||guest||pset.indexOf(norm(n))>=0;
    var c=(C.pcColors&&C.pcColors[n])||'#9A9590';
    var short=n.split(/\s+/)[0];
    var href=C.charHref?C.charHref(n):null;
    return (href?'<a href="'+href+'"':'<span')+' class="pc'+(here?' here':'')+(guest?' guest':'')+'" '
      +'title="'+esc(n)+(guest?' (guest)':'')+(here?'':' (not at the table)')+'" style="color:'+c+'">'
      +'<span class="disc">'+esc(short.charAt(0))+'</span><span class="nm">'+esc(short)+'</span>'+(href?'</a>':'</span>');
  }).join('');
  if(pset&&names.some(function(n){return pset.indexOf(norm(n))<0&&gset.indexOf(norm(n))<0;})){
    el('rosternote').hidden=false;el('rosternote').textContent='Dimmed: not at the table this session.';
  }
}

/* The POV journal is a <details> with NO `open` attribute: collapsed by default
   on every campaign. Do not add `open` here to "fix" an empty-looking page; the
   summary carries a labelled control that says it expands. */
function shell(){
  return '<header class="topbar">'
    +'<nav class="crumb" aria-label="Breadcrumb"><a href="/">Rectrix Caedere</a><span class="sep">&rsaquo;</span><a href="'+C.home+'">'+esc(C.campaign)+'</a><span class="sep">&rsaquo;</span><span class="here">Session Notes</span></nav>'
    +'<a class="wordmark" href="/">RECTRIX CAEDERE</a>'
    +'<div class="topright"><label class="search">'
    +'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 105.3 14l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>'
    +'<input id="q" type="search" placeholder="Search characters, NPCs, items&hellip;" aria-label="Search this session"></label>'
    +'<div class="acct"><span class="av" aria-hidden="true">&#9737;</span><span id="who">Guest</span></div></div>'
    +'</header>'
    +'<div id="body"><div class="shell" id="shell" hidden>'
    +'<aside class="rail">'
    +'<div><div class="roster" id="roster"></div><div class="rosternote" id="rosternote" hidden></div></div>'
    +'<div class="rule"></div>'
    +'<section class="player" id="player" hidden><h3>Session recording</h3><div class="parts" id="parts"></div>'
    +'<div class="pbar" id="pbar">'
    +'<button class="play" id="play" type="button" aria-label="Play recording">'
    +'<svg class="ic-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
    +'<svg class="ic-pause" viewBox="0 0 24 24" aria-hidden="true" style="display:none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg></button>'
    +'<div class="track" id="track" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="fill" id="fill"></div><div class="knob" id="knob"></div></div>'
    +'<div class="time"><span id="cur">0:00</span> / <span id="dur">0:00</span></div></div>'
    +'<div class="lost-note" id="lostnote" hidden></div><audio id="audio" preload="none"></audio></section>'
    +'<div id="where"></div><div class="rule"></div>'
    +'<nav class="nav" id="nav" aria-label="Section"></nav>'
    +'</aside>'
    +'<header class="stage-head"><div class="eyebrow" id="eyebrow">'+esc(C.campaign)+'</div><h1 class="stitle" id="stitle">Loading&hellip;</h1><div class="sdate" id="sdate"></div><div class="chips" id="chips"></div></header>'
    +'<details class="pov" id="pov"><summary>'
    +'<span class="lbl">'+esc(C.povLabel)+'</span><span class="byline" id="byline"></span>'
    +'<span class="hint"><span class="when-closed" id="povhint">Read the journal</span><span class="when-open">Close the journal</span><span class="caret" aria-hidden="true">&#9662;</span></span>'
    +'</summary><div class="prose" id="povbody"></div></details>'
    +'<section class="panel" id="panel" aria-live="polite"><h2 id="panelh">&mdash;</h2><div id="panelbody"></div></section>'
    +'<aside class="refs" id="refs"></aside>'
    +'<nav class="snav" id="snav" aria-label="Adjacent sessions"></nav>'
    +'</div><div class="err" id="err" hidden></div></div>'
    +'<footer>Rectrix Caedere &nbsp;&#10022;&nbsp; '+esc(C.campaign)+' &nbsp;&#10022;&nbsp; <a href="'+C.archive.href+'">'+esc(C.archive.label)+'</a></footer>';
}
function fail(msg){
  el('err').hidden=false;
  el('err').innerHTML=esc(msg)+' <a href="'+C.archive.href+'">Go to '+esc(C.archive.label)+'</a>';
}

/* ── boot ── */
async function mount(cfg){
  C=cfg;
  var SELF=location.pathname.split('/').pop()||'session.html';
  el('session').innerHTML=shell();
  var n=getN();
  if(!n){fail('No session specified.');return;}

  var d;
  try{ d=await C.load(n); }
  catch(e){ console.warn('session: load failed:',e); fail(e&&e.message?e.message:'Could not load this session.'); return; }
  var byKey=d.panels||{};

  document.title=d.label+' · '+d.title+' — '+C.campaign;
  el('eyebrow').textContent=C.campaign+' · Session '+d.label;
  el('stitle').textContent=d.title;
  if(d.titleClass)el('stitle').classList.add(d.titleClass);
  el('sdate').textContent=d.dateLabel||fmtDate(d.date);
  el('shell').hidden=false;

  buildRoster(d.present||null,d.guests);
  mountAudio(d.recording);

  el('where').innerHTML=buildWhere(d.where);

  /* The POV card always renders. When a session has no cleared journal it says
     so, rather than disappearing and leaving a hole where another session has a
     card; a silent gap read as a broken page. */
  if(d.pov){
    el('byline').textContent=d.pov.byline;
    el('povbody').innerHTML=md(d.pov.md);
  }else{
    el('byline').textContent='Not written for this session';
    el('povhint').textContent='Details';
    el('povbody').innerHTML=C.povEmpty||'<p class="muted">No in-character account has been published for this session.</p>';
  }

  /* Every section is listed every time. Ones this note never recorded render
     disabled rather than being dropped, so the rail is stable across sessions:
     a thin early note with ten entries silently hidden looked like a rendering
     failure. */
  var nav=C.nav;
  var first=null;
  el('nav').innerHTML=nav.map(function(x){
    var k=x[0],p=byKey[k],live=(k==='rolllog')||!!p;
    if(live&&first===null)first=k;
    var tag='';
    if(p&&p.kind==='list')tag='<span class="n">'+(p.items||[]).length+'</span>';
    else if(!live)tag='<span class="n">not recorded</span>';
    return '<button type="button" data-k="'+k+'"'+(live?'':' disabled')
      +' aria-current="false">'+esc(x[1])+tag+'</button>';
  }).join('');

  var logCache=null;
  async function show(k){
    Array.prototype.forEach.call(el('nav').children,function(b){b.setAttribute('aria-current',b.dataset.k===k?'true':'false');});
    var label=(nav.find(function(x){return x[0]===k;})||[,k])[1];
    el('panelh').textContent=label;
    if(k==='rolllog'){
      if(logCache===null){ el('panelbody').innerHTML='<p class="muted">Loading rolls…</p>'; logCache=await rollLog(d.date); }
      el('panelbody').innerHTML=logCache;
    }else{
      el('panelbody').innerHTML=renderPanel(byKey[k],k);
    }
  }
  el('nav').addEventListener('click',function(e){
    var b=e.target.closest('button[data-k]'); if(b&&!b.disabled)show(b.dataset.k);
  });
  if(first)show(first);

  el('refs').innerHTML=buildRefs(byKey);

  var ss=d.sessions,idx=d.idx;
  var prev=idx>0?ss[idx-1]:null, next=idx<ss.length-1?ss[idx+1]:null;
  el('snav').innerHTML=
    (prev?'<a href="'+SELF+'?n='+encodeURIComponent(prev.label)+'"><span class="l">&larr; Session '+esc(prev.label)+'</span><span class="t">'+esc(prev.title)+'</span></a>'
        :'<a class="off"><span class="l">&larr; Previous</span><span class="t">&mdash;</span></a>')
   +(next?'<a href="'+SELF+'?n='+encodeURIComponent(next.label)+'"><span class="l">Session '+esc(next.label)+' &rarr;</span><span class="t">'+esc(next.title)+'</span></a>'
        :'<a class="off"><span class="l">Next &rarr;</span><span class="t">&mdash;</span></a>');

  var st=await rollStats(d.date);
  var chips=[];
  if(st){
    chips.push('<span class="chip">'+st.total+' rolls</span>');
    chips.push('<span class="chip up">nat 20 × '+st.n20+'</span>');
    chips.push('<span class="chip dn">nat 1 × '+st.n1+'</span>');
  }
  (d.tags||[]).forEach(function(t){chips.push('<span class="chip on">'+esc(t)+'</span>');});
  el('chips').innerHTML=chips.join('');

  /* Search filters the panel currently on screen plus the reference rail. It is a
     within-session filter, not a site search; saying so in the placeholder would
     be better than letting someone expect cross-session results. */
  el('q').addEventListener('input',function(){
    var term=this.value.trim().toLowerCase();
    var scopes=[el('panelbody'),el('refs')];
    scopes.forEach(function(scope){
      var rows=scope.querySelectorAll('.item,.q,.word,.scene,.quest,tbody tr');
      Array.prototype.forEach.call(rows,function(r){
        r.style.display=(!term||r.textContent.toLowerCase().indexOf(term)>=0)?'':'none';
      });
    });
  });
}

return {mount:mount,SB:SB,HDRS:HDRS,
  /* exposed for tests/session-layout.test.mjs only */
  _t:{esc:esc,fmtDate:fmtDate,censor:censor,countNats:countNats,rowsTable:rowsTable,renderPanel:renderPanel,buildWhere:buildWhere,shell:shell,setConfig:function(c){C=c;}}};
})();
if(typeof module!=='undefined')module.exports=SessionLayout;
