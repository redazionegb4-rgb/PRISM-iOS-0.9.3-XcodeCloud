'use strict';
(()=>{
 let busy=false,last=0,items=[],dismissed=new Set(),notified=new Set(),account='';
 async function refresh(force=false){
  if(!O.me||busy||document.hidden||window.prismForeground===false||window.prismMaintenance147||(!force&&Date.now()-last<30000))return;
  busy=true;last=Date.now();const epoch=O.epoch;
  try{const data=await remote('GET','/v1/me/photo-decisions');if(epoch!==O.epoch||!O.me)return;
   if(account!==O.me.user_id){account=O.me.user_id;dismissed.clear();notified.clear()}
   items=data.rejected||[];
   const approved=(data.events||[]).filter(e=>e.status==='approved'&&!notified.has(e.id));
   if(approved.length)toast(approved.length===1?'La tua foto è stata approvata.':approved.length+' foto sono state approvate.');
   for(const event of data.events||[])notified.add(event.id);
   if(data.events?.length)await remote('POST','/v1/me/photo-decisions/read',{through:Math.max(...data.events.map(e=>e.id))});
   showNext();
  }catch(e){O.photoReviewError198=e.message}finally{busy=false}
 }
 function showNext(){
  if(!O.me||document.querySelector('.popup177,.mediasheet150,.privatecall149,.live-room')||document.activeElement?.matches('input,textarea')||window.prismMaintenance147)return;
  const item=items.find(p=>!dismissed.has(p.photo_hash));if(!item)return;
  const popup=popup177('<h2>Foto non approvata</h2><div class="rejectedphoto198"><img src="'+esc(item.photo)+'" alt="La foto rifiutata del tuo profilo"></div><p class="reviewreason198">'+esc(item.note||'La foto non rispetta le regole delle foto pubbliche.')+'</p><p class="reviewhint199">Eliminala per aggiungere una nuova foto.</p><p class="reviewerror198" role="alert"></p><div class="reviewactions198"><button type="button" class="primary" data-remove-photo198>Elimina dal profilo</button><button type="button" class="pill" data-later-photo198>Più tardi</button></div>','photo-review198');
  dismissed.add(item.photo_hash);
  popup.querySelector('[data-later-photo198]').onclick=()=>{closePopup177(popup)};
  popup.querySelector('[data-remove-photo198]').onclick=async()=>{
   const button=popup.querySelector('[data-remove-photo198]');button.disabled=true;const epoch=O.epoch;
   try{const row=await remote('DELETE','/v1/me/rejected-photos/'+item.photo_hash);if(epoch!==O.epoch)return;
    myProfile(row);items=items.filter(x=>x.photo_hash!==item.photo_hash);
    // Preserve any unsaved text/settings in the profile editor; remove only this photo.
    if(typeof profileDraft7!=='undefined'&&profileDraft7){profileDraft7.photos=(profileDraft7.photos||[]).filter(p=>p!==item.photo);if(typeof renderEditor7==='function'&&document.querySelector('.editor98'))renderEditor7()}
    closePopup177(popup);if(tab==='me'&&!document.querySelector('.overlay'))renderMe();toast('Foto eliminata. Puoi aggiungerne una nuova.');setTimeout(showNext,200);
   }catch(e){if(popup.isConnected)popup.querySelector('.reviewerror198').textContent=e.message;button.disabled=false}
  };
 }
 const enter=enterOnline;enterOnline=async function(...args){const result=await enter(...args);dismissed.clear();await refresh(true);return result};
 const notices=notificationsOnline;notificationsOnline=async function(...args){const result=await notices(...args);void refresh();return result};
 const open=window.prismRefreshOnOpen172;window.prismRefreshOnOpen172=function(...args){dismissed.clear();const result=open?.(...args);void refresh(true);return result};
 const reset=resetOnline;resetOnline=function(...args){last=0;items=[];dismissed.clear();notified.clear();account='';return reset(...args)};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden){dismissed.clear();void refresh(true)}});
 setInterval(()=>{if(!document.hidden)showNext()},3000);
 window.prismPhotoReview198=()=>refresh(true);
})();
