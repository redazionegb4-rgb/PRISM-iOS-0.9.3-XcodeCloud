'use strict';
// Navigation follows the visible destination, including overlay pages.
function syncWorldNavigation179(){
 if(!window.signedIn)return;
 const nav=document.querySelector('#nav');if(!nav)return;
 const world=!!document.querySelector('.overlay.cities138');
 const plan=!!document.querySelector('.overlay.plan101');
 const section=tab==='likes'?'near':tab;
 for(const button of nav.querySelectorAll('button')){
  const extra=button.classList.contains('extra102');
  const action=button.getAttribute('onclick')||'';
  const selected=world||plan?extra:action==="show('"+section+"')";
  if(button.classList.contains('selected')!==selected)button.classList.toggle('selected',selected);
  if(extra){button.classList.remove('extraactive103','exploreselected137');button.classList.toggle('worldactive139',world)}
  if(selected){if(button.getAttribute('aria-current')!=='page')button.setAttribute('aria-current','page')}
  else if(button.hasAttribute('aria-current'))button.removeAttribute('aria-current');
 }
}
const worldDecorate179=decorateExtra137;
decorateExtra137=function(){worldDecorate179();syncWorldNavigation179()};
const worldOpen179=openCities137;
openCities137=async function(){const task=worldOpen179();syncWorldNavigation179();await task;syncWorldNavigation179()};
const worldClose179=closeOverlay;
closeOverlay=function(){worldClose179();syncWorldNavigation179()};
let worldNavPending179=false;
new MutationObserver(()=>{
 if(worldNavPending179)return;worldNavPending179=true;
 queueMicrotask(()=>{worldNavPending179=false;syncWorldNavigation179()});
}).observe(document.body,{childList:true,subtree:true});
syncWorldNavigation179();
