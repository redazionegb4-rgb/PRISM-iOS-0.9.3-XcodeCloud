 'use strict';
const favoriteBase166=favoritePublic99;
favoritePublic99=async function(id){try{return await favoriteBase166(id)}finally{document.querySelectorAll('.favorite163').forEach(b=>{if(b.getAttribute('onclick')?.includes('favoritePublic99('+id+')')){const saved=state.favorites.includes(id);b.disabled=O.favoritePending.has(id);b.classList.toggle('saved163',saved);b.setAttribute('aria-pressed',String(saved));const p=people[id];if(p)b.setAttribute('aria-label',(saved?'Rimuovi ':'Aggiungi ')+p.name+(saved?' dai':' ai')+' preferiti')}})}};
fav=favoritePublic99;
