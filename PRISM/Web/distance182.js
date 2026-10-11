'use strict';
// Keep the shared distance actions outside the scrollable content.
const filtersBase182=filters;
filters=function(){
 filtersBase182();
 const footer=document.querySelector('.range121 .rangefooter121');
 if(!footer)return;
 footer.innerHTML='<button type="button" class="primary" id="distanceapply182" onclick="applyRadius100()">Applica distanza</button><button type="button" class="distancereset182" id="distancereset182" onclick="resetDistance182()">Reset distanza</button>';
 const input=document.querySelector('.range121 #radiusinput');
 if(input)input.setAttribute('aria-label','Distanza di ricerca in chilometri');
 const content=document.querySelector('.range121 .rangecontent121');
 if(content&&!content.querySelector('.resethelp182'))content.insertAdjacentHTML('beforeend','<p class="resethelp182">Reset distanza ripristina il raggio a 40 km.</p>');
 if(typeof scheduleNavigation173==='function')scheduleNavigation173();
};
// The older home shortcut captured the original filter function; route it here too.
if(typeof homeDistance163==='function')homeDistance163=function(){filters();};
async function resetDistance182(){
 const input=document.querySelector('.range121 #radiusinput');
 if(!input)return;
 input.value=String(Math.min(40,radiusLimit101()));
 const value=document.querySelector('.range121 #radiusvalue');
 if(value)value.textContent=input.value;
 await applyRadius100();
}
