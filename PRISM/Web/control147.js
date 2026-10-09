'use strict';
(()=>{
 const base=remote;let maintenance=null,notice=null,busy=false,lastUser=null,returnFocus=null,noticeRevision=0;const locks=new Map();
 window.prismMaintenance147=false;
 function lock(){for(const el of document.body.children){if(el.id==='prismcontrol147'||el.tagName==='SCRIPT'||el.tagName==='STYLE'||el.tagName==='LINK')continue;if(!locks.has(el))locks.set(el,el.inert);el.inert=true;}}
 function unlock(){for(const [el,value]of locks)if(el.isConnected)el.inert=value;locks.clear();}
 function close(){document.querySelector('#prismcontrol147')?.remove();unlock();returnFocus?.isConnected&&returnFocus.focus();returnFocus=null;}
 function draw(){
  if(!maintenance&&!notice){close();return;}
  let root=document.querySelector('#prismcontrol147');const fresh=!root;
  if(fresh){returnFocus=document.activeElement;document.activeElement?.blur();root=document.createElement('div');root.id='prismcontrol147';document.body.append(root);}
  const m=!!maintenance,value=maintenance||notice;
  root.innerHTML=`<section class="controlcard147" role="${m?'alertdialog':'dialog'}" aria-modal="true" aria-labelledby="controltitle147" aria-describedby="controltext147" tabindex="-1"><img src="prism-mark.svg" alt="PRISM"><p class="controleye147">${m?'TORNIAMO TRA POCO':'DAL TEAM PRISM'}</p><h1 id="controltitle147">${esc(value.title)}</h1><p id="controltext147">${esc(value.message)}</p>${m?'<div class="controlstatus147"><i></i> Aggiornamento in corso</div><button id="controlretry147">Controlla disponibilità</button>':'<button id="controlread147">Ho capito</button>'}<p id="controlerror147" role="status"></p></section>`;
  lock();root.querySelector(m?'#controlretry147':'#controlread147').onclick=m?()=>poll(true):ack;
  if(fresh||!root.contains(document.activeElement))root.querySelector('.controlcard147').focus();
 }
 function apply(value){
  const was=!!maintenance;maintenance=value?.enabled?value:null;window.prismMaintenance147=!!maintenance;
  if(maintenance){notice=null;if(!was){clearTimeout(storyTimer);document.querySelectorAll('audio,video').forEach(v=>v.pause());}draw();}
  else if(was){close();window.prismResume?.();}
 }
 window.prismApplyControl147=apply;
 remote=async function(method,path,data){
  if(maintenance&&!path.startsWith('/v1/app/')&&path!=='/v1/auth/logout'){const e=Error(maintenance.message);e.status=503;e.code='app_maintenance';throw e;}
  return base(method,path,data);
 };
 async function ack(){
  if(!notice||maintenance)return;const current=notice,epoch=O.epoch,button=document.querySelector('#controlread147');button.disabled=true;
  try{await base('POST','/v1/app/notices/'+encodeURIComponent(current.id)+'/read');if(epoch!==O.epoch)return;noticeRevision++;notice=null;close();poll(true);}
  catch(e){if(epoch!==O.epoch)return;if(e.status===404){noticeRevision++;notice=null;close();poll(true);}else{document.querySelector('#controlerror147').textContent='Non riusciamo a confermare la lettura. Riprova.';button.disabled=false;}}
 }
 async function poll(force=false){
  if(busy||(!force&&(document.hidden||window.prismForeground===false)))return;busy=true;
  try{
   const r=await base('GET','/v1/app/status');apply(r.maintenance);
   const user=O.me?.user_id,epoch=O.epoch;
   if(!user||!window.signedIn){if(notice){notice=null;close();}lastUser=null;return;}
   if(lastUser!==user){notice=null;if(!maintenance)close();lastUser=user;}
   if(maintenance)return;
   const revision=noticeRevision;const n=await base('GET','/v1/app/notices');if(maintenance||revision!==noticeRevision||epoch!==O.epoch||O.me?.user_id!==user)return;
   const next=(n.notices||[])[0]||null;
   if(notice?.id!==next?.id){notice=next;draw();}
  }catch(e){if(maintenance){const error=document.querySelector('#controlerror147');if(error)error.textContent='Connessione non disponibile. Riproviamo automaticamente.';}}
  finally{busy=false;}
 }
 const reset=resetOnline;resetOnline=function(){reset();notice=null;noticeRevision++;lastUser=null;if(!maintenance)close();};
 window.prismPollControl147=poll;
 new MutationObserver(()=>{if(maintenance||notice)lock();}).observe(document.body,{childList:true});
 document.addEventListener('keydown',e=>{if(!(maintenance||notice))return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();}if(e.key==='Tab'){const root=document.querySelector('#prismcontrol147');const button=root?.querySelector('button:not(:disabled)');e.preventDefault();(button||root?.querySelector('section'))?.focus();}},true);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)poll(true)});
 let foreground=window.prismForeground;setInterval(()=>{const next=window.prismForeground;if(next!==false&&foreground===false)poll(true);foreground=next;},1000);
 setInterval(poll,10000);setTimeout(()=>poll(true),300);
})();
