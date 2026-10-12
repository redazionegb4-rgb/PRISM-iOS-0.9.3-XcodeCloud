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
  // Set dimensions directly, independent of shared or cached app styles.
  function style200(node,props){for(const [key,value] of Object.entries(props))node.style.setProperty(key,value,'important')}
  const card=popup.querySelector('.popupcard177'),height=window.visualViewport?.height||innerHeight;
  style200(popup,{'display':'flex','align-items':'center','justify-content':'center','position':'fixed','inset':'0','padding':'16px','box-sizing':'border-box','overflow':'hidden'});
  style200(card,{'width':'min(320px,calc(100vw - 32px))','max-width':'320px','height':'auto','min-height':'0','max-height':Math.max(280,height-32)+'px','margin':'0','padding':'26px 20px 18px','box-sizing':'border-box','display':'flex','flex-direction':'column','align-items':'stretch','gap':'0','overflow':'hidden','text-align':'center','transform':'none','animation':'none','border-radius':'23px'});
  style200(card.querySelector('h2'),{'font-size':'17px','line-height':'22px','font-weight':'700','margin':'0 14px 12px','padding':'0'});
  const size=height<450?'48px':'64px';
  style200(card.querySelector('.rejectedphoto198'),{'width':size,'height':size,'min-width':size,'max-width':size,'min-height':size,'max-height':size,'flex':'0 0 '+size,'margin':'0 auto 12px','padding':'0','overflow':'hidden','border-radius':'12px','position':'relative'});
  const image=card.querySelector('.rejectedphoto198 img');image.width=parseInt(size);image.height=parseInt(size);
  style200(image,{'width':size,'height':size,'min-width':size,'max-width':size,'min-height':size,'max-height':size,'display':'block','object-fit':'cover','position':'static','margin':'0','padding':'0','transform':'none'});
  const reason=card.querySelector('.reviewreason198');reason.title=reason.textContent;
  style200(reason,{'font-size':'12px','line-height':'16px','max-height':'64px','overflow':'hidden','margin':'0 0 8px','padding':'8px 10px','display':'-webkit-box','-webkit-line-clamp':'3','-webkit-box-orient':'vertical','flex-shrink':'1'});
  style200(card.querySelector('.reviewhint199'),{'font-size':'11px','line-height':'15px','margin':'0 0 14px','padding':'0','max-height':'30px','overflow':'hidden'});
  style200(card.querySelector('.reviewactions198'),{'display':'flex','flex-direction':'column','align-items':'center','justify-content':'center','gap':'8px','margin':'0','padding':'0','width':'100%','flex-shrink':'0'});
  for(const button of card.querySelectorAll('.reviewactions198 button'))style200(button,{'width':'100%','min-width':'0','height':'42px','min-height':'42px','max-height':'42px','display':'flex','align-items':'center','justify-content':'center','margin':'0','padding':'0 12px','font-size':'13px','line-height':'18px','border-radius':'13px','flex':'0 0 42px','text-align':'center'});
  style200(card.querySelector('.popupclose177'),{'width':'28px','height':'28px','min-width':'28px','min-height':'28px','max-width':'28px','max-height':'28px','right':'8px','top':'8px','display':'grid','place-items':'center','padding':'0','margin':'0'});
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
