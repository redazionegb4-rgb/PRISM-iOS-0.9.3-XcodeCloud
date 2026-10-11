'use strict';
// Measure rather than guessing: portrait/landscape, accessibility and safe areas.
function fitNavigation173(){
 const nav=document.querySelector('#nav');
 if(!nav||!window.signedIn)return;
 const rect=nav.getBoundingClientRect();
 if(rect.height<=0)return;
 const value=Math.ceil(Math.max(0,innerHeight-rect.top)+10)+'px';
 const root=document.documentElement;
 if(root.style.getPropertyValue('--nav-clearance173')!==value)root.style.setProperty('--nav-clearance173',value);
}
let scheduled173=false;
function scheduleNavigation173(){if(scheduled173)return;scheduled173=true;requestAnimationFrame(()=>{scheduled173=false;fitNavigation173()})}
new MutationObserver(scheduleNavigation173).observe(document.body,{childList:true,subtree:true});
if(window.ResizeObserver){const observer173=new ResizeObserver(scheduleNavigation173);const nav173=document.querySelector('#nav');if(nav173)observer173.observe(nav173)}
window.addEventListener('resize',scheduleNavigation173);
window.visualViewport?.addEventListener('resize',scheduleNavigation173);
document.addEventListener('click',event=>{
 if(!event.target.closest?.('#nav button'))return;
 if(document.querySelector('.overlay:is(.profilepage,.plan101,.cities138)'))closeOverlay();
},true);
scheduleNavigation173();
