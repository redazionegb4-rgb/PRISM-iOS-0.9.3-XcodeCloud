 'use strict';
(()=>{
 let busy=false,last=0,epoch=-1,queuedOpen=false;
 async function mark(through,accountEpoch){await remote('POST','/v1/me/verification-decisions/read',{through});if(accountEpoch===O.epoch)await notificationsOnline()}
 async function sync(force=false,open=false){if(busy){if(open)queuedOpen=true;return}if(!O.me||document.hidden||window.prismForeground===false)return;if(!force&&epoch===O.epoch&&Date.now()-last<15000)return;busy=true;last=Date.now();const ownEpoch=O.epoch;epoch=ownEpoch;try{
 const d=await remote('GET','/v1/me/verification-decisions');if(ownEpoch!==O.epoch||!O.me)return;const events=d.events||[];
 if(open){const opened=await verificationPage232();if(!opened)return;if(ownEpoch===O.epoch&&events.length)await mark(Math.max(...events.map(e=>e.id)),ownEpoch);return}
 if(!events.length||document.querySelector('dialog[open],.popup177,.photoreview198,.photoreview200')||window.recording||window.voicePending)return;
 const e=events[events.length-1],through=Math.max(...events.map(e=>e.id)),approved=e.status==='approved';
 const box=document.createElement('dialog');box.id='verificationnotice234';box.className='badgeinfo231 verificationnotice234';box.innerHTML='<div class="badgeart231 verified">'+badgeIcon231('verified')+'</div><h2>'+(approved?'Profilo verificato!':'Verifica non approvata')+'</h2><p>'+(approved?'Il controllo è completato. Il badge Verificato è ora visibile sul tuo profilo.':'Il team ha esaminato la richiesta. Apri l’esito per leggere il motivo e le indicazioni.')+'</p><p class="verificationerror234" role="alert"></p><button type="button" class="primary wide" data-open234>Vedi esito</button><button type="button" class="pill wide" data-read234>Ho capito</button>';
 async function acknowledge(show){const buttons=[...box.querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);try{if(ownEpoch!==O.epoch){box.close();return}if(show&&!(await verificationPage232()))return;await mark(through,ownEpoch);box.close();if(!show&&approved&&ownEpoch===O.epoch){const row=await remote('GET','/v1/me');if(ownEpoch===O.epoch){myProfile(row);if(tab==='me'&&!document.querySelector('.overlay'))renderMe()}}}catch(err){if(box.isConnected)box.querySelector('.verificationerror234').textContent=err.message}finally{buttons.forEach(b=>b.disabled=false)}}
 box.querySelector('[data-open234]').onclick=()=>acknowledge(true);box.querySelector('[data-read234]').onclick=()=>acknowledge(false);box.addEventListener('cancel',ev=>ev.preventDefault());box.addEventListener('close',()=>box.remove());document.body.append(box);box.showModal();
 }catch(err){O.verificationNoticeError234=err.message}finally{busy=false;if(queuedOpen){queuedOpen=false;setTimeout(()=>sync(true,true),0)}}}
 window.prismVerificationPush234=()=>sync(true,true);
 const resume=window.prismResume;window.prismResume=async function(){await resume?.();await sync()};
 const reset=resetOnline;resetOnline=function(...args){document.querySelector('#verificationnotice234')?.remove();last=0;epoch=-1;queuedOpen=false;return reset(...args)};
 setInterval(()=>sync(),5000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync(true)});setTimeout(()=>sync(true),1500);
})();
