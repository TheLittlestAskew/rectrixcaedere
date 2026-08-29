var T={bgVoid:'#050A0E',bgCard:'#0E1820',bgCardInner:'#0B1219',goldDark:'#68442F',goldMid:'#8C5D3F',gold:'#C7A369',goldBright:'#DA9565',goldPale:'#E8C690',text1:'#E8E4DC',text2:'#9A9590',text3:'#9A9590',success:'#6E7C5A',danger:'#B7634D',info:'#4A7387',mystic:'#8A6B82',warn:'#AF755A',fLabel:"'Alegreya Sans SC',sans-serif",text2xs:9,textXs:10,goldAlpha5:'rgba(199,163,105,0.05)',goldAlpha8:'rgba(199,163,105,0.08)',goldAlpha10:'rgba(199,163,105,0.10)',goldAlpha30:'rgba(199,163,105,0.30)'};
var h=React.createElement,us=React.useState,ue=React.useEffect;
var AC=Recharts.AreaChart,A=Recharts.Area,PC=Recharts.PieChart,Pi=Recharts.Pie,Ce=Recharts.Cell,XA=Recharts.XAxis,YA=Recharts.YAxis,CG=Recharts.CartesianGrid,Tt=Recharts.Tooltip,RC=Recharts.ResponsiveContainer,Lg=Recharts.Legend,BC=Recharts.BarChart,Bar=Recharts.Bar,RL=Recharts.ReferenceLine;
var D=[{id:1,nm:'Sky Is The Limit',sn:'SITL',st:'a',vault:'sitl_vault',tr:946,ch:6,se:15,n20:44,n1:41,fr:'2025-10-12',lr:'2026-05-03',sd:[{d:'S01',r:67},{d:'S02',r:81},{d:'S03',r:99},{d:'S04',r:88},{d:'S05',r:66},{d:'S06',r:160},{d:'S07',r:22},{d:'S08',r:59},{d:'S09',r:22},{d:'S10',r:70},{d:'S11',r:13},{d:'S12',r:36},{d:'S13',r:63},{d:'S14',r:20},{d:'S15',r:28}],rt:[{n:'Check',v:534,c:T.gold},{n:'Roll',v:142,c:T.mystic},{n:'Damage',v:99,c:T.danger},{n:'Save',v:83,c:T.success},{n:'To Hit',v:74,c:T.info},{n:'Heal',v:14,c:T.warn}],ac:[{n:'Skill',v:461,c:T.gold},{n:'Attack',v:186,c:T.danger},{n:'Custom',v:103,c:T.goldMid}],pf:[{d:'S01',n:3},{d:'S02',n:2},{d:'S03',n:2},{d:'S04',n:1},{d:'S05',n:2},{d:'S06',n:1},{d:'S07',n:1},{d:'S08',n:2},{d:'S09',n:2},{d:'S10',n:5},{d:'S11',n:7},{d:'S12',n:7},{d:'S13',n:12},{d:'S14',n:12},{d:'S15',n:4}],pfTop:'Kit \u00b7 33',oq:47,chars:[{n:'Darby Stonefeather',r:197,avg:11.5,tr:-0.9},{n:'Kit Aluri',r:192,avg:10.8,tr:-0.2},{n:"Amanita de'Champignon",r:172,avg:10.7,tr:-1.5},{n:'Blarg',r:167,avg:11.6,tr:0.2},{n:'Binks Stonevein',r:131,avg:10.1,tr:-1.8},{n:'Aeolus',r:81,avg:10.8,tr:0}]},{id:2,nm:'Pacts & Power',sn:'P&P',st:'a',vault:'pacts_power_vault',tr:2907,ch:5,se:72,n20:109,n1:117,fr:'2023-01-29',lr:'2026-04-21',sd:[{d:"Q1'23",r:149},{d:"Q2'23",r:288},{d:"Q3'23",r:234},{d:"Q4'23",r:206},{d:"Q1'24",r:164},{d:"Q2'24",r:103},{d:"Q3'24",r:81},{d:"Q4'24",r:123},{d:"Q1'25",r:110},{d:"Q2'25",r:78},{d:"Q3'25",r:199},{d:"Q4'25",r:189},{d:"Q1'26",r:188},{d:"Q2'26",r:191}],rt:[{n:'Check',v:1117,c:T.gold},{n:'Damage',v:509,c:T.danger},{n:'Roll',v:492,c:T.mystic},{n:'To Hit',v:459,c:T.info},{n:'Save',v:294,c:T.success},{n:'Heal',v:35,c:T.warn}],ac:[{n:'Skill',v:934,c:T.gold},{n:'Attack',v:664,c:T.danger},{n:'Custom',v:352,c:T.goldMid}],pf:[],oq:null,chars:[{n:'Orphie Levistus',r:1172,avg:10.6,tr:0.1},{n:'Varis Aestra',r:817,avg:10.2,tr:1.0},{n:'Sanis Reylana',r:458,avg:9.8,tr:-1.2},{n:'Rinestra Genleth',r:128,avg:10.5,tr:0},{n:'Braun',r:54,avg:10.2,tr:0}]},{id:3,nm:'Ashfall Britannia',sn:'AFB',st:'a',vault:'ashfall_vault',tr:855,ch:7,se:8,n20:29,n1:22,fr:'2025-11-08',lr:'2026-05-04',sd:[{d:'S01',r:196},{d:'S02',r:93},{d:'S03',r:125},{d:'S04',r:163},{d:'S05',r:81},{d:'S06',r:51},{d:'S07',r:47},{d:'S08',r:44}],rt:[{n:'Check',v:273,c:T.gold},{n:'Damage',v:192,c:T.danger},{n:'Roll',v:172,c:T.mystic},{n:'To Hit',v:163,c:T.info},{n:'Save',v:47,c:T.success},{n:'Heal',v:8,c:T.warn}],ac:[{n:'Skill',v:235,c:T.gold},{n:'Attack',v:261,c:T.danger}],pf:[],oq:null,chars:[{n:'Flux',r:145,avg:11.4,tr:-0.2},{n:'Barrett Grimmskar',r:137,avg:10.4,tr:0.3},{n:'Samothy Smith-Wesson',r:118,avg:10.1,tr:-0.3},{n:'Deanna Smith-Wesson',r:117,avg:10.4,tr:0.1},{n:'Vega Bloodroot',r:117,avg:10.8,tr:0.1},{n:'Zelda \"Z\" Whipper',r:101,avg:11.1,tr:-0.3},{n:'Valerian Hellebore',r:93,avg:10.1,tr:1.0}]},{id:4,nm:'Where the Flowers Forget',sn:'WTFF',st:'a',vault:'wtff_vault',tr:20,ch:6,se:1,n20:0,n1:1,fr:'2026-06-14',lr:'2026-06-14',sd:[{d:'S01',r:20}],rt:[{n:'Check',v:20,c:T.gold}],ac:[{n:'Skill',v:20,c:T.gold}],pf:[],oq:null,chars:[{n:'Tobias Wolfe',r:5,avg:'--',tr:0},{n:'Eliza Duskbloom',r:4,avg:'--',tr:0},{n:'Isla "Bruin" Kaplan',r:3,avg:'--',tr:0},{n:'Zarna Morganach',r:3,avg:'--',tr:0},{n:'BE-BO',r:2,avg:'--',tr:0},{n:'Artie Veyr',r:1,avg:'--',tr:0}]}];

function BL(){return h('svg',{viewBox:'0 0 60 60',fill:'none',width:44,height:44},h('defs',null,h('linearGradient',{id:'blg',x1:0,y1:0,x2:0,y2:1},h('stop',{offset:'0%',stopColor:T.goldBright}),h('stop',{offset:'50%',stopColor:T.gold}),h('stop',{offset:'100%',stopColor:T.goldMid}))),h('path',{d:'M30 4 L37 28 L34 31 L30 56 L26 31 L23 28 Z',fill:'url(#blg)',opacity:.9}),h('line',{x1:30,y1:6,x2:30,y2:54,stroke:T.bgCardInner,strokeWidth:'.7',opacity:.4}),h('path',{d:'M20 29 L30 33 L40 29 L30 25 Z',fill:'url(#blg)',opacity:.6}),h('path',{d:'M30 1 L31 3.5 L30 2.8 L29 3.5 Z',fill:T.goldBright,opacity:.5}))}

