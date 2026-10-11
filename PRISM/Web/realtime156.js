'use strict';
// One owner for polling and foreground refreshes; preserve the current page.
let syncBusy156=false,lastFast156=0,lastSlow156=0,lastProfile156=0,retryAt156=0;
let pendingOpen172=false,lastOpen172=-Infinity;
const reset156=resetOnline;resetOnline=function(){lastFast156=lastSlow156=lastProfile156=retryAt156=0;pendingOpen172=false;lastOpen172=-Infinity;reset156()};
const remote156=remote;remote=async function(method,path,data){
 if(O.backgroundSync156&&Date.now()<retryAt156){const e=Error('Aggiornamento in attesa');e.status=429;throw e}
 try{return await remote156(method,path,data)}catch(e){if(e.status===429&&(e.message==='Attendi un minuto e riprova.'||e.message==='Controlla i dati inseriti.')){retryAt156=Date.now()+10000;e.message='Troppe richieste contemporanee. Riprova tra pochi secondi.'}throw e}
};
const state156=renderStateOnline;renderStateOnline=function(){
 if(O.backgroundSync156&&tab==='near'&&!document.querySelector('.overlay,.mediasheet150')){queuedNear139=true;return}
 state156();
};
window.prismResume=async function(){
 if(syncBusy156||O.entering172||!O.me||document.hidden||window.prismForeground===false||window.prismMaintenance147||Date.now()<retryAt156||(!pendingOpen172&&Date.now()-lastFast156<3500))return;
 const full=pendingOpen172;pendingOpen172=false;
 syncBusy156=true;O.polling=true;O.backgroundSync156=true;lastFast156=Date.now();const epoch=O.epoch,chatId=O.pageChat;
 try{
  const reads=await Promise.allSettled([syncChatsOnline(),activityOnline(),notificationsOnline()]);
  if(epoch!==O.epoch||!O.me)return;
  if(chatId!==null&&O.pageChat===chatId&&(document.querySelector('.chatpage')||window.senderPreview123))await messagesOnline(chatId);
  if((full||Date.now()-lastSlow156>=15000)&&Date.now()>=retryAt156){
   lastSlow156=Date.now();await Promise.allSettled([syncPlan118(),favoritesOnline(),albumsOnline(),blockedOnline(),remote('POST','/v1/me/heartbeat'),syncPush115()]);
  }
  if(epoch!==O.epoch||!O.me)return;
  if((full||Date.now()-lastProfile156>=30000)&&Date.now()>=retryAt156){
   lastProfile156=Date.now();const row=await remote('GET','/v1/me');if(epoch!==O.epoch||!O.me)return;
   O.me.photo_reviews=row.photo_reviews||[];
   if(!document.querySelector('.editor98')){const changed=JSON.stringify([state.name,state.bio,state.photos,state.instagram,state.facebook])!==JSON.stringify([row.name,row.bio,row.extra?.photos||[],row.instagram||'',row.facebook||'']);myProfile(row);if(changed&&tab==='me'&&!document.querySelector('.overlay'))renderMe()}
  }
  if(epoch!==O.epoch||!O.me)return;
  if((full||Date.now()-lastAuto139>=60000)&&Date.now()>=retryAt156){
   if(autoBusy139||refreshBusy9){if(full)pendingOpen172=true;return}
   autoBusy139=true;deferNear139=true;
   try{
    // Stories refresh even without GPS; never prompt for a location permission here.
    if(O.me.latitude!=null||exploreCity137)await nearbyOnline();
    if(epoch!==O.epoch||!O.me)return;
    await storiesOnline();
    if(epoch!==O.epoch||!O.me)return;
    lastAuto139=Date.now();updatedAt100=lastAuto139;queuedNear139=true;
   }finally{autoBusy139=false;deferNear139=false}
  }
  const failed=reads.find(r=>r.status==='rejected');O.syncError=failed?failed.reason.message:'';
 }catch(e){O.syncError=e.message;if(full)pendingOpen172=true}finally{O.backgroundSync156=false;O.polling=false;syncBusy156=false;flushNear139();drawNoticesOnline()}
};
window.prismRefreshOnOpen172=function(){
 if(!O.me||O.entering172||Date.now()-lastOpen172<1000)return;
 lastOpen172=Date.now();pendingOpen172=true;void window.prismResume();
};
// Native iOS/Android lifecycle sets this flag; ordinary polling never sets it.
let foreground172=window.prismForeground;
Object.defineProperty(window,'prismForeground',{configurable:true,get(){return foreground172},set(value){const previous=foreground172;foreground172=value;if(value!==false&&previous===false)window.prismRefreshOnOpen172()}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)window.prismRefreshOnOpen172()});
function chatViewSignature156(rows){return JSON.stringify((rows||[]).map(r=>[r.id,r.user_id,r.name,r.photo,r.extra?.photos?.[0],r.created_at,r.last_message,r.unread_count]))}
