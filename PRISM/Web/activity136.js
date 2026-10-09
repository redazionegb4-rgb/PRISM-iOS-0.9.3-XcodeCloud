"use strict";
/* Historical counts and unread badges have different meanings. */
function activityCounters136(){
 if(tab!=='taps'||!document.querySelector('.activity124'))return;
 historyState124();
 const counts=O.notifications?.counts;
 const unread={received:counts?Number(counts.tap||0):O.unreadTaps.size,sent:0,views:counts?Number(counts.visit||0):(state.profileVisits102||[]).filter(v=>v.unread&&!state.blocked.includes(v.id)).length};
 for(const [key,label] of [['received','Ricevuti'],['sent','Inviati'],['views','Visite']]){
  const button=document.querySelector(`.activitytabs102 button[onclick="activityTab124('${key}')"]`);if(!button)continue;
  const h=history124[key],rows=h.rows.filter(v=>people[v.id]&&!state.blocked.includes(v.id));
  const total=h.loaded?String(rows.length)+(h.cursor?'+':''):h.error?'—':'…';
  const newCount=Math.max(0,unread[key]||0),badge=newCount>99?'99+':String(newCount);
  const html=`<span class="tablabel136">${label}<small class="activitytotal136" title="${h.cursor?'Attività caricate; sono disponibili altre pagine':'Attività nello storico'}">${total}</small></span>${newCount?`<i class="activitynew136" title="${newCount} ${key==='views'?'nuove visite':'nuovi tap ricevuti'}" aria-label="${newCount} ${key==='views'?'nuove visite':'nuovi tap ricevuti'}">${badge}</i>`:''}`;
  if(button.innerHTML!==html)button.innerHTML=html;
  button.dataset.activityKind136=key;button.setAttribute('aria-label',`${label}, ${h.loaded?total+' nello storico':'conteggio in caricamento'}${newCount?', '+newCount+' nuovi':''}`);
 }
}
const renderActivityBase136=renderActivityOnline;renderActivityOnline=function(){renderActivityBase136();activityCounters136()};
const drawNoticesBase136=drawNoticesOnline;drawNoticesOnline=function(){drawNoticesBase136();activityCounters136()};
const activityBase136=activityOnline;activityOnline=async function(){await activityBase136();if(tab==='taps'&&!document.querySelector('.overlay')){await Promise.all(['received','sent','views'].filter(k=>k!==tapTab).map(k=>refreshHistory124(k)));activityCounters136()}};
