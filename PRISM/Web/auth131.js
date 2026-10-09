'use strict';
const authBase131=auth;
auth=function(mode='login'){
 authBase131(mode);
 const page=document.querySelector('.auth95');if(!page)return;
 page.classList.add('auth131');
 const intro=page.querySelector('.authintro95'),reg=mode==='register';
 intro.innerHTML=`<p class="autheyebrow131">${reg?'NUOVE CONNESSIONI':'BENTORNATO'}</p><h1>${reg?'Fatti conoscere.':'Il tuo spazio,<br>le tue connessioni.'}</h1><p>${reg?'Crea il tuo account. Il prossimo incontro inizia qui.':'Accedi e ritrova persone, chat e storie.'}</p>`;
 const form=page.querySelector('form');form.querySelectorAll('#password,#confirm').forEach(el=>el.minLength=8);
 const password=form.querySelector('#password');password.placeholder=reg?'Almeno 8 caratteri':'La tua password';
 if(reg){
  const hint=document.createElement('p');hint.className='authhint131';hint.textContent='Almeno 8 caratteri. Scegli una password unica.';password.closest('.authfield95').after(hint);
  const birth=form.querySelector('#birth_date');const cutoff=new Date();cutoff.setFullYear(cutoff.getFullYear()-18);birth.max=[cutoff.getFullYear(),String(cutoff.getMonth()+1).padStart(2,'0'),String(cutoff.getDate()).padStart(2,'0')].join('-');
 }else{
  const links=page.querySelectorAll('.authdemo95');links.forEach(el=>el.classList.add('authlink131'));
  links[0]?.parentElement.classList.add('authlinks131');
 }
 const footer=page.querySelector('.authprivacy95 span');if(footer)footer.textContent='PRISM 0.12.11 · Account protetto con verifica email';
};
// Keep diagnostics separate from the purchase price; never invent a fallback price.
let storeDiagnostics131=null;
const billingBase131=billingBridge118;
billingBridge118=async function(operation){const response=await billingBase131(operation);if(operation==='info'){storeDiagnostics131=response.data?.diagnostics||null;queueMicrotask(renderStoreDiagnostics131)}return response};
function renderStoreDiagnostics131(){
 document.querySelector('#storediagnostics131')?.remove();if(!storeDiagnostics131)return;
 const hero=document.querySelector('.extrahero120');if(!hero)return;
 const node=document.createElement('details');node.id='storediagnostics131';
 const labels={product_id:'ID prodotto richiesto',bundle_id:'App',version:'Versione',build:'Build',storefront:'Paese dello store',products_found:'Prodotti restituiti'};
 node.innerHTML='<summary>Dettagli per verificare lo store</summary><dl>'+Object.entries(labels).map(([key,label])=>`<dt>${label}</dt><dd>${esc(String(storeDiagnostics131[key]??'Non disponibile'))}</dd>`).join('')+'</dl><p>Confronta l’ID prodotto con quello dell’abbonamento in App Store Connect. Verifica prezzo, localizzazione e disponibilità nel paese dello store.</p>';
 hero.append(node);
}
const planBase131=planPage101;planPage101=function(){planBase131();renderStoreDiagnostics131()};
if(!window.signedIn&&document.querySelector('.authswitch95'))auth(document.querySelector('.authswitch95 button:last-child.selected')?'register':'login');
