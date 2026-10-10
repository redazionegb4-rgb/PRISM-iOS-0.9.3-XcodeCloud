'use strict';
// One poll cycle owns all ordinary background requests. Actions remain immediate.
let syncBusy156=false,lastFast156=0,lastSlow156=0,lastProfile156=0,retryAt156=0;
const reset156=resetOnline;resetOnline=function(){lastFast156=lastSlow156=lastProfile156=retryAt156=0;reset156()};
const remote156=remote;remote=async function(method,path,data){
 if(O.backgroundSync156&&Date.now()<retryAt156){const e=Error('Aggiornamento in attesa');e.status=429;throw e}
 try{return await remote156(method,path,data)}catch(e){if(e.status===429&&(e.message==='Attendi un minuto e riprova.'||e.message==='Controlla i dati inseriti.')){retryAt156=Date.now()+10000;e.message='Troppe richieste contemporanee. Riprova tra pochi secondi.'}throw e}
};
const state156=renderStateOnline;renderStateOnline=function(){
 if(O.backgroundSync156&&tab==='near'&&!document.querySelector('.overlay,.mediasheet150')){silentNear148();drawNoticesOnline();return}
 state156();
};
window.prismResume=async function(){
 if(syncBusy156||!O.me||document.hidden||window.prismForeground===false||window.prismMaintenance147||Date.now()<retryAt156||Date.now()-lastFast156<3500)return;
 syncBusy156=true;O.polling=true;O.backgroundSync156=true;lastFast156=Date.now();const epoch=O.epoch,chatId=O.pageChat;
 try{
  const reads=await Promise.allSettled([syncChatsOnline(),activityOnline(),notificationsOnline()]);
  if(epoch!==O.epoch||!O.me)return;
  if(chatId!==null&&O.pageChat===chatId&&(document.querySelector('.chatpage')||window.senderPreview123))await messagesOnline(chatId);
  if(Date.now()-lastSlow156>=15000&&Date.now()>=retryAt156){
   lastSlow156=Date.now();await Promise.allSettled([syncPlan118(),favoritesOnline(),albumsOnline(),blockedOnline(),remote('POST','/v1/me/heartbeat'),syncPush115()]);
  }
  if(epoch!==O.epoch||!O.me)return;
  if(Date.now()-lastProfile156>=30000&&Date.now()>=retryAt156){
   lastProfile156=Date.now();const row=await remote('GET','/v1/me');if(epoch!==O.epoch||!O.me)return;
   O.me.photo_reviews=row.photo_reviews||[];
   if(!document.querySelector('.editor98')){const changed=JSON.stringify([state.name,state.bio,state.photos,state.instagram,state.facebook])!==JSON.stringify([row.name,row.bio,row.extra?.photos||[],row.instagram||'',row.facebook||'']);myProfile(row);if(changed&&tab==='me'&&!document.querySelector('.overlay'))renderMe()}
  }
  const failed=reads.find(r=>r.status==='rejected');O.syncError=failed?failed.reason.message:'';
 }catch(e){O.syncError=e.message}finally{O.backgroundSync156=false;O.polling=false;syncBusy156=false}
};

function chatViewSignature156(rows){return JSON.stringify((rows||[]).map(r=>[r.id,r.user_id,r.name,r.photo,r.extra?.photos?.[0],r.created_at,r.last_message,r.unread_count]))}
