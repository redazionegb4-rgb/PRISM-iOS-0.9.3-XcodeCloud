# PRISM 0.14.19 — pulsanti profilo ripristinati

La navigazione della Home aveva z-index 20 e rimaneva davanti al profilo (z-index 5), coprendo Messaggio e Tap. Il menu resta visibile nei profili, in PRISM EXTRA e in Esplora il mondo. Le pagine riservano automaticamente lo spazio realmente occupato dalla barra, adattandosi a orientamento, dimensioni e area sicura. Messaggio e Tap rimangono fissi sopra il menu. Vale anche per l'anteprima del proprio profilo, con il pulsante Modifica profilo. I pulsanti della città e i contenuti EXTRA non vengono coperti. Toccando un'icona del menu si chiude la pagina sovrapposta e si raggiunge la sezione scelta.

Le icone di chiamata audio e videochiamata nell'intestazione della chat sono centrate in pulsanti quadrati, senza padding che ne deformi l'allineamento.

Restano le modifiche della 0.14.18: raggio iniziale 40 km per Free ed EXTRA, limite EXTRA 150 km, aggiornamento silenzioso a ogni apertura e ritorno in primo piano.

## File e installazione

- PRISM-0.14.19.apk: Android, codice versione 79; installa come aggiornamento.
- PRISM-Android-source-0.14.19.zip: progetto Android completo.
- PRISM-iOS-0.14.19-XcodeCloud.zip: progetto iOS completo, versione 0.14.19, build 70; compila con Xcode Cloud e distribuisci su TestFlight. Non è un IPA già compilato.

Backend e sito non richiedono modifiche per questo fix.

## Verifiche

Controllate le regole CSS che mantengono il menu davanti alle pagine e riservano lo spazio per la barra; verificata la presenza dei pulsanti e dei loro handler Messaggio/Tap nel markup reale. Testata la misura dinamica e la navigazione dalla pagina sovrapposta, oltre alle regole di centratura delle icone. Rieseguiti i 43 controlli automatici del refresh e del raggio. Verificati gli asset identici tra Android e iOS, l'integrità degli ZIP e la firma/versione dell'APK.

La prova visiva finale resta da fare sui telefoni: apri un profilo dalla Home, scorri fino ai Social e verifica Messaggio e Tap sopra il menu; apri PRISM EXTRA ed Esplora il mondo e verifica che le ultime voci siano raggiungibili; usa il menu per cambiare sezione e verifica la centratura delle due icone in chat.
