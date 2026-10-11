'use strict';
function rangeProgress176(){
 const range=document.querySelector('#cityradius138');if(!range)return;
 const value=Number(range.value),min=Number(range.min),max=Number(range.max);
 range.style.setProperty('--range176',Math.max(0,Math.min(100,(value-min)/(max-min)*100))+'%');
 range.setAttribute('aria-valuetext',value+' chilometri dal centro della città');
}
const drawCity176=drawCityDraft138;
drawCityDraft138=function(){
 drawCity176();
 const page=document.querySelector('.cities138');if(!page)return;
 const label=page.querySelector('.cityselectedname138 small');
 if(label)label.textContent='DESTINAZIONE SELEZIONATA';
 const close=page.querySelector('.cityselectedname138>button');
 if(close){close.setAttribute('aria-label','Rimuovi la città selezionata');close.setAttribute('title','Rimuovi selezione')}
 const range=page.querySelector('#cityradius138');
 if(range)range.addEventListener('input',rangeProgress176);
 rangeProgress176();
};
const world176=openCities137;
openCities137=async function(){
 const task=world176();
 const restore=document.querySelector('.cities138 .currentcity137');
 if(restore){
  restore.innerHTML=icon('location')+'<span>Torna alla mia posizione</span>';
  restore.setAttribute('aria-label','Ripristina la ricerca vicino alla mia posizione GPS');
  restore.setAttribute('title','Esci dalla città esplorata e torna vicino a te');
 }
 return task;
};
