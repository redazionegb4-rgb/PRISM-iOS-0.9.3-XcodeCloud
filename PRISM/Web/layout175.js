'use strict';
let cityPage175=0,cityQuery175='';
const pageSize175=8;
function cityMatches175(){
 const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const query=normalize(document.querySelector('#citysearch137')?.value.trim()||'');
 const key=cityRegion138+'|'+query;
 if(key!==cityQuery175){cityPage175=0;cityQuery175=key}
 return (cityCatalog137||[]).filter(c=>(cityRegion138==='all'||(cityRegion138==='italy')===(c.country==='Italia'))&&normalize(c.name+' '+c.country+' '+c.id).includes(query));
}
const drawCities175=drawCities137;
drawCities137=function(){
 if(!document.querySelector('#cityresults137')||!cityCatalog137)return;
 const all=cityCatalog137,matches=cityMatches175(),pages=Math.max(1,Math.ceil(matches.length/pageSize175));
 cityPage175=Math.max(0,Math.min(cityPage175,pages-1));
 // Reuse original card actions/filtering; never truncate the real catalog.
 try{cityCatalog137=matches.slice(cityPage175*pageSize175,(cityPage175+1)*pageSize175);drawCities175()}finally{cityCatalog137=all}
 document.querySelector('#citycount138').textContent=matches.length+' città';
 document.querySelector('.citypages175')?.remove();
 document.querySelector('#cityresults137').insertAdjacentHTML('afterend',
  '<div class="citypages175" aria-label="Pagine delle città"><button aria-label="Pagina precedente" onclick="changeCityPage175(-1)" '+(cityPage175===0?'disabled':'')+'>'+icon('back')+'</button><span>Pagina '+(cityPage175+1)+' di '+pages+'</span><button aria-label="Pagina successiva" onclick="changeCityPage175(1)" '+(cityPage175===pages-1?'disabled':'')+'>'+icon('chevron')+'</button></div>');
};
function changeCityPage175(delta){cityPage175+=delta;drawCities137();document.querySelector('#cityresults137')?.scrollIntoView({block:'nearest',behavior:'smooth'})}
const openCities175=openCities137;
openCities137=async function(){
 cityPage175=0;cityQuery175='';
 const task=openCities175(),current=document.querySelector('.cities138 .currentcity137');
 if(current)current.innerHTML=icon('location')+'<span>Qui vicino</span>';
 return task;
};
// Navigation always leaves the previous overlay before its destination opens.
document.addEventListener('click',event=>{
 if(event.target.closest?.('#nav button')&&document.querySelector('.overlay')){
  // Suppress story-origin restoration when deliberately changing sections.
  const previous=replacingOverlay96;replacingOverlay96=true;
  try{closeOverlay()}finally{replacingOverlay96=previous}
 }
},true);
