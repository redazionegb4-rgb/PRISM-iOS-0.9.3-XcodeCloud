'use strict';
// Map the displayed values, not only the editor's field labels.
const profileValues223={
 'Uomo':'user','Uomo trans':'user','Non binario':'user','Un’altra identità':'user',
 'Attivo':'arrows','Passivo':'arrows','Versatile':'arrows','Versatile attivo':'arrows','Versatile passivo':'arrows','Side':'arrows',
 'Single':'heart','In una relazione':'heart','Relazione aperta':'heart'
};
const profileValueKey223=profileKey220;
profileKey220=function(text){const value=String(text).trim();return profileValues223[value]||(/^\d+\s+anni$/.test(value)?'calendar':null)||profileValueKey223(value)};
function splitCommunity223(root){
 root.querySelectorAll('.profileintro99').forEach(section=>{
  const heading=section.querySelector('h2')?.textContent.trim();
  if(!['Community','Interessi'].includes(heading))return;
  const tags=section.querySelector('.profiletags99');if(!tags)return;
  const values=[...tags.children].flatMap(el=>normalizeCommunity218(el.textContent));
  tags.replaceChildren();
  [...new Set(values)].forEach(value=>{
   const pill=document.createElement('span');pill.className='communitypill223';
   const caption=document.createElement('span');caption.className='profilecaption220';
   caption.innerHTML=profileIcon220(communityIcons220[value]||'people');
   const text=document.createElement('span');text.textContent=value;caption.append(text);pill.append(caption);tags.append(pill);
  });
 });
}
const publicValues223=publicMarkup99;
publicMarkup99=function(...args){
 const t=document.createElement('template');t.innerHTML=publicValues223(...args);
 splitCommunity223(t.content);decorateProfile220(t.content);return t.innerHTML;
};
const ownValues223=renderMe;
renderMe=function(...args){const result=ownValues223(...args);const page=document.querySelector('.my98');if(page){page.querySelectorAll('.mydetails98>span').forEach(el=>{
 if(el.querySelector('.profileicon220'))return;const value=el.textContent,key=profileKey220(value);if(!key)return;
 const caption=document.createElement('span');caption.className='profilecaption220';caption.innerHTML=profileIcon220(key);const text=document.createElement('span');text.textContent=value;caption.append(text);el.replaceChildren(caption);
 });}return result};
