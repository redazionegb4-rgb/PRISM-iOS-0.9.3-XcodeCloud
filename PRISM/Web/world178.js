'use strict';
// Suggestions on opening; every typed query is resolved worldwide by the API.
let worldTimer178=null,worldKey178='',worldRun178=0,worldRows178=null,worldError178='',worldBusy178=false;
const worldCache178=new Map();
const worldDrawBase178=drawCities137;
function worldQuery178(){return (document.querySelector('#citysearch137')?.value||'').trim().slice(0,80)}
function worldRender178(){
 const box=document.querySelector('#cityresults137');if(!box)return;
 const q=worldQuery178(),rows=worldRows178||[],pages=Math.max(1,Math.ceil(rows.length/pageSize175));
 cityPage175=Math.max(0,Math.min(cityPage175,pages-1));
 document.querySelector('#cityclear138').hidden=!q;
 document.querySelector('#citylisttitle138').textContent='Risultati nel mondo';
 document.querySelector('#citycount138').textContent=worldBusy178?'Ricerca…':rows.length+' risultati';
 document.querySelector('#cityrecent138').innerHTML='';
 box.innerHTML=worldBusy178?'<div class="cityempty138" role="status">Cerco città e comuni nel mondo…</div>':worldError178?'<div class="cityempty138"><b>Ricerca non disponibile</b><p>'+esc(worldError178)+'</p><button onclick="retryWorld178()">Riprova</button></div>':q.length<2?'<div class="cityempty138">Scrivi almeno 2 caratteri per cercare nel mondo.</div>':rows.slice(cityPage175*pageSize175,(cityPage175+1)*pageSize175).map(c=>'<button class="cityrow137 citycard138 '+(cityDraft138?.id===c.id?'chosen137':'')+'" aria-pressed="'+(cityDraft138?.id===c.id)+'" onclick="selectCity137(\''+esc(c.id)+'\')"><span class="cityinitial138">'+esc(c.name.slice(0,1))+'</span><div><b>'+esc(c.name)+'</b><small>'+esc([c.region,c.country].filter(Boolean).join(' · '))+'</small></div><i>'+icon(cityDraft138?.id===c.id?'check':'plus')+'</i></button>').join('')||'<div class="cityempty138"><b>Nessun risultato</b><p>Prova il nome completo, anche seguito dal Paese. La disponibilità dipende dai dati geografici.</p></div>';
 document.querySelector('.citypages175')?.remove();document.querySelector('.worldcredit178')?.remove();
 if(!worldBusy178&&!worldError178&&pages>1)box.insertAdjacentHTML('afterend','<div class="citypages175" aria-label="Pagine dei risultati"><button aria-label="Pagina precedente" onclick="changeCityPage175(-1)" '+(cityPage175===0?'disabled':'')+'>'+icon('back')+'</button><span>Pagina '+(cityPage175+1)+' di '+pages+'</span><button aria-label="Pagina successiva" onclick="changeCityPage175(1)" '+(cityPage175===pages-1?'disabled':'')+'>'+icon('chevron')+'</button></div>');
 box.insertAdjacentHTML('afterend','<p class="worldcredit178">Dati geografici © OpenStreetMap contributors · Photon</p>');
}
async function worldFetch178(key,run,q,region,epoch){
 try{
  const data=await remote('POST','/v1/explore/search',{q,region});
  if(run!==worldRun178||epoch!==O.epoch||key!==worldKey178||!document.querySelector('#cityresults137'))return;
  if(!data.world_search)throw new Error('Aggiorna il server PRISM per attivare la ricerca mondiale.');
  const rows=Array.isArray(data.cities)?data.cities:[];
  worldCache178.set(key,rows);if(worldCache178.size>50)worldCache178.delete(worldCache178.keys().next().value);
  const merged=new Map((cityCatalog137||[]).map(c=>[c.id,c]));rows.forEach(c=>merged.set(c.id,c));cityCatalog137=[...merged.values()];
  worldRows178=rows;worldBusy178=false;worldRender178();
 }catch(e){
  if(run!==worldRun178||epoch!==O.epoch||key!==worldKey178||!document.querySelector('#cityresults137'))return;
  worldBusy178=false;worldError178=e.message||'Riprova tra qualche istante.';worldRender178();
 }
}
drawCities137=function(){
 if(!document.querySelector('#cityresults137'))return;
 const q=worldQuery178(),key=cityRegion138+'|'+q.toLocaleLowerCase();
 if(!q){
  if(worldKey178){worldRun178++;clearTimeout(worldTimer178);worldKey178='';worldRows178=null;worldBusy178=false;worldError178='';cityPage175=0}
  worldDrawBase178();document.querySelector('.worldcredit178')?.remove();
  const heading=document.querySelector('#citylisttitle138');if(heading)heading.textContent='Destinazioni suggerite';return;
 }
 if(key!==worldKey178){
  clearTimeout(worldTimer178);const run=++worldRun178;worldKey178=key;cityPage175=0;worldError178='';
  worldRows178=worldCache178.get(key)||null;worldBusy178=q.length>=2&&!worldRows178;
  if(worldBusy178){const region=cityRegion138,epoch=O.epoch;worldTimer178=setTimeout(()=>worldFetch178(key,run,q,region,epoch),550)}
 }
 worldRender178();
};
function retryWorld178(){worldCache178.delete(worldKey178);worldKey178='';drawCities137()}
const worldOpenBase178=openCities137;
openCities137=async function(){
 worldRun178++;clearTimeout(worldTimer178);worldKey178='';worldRows178=null;worldError178='';worldBusy178=false;
 const task=worldOpenBase178(),input=document.querySelector('#citysearch137');if(input){input.maxLength=80;input.placeholder='Qualsiasi città o comune nel mondo'}return task;
};
const worldResetBase178=resetOnline;
resetOnline=function(){worldRun178++;clearTimeout(worldTimer178);worldKey178='';worldRows178=null;worldCache178.clear();worldResetBase178()};
