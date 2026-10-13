# Prism 0.16.15 — Community con selezione multipla

## Nell’app
Il tuo spazio → Modifica profilo → Community.
Il vecchio menu con una sola scelta è sostituito da un popup con elenco scorrevole, contatore 0/3, cerchi di selezione, X e pulsante Fine. Puoi scegliere fino a tre voci oppure non indicarne nessuna. Con tre selezioni, le altre voci vengono disabilitate finché non ne togli una.
Fine conferma la scelta nella bozza; Salva modifiche salva il profilo. X, Indietro ed Escape chiudono senza applicare i cambiamenti del popup. Nome, bio e gli altri campi già compilati vengono conservati.
Il campo si chiama Community, non Tribù. Scelte: Orso, Aspetto pulito, Daddy, Riservato, Nerd, Sportivo, Vestiti in pelle, Lontra, HIV+, Robusto, Trans, Twink.
Le scelte preesistenti vengono conservate; Bear, Otter, Jock e Geek vengono presentati come Orso, Lontra, Sportivo e Nerd. I valori personalizzati esistenti restano selezionabili. Tutte le scelte vengono salvate e mostrate sul profilo.

## Backend, admin e iscrizione anticipata
Lo stesso campo consente fino a tre selezioni anche nell’editor admin e nell’iscrizione anticipata. Il backend valida il limite, elimina i duplicati e preserva i vecchi valori. Non è necessaria una nuova tabella: il dato mantiene il formato compatibile nel profilo.
Restano tutte le funzionalità precedenti, incluse live, regali, premi, bouncer, popup, chat e admin.

## Contenuto
- PRISM-backend-0.4.17.zip: backend completo; schema invariato 30.
- PRISM-0.16.15.apk: Android versionCode 106, stessa firma del precedente APK, installabile senza disinstallare. Codice nativo conservato; asset aggiornati; APK rifirmato e verificato.
- PRISM-Android-0.16.15-source.zip: sorgenti Android completi.
- PRISM-iOS-0.16.15-source.zip: sorgenti iOS completi, versione 0.16.15/build locale 96. Xcode Cloud usa il proprio CI_BUILD_NUMBER. IPA non incluso.

## Installazione
Prima aggiorna il backend. Estrai PRISM-backend-0.4.17.zip dal pacchetto completo, caricalo nella home sul VPS principale di api.prismdating.app (non sul server LiveKit) ed esegui:

```bash
cd ~
unzip -o PRISM-backend-0.4.17.zip -d prism-community-0.4.17
cd ~/prism-community-0.4.17/PRISM-backend
sudo bash install.sh
```

L’installer effettua il backup e riavvia il servizio. Ricarica completamente l’admin e la pagina di iscrizione anticipata.
Android: installa il nuovo APK oppure genera la release store dai sorgenti.
iOS: aggiorna i sorgenti nel repository Xcode Cloud, inclusa tutta la cartella PRISM/Web, e avvia Archive/TestFlight.

## Verifiche
272 test backend superati, con test aggiunti per tre scelte, duplicati, compatibilità dei valori precedenti, campo facoltativo e rifiuto della quarta scelta. Controlli successivi sui test del campo e dell’editor admin superati.
Interfacce Android/iOS provate in browser a 320, 390 e 430 px e con altezza 450 px: massimo tre scelte, conferma, annullamento, Escape, conservazione dei dati del modulo, payload di salvataggio e pulsante Fine sempre visibile. Verificati anche multiselezione e aggiornamento del valore inviato da admin e iscrizione anticipata.
Firma e versione APK verificate. API simulate nei test browser. Non effettuati test su telefoni fisici, installazione sul VPS o compilazione iOS in Xcode Cloud.
