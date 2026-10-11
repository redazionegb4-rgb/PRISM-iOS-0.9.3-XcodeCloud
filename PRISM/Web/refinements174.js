'use strict';
// Own preview includes all saved photos; public moderation remains unchanged.
const profileData174=profileData99;
profileData99=function(id,own=false){
 const data=profileData174(id,own);
 if(own)data.photos=profilePhotos10();
 return data;
};
const myProfile174=myProfile;
myProfile=function(row){
 myProfile174(row);
 const page=document.querySelector('.ownpreview9');
 if(!page||!publicView99?.own)return;
 const data=profileData99(null,true);
 if(JSON.stringify(data.photos)===JSON.stringify(publicView99.data.photos))return;
 const scroll=page.scrollTop;
 // Reset to the saved main photo after a new order or a new upload.
 publicView99={data,id:null,own:true,fromChat:false,index:0};
 page.innerHTML=publicMarkup99(data,null,true,false,0);
 profileActivity104(null,true);
 page.scrollTop=scroll;
};
const preview174=previewMe9;
previewMe9=function(index=0){
 preview174(index);
 const page=document.querySelector('.ownpreview9'),epoch=O.epoch;
 // Revalidate on opening without a loader or reopening a dismissed page.
 if(O.me)remote('GET','/v1/me').then(row=>{
  if(O.epoch===epoch&&document.querySelector('.ownpreview9')===page&&!document.querySelector('.editor98'))myProfile(row);
 }).catch(()=>{});
};
document.addEventListener('click',event=>{
 if(event.target.closest?.('#nav button')&&document.querySelector('.overlay.storyeditor7'))closeOverlay();
},true);
const world174=openCities137;
openCities137=async function(){
 const task=world174();
 const current=document.querySelector('.cities138 .currentcity137');
 if(current){current.setAttribute('aria-label','Torna vicino a me');current.setAttribute('title','Torna vicino a me')}
 return task;
};
