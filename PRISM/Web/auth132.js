'use strict';
auth=function(mode='login'){
 const email=document.querySelector('#email'),name=document.querySelector('#authname');
 if(email)authDraft95.email=email.value;if(name)authDraft95.name=name.value;
 const reg=mode==='register';window.signedIn=false;O.pageChat=null;document.body.classList.remove('nearview100');
 document.querySelector('header').style.display='none';document.querySelector('.notice').style.display='none';document.querySelector('#nav').style.display='none';
 const cutoff=new Date();cutoff.setFullYear(cutoff.getFullYear()-18);const maxDate=[cutoff.getFullYear(),String(cutoff.getMonth()+1).padStart(2,'0'),String(cutoff.getDate()).padStart(2,'0')].join('-');
 const field=(id,label,type,placeholder,complete,value='')=>`<label class="field132" for="${id}"><span>${label}</span><div class="input132"><input id="${id}" type="${type}" autocomplete="${complete}" ${type==='password'?'minlength="8" maxlength="128"':id==='authname'?'maxlength="30"':'maxlength="254"'} ${type==='email'?'autocapitalize="none" spellcheck="false"':''} required placeholder="${placeholder}" value="${esc(value)}">${type==='password'?`<button type="button" aria-label="Mostra password" aria-pressed="false" onclick="togglePassword95('${id}',this)">${icon('eye')}</button>`:''}</div></label>`;
 document.querySelector('#app').innerHTML=`<main class="auth132 ${reg?'register132':'login132'}">
 <section class="authhero132"><div class="authtop132">${reg?`<button class="authback132" aria-label="Torna al login" onclick="auth('login')">${icon('back')}</button>`:'<span class="authcaps132">MENO DISTANZA. PIÙ INTESA.</span>'}<span class="authage132">18+</span></div>
 <div class="authgraphic132" aria-hidden="true"><i></i><i></i><i></i></div>
 <h1>${reg?'Fai spazio<br>a <em>qualcuno.</em>':'Meno attese.<br>Più <em>incontri.</em>'}</h1><p>${reg?'Comincia da te. Al resto pensi dopo.':'Un messaggio può cambiare i tuoi piani.'}</p>
 ${reg?'':'<div class="authcategories132"><span>Persone vicine</span><i></i><span>Chat</span><i></i><span>Storie</span></div>'}</section>
 <section class="authcard132"><div class="authcardheading132"><div><p>${reg?'IL TUO INIZIO':'IL TUO SPAZIO'}</p><h2>${reg?'Crea il tuo account':'Bentornato'}</h2></div><span>${icon(reg?'user':'chat')}</span></div>
 <form class="authform132" onsubmit="authenticate(event,${reg})">
 ${reg?field('authname','Come ti chiami?','text','Il tuo nome','nickname',authDraft95.name):''}
 ${field('email','Email','email','nome@email.it','email',authDraft95.email)}
 ${field('password','Password','password',reg?'Almeno 8 caratteri':'La tua password',reg?'new-password':'current-password')}
 ${reg?'<p class="authhint132">Almeno 8 caratteri. Solo tuoi.</p>'+field('confirm','Conferma password','password','Ripeti la password','new-password')+`<label class="field132" for="birth_date"><span>Data di nascita</span><div class="input132"><input id="birth_date" type="date" autocomplete="bday" max="${maxDate}" required></div></label><label class="adult132"><input id="adult" type="checkbox" required><span>Confermo di avere almeno 18 anni.</span></label>`:'<button class="forgot132" type="button" onclick="helpAuth132(false)">Password dimenticata?</button>'}
 <p class="error132" id="autherror" role="alert" aria-live="polite"></p>
 <button class="submit132" id="authsubmit95" type="submit"><span>${reg?'Ci sono. Crea account':'Entra nel tuo spazio'}</span>${icon('chevron')}</button></form>
 ${reg?'':'<button class="verify132" onclick="helpAuth132(true)">Hai già un codice di verifica? <span>Inseriscilo</span></button>'}
 <p class="authswitch132">${reg?'Hai già un account?':'Nuovo qui?'} <button onclick="auth('${reg?'login':'register'}')">${reg?'Accedi':'Crea un account'}</button></p>
 </section><footer class="authfooter132">${icon('lock')}<span>Verifica email · PRISM 0.12.12</span></footer></main>`;
};
function helpAuth132(verify){const email=document.querySelector('#email')?.value.trim();if(email){O.pendingEmail=email;authDraft95.email=email}if(verify)verifyOnline();else forgotOnline()}
if(!window.signedIn&&(document.querySelector('.auth95')||document.querySelector('.auth132')))auth('login');