function NI(p){var d={overview:h('path',{d:'M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),characters:h('g',null,h('circle',{cx:8,cy:5,r:3,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M2 14 Q2 10 8 10 Q14 10 14 14',stroke:'currentColor',strokeWidth:'1.1',fill:'none'})),combat:h('path',{d:'M8 2 L10 6 L8 14 L6 6Z M4 7 L12 7',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),skills:h('circle',{cx:8,cy:8,r:6,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),luck:h('path',{d:'M4 4 A4 4 0 0 1 12 4 Q12 8 8 12 Q4 8 4 4',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),sessions:h('rect',{x:2,y:3,width:12,height:10,rx:1,stroke:'currentColor',strokeWidth:'1.1',fill:'none'})};return h('svg',{className:'ni',viewBox:'0 0 16 16',fill:'none'},d[p.i])}

function CTT(p){if(!p.active||!p.payload||!p.payload.length)return null;return h('div',{className:'ctt'},h('div',{className:'tl2'},p.label),p.payload.map(function(d,i){return h('div',{key:i,className:'tv',style:{color:d.color||T.text1}},d.value.toLocaleString()+' rolls')}))}
function PTT(p){if(!p.active||!p.payload||!p.payload.length)return null;var d=p.payload[0],pct=d.payload.tot>0?(d.value/d.payload.tot*100).toFixed(1):'0';return h('div',{className:'ctt'},h('div',{className:'tl2'},d.name),h('div',{className:'tv'},d.value.toLocaleString()+' ('+pct+'%)'))}

function AreaC(p){return h(RC,{width:'100%',height:190},h(AC,{data:p.data,margin:{top:8,right:8,left:-18,bottom:0}},h('defs',null,h('linearGradient',{id:'ag',x1:0,y1:0,x2:0,y2:1},h('stop',{offset:'0%',stopColor:T.goldBright,stopOpacity:.35}),h('stop',{offset:'50%',stopColor:T.gold,stopOpacity:.12}),h('stop',{offset:'100%',stopColor:T.goldMid,stopOpacity:.02}))),h(CG,{strokeDasharray:'3 3',vertical:false}),h(XA,{dataKey:'d',tick:{fill:'#B4ADA2',fontFamily:T.fLabel,fontSize:11,letterSpacing:1},axisLine:{stroke:T.goldAlpha10},tickLine:false,interval:1,minTickGap:8,angle:0,textAnchor:'middle',height:26}),h(YA,{tick:{fill:'#8F897F',fontFamily:T.fLabel,fontSize:10},axisLine:false,tickLine:false,width:32}),h(Tt,{content:h(CTT)}),h(A,{type:'monotone',dataKey:'r',stroke:T.goldBright,strokeWidth:2,fill:'url(#ag)',dot:{r:2.5,fill:T.goldBright,strokeWidth:0},activeDot:{r:4,fill:T.goldBright,stroke:T.bgVoid,strokeWidth:2}})))}

function PieC(p){var tot=p.data.reduce(function(s,d){return s+d.v},0);var dt=p.data.map(function(d){return{name:d.n,value:d.v,color:d.c,tot:tot}});return h(RC,{width:'100%',height:228},h(PC,null,h(Pi,{data:dt,cx:'50%',cy:'50%',innerRadius:48,outerRadius:90,paddingAngle:2,dataKey:'value',stroke:'none'},p.data.map(function(e,i){return h(Ce,{key:i,fill:e.c})})),h(Tt,{content:h(PTT)}),h(Lg,{iconType:'circle',iconSize:6,wrapperStyle:{fontFamily:T.fLabel,fontSize:T.textXs,letterSpacing:'1px'}})))}

function PH(p){return h('div',{className:'ph'},h('span',{className:'star'},'*'),h('h3',null,p.title),p.sub&&h('span',{className:'psub'},p.sub))}

// Art Nouveau double-line corner bracket (drawn top-left; CSS mirrors it to the other three corners).
function KCorner(p){var c=p.c||T.gold;return h('svg',{className:'k-corner '+(p.cls||''),viewBox:'0 0 44 44',fill:'none','aria-hidden':'true'},
  h('path',{d:'M3 43 L3 17 Q3 3 17 3 L43 3',stroke:c,strokeWidth:1,opacity:.5}),
  h('path',{d:'M9 43 L9 19 Q9 9 19 9 L43 9',stroke:c,strokeWidth:.7,opacity:.26}),
  h('circle',{cx:17,cy:3,r:1.4,fill:c,opacity:.6}),
  h('circle',{cx:3,cy:17,r:1.4,fill:c,opacity:.6}),
  h('path',{d:'M9 20 q-5 -1 -7 -6 q6 0 8 5 z',fill:c,opacity:.3}))}
// Faint per-card sigil sitting behind the number. One simple symbol per metric — the frame carries the magic.
function KSigil(p){var c=p.c||T.gold;var g={
  d20:h('g',{stroke:c,strokeWidth:1.4,fill:'none'},h('path',{d:'M50 6 L90 29 L90 71 L50 94 L10 71 L10 29 Z'}),h('path',{d:'M50 6 L50 40 M10 29 L50 40 L90 29 M10 71 L50 40 L90 71 M50 94 L50 40'})),
  moon:h('path',{d:'M64 14 a38 38 0 1 0 0 72 a30 30 0 1 1 0 -72 Z',fill:c,fillRule:'evenodd'}),
  star:h('g',{fill:c},h('path',{d:'M50 4 L58 42 L96 50 L58 58 L50 96 L42 58 L4 50 L42 42 Z'}),h('path',{d:'M50 22 L54 46 L78 50 L54 54 L50 78 L46 54 L22 50 L46 46 Z',opacity:.45})),
  laurel:h('g',{stroke:c,strokeWidth:1.4,fill:'none'},h('path',{d:'M50 94 Q24 72 30 28 M50 94 Q76 72 70 28'}),h('path',{d:'M33 46 q-10 -3 -12 -12 M39 62 q-10 -3 -12 -12 M67 46 q10 -3 12 -12 M61 62 q10 -3 12 -12',opacity:.7})),
  key:h('g',{stroke:c,strokeWidth:1.6,fill:'none'},h('circle',{cx:50,cy:28,r:14}),h('circle',{cx:50,cy:28,r:5,fill:c,stroke:'none'}),h('path',{d:'M50 42 L50 88 M50 70 L64 70 M50 78 L60 78'}))};
  return h('svg',{className:'k-sigil',viewBox:'0 0 100 100',fill:'none','aria-hidden':'true'},g[p.s]||null)}

function Kpi(p){
  var ac=p.ac||T.gold;
  var style=p.bg?{backgroundImage:'url('+p.bg+')',backgroundSize:'100% 100%',backgroundPosition:'center'}:{};
  return h('div',{className:'panel kpi ai '+(p.cn||'')+' d'+p.dl,style:style},
    h('div',{className:'k-accent',style:{background:'linear-gradient(90deg,transparent,'+ac+',transparent)'}}),
    h(KCorner,{c:ac,cls:'tl'}),h(KCorner,{c:ac,cls:'tr'}),h(KCorner,{c:ac,cls:'bl'}),h(KCorner,{c:ac,cls:'br'}),
    p.sig&&h(KSigil,{c:ac,s:p.sig}),
    h('div',{className:'kl'},p.label),
    h('div',{className:'kv'},typeof p.value==='number'?p.value.toLocaleString():p.value),
    p.sub&&h('div',{className:'ks'},p.sub))
}

function CharTable(p){
  var rows=p.data||[];
  if(!rows.length)return h('p',{style:{color:T.text3,textAlign:'center',padding:'60px 0'}},'No data');
  return h('div',{style:{overflowY:'auto',maxHeight:218,scrollbarWidth:'none'}},
    h('table',{className:'char-tbl'},
      h('thead',null,h('tr',null,h('th',null,'Character'),h('th',null,'Rolls'),h('th',null,'Avg d20'),h('th',null,'Trend'))),
      h('tbody',null,rows.map(function(r,i){
        var flat=r.tr===0,up=r.tr>0;
        var cls=flat?'':(up?'up':'dn');
        var txt=flat?'\u2014':((up?'+':'')+r.tr.toFixed(1));
        return h('tr',{key:i},h('td',null,r.n),h('td',null,r.r.toLocaleString()),h('td',null,r.avg),h('td',{className:cls},txt))
      }))
    )
  )
}

var QO=[{t:"Aeolus's Spider Curse",d:"Cursed by Lolth gemstone (S01). All spiders attack on sight. Requires Remove Curse or returning gem to a drow worshipper. Aeolus confirmed in S11 he \"gave away the diamond\" and no longer has the curse (needs DM confirmation). Giant Spider in S12 did not specifically target Aeolus — curse may be lifted.",s:"S01"},{t:"Sarith Kzekarit / Neverlight Grove",d:"Sarith escaped during S02, told Kit to find him at Neverlight Grove. Said \"They're coming\"",s:""},{t:"Jimjar's Disappearance",d:"Taken from cell overnight (S01); no one saw what happened",s:"S01"},{t:"Buppido's Fate",d:"Sacrificed to spiders but dropped into pool; body not recovered (S01). Per Addison: \"Buppido escaped his execution\"",s:"S01"},{t:"Shuushar's Fate",d:"Fell into pool (S01). Per Addison: if alive, likely went toward Sloopludop",s:"S01"},{t:"Amanita's D4 Loot",d:"Rolled 4 additional items from barracks chest (S01); DM never specified what they were",s:"S01"},{t:"Kit's Silvered Crowbar Silvering",d:"Crowbar tip spontaneously silvered during/before Topsy's death (S04-S05). Transmutation magic confirmed; source unknown",s:"S04-S05"},{t:"Faerzress Corruption",d:"The ambient magical energy in the Underdark appears corrupted by chaotic/fiendish influence. Caused involuntary wererat transformation (S04). Destabilizes The Feydark portal (S09). Connected to the corrupted entity (S11).",s:"S11"},{t:"The Corrupted Entity",d:"Female entity from the Abyss. Twisted reflection of Psilofyr. Seeks to control death/rot. Naos infiltrated her and is now in danger. Name unknown — Naos \"dare not speak\" it. Psilofyr, Naos, and Binks/Darby visions all warn of this threat. (S10-S11)",s:"S10-S11"},{t:"Naos Rescue",d:"Naos's avatar dissolved after giving Aeolus the ring. His \"real form\" is infiltrating the corrupted entity and is in danger. Aeolus must rescue him. (S11)",s:"S11"},{t:"Demon Lords in the Underdark",d:"Gray Ooze telepathically broadcast \"Flesh for the Faceless Lord\" (first Juiblex reference, S03). Vrock and chasmes appeared at Velkynvelve (S01-S02). Dragon statue in Oozing Temple may be connected (S06). Psilofyr's visions warned of a \"great evil\" / \"chaotic entity\" threatening the balance of life and death (S10-S11).",s:"S10-S11"},{t:"Topsy & Turvy's Reluctance",d:"Both twins were reluctant to return to Blingdenstone; reason unknown",s:""},{t:"Amanita's Corruption Dreams",d:"Increasingly bad dreams of Neverlight Grove being corrupted by dark, oily presence (S01-S02)",s:"S01-S02"},{t:"Purple Eyes",d:"A drow guard's eyes briefly turned from red to purple during Amanita's barracks interaction (S01); possible early sign of demonic corruption",s:"S01"},{t:"Stool's Empowerment Arc",d:"Sprout developing toward adult transition. Stabilized (Spare the Dying, S14) and healed (Cure Wounds 9 HP, S14). Near full HP. Communicating telepathically. Excited about possibly heading to Neverlight Grove.",s:""},{t:"Dragon Statue Mystery",d:"Ooze remains reformed into dragon statue in Oozing Temple. Eyes lit up when last ooze died. Identity/purpose unknown. (S06)",s:"S06"},{t:"Blarg's Moon Flask",d:"Flask with moon shard that brightens/dims. Found in safe house. Given to Turvy (S05). Mechanics not yet established.",s:"S05"},{t:"Darby's Green Flame Mace",d:"Magical mace. Fire damage baseline; dealt radiant during S08. DM upgraded extra damage from +1 flat to D4 (S08). May alternate between fire and radiant.",s:"S08"},{t:"Turvy's Conditional Terms",d:"Pledged to control lycanthropy. Kit set terms: party comes first. If he loses control, Kit won't hesitate. (S06)",s:"S06"},{t:"Darby's Ancestral Awakening",d:"First rage manifested spectral ax beak feathers, whirlwind, and radiant energy (S08). DM prompted deity connection; Darby described generational connection to ax beak farming ancestors. Axe Beak rage option added via empowered totem (S11).",s:"S11"},{t:"Roxanne's Chest of Holding",d:"Extradimensional storage chest fused to Roxanne's back. Password: \"Roxanne\" (Dwarvish). Now in zurkhwood saddle form (S11). Exact capacity not yet specified by DM. (S09)",s:"S09"},{t:"Blarg's Impeded Moon Connection",d:"Religion check 9 (S08) revealed impeded connection to the moon at depth. Could affect Moonbeam, Wild Shape, Channel Divinity effectiveness deep in the Underdark. Moonbeam felt \"maybe even a little bit weaker\" in the Feydark (S10).",s:"S10"},{t:"Amanita's Champion Path",d:"Psilofyr showed four possible future forms: arch druid, mycelial shield-bearer, barbaric myconid sovereign, or direct Carrion King patron champion. Choice must be made \"when the time comes.\" (S11)",s:"S11"},{t:"Growth Items",d:"DM confirmed all empowered trinkets are \"growth items\" that improve at certain level thresholds (S11). Trinket empowerments confirmed S13 pre-session: Kit's Ring of Mind Shielding +1 STR, Aeolus's Ring of Spell Storing +1 WIS, Blarg's Goblin Carving +1 CHA, Darby's Axebeak form +1 CHA, Darby's Pipe +1 INT. Binks's trinket empowerment NOT tracked.",s:"S11"},{t:"Fey Touched Spell Choices",d:"All PCs received Fey Touched feat (S11). Confirmed S12: Kit = Hunter's Mark, Darby = Animal Friendship, Binks = Tasha's Hideous Laughter, Amanita = Thorn Whip. Aeolus's choice not yet stated. Blarg absent S12 (choice TBD). S13: Turvy assigned Silver Barbs. Topsy's spell pending (Matt to choose).",s:"S11"},{t:"Kit's Isolation from Psilofyr",d:"Kit was the only PC who did not receive a vision or comfort in the Feydark (S10). Her \"gift\" came through a scripted nightmare she couldn't win (S11). Narratively significant pattern.",s:"S11"},{t:"Binks's Duplicate Mind Shielding",d:"Binks has both the Ring of Mind Shielding (pre-campaign) and the loot pick with Mind Shielding properties (S11). Redundancy/stacking TBD.",s:"S11"},{t:"Insectoid Creature in the Pool",d:"Large insectoid creature with tentacles emerged from the Fungal Pond pool as party entered the portal. Nat 1 attack on Kit — missed. Identity unknown. (S10)",s:"S10"},{t:"Eldeth's Mission",d:"Departed through Gauntlgrym portal (S11) to warn the dwarven kings. Promised to bring reinforcements and return.",s:"S11"},{t:"Kit's Sentient Doll",d:"Uses \"Sentient Armor\" stat block per Addison (S13). Exact capabilities TBD.",s:"S13"},{t:"Sylophir",d:"Feydark NPC. 3 different spellings in S13 transcript. Standardized to \"Sylophir\" pending DM confirmation.",s:""},{t:"Quaggoth Allegiance Shift",d:"Quaggoths shifted allegiance to Derendil as new alpha after Ilvara's fall (S13). Implications for party's control of Velkynvelve TBD.",s:"S13"},{t:"Binks's Trinket Empowerment",d:"Not explicitly reviewed in Addison's S13 pre-session, but S11 documented it as +1 STR with Ring of Mind Shielding properties. No dispute at table. Accepted as confirmed.",s:""},{t:"Binks's Madness Points",d:"Binks gained 1 madness point (S14) from desecrating the Shrine of Lolth. Rolled 84 on d100 madness table → stunned condition. Track across sessions.",s:"S14"},{t:"Garruk's Escape",d:"Drow crossbowman escaped Velkynvelve with Ilvara's body and Shoor's riding lizard under cover of Darkness (S14). If he reaches Menzoberranzan before Artaxle, the drow will know what really happened.",s:"S14"},{t:"Artaxle's Mission to Menzoberranzan",d:"Young drow heading to Menzoberranzan with false intel (blaming demons for Velkynvelve's fall). If caught as a deceiver, likely executed. Jorlan's protégé. Eyes flash purple (possible demonic corruption connection). (S14)",s:"S14"},{t:"Society of Brilliance",d:"Group of intelligent monsters investigating faerzress anomalies. Members include a mind flayer (Grazilaxx), a derro, a troglodyte, and a kuo-toa. Travel throughout the Underdark. Prefer diplomacy. May be found between Velkynvelve and Menzoberranzan. Jorlan's deathbed intel (S14).",s:"S14"},{t:"Drizzt Do'Urden",d:"Legendary drow who overcame Lolth's power. Ally of dwarves. Still alive. May be found near Gauntlgrym with King Bruenor Battlehammer. Jorlan asked Kit to tell Drizzt about him. (S14)",s:"S14"},{t:"Shoor's Black Velvet Mask",d:"Silver-threaded spiderweb pattern. Needs Identify for potential magical properties. Found in Shoor's quarters. (S14)",s:"S14"},{t:"Shrine of Lolth Desecration",d:"Binks cast Ceremony (Atonement) on the Lolth statue. Half transformed into Garl Glittergold giving Lolth the middle finger. 4 jet eyes turned to gold. Faerzress shifted purple to gold. Entire party gained Blessed (d4 to attacks/saves) for 24 hours. Quaggoths fled. Lolth may now be aware of the party. (S14)",s:"S14"},{t:"Travel to Sloobludop",d:"7 days travel from Velkynvelve (corrected from 8, S15). Party's next destination. Party established marching order with Roxy carrying riders (Darby, Aeolus, Amanita, Stool). Binks and Kit scouting on foot. Blarg walking. Topsy/Turvy near Binks. Days 1–2 quiet (no encounters). Day 3 quiet. Day 4: Fungal Cavern found. Halfway through journey. Downtime activities: Binks teaching Undercommon/Sylvan, Blarg/Amanita foraging, Kit attuning to gear. (S14–S15)",s:"S14–S15"},{t:"Jorlan's Cloak",d:"Lieutenant cloak with family crest. Confirmed as Cloak of Elvenkind (S15). Kit attuned via humming ritual during travel. Grants stealth bonus. Kit experienced a brief déjà vu/memory during attunement that she couldn't place before Addison's connection froze. Possible story hook. (S14–S15)",s:"S14–S15"},{t:"Kit's Déjà Vu During Attunement",d:"While humming and attuning to Jorlan's cloak, Kit felt a familiar memory at the tip of her mind — something she recognized but couldn't place. Addison's connection froze mid-narration (~00:35:35). Possible lost content. Ask DM what Kit was about to remember. (S15)",s:"S15"},{t:"Jorlan's Bracers",d:"+1 AC (not Bracers of Defense). DM ruling: effective as long as not wearing a shield; can still wear armor. (S14–S15)",s:"S14–S15"},{t:"Ring of Spell Storing Loading",d:"Binks offered to cast spells into Aeolus's Ring of Spell Storing (3 levels free, Darkness already stored). Discussed Shield of Faith, Invisibility, Bless, Disguise Self, Tasha's Hideous Laughter. No decision made this session. (S15)",s:"S15"},{t:"Darkness Safety Word",d:"Party agreed they need a coordinated safety word for when Aeolus casts Darkness. Meaning: \"get close to Aeolus.\" Word not yet chosen. (S15)",s:"S15"},{t:"Topsy & Turvy Rummaging",d:"Twins observed methodically going through party gear and Roxy's saddlebags on a daily basis. Not malicious but noted. Also working on fitting armor to themselves. (S15)",s:"S15"}];
var QR=[{t:"Asha Vandree's Fate",d:"DEAD (S14). Killed by Darby's Fire Mace (attack of opportunity, 20 damage) when she attempted to flee into Garruk's magical darkness.",s:"S14"},{t:"Drow Elite's Fate",d:"Surrendered (S14). Persuaded by Kit's nat 20 Persuasion speech. Dropped weapons and knelt. Said Kit had earned his \"respect.\"",s:"S14"},{t:"Jorlan Duskryn's Status",d:"DEAD (S14). Died in Kit's arms in the northern watchpost. Refused healing. Passed on key lore: Drizzt Do'Urden, Society of Brilliance, and faith in Artaxle.",s:"S14"},{t:"Escape Velkynvelve",d:"Completed (S02). Party jumped into pool during vrock/chasme chaos",s:"S02"},{t:"Recover Confiscated Gear",d:"Completed (S02). Kit reached armory, distributed all gear",s:"S02"},{t:"Deal with Turvy",d:"Completed (S05). Party debated, interrogated, healed, and released Turvy with moon flask",s:"S05"},{t:"Topsy & Turvy Lycanthropy Revealed",d:"Revealed (S04). Involuntary transformation triggered by corrupted faerzress",s:"S04"},{t:"Binks Separated Below",d:"Fell/slid down tunnel at end of S05; rescued by party at start of S06. Blarg healed (medicine 25, Cure Wounds 15 HP).",s:""},{t:"Escape the Flooding Temple",d:"Completed (S08). Party defeated two Black Pudding halves and one gray ooze, navigated rising waters, exited through sealed Dwarvish door.",s:"S08"},{t:"Level-Up to 4",d:"Completed (S10). All PCs leveled to 4 during forced long rest in the Feydark. Binks multiclassed into Rogue. Aeolus stayed Warlock. Kit picked Goblin as new language. Binks picked Sylvan.",s:"S10"},{t:"Glabbagool Reunited",d:"Completed (S09). Glabbagool oozed up through floor; compressed into Amanita's waterskin for transport.",s:"S09"},{t:"Roxanne Resurrected",d:"Completed (S09). Binks cast 7th-level Resurrection from scroll (DC 17, rolled 21 w/ Guidance + Blarg Help). Rothe fully resurrected with flesh, fur, and fused chest. Named \"Roxanne\" from Dwarvish collar tag.",s:"S09"},{t:"Enter the Feydark Portal",d:"Completed (S10). Blarg stabilized portal (arcana 23). Party entered. Roxanne bolted through first; Kit sensed insectoid creature behind them. Portal sealed.",s:"S10"},{t:"Survive the Feydark Trial",d:"Completed (S10). Echo warned of a trial. Myconid Sovereign and adults attacked. Party defeated them. Psilofyr acknowledged the party.",s:"S10"},{t:"Pursuit Level 4",d:"Resolved (S10). Party entered the Feydark portal; drow cannot follow. Pursuit effectively reset. Party now returning to Velkynvelve voluntarily (S11).",s:"S11"},{t:"Trinket Empowerment",d:"Completed (S11). All six PCs received empowered trinkets/items from Psilofyr/the Feydark. Kit: Doll of the Fallen Soldier. Aeolus: Ring of Spell Storing. Blarg: Goblin Family Carving. Amanita: Enhanced pipe + enspelled warpick. Darby: Axe Beak Totem. Binks: Mind Shielding Loot Pick.",s:"S11"},{t:"Topsy Resurrected",d:"Completed (S11). The Carrion King retrieved Topsy's body from the sealed safe house and resurrected her via mycelial fibers. Topsy is alive but weak. Reunited with Turvy and the party.",s:"S11"},{t:"Fey Touched Granted",d:"Completed (S11). Psilofyr granted all PCs the Fey Touched feat as a parting boon.",s:"S11"},{t:"Eldeth's Departure",d:"Completed (S11). Eldeth departed through the Gauntlgrym Nexus Pool to warn the dwarven kings.",s:"S11"},{t:"Settle the Score at Velkynvelve",d:"Completed (S13). Party returned to Velkynvelve via Nexus Pool (S11). Battle began S12, concluded S13 with decisive party victory. Ilvara killed by Roxy's gore attack. Shoor killed by Ilvara's own Insect Plague. Jorlan revealed as turncoat. Derendil rescued. Quaggoths shifted allegiance to Derendil. Primary antagonist arc from S01 is closed.",s:"S11"},{t:"Derendil's Capture",d:"Rescued (S13). Derendil leaped from a stalactite to tackle Ilvara. Quaggoths recognized him as new alpha. Rejoined party.",s:"S13"},{t:"Level-Up to 5",d:"Completed (between S12-S13). All PCs at level 5. Topsy/Turvy also leveled.",s:""}];
(function(){var byId={};D.forEach(function(x){x.qo=[];x.qr=[];byId[x.id]=x;});byId[1].qo=QO;byId[1].qr=QR;})();

// ===== Deep roll analytics (Pacts + SITL). Other campaigns: no stats -> empty state. =====
var PACTS_STATS={
  luck:[
    {n:'Ogre',faces:200,avg:'10.41',n20:10,n1:3,rt:'3.33',cls:'lucky'},
    {n:'Orphie Levistus',faces:1007,avg:'10.59',n20:49,n1:42,rt:'1.17'},
    {n:'Rinestra Genleth',faces:68,avg:'10.53',n20:6,n1:6,rt:'1.00'},
    {n:'Varis Aestra',faces:657,avg:'10.19',n20:31,n1:33,rt:'0.94'},
    {n:'Braun',faces:43,avg:'10.19',n20:1,n1:2,rt:'0.50'},
    {n:'Sanis Reylana',faces:349,avg:'9.81',n20:12,n1:32,rt:'0.38',cls:'cursed'}
  ],
  luckParty:{faces:2325,avg:'10.33',n20:109,n1:118,rt:'0.92'},
  luckCap:"Counts every individual d20 face rolled (advantage rolls count both dice). The party is faintly cursed \u2014 118 fumbles to 109 crits, average natural d20 of 10.33 sitting just shy of the true 10.5. Sanis alone rolls below ten.",
  records:[
    {tag:'Roll-Volume Champion',title:'The Workhorse',big:'1,172',who:'Orphie Levistus',note:'Roughly 40% of every die rolled this campaign \u2014 more than the next two hands combined.'},
    {tag:'Damage King \u00b7 vs \u00b7 Biggest Hit',title:'Two Different Winners',split:[{big:'2,540',who:'Orphie \u2014 total'},{big:'67',who:'Varis \u2014 one blow'}],note:"The grinder and the nuke are not the same. Varis's single best (Force Breath, 18d6) more than doubled Orphie's hardest hit."},
    {tag:'Blessed Dice',title:'The Favored',big:'10 : 3',who:'Ogre \u2014 nat 20s to nat 1s',note:'The only hand riding well above even, at 3.3 crits per fumble.',cls:'lucky',bigcls:'up'},
    {tag:'Cursed Dice',title:'The Forsaken',big:'9.81',who:'Sanis Reylana \u2014 avg natural d20',note:'Twelve crits against thirty-two fumbles, and the only character whose average die falls below ten.',cls:'cursed',bigcls:'dn'},
    {tag:'Longest Crit Drought',title:'The Dry Spell',big:'109',who:'Varis \u2014 d20s with no nat 20',note:'A 109-roll stretch without a single natural 20 \u2014 yet still near the top for crits overall.',cls:'cursed',bigcls:'dn'},
    {tag:'Busiest Night',title:'The Marathon',big:'137',who:'30 Nov 2025 \u2014 rolls in one session',note:'The heaviest dice night of the campaign. Runner-up: 16 Jul 2023, with 112 rolls across a full table.'},
    {tag:'Highest Crit Rate',title:'The Spark',big:'8.8%',who:'Rinestra Genleth \u2014 nat 20s per d20',note:"Six natural 20s in just 68 d20s \u2014 nearly double the party's next-best rate. The catch: an identical nat 1 rate makes her the table's true boom-or-bust hand.",bigcls:'up'}
  ],
  sig:[
    {ch:'Orphie',mv:'Blazebringer',ct:278},{ch:'Varis',mv:'Arcana',ct:82},
    {ch:'Sanis',mv:'Longbow',ct:74},{ch:'Rinestra',mv:'Scorching Ray',ct:38},{ch:'Ogre',mv:'Duskblade',ct:37}
  ],
  hof:[
    {rk:'I',dm:67,who:'Varis',det:'Force Breath (18d6) \u00b7 7 Sep 2025'},
    {rk:'II',dm:65,who:'Varis',det:'Force Breath (18d6) \u00b7 26 Aug 2025'},
    {rk:'III',dm:60,who:'Varis',det:'Force Breath (18d6) \u00b7 7 Sep 2025'},
    {rk:'IV',dm:51,who:'Varis',det:'Force Breath (18d6) \u00b7 7 Sep 2025'}
  ],
  dist:{counts:[118,127,113,121,128,117,110,112,113,127,135,113,94,117,125,120,107,113,106,109],total:2325,
    cap:"Every raw d20 face rolled across the campaign \u2014 2,325 die results, modifiers stripped. The verdict: fair dice. 11 came up most (135\u00d7), unlucky 13 the shyest (94\u00d7). The number 1 showed 118 times to the number 20's 109."}
};
var SITL_STATS={
  luck:[
    {n:'Darby Stonefeather',faces:180,avg:'11.51',n20:12,n1:7,rt:'1.71'},
    {n:"Amanita de'Champignon",faces:158,avg:'10.70',n20:9,n1:12,rt:'0.75'},
    {n:'Kit Aluri',faces:150,avg:'10.81',n20:7,n1:6,rt:'1.17'},
    {n:'Binks Stonevein',faces:137,avg:'10.12',n20:8,n1:13,rt:'0.62',cls:'cursed'},
    {n:'Blarg',faces:119,avg:'11.58',n20:6,n1:4,rt:'1.50'},
    {n:'Aeolus',faces:73,avg:'10.84',n20:4,n1:2,rt:'2.00',cls:'lucky'}
  ],
  luckParty:{faces:817,avg:'10.94',n20:46,n1:44,rt:'1.05'},
  luckCap:"Counts every individual d20 face rolled (advantage rolls count both dice; DDB-logged rolls only). The party runs faintly blessed \u2014 average natural d20 of 10.94, just above the true 10.5, with 46 crits to 44 fumbles. Blarg and Darby ride highest; Binks alone rolls below ten.",
  records:[
    {tag:'Roll-Volume Champion',title:'The Workhorse',big:'197',who:'Darby Stonefeather',note:'Just over a fifth of every die rolled this campaign \u2014 the busiest hand at the table, a nose ahead of Kit.'},
    {tag:'Damage King \u00b7 vs \u00b7 Biggest Hit',title:'Two Different Winners',split:[{big:'242',who:'Kit \u2014 total'},{big:'27',who:'Binks \u2014 one blow'}],note:'The greatsword grinds out the most damage overall, but the cleric lands the single hardest blow \u2014 a 27-point Guiding Bolt.'},
    {tag:'Blessed Dice',title:'The Favored',big:'2.00',who:'Aeolus \u2014 crits per fumble',note:'Four natural 20s to just two nat 1s, the best crit-to-fumble ratio at the table \u2014 though on the lightest roll count. Darby leads in raw crits with twelve.',cls:'lucky',bigcls:'up'},
    {tag:'Cursed Dice',title:'The Forsaken',big:'10.12',who:'Binks Stonevein \u2014 avg natural d20',note:'Eight crits against thirteen fumbles, the only PC whose average die falls below ten \u2014 yet still the owner of the campaign\u2019s single biggest hit.',cls:'cursed',bigcls:'dn'},
    {tag:'Longest Crit Drought',title:'The Dry Spell',big:'79',who:'Kit Aluri \u2014 d20s with no nat 20',note:'A 79-roll stretch without a single natural 20 \u2014 the longest cold streak at the table, and an oddly fitting one.',cls:'cursed',bigcls:'dn'},
    {tag:'Busiest Night',title:'The Marathon',big:'160',who:'21 Dec 2025 \u2014 rolls in one session',note:'Session 6, the heaviest dice night of the campaign so far. Runner-up: 9 Nov 2025, with 99 rolls.'},
    {tag:'Highest Crit Rate',title:'The Spark',big:'6.7%',who:'Darby Stonefeather \u2014 nat 20s per d20',note:'Twelve natural 20s in 180 d20s, the best crit rate at the table \u2014 and unlike a boom-or-bust hand, only seven fumbles to show for it.',bigcls:'up'}
  ],
  sig:[
    {ch:'Kit',mv:'Greatsword',ct:33},{ch:'Darby',mv:'Unarmed Strike',ct:16},
    {ch:'Binks',mv:'Guiding Bolt',ct:12},{ch:'Aeolus',mv:'Eldritch Blast',ct:8},
    {ch:'Amanita',mv:'Halo of Spores',ct:7},{ch:'Blarg',mv:'Starry Wisp',ct:7}
  ],
  hof:[
    {rk:'I',dm:27,who:'Binks',det:'Guiding Bolt \u00b7 18 Jan 2026'},
    {rk:'II',dm:23,who:'Binks',det:'Guiding Bolt \u00b7 21 Dec 2025'},
    {rk:'III',dm:19,who:'Binks',det:'Guiding Bolt \u00b7 21 Dec 2025'},
    {rk:'IV',dm:19,who:'Kit',det:'Greatsword \u00b7 18 Jan 2026'}
  ],
  dist:{counts:[44,35,30,34,29,39,55,41,46,37,34,42,36,47,34,49,45,46,48,46],total:817,
    cap:"Every raw d20 face rolled across the campaign \u2014 817 die results, modifiers stripped (DDB-logged rolls only). The party runs faintly blessed: 7 came up most (55\u00d7), 5 the shyest (29\u00d7), and 20 edged out 1, forty-six to forty-four."}
};
(function(){var b={};D.forEach(function(x){b[x.id]=x;});
  b[1].stats=SITL_STATS; b[1].path='/sky-is-the-limit/';
  b[2].stats=PACTS_STATS; b[2].path='/pacts-and-power/';
  b[4].path='/where-the-flowers-forget/';
})();
function pillCls(rt){var v=parseFloat(rt);return v>1.05?'up':v<0.95?'dn':'ev'}

function DTT(p){if(!p.active||!p.payload||!p.payload.length)return null;var d=p.payload[0];return h('div',{className:'ctt'},h('div',{className:'tl2'},'Face '+d.payload.f),h('div',{className:'tv'},d.value.toLocaleString()+' rolls'))}

function LuckBoard(p){
  var s=p.s,P=s.luckParty;
  function tr(r,foot){return h('tr',{className:foot?'lk-foot':(r.cls==='lucky'?'lucky':r.cls==='cursed'?'cursed':'')},
    h('td',null,r.n),
    h('td',{className:'num'},r.faces.toLocaleString()),
    h('td',{className:'num'},r.avg),
    h('td',{className:'num'},r.n20),
    h('td',{className:'num'},r.n1),
    h('td',{className:'num'},h('span',{className:'rpill '+pillCls(r.rt)},r.rt)))}
  return h('div',{className:'luck-wrap'},
    h('div',{className:'luck-scroll'},h('table',{className:'luck-tbl'},
      h('thead',null,h('tr',null,['Hand','d20','Avg','N20','N1','C:F'].map(function(t,i){return h('th',{key:i,className:i>0?'num':''},t)}))),
      h('tbody',null,s.luck.map(function(r,i){return h(React.Fragment,{key:i},tr(r,false))})),
      h('tfoot',null,tr({n:'Party \u2014 all hands',faces:P.faces,avg:P.avg,n20:P.n20,n1:P.n1,rt:P.rt},true)))),
    h('p',{className:'an-cap'},s.luckCap))
}

// value block (single or split), shared by hero + ledger rows
function recVal(r,heroBig){
  if(r.split)return h('div',{className:'rec-split'},r.split.map(function(sp,j){return h('div',{key:j,className:'rec-sh'},h('div',{className:'rec-big'+(heroBig?' rec-hbig':'')},sp.big),h('div',{className:'rec-who'},sp.who))}));
  return h('div',null,h('div',{className:'rec-big'+(r.bigcls?' '+r.bigcls:'')+(heroBig?' rec-hbig':'')},r.big),r.who?h('div',{className:'rec-who'},r.who):null);
}
function RecordsGrid(p){
  var recs=p.s.records||[];
  if(!recs.length)return h('div',{className:'rec-empty'},'No superlatives recorded yet.');
  var hero=recs[0],rest=recs.slice(1);
  return h('div',{className:'rec-wrap'},
    h('div',{className:'rec-hero'+(hero.cls?' '+hero.cls:'')},
      h('div',{className:'rec-tag'},hero.tag),
      h('div',{className:'rec-htitle'},hero.title),
      recVal(hero,true),
      h('div',{className:'rec-note'},hero.note)),
    h('div',{className:'rec-ledger'},rest.map(function(r,i){
      return h('div',{key:i,className:'rec-row'+(r.cls?' '+r.cls:'')},
        h('div',{className:'rec-rmeta'},
          h('div',{className:'rec-tag'},r.tag),
          h('div',{className:'rec-title'},r.title),
          h('div',{className:'rec-note rec-rnote'},r.note)),
        h('div',{className:'rec-rval'},recVal(r,false)))
    })))
}

function SigHof(p){
  var s=p.s;
  return h('div',{className:'sh-wrap'},
    h('div',{className:'sh-col'},
      h('div',{className:'sh-h'},'Signature Move \u00b7 go-to attack'),
      h('ul',{className:'sig-list'},s.sig.map(function(x,i){return h('li',{key:i},
        h('span',{className:'sig-ch'},x.ch),
        h('span',{className:'sig-rt'},h('span',{className:'sig-mv'},x.mv),h('span',{className:'sig-ct'},x.ct+'\u00d7')))}))),
    h('div',{className:'sh-col'},
      h('div',{className:'sh-h'},'Hall of Fame \u00b7 biggest single hits'),
      h('ul',{className:'hof-list'},s.hof.map(function(x,i){return h('li',{key:i},
        h('span',{className:'hof-rk'},x.rk),
        h('span',{className:'hof-dm'},x.dm),
        h('span',{className:'hof-ds'},h('b',null,x.who),' \u00b7 '+x.det))}))))
}

function DistChart(p){
  var s=p.s,exp=Math.round(s.dist.total/20);
  var data=s.dist.counts.map(function(c,i){return{f:i+1,c:c}});
  return h('div',{className:'dist-wrap'},
    h(RC,{width:'100%',height:230},
      h(BC,{data:data,margin:{top:10,right:10,left:-20,bottom:2}},
        h(CG,{strokeDasharray:'3 3',vertical:false,stroke:T.goldAlpha10}),
        h(XA,{dataKey:'f',tick:{fill:T.text3,fontFamily:T.fLabel,fontSize:T.text2xs},axisLine:{stroke:T.goldAlpha10},tickLine:false,interval:0}),
        h(YA,{tick:{fill:T.text3,fontFamily:T.fLabel,fontSize:T.text2xs},axisLine:false,tickLine:false,width:34}),
        h(Tt,{content:h(DTT),cursor:{fill:T.goldAlpha5}}),
        RL?h(RL,{y:exp,stroke:T.text2,strokeDasharray:'6 5',strokeWidth:1.2}):null,
        h(Bar,{dataKey:'c',radius:[3,3,0,0]},data.map(function(d,i){return h(Ce,{key:i,fill:d.f===20?T.success:d.f===1?T.danger:T.gold})}))
      )),
    h('p',{className:'an-cap'},s.dist.cap))
}

function AnalyticsRow(p){
  var c=p.c,s=c.stats;
  if(!s)return h('div',{className:'row-analytics'},
    h('div',{className:'panel cp ai span2 analytics-empty'},
      h(PH,{title:'Roll Analytics',sub:'luck \u2014 records \u2014 distribution'}),
      h('p',{className:'an-empty'},c.tr>0?('Deep roll analytics for '+c.nm+' haven\u2019t been compiled yet.'):'No rolls logged for this campaign yet.')));
  return h('div',{className:'row-analytics'},
    h('div',{className:'panel cp ai'},h(PH,{title:'Luck Leaderboard',sub:'d20_faces \u2014 crit:fumble'}),h(LuckBoard,{s:s})),
    h('div',{className:'panel cp ai'},h(PH,{title:'Signatures & Hall of Fame',sub:'go-to moves \u2014 biggest hits'}),h(SigHof,{s:s})),
    h('div',{className:'panel cp ai span2'},h(PH,{title:'Records & Reckonings',sub:'campaign superlatives'}),h(RecordsGrid,{s:s})),
    h('div',{className:'panel cp ai span2'},h(PH,{title:'Are the Dice Honest?',sub:'raw d20 face distribution'}),h(DistChart,{s:s})));
}


function QuestTracker(p){
  var c=p.c, QOc=(c&&c.qo)||[], QRc=(c&&c.qr)||[];
  var st=us('open'),mode=st[0],setMode=st[1];
  var rows=mode==='open'?QOc:QRc;
  function Tab(p){return h('button',{className:'qt-tab'+(mode===p.k?' on':''),onClick:function(){setMode(p.k)}},p.label,h('span',{className:'qt-count'},p.n))}
  return h('div',{className:'qt-wrap'},
    h('div',{className:'qt-tabs'},
      h(Tab,{k:'open',label:'Open',n:QOc.length}),
      h(Tab,{k:'done',label:'Resolved',n:QRc.length})
    ),
    rows.length===0
      ? h('div',{className:'qt-empty'},mode==='open'?'No open quests tracked for this campaign yet.':'No resolved quests tracked for this campaign yet.')
      : h('ul',{className:'qt-list'},rows.map(function(x,i){
      return h('li',{key:i,className:'qt-item'+(mode==='done'?' done':'')},
        h('div',{className:'qt-row'},
          h('span',{className:'qt-mark'},mode==='done'?'\u2713':'\u25C6'),
          h('span',{className:'qt-title'},x.t),
          x.s?h('span',{className:'qt-sess'},x.s):null
        ),
        x.d?h('div',{className:'qt-desc'},x.d):null
      )
    }))
  )
}

function CampSnap(p){
  var c=p.c;
  function fd(x){if(!x)return'--';return new Date(x).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
  var rows=[{k:'Last Session',v:fd(c.lr)+' (Sess. '+c.se+')'},{k:'Active PCs',v:c.ch},{k:'Total Rolls',v:c.tr>0?c.tr.toLocaleString():'--'},{k:'Nat 20 / Nat 1',v:c.n20+' / '+c.n1},{k:'Campaign',v:c.nm}];
  return h('div',null,h('div',{className:'snap-sigil'},h(BL)),h('ul',{className:'snap-status'},rows.map(function(r,i){return h('li',{key:i},h('span',{className:'sk'},r.k),h('span',{className:'sv'},r.v))})))
}

var SESS=[{d:'May 25',n:'87. The Weeping Fen',loc:'Valewatch Marshes',r:'win'},{d:'May 18',n:'86. Council of Shadows',loc:'Ebonspire Keep',r:'part'},{d:'May 11',n:'85. Trail of Ashes',loc:'Greyhold Pass',r:'fail'}];
var RLAB={win:'Victory',part:'Partial',fail:'Failure'};
function SessList(){return h('ul',{className:'sess-list'},SESS.map(function(s,i){return h('li',{key:i},h('span',{className:'sd'},s.d),h('div',null,h('div',{className:'sn'},s.n),h('div',{className:'sl'},s.loc)),h('span',{className:'sr '+s.r},RLAB[s.r]))}))}

/* ── Quote board: random quote from the active campaign's vault, fetched live on each load ── */
var QUOTE_CACHE={};
function qbName(s){
  s=s.replace(/\*\*/g,'').trim();
  s=s.split(/\s\u00b7\s/)[0].trim();
  s=s.replace(/\[\[([^\]]*?)\]\]/g,function(_,i){var p=i.split(/\\?\|/);return p[p.length-1];});
  s=s.replace(/[\[\]]/g,'').replace(/\\+$/,'').trim();
  return s;
}
function qbQuote(q){
  q=q.replace(/^>\s*/,'').trim();
  q=q.replace(/^[\u201c"']+|[\u201d"']+$/g,'').trim();
  return q;
}
var QB_PLACE=/\[(Verbatim quote|Tag|##|Title|MM\/DD\/YYYY|CHARACTER NAME)\]/i;
function qbParse(md){
  md=md.replace(/^---\n[\s\S]*?\n---\n/,'').replace(/```[\s\S]*?```/g,'');
  var lines=md.split(/\r?\n/),out=[],cur='';
  for(var i=0;i<lines.length;i++){
    var ln=lines[i];
    var hm=/^##\s+(?:Session|Transcript)\s+0*([0-9]+)/i.exec(ln);
    if(hm){var nn=hm[1];cur='S'+(nn.length<2?'0'+nn:nn);continue;}
    if(/^\|/.test(ln)){                                  /* table row (P&P) */
      var c=ln.replace(/\\\|/g,'\u0001').split('|').map(function(x){return x.replace(/\u0001/g,'|').trim();});
      if(c.length>=4){
        var spk=c[1],qt=c[2];
        if(/^:?-+:?$/.test(spk)||/^speaker$/i.test(spk)||!qt)continue;
        var q=qbQuote(qt);
        if(q&&!QB_PLACE.test(q))out.push({q:q,a:qbName(spk)+(cur?' \u00b7 '+cur:'')});
      }
      continue;
    }
    var bm=/^\*\*(.+?)\*\*\s*$/.exec(ln);                 /* bold header (SITL/Ashfall/WTFF) */
    if(bm){
      if(QB_PLACE.test(bm[1]))continue;
      var j=i+1;while(j<lines.length&&!lines[j].trim())j++;
      if(j<lines.length){
        var ql=lines[j].trim();
        if(/^[>"\u201c']/.test(ql)){
          var q2=qbQuote(ql);
          if(q2&&!QB_PLACE.test(q2))out.push({q:q2,a:qbName(bm[1])+(cur?' \u00b7 '+cur:'')});
        }
      }
    }
  }
  return out;
}
function qbBatchLinks(md){
  var re=/\[\[(Quote Board [^\]\|]+?)(?:\\?\|[^\]]*)?\]\]/g,m,seen={},out=[];
  while((m=re.exec(md))){var k=m[1].trim();if(!seen[k]){seen[k]=1;out.push(k);}}
  return out;
}
function qbLoad(vault){
  if(QUOTE_CACHE[vault])return Promise.resolve(QUOTE_CACHE[vault]);
  var base='https://raw.githubusercontent.com/TheLittlestAskew/'+vault+'/main/00-Campaign-Hub/';
  return fetch(base+encodeURIComponent('Quote Board Master')+'.md').then(function(r){return r.ok?r.text():'';}).then(function(master){
    var all=qbParse(master),links=qbBatchLinks(master);
    return Promise.all(links.map(function(link){
      return fetch(base+'Trackers/'+encodeURIComponent(link)+'.md').then(function(r){return r.ok?r.text():'';}).then(qbParse).catch(function(){return [];});
    })).then(function(batches){
      batches.forEach(function(b){all=all.concat(b);});
      var seen={},out=[];
      all.forEach(function(x){if(x.q&&x.q.length>=2&&!seen[x.q]){seen[x.q]=1;out.push(x);}});
      QUOTE_CACHE[vault]=out;return out;
    });
  }).catch(function(){QUOTE_CACHE[vault]=[];return [];});
}
function QuoteBoard(p){
  var c=p&&p.c;
  var _=us({s:'load',q:null}),state=_[0],setState=_[1];
  ue(function(){
    var live=true;
    if(!c||!c.vault){setState({s:'empty',q:null});return;}
    setState({s:'load',q:null});
    qbLoad(c.vault).then(function(qs){
      if(!live)return;
      if(qs&&qs.length)setState({s:'ok',q:qs[(Math.random()*qs.length)|0]});
      else setState({s:'empty',q:null});
    });
    return function(){live=false;};
  },[c?c.id:0]);
  var body,attr=null;
  if(state.s==='ok'){body='\u201c'+state.q.q+'\u201d';attr=state.q.a;}
  else if(state.s==='empty'){body='No quotes recorded for this campaign yet.';}
  else body='\u2026';
  return h('div',{className:'quote-wrap'},
    h('div',{className:'quote-body'},body),
    attr?h('div',{className:'quote-attr'},attr):null
  );
}

function RIcon(p){
  var icons={
    npc:h('g',null,h('circle',{cx:8,cy:5,r:3,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M2 14 Q2 10 8 10 Q14 10 14 14',stroke:'currentColor',strokeWidth:'1.1',fill:'none'})),
    loot:h('path',{d:'M4 9 L8 3 L12 9 L10 9 L10 13 L6 13 L6 9Z M6 6 L10 6',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),
    faction:h('path',{d:'M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6Z',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),
    quest:h('g',null,h('rect',{x:3,y:2,width:10,height:12,rx:1,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M5.5 6 H10.5 M5.5 9 H9',stroke:'currentColor',strokeWidth:'1.1'}))
  };
  return h('svg',{width:32,height:32,viewBox:'0 0 16 16',fill:'none'},icons[p.i])
}
var RESS=[{n:'NPC Tracker',s:'character relationships',i:'npc'},{n:'Loot Tracker',s:'items & rewards',i:'loot'},{n:'Faction & Rep',s:'standing & alliances',i:'faction'},{n:'Quest Board',s:'open & closed quests',i:'quest'}];
function ResCards(){return h('div',{className:'res-grid'},RESS.map(function(r,i){return h('div',{key:i,className:'res-card'},h('div',{className:'ri'},h(RIcon,{i:r.i})),h('div',{className:'rn'},r.n),h('div',{className:'rs'},r.s))}))}

var NAV=[{l:'Overview',i:'overview'}];

function gArc(cx,cy,r,d0,d1){var a0=d0*Math.PI/180,a1=d1*Math.PI/180;var x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);var large=(d1-d0)<=180?0:1;return 'M'+x0+' '+y0+' A'+r+' '+r+' 0 '+large+' 1 '+x1+' '+y1}
function Gauge(p){
  var cx=110,cy=108,r=88;
  var f=Math.max(0,Math.min(p.value/p.max,1));
  var vDeg=180+180*f, vRad=vDeg*Math.PI/180;
  var nx=cx+(r-16)*Math.cos(vRad), ny=cy+(r-16)*Math.sin(vRad);
  var ticks=[];for(var i=0;i<=4;i++){var d=(180+45*i)*Math.PI/180;ticks.push(h('line',{key:i,x1:cx+r*Math.cos(d),y1:cy+r*Math.sin(d),x2:cx+(r-8)*Math.cos(d),y2:cy+(r-8)*Math.sin(d),stroke:T.goldMid,strokeWidth:1,opacity:.55}))}
  return h('svg',{className:'pf-gauge-svg',viewBox:'0 0 220 132'},
    h('defs',null,h('linearGradient',{id:'gaugeg',x1:0,y1:0,x2:1,y2:0},h('stop',{offset:'0%',stopColor:T.gold}),h('stop',{offset:'55%',stopColor:T.goldBright}),h('stop',{offset:'100%',stopColor:T.danger}))),
    h('path',{d:gArc(cx,cy,r,180,360),stroke:T.goldAlpha10,strokeWidth:11,fill:'none',strokeLinecap:'round'}),
    h('path',{d:gArc(cx,cy,r,180,vDeg),stroke:'url(#gaugeg)',strokeWidth:11,fill:'none',strokeLinecap:'round'}),
    ticks,
    h('line',{x1:cx,y1:cy,x2:nx,y2:ny,stroke:T.goldPale,strokeWidth:2.5,strokeLinecap:'round'}),
    h('circle',{cx:cx,cy:cy,r:5,fill:T.goldPale}),
    h('text',{x:cx-r,y:cy+17,fill:T.text3,fontFamily:T.fLabel,fontSize:9,textAnchor:'middle'},'0'),
    h('text',{x:cx+r,y:cy+17,fill:T.text3,fontFamily:T.fLabel,fontSize:9,textAnchor:'middle'},p.max)
  )
}
function ProfMeter(p){
  var c=p.c,data=c.pf||[];
  if(!data.length)return h('div',{className:'panel cp ai d6 prof-meter'},h(PH,{title:'Profanity Meter',sub:'spice level'}),h('p',{style:{color:T.text3,textAlign:'center',padding:'48px 0'}},'No profanity logged yet'));
  var total=data.reduce(function(s,x){return s+x.n},0);
  var peak=data.reduce(function(m,x){return Math.max(m,x.n)},0);
  var cap=100;
  var tier=total<10?'Choir-clean':total<25?'Salty':total<50?'Sailor-tier':total<80?'Foul-mouthed':'Unholy';
  return h('div',{className:'panel cp ai d6 prof-meter'},
    h(PH,{title:'Profanity Meter',sub:'spice level'}),
    h('div',{className:'pf-body'},
      h('div',{className:'pf-stat'},
        h('div',{className:'pf-num'},total),
        h('div',{className:'pf-tier'},tier),
        c.pfTop?h('div',{className:'pf-lead'},'\uD83E\uDEB6 '+c.pfTop):null,
        h('div',{className:'pf-peak'},'Peak session: '+peak+' curses')
      ),
      h(Gauge,{value:total,max:cap})
    )
  )
}

function initialCampaignId(){
  try{var p=new URLSearchParams(location.search);var v=p.get('c')||p.get('campaign');
    if(v){var n=parseInt(v,10);
      if(!isNaN(n)&&D.some(function(x){return x.id===n&&x.st!=='p'}))return n;
      var bn=D.find(function(x){return x.sn.toLowerCase()===String(v).toLowerCase()&&x.st!=='p'});
      if(bn)return bn.id;}
  }catch(e){}
  return 1;
}
function App(){
  var _=us(initialCampaignId()),aId=_[0],set=_[1];
  var nv=us(false),navOpen=nv[0],setNav=nv[1];
  function openNav(){setNav(true)}
  function closeNav(){setNav(false)}
  var c=D.find(function(x){return x.id===aId});
  var q=c.id===2;
  var r20=c.tr>0?(c.n20/c.tr*100).toFixed(1)+'%':'--';

  return h('div',{className:'shell'},
    h('nav',{className:'side'+(navOpen?' open':'')},
      h('div',{className:'side-brand'},
        h('button',{className:'drawer-close',onClick:closeNav,'aria-label':'Close menu'},'\u2715'),
        h('img',{src:'./assets/img/logo_tex-vert-transparent.webp',alt:'Rectrix Caedere',className:'side-logo-img'})),
      h('div',{className:'side-section'},'Campaigns'),
      h('ul',{className:'camp-list'},D.map(function(x){return h('li',{key:x.id},h('button',{className:(x.id===aId?'on':'')+(x.st==='p'?' off':''),onClick:x.st!=='p'?function(){set(x.id);closeNav()}:undefined,title:x.st==='p'?'No sessions recorded yet':undefined,tabIndex:x.st==='p'?-1:0,'aria-disabled':x.st==='p'?'true':undefined},h('span',null,x.sn),h('span',{className:'ct'},x.st==='p'?'uncharted':x.tr.toLocaleString())))})),
      h('div',{className:'side-div'}),
      h('ul',{className:'side-nav'},NAV.map(function(n,i){return h('li',{key:n.l},h('button',{className:i===0?'on':''},h(NI,{i:n.i}),n.l))}))
    ),
    h('main',{className:'main',key:aId},

      h('div',{className:'row-hdr ai'},
        h('div',{style:{position:'relative',zIndex:1}},
          h('div',{className:'hdr-title'},'Rectrix Caedere'),
          h('div',{className:'hdr-sub'},c.nm+' -- Overview')
        ),
        h('img',{src:'./assets/img/topcenterheader.webp',alt:'',className:'top-center-img','aria-hidden':'true'}),
        h('div',{className:'hdr-right'},
          c.path?h('a',{className:'hdr-back',href:c.path,title:'Back to the '+c.nm+' archive page'},'\u2190 '+c.sn):null,
          h('button',{className:'filter-btn',onClick:openNav,'aria-label':'Open filters and menu'},h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.8'},h('path',{d:'M3 5h18l-7 8v6l-4-2v-4z'})),h('span',null,'Filter')),
          h('div',{className:'hdr-filter'},'Filter by campaign'),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M12 2L14.5 8 21 9 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9 9.5 8Z'}))),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'}),h('path',{d:'M13.73 21a2 2 0 0 1-3.46 0'}))),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'})))
        )
      ),

      h('div',{className:'row-kpi'},
        h(Kpi,{label:'Total Rolls',value:c.tr,dl:1,sig:'d20'}),
        h(Kpi,{label:'Sessions Logged',value:c.se,dl:2,sig:'moon'}),
        h(Kpi,{label:'Nat 20 Rate',value:r20,cn:'n20',dl:3,sig:'star',ac:T.success}),
        h(Kpi,{label:'Characters',value:c.ch,dl:4,sig:'laurel'}),
        h(Kpi,{label:'Open Quests',value:c.oq!=null?c.oq:'--',sub:'active threads',dl:5,sig:'key'}),
        h(ProfMeter,{c:c}),
        h('div',{className:'panel cp ai d6 kpi-snap'},
          h(PH,{title:'Campaign Snapshot',sub:'session_id -- quest_tracker'}),
          h(CampSnap,{c:c})
        ),
        h('div',{className:'panel cp ai d5 kpi-chart'},
          h(PH,{title:q?'Rolls by Quarter':'Roll Activity Over Time',sub:q?'Quarterly aggregation':'session_date -- roll_count'}),
          h(AreaC,{data:c.sd,q:q})
        )
      ),

      h('div',{className:'row-mid'},
        h('div',{className:'panel cp ai d6'},
          h(PH,{title:'Roll Type Breakdown',sub:'roll_log.roll_type'}),
          c.rt.length>0?h(PieC,{data:c.rt}):h('p',{style:{color:T.text3,textAlign:'center',padding:'60px 0'}},'No data')
        ),
        h('div',{className:'panel cp ai d6'},
          h(PH,{title:'Top Characters',sub:'character_name -- roll_total'}),
          h(CharTable,{data:c.chars})
        ),
        h('div',{className:'panel cp ai d7 quest-panel'},
          h(PH,{title:'Quest Tracker',sub:'open_threads -- resolved'}),
          h(QuestTracker,{c:c})
        )
      ),

      h('div',{className:'row-bot'},
        h('div',{className:'panel cp ai d8'},
          h(PH,{title:'Recent Sessions',sub:'sessions -- encounter_summary'}),
          h(SessList)
        ),
        h('div',{className:'panel cp ai d8'},
          h(QuoteBoard,{c:c})
        ),
        h('div',{className:'panel cp ai d8'},
          h(PH,{title:'Quick Access',sub:'resource links'}),
          h(ResCards)
        )
      ),

      h(AnalyticsRow,{c:c})
    ),
    navOpen?h('div',{className:'drawer-overlay',onClick:closeNav}):null
  )
}
/* Ashfall dashboard: live public analytics from the approved roll archive.
   Edge cases: paginated responses, string-encoded JSON dice values, empty
   sessions, and an unavailable API all produce an explicit current state. */
var AFB_API='https://vtrtyagltwdrbastpppl.supabase.co',AFB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cnR5YWdsdHdkcmJhc3RwcHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTY5NTAsImV4cCI6MjA5MTkzMjk1MH0.hnpwjHGIqiUN_VmmIkOAAFGGCKsyYgl7AO3FW5vDIeM',AFB_INDEX='https://raw.githubusercontent.com/TheLittlestAskew/ashfall_vault/main/00-Campaign-Hub/Public%20Session%20Index.json';
function afbRows(){var out=[],start=0;function page(){return fetch(AFB_API+'/rest/v1/ashfall_session_rolls?select=session_date,character,roll_type,action,dice_notation,individual_values&order=timestamp_iso.asc',{headers:{apikey:AFB_KEY,Authorization:'Bearer '+AFB_KEY,Range:start+'-'+(start+999),Prefer:'count=exact'}}).then(function(r){if(!r.ok)throw new Error('Ashfall roll source unavailable.');return r.json().then(function(rows){out=out.concat(rows);if(rows.length===1000){start+=1000;return page();}return out;});});}return page();}
function afbDie(v){if(typeof v==='string'){try{v=JSON.parse(v);}catch(e){return null;}}return Array.isArray(v)&&Number.isFinite(v[0])?v[0]:null;}
function afbUnavailable(){var c=D.filter(function(x){return x.id===3;})[0];c.tr='Unavailable';c.se='Unavailable';c.n20='—';c.n1='—';c.sd=[];c.rt=[];c.ac=[];c.chars=[];c.lr=null;c.liveError='Live roll data is currently unavailable.';}
function hydrateAshfall(){return Promise.all([afbRows(),fetch(AFB_INDEX).then(function(r){if(!r.ok)throw new Error('Ashfall session index unavailable.');return r.json();})]).then(function(v){var rows=v[0],index=v[1],c=D.filter(function(x){return x.id===3;})[0],byDate={},chars={},types={},actions={},n20=0,n1=0,sessions=(index&&index.sessions)||[];if(!Array.isArray(sessions)||!sessions.length)throw new Error('Ashfall session index is empty.');rows.forEach(function(r){var d=r.session_date;if(d)byDate[d]=(byDate[d]||0)+1;if(r.character){chars[r.character]=chars[r.character]||{n:r.character,r:0,faces:[]};chars[r.character].r++;if(/^1d20/.test(r.dice_notation||'')){var face=afbDie(r.individual_values);if(face!==null)chars[r.character].faces.push(face);}}var type=r.roll_type||'Other';types[type]=(types[type]||0)+1;var action=r.action||'Other';actions[action]=(actions[action]||0)+1;if(/^1d20/.test(r.dice_notation||'')){var die=afbDie(r.individual_values);if(die===20)n20++;if(die===1)n1++;}});c.tr=rows.length;c.se=sessions.length;c.n20=n20;c.n1=n1;c.fr=sessions[0].d;c.lr=sessions[sessions.length-1].d;c.sd=sessions.map(function(s){return {d:'S'+s.n,r:byDate[s.d]||0};});c.rt=Object.keys(types).sort(function(a,b){return types[b]-types[a];}).map(function(k){return {n:k,v:types[k],c:T.gold};});c.ac=Object.keys(actions).sort(function(a,b){return actions[b]-actions[a];}).slice(0,6).map(function(k){return {n:k,v:actions[k],c:T.goldMid};});c.chars=Object.keys(chars).map(function(k){var x=chars[k],sum=x.faces.reduce(function(a,b){return a+b;},0);return {n:x.n,r:x.r,avg:x.faces.length?(sum/x.faces.length).toFixed(1):'—',tr:0};}).sort(function(a,b){return b.r-a.r;});}).catch(afbUnavailable);}
/* Verification block: run from browser devtools after deploy.
   afbDie('[20]') === 20; afbDie('bad-json') === null; afbRows() returns every page. */
hydrateAshfall().finally(function(){ReactDOM.createRoot(document.getElementById('root')).render(h(App));});
