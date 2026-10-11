'use strict';
let popupSequence177=0,noticeQueue177=[],noticePending177=new Set();
const inert177=new Map();
function topPopup177(){return [...document.querySelectorAll('.popup177')].at(-1)}
function popup177(html,kind='action'){
 const previous=document.activeElement,element=document.createElement('section'),id='popup-title177-'+(++popupSequence177);
 element.className='popup177';element.dataset.kind177=kind;
 element.innerHTML='<div class="popupcard177" role="dialog" aria-modal="true" tabindex="-1"><button class="popupclose177" aria-label="Chiudi popup" onclick="closePopup177()">'+icon('close')+'</button>'+html+'</div>';
 const card=element.querySelector('.popupcard177'),heading=card.querySelector('h1,h2');
 if(heading){heading.id=id;card.setAttribute('aria-labelledby',id)}else card.setAttribute('aria-label','Avviso PRISM');
 element.previousFocus177=previous;
 element.style.zIndex=String(10000+popupSequence177);
 document.body.append(element);
 for(const el of document.querySelectorAll('#app,#nav,body>header,.overlay')){if(!inert177.has(el))inert177.set(el,el.inert);el.inert=true}
 for(const button of card.querySelectorAll('button')){
  if(/^Annulla$/i.test(button.textContent.trim()))button.setAttribute('onclick','closePopup177()');
 }
 element.addEventListener('click',event=>{if(event.target===element&&topPopup177()===element)closePopup177()});
 // Confirmations keep their original server action; dismiss before it runs.
 card.addEventListener('click',event=>{
  const button=event.target.closest('button.primary[onclick]');
  if(kind==='action'&&button)closePopup177(element);
 },true);
 card.focus();return element;
}
function closePopup177(element=topPopup177()){
 if(!element)return;
 const wasTop=element===topPopup177();element.remove();
 const next=topPopup177();
 if(!next){for(const [el,value] of inert177)el.inert=value;inert177.clear()}
 if(wasTop){if(next)next.querySelector('.popupcard177')?.focus();else if(element.previousFocus177?.isConnected)element.previousFocus177.focus()}
 if(element.dataset.kind177==='notice')pumpNotice177();
}
function pumpNotice177(){
 if(document.querySelector('.popup177[data-kind177="notice"]')||!noticeQueue177.length)return;
 const message=noticeQueue177.shift();noticePending177.delete(message);
 const element=popup177('<h2>Avviso</h2><p></p><button class="primary wide" onclick="closePopup177()">Ho capito</button>','notice');
 element.querySelector('p').textContent=message;
}
toast=function(message){
 const text=String(message||'').trim();if(!text)return;
 if(noticePending177.has(text)||[...document.querySelectorAll('.popup177[data-kind177="notice"] p')].some(p=>p.textContent===text))return;
 noticePending177.add(text);noticeQueue177.push(text);queueMicrotask(pumpNotice177);
};
const overlay177=overlay;
overlay=function(html,cls=''){
 const title=String(html).match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i)?.[1]?.replace(/<[^>]*>/g,' ')||'';
 if((!cls&&/blocca|elimin|segnal|uscir|disconnett|conferm|attenzion|avviso/i.test(title))||/confirm|warning|alert/.test(cls))return popup177(html);
 for(const el of document.querySelectorAll('.popup177'))closePopup177(el);
 return overlay177(html,cls);
};
// Read the form before dismissing; keep the profile/chat underneath intact.
reportOnline=async function(event,id){
 event.preventDefault();const form=event.target,reason=form.querySelector('#report_reason')?.value||'',popup=form.closest('.popup177'),button=form.querySelector('button');
 if(button?.disabled)return;if(button)button.disabled=true;
 try{await remote('POST','/v1/reports/'+people[id].user_id,{reason});if(popup)closePopup177(popup);toast('Segnalazione inviata')}
 catch(error){toast(error.message)}finally{if(button?.isConnected)button.disabled=false}
};
function popupHeight177(){document.documentElement.style.setProperty('--popup-height177',(window.visualViewport?.height||innerHeight)+'px')}
window.visualViewport?.addEventListener('resize',popupHeight177);window.addEventListener('resize',popupHeight177);popupHeight177();
document.addEventListener('keydown',event=>{
 const input=event.target;
 if(input?.id==='citysearch137'&&event.key==='Enter'&&!event.isComposing){event.preventDefault();drawCities137();input.blur();return}
 const popup=topPopup177();if(!popup)return;
 if(event.key==='Escape'){event.preventDefault();closePopup177();return}
 if(event.key==='Tab'){
  const list=[...popup.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex="0"]')];
  const first=list[0],last=list.at(-1);
  if(event.shiftKey&&(document.activeElement===first||document.activeElement===popup.querySelector('.popupcard177'))){event.preventDefault();last?.focus()}
  else if(!event.shiftKey&&(document.activeElement===last||!popup.contains(document.activeElement))){event.preventDefault();first?.focus()}
 }
});
const world177=openCities137;
openCities137=async function(){const task=world177(),input=document.querySelector('#citysearch137');if(input){input.setAttribute('enterkeyhint','search');input.setAttribute('type','search')}return task};
const back177=window.prismBack;
window.prismBack=function(){if(topPopup177()){closePopup177();return}return back177?.()};
