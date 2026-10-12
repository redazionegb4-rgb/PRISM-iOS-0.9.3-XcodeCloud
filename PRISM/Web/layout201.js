'use strict';
(()=>{
 const fit=fitChatViewportOnline;
 function usable201(){
  const v=window.visualViewport,top=v?.offsetTop||0;let height=v?.height||innerHeight;const native=Number(window.prismChatHeight127);if(native>0&&document.querySelector('.chatpage'))height=Math.min(height,native);
  const bottom=top+height,nav=document.querySelector('#nav');
  if(nav&&getComputedStyle(nav).display!=='none'){
   nav.style.setProperty('bottom','calc('+ (Math.max(0,innerHeight-bottom)+10)+'px + env(safe-area-inset-bottom,0px))','important');
   return {top,height:Math.max(120,Math.min(bottom,nav.getBoundingClientRect().top-8)-top)};
  }
  if(document.querySelector('.chatpage'))nav?.style.removeProperty('bottom');
  return {top,height};
 }
 fitChatViewportOnline=function(){fit();const page=document.querySelector('.chatpage');if(!page)return;const box=usable201();page.style.setProperty('top',box.top+'px','important');page.style.setProperty('--chat-height201',box.height+'px');page.style.setProperty('height',box.height+'px','important');page.style.setProperty('bottom','auto','important')};
 function tidyMe201(){for(const button of document.querySelectorAll('.my98 button')){const title=button.querySelector('b')?.textContent.trim()||button.querySelector('.label')?.textContent.trim()||button.textContent.trim();if(['Preferiti','Le mie storie','Crea una storia'].includes(title))button.remove()}}
 Object.assign(paths,{bell201:'M5 17h14l-2-3V9a5 5 0 0 0-10 0v5z M10 21h4',sound201:'M4 9h4l5-4v14l-5-4H4z M17 8a7 7 0 0 1 0 8 M20 5a11 11 0 0 1 0 14',eye201:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',tap201:'M14 2 5 13h6l-1 9 9-12h-6z',clock201:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2'});
 function privacy201(){
  const page=document.querySelector('.privacy100');if(!page)return;
  for(const row of page.querySelectorAll('.privacyrow100')){
   if(row.querySelector('.privacyicon201'))continue;
   const text=(row.querySelector('b')?.textContent||row.textContent).toLowerCase(),name=row.closest('.sounds113')||/suon/.test(text)?'sound201':/anteprima/.test(text)?'eye201':/messagg/.test(text)?'chat':/tap/.test(text)?'tap201':/visit|online/.test(text)?'user':/ultimo/.test(text)?'clock201':/distanz/.test(text)?'compass':'lock';
   const old=row.querySelector(':scope > svg'),holder=document.createElement('span');holder.className='privacyicon201';if(old)holder.append(old);else holder.innerHTML=icon(name);row.prepend(holder);
  }
  for(const h of page.querySelectorAll('.privacysection100>h2,.blockedheading100>h2')){
   if(h.querySelector('svg'))continue;const name=/notifiche/i.test(h.textContent)?'bell201':/suoni/i.test(h.textContent)?'sound201':/blocc/i.test(h.textContent)?'block':'eye201';h.insertAdjacentHTML('afterbegin',icon(name));
  }
 }
 let liveHeight213=0;
 function layout201(){
  const chat=document.querySelector('.chatpage'),live=document.querySelector('.overlay.lives139');
  if(chat)fitChatViewportOnline();
  else if(live){const editing=live.contains(document.activeElement)&&/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);if(!editing)liveHeight213=Math.max(liveHeight213,innerHeight,window.visualViewport?.height||0);const keyboard=editing&&Math.max(innerHeight,liveHeight213)-(window.visualViewport?.height||innerHeight)>120;document.body.classList.toggle('live-keyboard213',keyboard);const box=usable201();live.style.setProperty('top',box.top+'px','important');live.style.setProperty('height',box.height+'px','important');live.style.setProperty('bottom','auto','important');if(keyboard){const field=document.activeElement,area=live.querySelector('.livecontent139');if(area&&area.contains(field)){const r=field.getBoundingClientRect(),a=area.getBoundingClientRect();if(r.bottom>a.bottom-12||r.top<a.top+12)field.scrollIntoView({block:'nearest',inline:'nearest'})}}}
  else {liveHeight213=0;document.body.classList.remove('live-keyboard213');document.querySelector('#nav')?.style.removeProperty('bottom')}
  tidyMe201();privacy201();
 }
 const me=renderMe;renderMe=function(...args){const result=me(...args);tidyMe201();return result};
 let queued=false;const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;layout201()})}};
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);window.visualViewport?.addEventListener('scroll',schedule);document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);
 const nav=document.querySelector('#nav');if(nav&&window.ResizeObserver)new ResizeObserver(schedule).observe(nav);
 window.prismLayout201=layout201;schedule();
})();
