'use strict';
paths.calendar='M7 3v4 M17 3v4 M4 10h16 M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1z';
auth=function(mode='login'){
 const oldEmail=document.querySelector('#email'),oldName=document.querySelector('#authname');if(oldEmail)authDraft95.email=oldEmail.value;if(oldName)authDraft95.name=oldName.value;
 const reg=mode==='register';window.signedIn=false;O.pageChat=null;document.body.classList.remove('nearview100');
 document.querySelector('header').style.display='none';document.querySelector('.notice').style.display='none';document.querySelector('#nav').style.display='none';
 const cutoff=new Date();cutoff.setFullYear(cutoff.getFullYear()-18);const maxDate=[cutoff.getFullYear(),String(cutoff.getMonth()+1).padStart(2,'0'),String(cutoff.getDate()).padStart(2,'0')].join('-');
 const field=(id,label,type,placeholder,autocomplete,value='')=>`<label class="field133" for="${id}"><span>${label}</span><div class="input133 glass133"><span class="fieldicon133">${icon(type==='password'?'lock':type==='email'?'mail':'user')}</span><input id="${id}" type="${type}" required autocomplete="${autocomplete}" ${type==='password'?'minlength="8" maxlength="128"':id==='authname'?'maxlength="30"':'maxlength="254"'} ${type==='email'?'autocapitalize="none" spellcheck="false"':''} value="${esc(value)}" placeholder="${placeholder}">${type==='password'?`<button type="button" aria-label="Mostra password" aria-pressed="false" onclick="togglePassword95('${id}',this)">${icon('eye')}</button>`:''}</div></label>`;
 document.querySelector('#app').innerHTML=`<main class="auth133 ${reg?'register133':'login133'}"><div class="authlight133" aria-hidden="true"><i></i><i></i></div>
 <div class="authtop133">${reg?`<button class="glassback133 glass133" onclick="auth('login')" aria-label="Torna al login">${icon('back')}</button>`:'<span class="toplabel133">IL TUO PROSSIMO INCONTRO</span>'}<span class="age133 glass133">18+</span></div>
 <section class="authhero133">${reg?'':`<div class="glassmark133 glass133" aria-hidden="true">${icon('chat')}<i></i></div>`}<h1>${reg?'Fatti <em>notare.</em>':'Qui vicino.<br>Forse proprio <em>lui.</em>'}</h1><p>${reg?'Crea il tuo profilo. Inizia qualcosa di nuovo.':'Persone, chat e storie. Il resto lo scegli tu.'}</p></section>
 <section class="authpanel133 glass133"><div class="paneltitle133"><h2>${reg?'Crea account':'Accedi'}</h2><span>${icon('chevron')}</span></div><form class="authform133" onsubmit="authenticate(event,${reg})">
 ${reg?field('authname','Nome profilo','text','Come vuoi farti chiamare','nickname',authDraft95.name):''}
 ${field('email','Email','email','nome@email.it','email',authDraft95.email)}
 ${field('password','Password','password',reg?'Almeno 8 caratteri':'La tua password',reg?'new-password':'current-password')}
 ${reg?field('confirm','Conferma password','password','Ripeti la password','new-password')+`<label class="field133" for="birth_date"><span>Data di nascita</span><div class="input133 glass133"><span class="fieldicon133">${icon('calendar')}</span><input id="birth_date" type="date" autocomplete="bday" max="${maxDate}" required></div></label><label class="adult133"><input id="adult" type="checkbox" required><span>Ho almeno 18 anni.</span></label>`:'<button type="button" class="forgot133" onclick="helpAuth132(false)">Password dimenticata?</button>'}
 <p id="autherror" class="error133" role="alert" aria-live="polite"></p><button id="authsubmit95" class="submit133" type="submit"><span>${reg?'Crea il mio profilo':'Accedi'}</span>${icon('chevron')}</button></form>
 ${reg?'':'<button class="verify133" onclick="helpAuth132(true)">Inserisci il codice di verifica</button>'}</section>
 <div class="authswitch133"><p>${reg?'Sei già dei nostri?':'Non hai ancora un account?'}</p><button class="glass133" onclick="auth('${reg?'login':'register'}')">${reg?'Accedi':'Crea account'} ${icon('chevron')}</button></div>
 <footer class="authfooter133">${icon('lock')}<span>Verifica email · PRISM 0.12.17</span></footer></main>`;
};
if(!window.signedIn&&(document.querySelector('.auth132')||document.querySelector('.auth95')))auth('login');
