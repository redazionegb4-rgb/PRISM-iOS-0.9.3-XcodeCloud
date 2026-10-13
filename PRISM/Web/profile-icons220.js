'use strict';
// Self-contained line artwork: no fonts, network requests or user data in SVG.
const profilePaths220={
 people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/>',
 user:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 bear:'<circle cx="6" cy="5" r="3"/><circle cx="18" cy="5" r="3"/><path d="M5 6c-4 5-2 15 7 15S23 11 19 6"/><circle cx="9" cy="11" r=".7"/><circle cx="15" cy="11" r=".7"/><ellipse cx="12" cy="16" rx="3" ry="2"/><path d="M12 15v2"/>',
 sparkle:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
 mature:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3M8 15l4 3 4-3m-4 3v3"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
 glasses:'<rect x="2" y="9" width="8" height="7" rx="3"/><rect x="14" y="9" width="8" height="7" rx="3"/><path d="M10 12a2 2 0 0 1 4 0M2 10l1-5m19 5-1-5"/>',
 sport:'<path d="M3 8v8m3-11v14m12-14v14m3-11v8M6 12h12"/>',
 jacket:'<path d="m8 3-5 3-2 12 4 1 2-9v11h10V10l2 9 4-1-2-12-5-3-4 4ZM8 3l4 9 4-9m-4 9v9m-5-5h3"/>',
 wave:'<path d="M2 15c3-4 6 4 10 0s7 4 10 0M2 20c3-4 6 4 10 0s7 4 10 0"/><circle cx="12" cy="7" r="4"/><path d="M9 3 7 2m8 1 2-1"/>',
 ribbon:'<path d="M9 3c-3 5 0 8 4 13l4 5 3-3-5-6c-3-3-5-6-4-9ZM15 3c3 5 0 8-4 13l-4 5-3-3 5-6c3-3 5-6 4-9Z"/>',
 robust:'<circle cx="12" cy="6" r="3"/><path d="M3 21v-3a9 9 0 0 1 18 0v3M7 16v5m10-5v5"/>',
 trans:'<circle cx="12" cy="12" r="4"/><path d="M12 16v6m-3-2h6M15 9l6-6m-4 0h4v4M9 9 3 3m0 4V3h4M4 8l4-4"/>',
 star:'<path d="m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
 photo:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 5 5 3-3 4 4"/>',
 bio:'<path d="M4 3h16v18H4ZM8 8h8m-8 4h8m-8 4h5"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-11 5h2m3 0h2m-7 3h2"/>',
 ruler:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M7 6h5m-5 4h3m-3 4h5m-5 4h3"/>',
 scale:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 8a6 6 0 0 1 10 0l-5 4Zm5 4 2-5"/>',
 arrows:'<path d="M5 4v16m-3-3 3 3 3-3M19 20V4m-3 3 3-3 3 3"/>',
 heart:'<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 2 11 8 16 6-5 13-11 8-16Z"/>',
 chat:'<path d="M21 11a9 9 0 0 1-9 9H3v-9a9 9 0 0 1 18 0ZM7 9h10m-10 5h6"/>',
 coffee:'<path d="M4 8h13v7a6 6 0 0 1-12 0V8Zm13 1h2a3 3 0 0 1 0 6h-2M3 22h16M8 2v3m5-3v3"/>',
 links:'<path d="m10 7 3-3a5 5 0 0 1 7 7l-3 3m-3 3-3 3a5 5 0 0 1-7-7l3-3m1 6 8-8"/>',
 pin:'<path d="M19 9c0 6-7 13-7 13S5 15 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2.5"/>',
 settings:'<path d="M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6m-6 0v6"/>',
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
 facebook:'<path d="M14 22V13h3l1-4h-4V7c0-2 1-3 4-3V1h-3c-4 0-5 2-5 6v2H7v4h3v9"/>'
};
function profileIcon220(key){return '<svg class="profileicon220" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+(profilePaths220[key]||profilePaths220.people)+'</svg>'}
const communityIcons220={'Orso':'bear','Aspetto pulito':'sparkle','Daddy':'mature','Riservato':'lock','Nerd':'glasses','Sportivo':'sport','Vestiti in pelle':'jacket','Lontra':'wave','HIV+':'ribbon','Robusto':'robust','Trans':'trans','Twink':'star'};
const profileLabels220={'Foto del profilo':'photo','Le tue foto':'photo','Aggiungi foto':'photo','Qualcosa di te':'bio','Su di me':'bio','Presentati':'bio','Qui per…':'heart','Cerco':'heart','I tuoi dettagli':'settings','I miei dettagli':'settings','Dettagli personali':'settings','I tuoi social':'links','Social':'links','Le mie Community':'people','Community':'people','Nome':'user','Bio':'bio','Età':'calendar','Data di nascita':'calendar','Altezza':'ruler','Peso':'scale','Identità':'user','Ruolo':'arrows','Situazione sentimentale':'heart','Instagram':'instagram','Facebook':'facebook','La tua città':'pin','Privacy':'lock','Nuove conoscenze':'people','Amicizia':'chat','Appuntamenti':'calendar','Una relazione':'heart','Incontri':'coffee'};
function profileKey220(text){const v=text.trim();if(communityIcons220[v])return communityIcons220[v];for(const [label,key] of Object.entries(profileLabels220))if(v===label||v.startsWith(label+' ·')||v.startsWith(label+' (')||v.startsWith(label+' —'))return key;if(/^\d+\s?cm$/.test(v))return 'ruler';if(/^\d+\s?kg$/.test(v))return 'scale';return null}
function decorateProfile220(root){
 if(!root)return;
 root.querySelectorAll('h2,h3,legend,label,.profiletags99>span,.p209-field>span,.p209-details small').forEach(el=>{
  if(el.querySelector('.profileicon220,.sociallabel98')||el.querySelector(':scope > .icon'))return;
  const nodes=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim());
  const text=nodes.map(n=>n.textContent).join(' ').trim();
  const key=profileKey220(text);if(!key)return;
  const caption=document.createElement('span');caption.className='profilecaption220';
  caption.innerHTML=profileIcon220(key);const words=document.createElement('span');words.textContent=text;caption.append(words);
  el.insertBefore(caption,nodes[0]);nodes.forEach(n=>n.remove());
 });
}
