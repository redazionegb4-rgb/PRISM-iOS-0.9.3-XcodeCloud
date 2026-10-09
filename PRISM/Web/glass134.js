"use strict";
/* Visual theme only: existing navigation, privacy and purchase flows stay in place. */
function glassTheme134(){document.body.classList.toggle('prismglass134',!!window.signedIn&&!document.querySelector('#app .auth133'));}
const glassShow134=show;show=function(t){glassShow134(t);glassTheme134()};
const glassPolish134=polishOnline;polishOnline=function(){glassPolish134();glassTheme134()};
new MutationObserver(glassTheme134).observe(document.getElementById('app'),{childList:true});
glassTheme134();
