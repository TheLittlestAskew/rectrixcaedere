var T={bgVoid:'#050A0E',bgCard:'#0E1820',bgCardInner:'#0B1219',goldDark:'#68442F',goldMid:'#8C5D3F',gold:'#C7A369',goldBright:'#DA9565',goldPale:'#E8C690',text1:'#E8E4DC',text2:'#9A9590',text3:'#5E5A55',success:'#4A9E6E',danger:'#B44A4A',info:'#6B8AAD',mystic:'#8B6BB5',warn:'#D4943A',fLabel:"'Alegreya Sans SC',sans-serif",text2xs:9,textXs:10,goldAlpha5:'rgba(199,163,105,0.05)',goldAlpha8:'rgba(199,163,105,0.08)',goldAlpha10:'rgba(199,163,105,0.10)',goldAlpha30:'rgba(199,163,105,0.30)'};
var h=React.createElement,us=React.useState;
var AC=Recharts.AreaChart,A=Recharts.Area,PC=Recharts.PieChart,Pi=Recharts.Pie,Ce=Recharts.Cell,XA=Recharts.XAxis,YA=Recharts.YAxis,CG=Recharts.CartesianGrid,Tt=Recharts.Tooltip,RC=Recharts.ResponsiveContainer,Lg=Recharts.Legend;
var D=[{id:1,nm:'Sky Is The Limit',sn:'SITL',st:'a',tr:946,ch:6,se:15,n20:44,n1:41,fr:'2025-10-12',lr:'2026-05-03',sd:[{d:'S01',r:67},{d:'S02',r:81},{d:'S03',r:99},{d:'S04',r:88},{d:'S05',r:66},{d:'S06',r:160},{d:'S07',r:22},{d:'S08',r:59},{d:'S09',r:22},{d:'S10',r:70},{d:'S11',r:13},{d:'S12',r:36},{d:'S13',r:63},{d:'S14',r:20},{d:'S15',r:28}],rt:[{n:'Check',v:461,c:T.gold},{n:'To Hit',v:164,c:T.info},{n:'Damage',v:142,c:T.danger},{n:'Save',v:78,c:T.success},{n:'Roll',v:67,c:T.mystic},{n:'Heal',v:34,c:T.warn}],ac:[{n:'Skill',v:461,c:T.gold},{n:'Attack',v:186,c:T.danger},{n:'Custom',v:103,c:T.goldMid}]},{id:2,nm:'Pacts & Power',sn:'P&P',st:'a',tr:2907,ch:5,se:72,n20:109,n1:117,fr:'2023-01-29',lr:'2026-04-21',sd:[{d:"Q1'23",r:149},{d:"Q2'23",r:288},{d:"Q3'23",r:234},{d:"Q4'23",r:206},{d:"Q1'24",r:164},{d:"Q2'24",r:103},{d:"Q3'24",r:81},{d:"Q4'24",r:123},{d:"Q1'25",r:110},{d:"Q2'25",r:78},{d:"Q3'25",r:199},{d:"Q4'25",r:189},{d:"Q1'26",r:188},{d:"Q2'26",r:191}],rt:[{n:'Check',v:934,c:T.gold},{n:'Roll',v:566,c:T.mystic},{n:'Damage',v:483,c:T.danger},{n:'To Hit',v:414,c:T.info},{n:'Save',v:263,c:T.success},{n:'Heal',v:23,c:T.warn}],ac:[{n:'Skill',v:934,c:T.gold},{n:'Attack',v:664,c:T.danger},{n:'Custom',v:352,c:T.goldMid}]},{id:3,nm:'Ashfall Brittania',sn:'AFB',st:'a',tr:855,ch:7,se:8,n20:29,n1:22,fr:'2025-11-08',lr:'2026-05-04',sd:[{d:'S01',r:196},{d:'S02',r:93},{d:'S03',r:125},{d:'S04',r:163},{d:'S05',r:81},{d:'S06',r:51},{d:'S07',r:47},{d:'S08',r:44}],rt:[{n:'Check',v:329,c:T.gold},{n:'Roll',v:173,c:T.mystic},{n:'Damage',v:167,c:T.danger},{n:'To Hit',v:118,c:T.info},{n:'Save',v:83,c:T.success}],ac:[{n:'Skill',v:235,c:T.gold},{n:'Attack',v:261,c:T.danger}]},{id:4,nm:'Where the Flowers Remember',sn:'WTFR',st:'p',tr:0,ch:0,se:0,n20:0,n1:0,fr:null,lr:null,sd:[],rt:[],ac:[]}];

