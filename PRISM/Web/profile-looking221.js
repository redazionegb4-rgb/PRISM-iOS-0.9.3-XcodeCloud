'use strict';
// Keep one clearly named section and explicit controls, independently of label decoration.
lookingFor8=function(){
 const allowed=['Nuove conoscenze','Amicizia','Appuntamenti','Una relazione','Incontri'];
 const current=profileDraft7.intents??state.intents??String(profileDraft7.intent||'').split(' · ');
 const selected=Array.isArray(current)?current:[];
 return '<div id="lookingfor8" class="lookingchoices221" role="group" aria-label="Cosa cerchi">'+allowed.map(value=>'<label class="lookingchoice221"><input type="checkbox" value="'+esc(value)+'" '+(selected.includes(value)?'checked':'')+'><span class="lookingcaption221">'+profileIcon220(profileLabels220[value])+'<span>'+esc(value)+'</span></span><span class="lookingcheck221" aria-hidden="true">'+icon('check')+'</span></label>').join('')+'</div>';
};
const editorLooking221=renderEditor7;
renderEditor7=function(...args){
 const result=editorLooking221(...args);
 const section=document.querySelector('#lookingfor8')?.closest('.editsection98');
 if(section){
  const title=section.querySelector('h2');
  if(title)title.innerHTML='<span class="profilecaption220">'+profileIcon220('heart')+'<span>Cerco</span></span>';
  const hint=section.querySelector('.hint');if(hint)hint.textContent='Scegli una o più opzioni, oppure lascia vuoto.';
 }
 return result;
};
