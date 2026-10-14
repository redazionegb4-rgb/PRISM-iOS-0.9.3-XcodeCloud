'use strict';
Object.assign(profilePaths220,{
 roleup:'<path d="M12 21V3m-7 7 7-7 7 7"/>',
 roledown:'<path d="M12 3v18m-7-7 7 7 7-7"/>',
 roleboth:'<path d="M7 21V3m-4 4 4-4 4 4M17 3v18m-4-4 4 4 4-4"/>',
 roletop:'<path d="M8 21V3m-6 6 6-6 6 6"/><path d="M19 11v10m-3-3 3 3 3-3"/>',
 rolebottom:'<path d="M8 3v18m-6-6 6 6 6-6"/><path d="M19 21V11m-3 3 3-3 3 3"/>',
 roleside:'<path d="M3 12h18m-5-5 5 5-5 5M8 7l-5 5 5 5"/>',
 rolenone:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>'
});
const roleIcons224={'Attivo':'roleup','Passivo':'roledown','Versatile':'roleboth','Versatile attivo':'roletop','Versatile passivo':'rolebottom','Side':'roleside'};
Object.assign(profileValues223,roleIcons224);
let roleDraft224='',roleTrigger224=null,roleDialog224=null;
const roleSelect224=selectField7;
selectField7=function(id,label,options){
 if(id!=='position')return roleSelect224(id,label,options);
 const value=profileDraft7.position||'';
 return '<label>'+label+'<input type="hidden" id="edit_position" value="'+esc(value)+'"><button class="roletrigger224" type="button" aria-label="Scegli il ruolo" aria-haspopup="dialog" onclick="openRole224(this)"><span data-roleicon224>'+profileIcon220(roleIcons224[value]||'rolenone')+'</span><span data-roletext224>'+esc(value||'Preferisco non indicarlo')+'</span>'+icon('chevron')+'</button></label>';
};
function openRole224(trigger){
 captureDraft7();roleDraft224=profileDraft7.position||'';roleTrigger224=trigger;
 roleDialog224=document.querySelector('#roledialog224');
 if(!roleDialog224){roleDialog224=document.createElement('dialog');roleDialog224.id='roledialog224';roleDialog224.setAttribute('aria-labelledby','roletitle224');document.body.append(roleDialog224);}
 roleDialog224.innerHTML='<header><button type="button" class="roleclose224" aria-label="Chiudi senza modifiche" onclick="closeRole224(false)">'+icon('close')+'</button><h2 id="roletitle224" tabindex="-1">Il tuo ruolo</h2><span></span></header><p class="roleintro224">Scegli cosa mostrare sul profilo. È facoltativo.</p><div class="rolelist224">'+['',...Object.keys(roleIcons224)].map(value=>'<label><span class="rolecaption224">'+profileIcon220(roleIcons224[value]||'rolenone')+'<span>'+esc(value||'Preferisco non indicarlo')+'</span></span><input type="radio" name="role224" value="'+esc(value)+'" '+(roleDraft224===value?'checked':'')+' onchange="roleDraft224=this.value"><span class="rolecheck224" aria-hidden="true">'+icon('check')+'</span></label>').join('')+'</div><footer><button type="button" class="primary wide" onclick="closeRole224(true)">Fine</button></footer>';
 roleDialog224.showModal();roleDialog224.querySelector('h2').focus({preventScroll:true});
}
function closeRole224(commit){
 if(commit&&profileDraft7){profileDraft7.position=roleDraft224;const input=document.querySelector('#edit_position');if(input)input.value=roleDraft224;
  if(roleTrigger224?.isConnected){roleTrigger224.querySelector('[data-roletext224]').textContent=roleDraft224||'Preferisco non indicarlo';roleTrigger224.querySelector('[data-roleicon224]').innerHTML=profileIcon220(roleIcons224[roleDraft224]||'rolenone');}
 }
 roleDialog224?.close();roleTrigger224?.focus({preventScroll:true});
}
const roleBack224=window.prismBack;window.prismBack=function(...args){if(roleDialog224?.open){closeRole224(false);return}return roleBack224?.(...args)};
