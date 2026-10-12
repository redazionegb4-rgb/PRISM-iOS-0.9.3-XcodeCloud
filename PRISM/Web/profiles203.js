'use strict';
// Retain the existing profile actions and photo selection state.
const markup203 = publicMarkup99;
publicMarkup99 = function(p,id,own,fromChat,index){
 const template=document.createElement('template');
 template.innerHTML=markup203(p,id,own,fromChat,index);
 const identity=template.content.querySelector('.profileidentity');
 if(identity&&p.looking?.length){
  const interests=document.createElement('p');
  interests.className='profileinterests203';
  interests.textContent=p.looking.join(' · ');
  identity.append(interests);
 }
 return template.innerHTML;
};
const gallery203=renderGallery11;
renderGallery11=function(){
 gallery203();
 document.querySelector('.fullscreen11 > .close')?.remove();
};
