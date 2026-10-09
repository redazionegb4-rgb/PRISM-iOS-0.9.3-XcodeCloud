'use strict';
// Keep optional text on the image separate from the photo caption.
addStory=function(){
 storyDraft={text:'',caption:'',image:null,color:0};
 overlay(`<div class="storyeditor146"><p class="eyebrow98">IL TUO MOMENTO</p><h1>Crea una storia</h1><p class="hint">Una foto o una frase, visibile per 24 ore.</p><div id="storypreview" class="storypreview"></div><p id="storycaptionpreview146" class="storycaption146" hidden></p><div class="storyactions7"><label>${icon('photo')} Aggiungi foto<input type="file" accept="image/*" onchange="readPhoto(this,image=>{storyDraft.image=image;updateStoryPreview()})"></label><button type="button" class="pill" onclick="storyDraft.image=null;updateStoryPreview()">Solo testo</button></div><label id="storytextlabel146" for="storytext">Testo</label><textarea id="storytext" maxlength="180" placeholder="Scrivi la tua frase…" oninput="storyDraft.text=this.value;updateStoryPreview()"></textarea><div id="storycaptionfields146" hidden><label for="storycaption146">Didascalia · facoltativa</label><textarea id="storycaption146" maxlength="1000" placeholder="Aggiungi una didascalia sotto la foto…" oninput="storyDraft.caption=this.value;updateStoryPreview()"></textarea><p class="hint">La didascalia appare sotto la foto. Il testo sopra è facoltativo e rimane sulla foto.</p></div><div id="storybackground146"><p class="hint">Sfondo della frase</p><div class="swatches">${palettes.map((c,i)=>`<button type="button" aria-label="Sfondo ${i+1}" style="background:${c}" onclick="storyDraft.color=${i};updateStoryPreview()"></button>`).join('')}</div></div><button id="storypublish146" class="primary wide" onclick="publish()">Pubblica storia</button><p class="storyhint7">Visibile agli utenti nel tuo raggio per 24 ore.</p></div>`,'storyeditor7');
 updateStoryPreview();
};
updateStoryPreview=function(){
 const preview=document.querySelector('#storypreview');if(!preview)return;
 const image=!!storyDraft.image,text=storyDraft.text.trim();
 preview.style.background=image?'#000':palettes[storyDraft.color];
 preview.classList.toggle('photopreview146',image);
 preview.innerHTML=(image?`<img src="${esc(storyDraft.image)}" alt="Anteprima della foto">`:'')+(text||!image?`<p class="${image?'previewcaption':''}">${esc(text||'Scrivi qualcosa…')}</p>`:'');
 const caption=document.querySelector('#storycaptionpreview146');caption.textContent=storyDraft.caption.trim();caption.hidden=!image||!caption.textContent;
 document.querySelector('#storycaptionfields146').hidden=!image;
 document.querySelector('#storybackground146').hidden=image;
 document.querySelector('#storytextlabel146').textContent=image?'Testo sulla foto · facoltativo':'Testo';
 document.querySelector('#storytext').placeholder=image?'Aggiungi testo sulla foto, se vuoi…':'Scrivi la tua frase…';
};
let storyPublishing146=false;
publish=async function(){
 if(storyPublishing146)return;
 const text=document.querySelector('#storytext')?.value.trim()||'',image=storyDraft.image,caption=image?(document.querySelector('#storycaption146')?.value.trim()||''):'';
 if(!text&&!image)return toast('Aggiungi una foto o una frase');
 const button=document.querySelector('#storypublish146'),epoch=O.epoch;storyPublishing146=true;if(button)button.disabled=true;
 try{
  await remote('POST','/v1/stories',{text,image,caption,color:storyDraft.color});
  if(epoch!==O.epoch)return;
  await storiesOnline();if(epoch!==O.epoch)return;
  closeOverlay();show('near');ownStory(activeStories().length-1);toast('Storia pubblicata');
 }catch(error){if(epoch===O.epoch)toast(error.message);}
 finally{storyPublishing146=false;if(button?.isConnected)button.disabled=false;}
};
const viewStory146=viewStory;
viewStory=function(session){
 viewStory146(session);
 const story=session.items[session.index],media=document.querySelector('.storyviewer .storymedia');if(!story||!media)return;
 if(story.image)media.style.background='#000';
 if(!story.text?.trim())media.querySelector('.storytext')?.remove();
 if(story.image&&story.caption?.trim()){
  const caption=document.createElement('div');caption.className='storycaption146 storyviewcaption146';caption.textContent=story.caption.trim();caption.setAttribute('aria-label','Didascalia della foto');
  caption.addEventListener('pointerdown',()=>{if(storySession&&!storySession.paused)pauseStory();});
  media.after(caption);
 }
};
const storySnapshot146=storySnapshot;
storySnapshot=function(id){const snapshot=storySnapshot146(id);if(storySession&&!storySession.own&&storySession.id===id)snapshot.caption=storySession.items[storySession.index]?.caption||'';return snapshot;};
const messageHTML146=messageHTML;
messageHTML=function(message,id,index){
 const html=messageHTML146(message,id,index);if(message?.type!=='storyReply'||!message.story?.image)return html;
 const template=document.createElement('template');template.innerHTML=html;const quote=template.content.querySelector('.storypreview126,.storyquote97');if(!quote)return html;
 quote.style.background='#000';
 if(message.story.caption?.trim()){const caption=document.createElement('div');caption.className='storyquotecaption146';caption.textContent=message.story.caption.trim();quote.after(caption);}
 return template.innerHTML;
};