function BL(){return h('svg',{viewBox:'0 0 60 60',fill:'none',width:44,height:44},h('defs',null,h('linearGradient',{id:'blg',x1:0,y1:0,x2:0,y2:1},h('stop',{offset:'0%',stopColor:T.goldBright}),h('stop',{offset:'50%',stopColor:T.gold}),h('stop',{offset:'100%',stopColor:T.goldMid}))),h('path',{d:'M30 4 L37 28 L34 31 L30 56 L26 31 L23 28 Z',fill:'url(#blg)',opacity:.9}),h('line',{x1:30,y1:6,x2:30,y2:54,stroke:T.bgCardInner,strokeWidth:'.7',opacity:.4}),h('path',{d:'M20 29 L30 33 L40 29 L30 25 Z',fill:'url(#blg)',opacity:.6}),h('path',{d:'M30 1 L31 3.5 L30 2.8 L29 3.5 Z',fill:T.goldBright,opacity:.5}))}

function NI(p){var d={overview:h('path',{d:'M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),characters:h('g',null,h('circle',{cx:8,cy:5,r:3,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M2 14 Q2 10 8 10 Q14 10 14 14',stroke:'currentColor',strokeWidth:'1.1',fill:'none'})),combat:h('path',{d:'M8 2 L10 6 L8 14 L6 6Z M4 7 L12 7',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),skills:h('circle',{cx:8,cy:8,r:6,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),luck:h('path',{d:'M4 4 A4 4 0 0 1 12 4 Q12 8 8 12 Q4 8 4 4',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),sessions:h('rect',{x:2,y:3,width:12,height:10,rx:1,stroke:'currentColor',strokeWidth:'1.1',fill:'none'})};return h('svg',{className:'ni',viewBox:'0 0 16 16',fill:'none'},d[p.i])}

function CTT(p){if(!p.active||!p.payload||!p.payload.length)return null;return h('div',{className:'ctt'},h('div',{className:'tl2'},p.label),p.payload.map(function(d,i){return h('div',{key:i,className:'tv',style:{color:d.color||T.text1}},d.value.toLocaleString()+' rolls')}))}
function PTT(p){if(!p.active||!p.payload||!p.payload.length)return null;var d=p.payload[0],pct=d.payload.tot>0?(d.value/d.payload.tot*100).toFixed(1):'0';return h('div',{className:'ctt'},h('div',{className:'tl2'},d.name),h('div',{className:'tv'},d.value.toLocaleString()+' ('+pct+'%)'))}

function AreaC(p){return h(RC,{width:'100%',height:190},h(AC,{data:p.data,margin:{top:8,right:8,left:-18,bottom:0}},h('defs',null,h('linearGradient',{id:'ag',x1:0,y1:0,x2:0,y2:1},h('stop',{offset:'0%',stopColor:T.goldBright,stopOpacity:.35}),h('stop',{offset:'50%',stopColor:T.gold,stopOpacity:.12}),h('stop',{offset:'100%',stopColor:T.goldMid,stopOpacity:.02}))),h(CG,{strokeDasharray:'3 3',vertical:false}),h(XA,{dataKey:'d',tick:{fill:T.text3,fontFamily:T.fLabel,fontSize:T.text2xs},axisLine:{stroke:T.goldAlpha10},tickLine:false,interval:0,angle:p.q?0:-35,textAnchor:p.q?'middle':'end',height:p.q?28:45}),h(YA,{tick:{fill:T.text3,fontFamily:T.fLabel,fontSize:T.text2xs},axisLine:false,tickLine:false}),h(Tt,{content:h(CTT)}),h(A,{type:'monotone',dataKey:'r',stroke:T.goldBright,strokeWidth:2,fill:'url(#ag)',dot:{r:2.5,fill:T.goldBright,strokeWidth:0},activeDot:{r:4,fill:T.goldBright,stroke:T.bgVoid,strokeWidth:2}})))}

function PieC(p){var tot=p.data.reduce(function(s,d){return s+d.v},0);var dt=p.data.map(function(d){return{name:d.n,value:d.v,color:d.c,tot:tot}});return h(RC,{width:'100%',height:228},h(PC,null,h(Pi,{data:dt,cx:'50%',cy:'50%',innerRadius:48,outerRadius:90,paddingAngle:2,dataKey:'value',stroke:'none'},p.data.map(function(e,i){return h(Ce,{key:i,fill:e.c})})),h(Tt,{content:h(PTT)}),h(Lg,{iconType:'circle',iconSize:6,wrapperStyle:{fontFamily:T.fLabel,fontSize:T.textXs,letterSpacing:'1px'}})))}

function PH(p){return h('div',{className:'ph'},h('span',{className:'star'},'*'),h('h3',null,p.title),p.sub&&h('span',{className:'psub'},p.sub))}

function Kpi(p){
  var style=p.bg?{backgroundImage:'url('+p.bg+')',backgroundSize:'100% 100%',backgroundPosition:'center'}:{};
  return h('div',{className:'panel kpi ai '+(p.cn||'')+' d'+p.dl,style:style},h('div',{className:'kl'},p.label),h('div',{className:'kv'},typeof p.value==='number'?p.value.toLocaleString():p.value),p.sub&&h('div',{className:'ks'},p.sub))
}

var CHARS=[{n:'Aric Velloren',r:1842,avg:16.3,tr:2.1},{n:'Liora Sunblade',r:1621,avg:15.7,tr:1.4},{n:'Thorne Blackwell',r:1401,avg:14.8,tr:-0.6},{n:'Kaelen Stormborn',r:1239,avg:17.2,tr:0.9},{n:'Mira Undertide',r:1083,avg:13.9,tr:-1.2}];
function CharTable(){
  return h('div',{style:{overflowY:'auto',maxHeight:218,scrollbarWidth:'none'}},
    h('table',{className:'char-tbl'},
      h('thead',null,h('tr',null,h('th',null,'Character'),h('th',null,'Rolls'),h('th',null,'Avg'),h('th',null,'Trend'))),
      h('tbody',null,CHARS.map(function(r,i){
        var up=r.tr>=0;
        return h('tr',{key:i},h('td',null,r.n),h('td',null,r.r.toLocaleString()),h('td',null,r.avg),h('td',{className:up?'up':'dn'},(up?'+':'')+r.tr))
      }))
    )
  )
}

var FEED=[{t:'Defeated the Night Hag in The Weeping Fen',m:'Session 87 - 2h ago'},{t:'"The price of mercy is memory." -- Liora',m:'Session 87 - 2h ago'},{t:'Aric rolled a natural 20 on Persuasion',m:'Session 87 - 3h ago'},{t:'New quest: Echoes of the Sunken Bell',m:'Session 87 - 4h ago'},{t:'Met with Captain Veyra of the Dusk Watch',m:'Session 86 - 1d ago'}];
function Feed(){return h('ul',{className:'feed'},FEED.map(function(x,i){return h('li',{key:i},h('div',{className:'ft'},x.t),h('div',{className:'fm'},x.m))}))}

function CampSnap(p){
  var c=p.c;
  function fd(x){if(!x)return'--';return new Date(x).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
  var rows=[{k:'Last Session',v:fd(c.lr)+' (Sess. '+c.se+')'},{k:'Active PCs',v:c.ch},{k:'Total Rolls',v:c.tr>0?c.tr.toLocaleString():'--'},{k:'Nat 20 / Nat 1',v:c.n20+' / '+c.n1},{k:'Campaign',v:c.nm}];
  return h('div',null,h('div',{className:'snap-sigil'},h(BL)),h('ul',{className:'snap-status'},rows.map(function(r,i){return h('li',{key:i},h('span',{className:'sk'},r.k),h('span',{className:'sv'},r.v))})))
}

var SESS=[{d:'May 25',n:'87. The Weeping Fen',loc:'Valewatch Marshes',r:'win'},{d:'May 18',n:'86. Council of Shadows',loc:'Ebonspire Keep',r:'part'},{d:'May 11',n:'85. Trail of Ashes',loc:'Greyhold Pass',r:'fail'}];
var RLAB={win:'Victory',part:'Partial',fail:'Failure'};
function SessList(){return h('ul',{className:'sess-list'},SESS.map(function(s,i){return h('li',{key:i},h('span',{className:'sd'},s.d),h('div',null,h('div',{className:'sn'},s.n),h('div',{className:'sl'},s.loc)),h('span',{className:'sr '+s.r},RLAB[s.r]))}))}

function QuoteBoard(){return h('div',{className:'quote-wrap'},h('div',{className:'quote-body'},'"We do not fear the dark. We are the dark. We shape what others fear."'),h('div',{className:'quote-attr'},'-- Thorne Blackwell -- Session 87'))}

function RIcon(p){
  var icons={
    npc:h('g',null,h('circle',{cx:8,cy:5,r:3,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M2 14 Q2 10 8 10 Q14 10 14 14',stroke:'currentColor',strokeWidth:'1.1',fill:'none'})),
    loot:h('path',{d:'M4 9 L8 3 L12 9 L10 9 L10 13 L6 13 L6 9Z M6 6 L10 6',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),
    faction:h('path',{d:'M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6Z',stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),
    quest:h('g',null,h('rect',{x:3,y:2,width:10,height:12,rx:1,stroke:'currentColor',strokeWidth:'1.1',fill:'none'}),h('path',{d:'M5.5 6 H10.5 M5.5 9 H9',stroke:'currentColor',strokeWidth:'1.1'}))
  };
  return h('svg',{width:22,height:22,viewBox:'0 0 16 16',fill:'none'},icons[p.i])
}
var RESS=[{n:'NPC Tracker',s:'character relationships',i:'npc'},{n:'Loot Tracker',s:'items & rewards',i:'loot'},{n:'Faction & Rep',s:'standing & alliances',i:'faction'},{n:'Quest Board',s:'open & closed quests',i:'quest'}];
function ResCards(){return h('div',{className:'res-grid'},RESS.map(function(r,i){return h('div',{key:i,className:'res-card'},h('div',{className:'ri'},h(RIcon,{i:r.i})),h('div',{className:'rn'},r.n),h('div',{className:'rs'},r.s))}))}

var NAV=[{l:'Overview',i:'overview'}];

function App(){
  var _=us(1),aId=_[0],set=_[1];
  var c=D.find(function(x){return x.id===aId});
  var q=c.id===2;
  var r20=c.tr>0?(c.n20/c.tr*100).toFixed(1)+'%':'--';

  return h('div',{className:'shell'},
    h('nav',{className:'side'},
      h('div',{className:'side-brand'},h('img',{src:'https://raw.githubusercontent.com/TheLittlestAskew/rectrixcaedere/main/.design/rc/imgs/logo_tex-vert-transparent.png',alt:'Rectrix Caedere',className:'side-logo-img'})),
      h('div',{className:'side-section'},'Campaigns'),
      h('ul',{className:'camp-list'},D.map(function(x){return h('li',{key:x.id},h('button',{className:(x.id===aId?'on':'')+(x.st==='p'?' off':''),onClick:x.st!=='p'?function(){set(x.id)}:undefined,title:x.st==='p'?'No sessions recorded yet':undefined,tabIndex:x.st==='p'?-1:0,'aria-disabled':x.st==='p'?'true':undefined},h('span',null,x.sn),h('span',{className:'ct'},x.st==='p'?'uncharted':x.tr.toLocaleString())))})),
      h('div',{className:'side-div'}),
      h('ul',{className:'side-nav'},NAV.map(function(n,i){return h('li',{key:n.l},h('button',{className:i===0?'on':''},h(NI,{i:n.i}),n.l))}))
    ),
    h('main',{className:'main',key:aId},

      h('div',{className:'row-hdr ai'},
        h('div',{style:{position:'relative',zIndex:1}},
          h('div',{className:'hdr-title'},'Rectrix Caedere'),
          h('div',{className:'hdr-sub'},c.nm+' -- Overview')
        ),
        h('img',{src:'https://raw.githubusercontent.com/TheLittlestAskew/rectrixcaedere/main/.design/rc/imgs/topcenterheader.png',alt:'',className:'top-center-img','aria-hidden':'true'}),
        h('div',{className:'hdr-right'},
          h('div',{className:'hdr-filter'},'Filter by campaign'),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M12 2L14.5 8 21 9 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9 9.5 8Z'}))),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'}),h('path',{d:'M13.73 21a2 2 0 0 1-3.46 0'}))),
          h('div',{className:'top-icon','aria-hidden':'true'},h('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:'1.5'},h('path',{d:'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'})))
        )
      ),

      h('div',{className:'row-kpi'},
        h(Kpi,{label:'Total Rolls',value:c.tr,dl:1}),
        h(Kpi,{label:'Sessions Logged',value:c.se,dl:2}),
        h(Kpi,{label:'Nat 20 Rate',value:r20,cn:'n20',dl:3}),
        h(Kpi,{label:'Characters',value:c.ch,dl:4}),
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
          h(CharTable)
        ),
        h('div',{className:'panel cp ai d7'},
          h(PH,{title:'Session Highlights',sub:'encounter_notes -- quotes'}),
          h(Feed)
        ),
        h('div',{className:'panel cp ai d7'},
          h(PH,{title:'Campaign Snapshot',sub:'session_id -- quest_tracker'}),
          h(CampSnap,{c:c})
        )
      ),

      h('div',{className:'row-bot'},
        h('div',{className:'panel cp ai d8'},
          h(PH,{title:'Recent Sessions',sub:'sessions -- encounter_summary'}),
          h(SessList)
        ),
        h('div',{className:'panel cp ai d8'},
          h(QuoteBoard)
        ),
        h('div',{className:'panel cp ai d8'},
          h(PH,{title:'Quick Access',sub:'resource links'}),
          h(ResCards)
        )
      )
    )
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
