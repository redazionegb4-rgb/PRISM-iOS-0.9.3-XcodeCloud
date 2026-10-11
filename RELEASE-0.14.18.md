# PRISM 0.14.18

## Modifiche

- Distanza iniziale di ricerca: 40 km per Free e PRISM EXTRA. Le sessioni avviate con questa versione partono da 40 km anche se il vecchio profilo conteneva 5 km.
- Free mantiene il limite massimo di 40 km; EXTRA può aumentare il raggio fino a 150 km.
- Apertura a freddo: sincronizzazione completa dopo l'accesso automatico, inclusi utenti e storie.
- Ritorno in primo piano: sincronizzazione completa anche se è aperta una chat o un'altra pagina, senza attendere il successivo aggiornamento periodico.
- Aggiornamenti silenziosi: nessun reload della pagina, indicatore di caricamento o suono di refresh automatico. La chat aperta e il testo non inviato vengono conservati.
- Il raggio scelto durante la sessione viene conservato tornando dal background; una nuova sessione parte da 40 km.
- Aggiornamento periodico di utenti e storie anche quando si consultano altre pagine. Le richieste di apertura e quelle periodiche condividono lo stesso ciclo per evitare sovrapposizioni.

## File

- PRISM-0.14.18.apk: Android, versionCode 78. Installabile come aggiornamento del precedente APK firmato con la stessa chiave inclusa nel progetto.
- PRISM-Android-source-0.14.18.zip: progetto Android completo.
- PRISM-iOS-0.14.18-XcodeCloud.zip: progetto iOS completo, marketing version 0.14.18, build 69. Va compilato e distribuito tramite Xcode Cloud/TestFlight.

## Installazione

Android: installa il nuovo APK sul telefono. Per Google Play, genera il pacchetto di distribuzione dal progetto con la configurazione di firma dello store.

iOS: sostituisci i sorgenti del progetto con il contenuto dello ZIP, mantenendo il collegamento del repository al workflow Xcode Cloud, e avvia una nuova build. Questo ZIP contiene i sorgenti, non un IPA già compilato.

Questa modifica riguarda le app. È richiesto il backend 0.3.34 già preparato per i limiti 40/150 km; il sito 1.3.7 mantiene i testi dei piani già aggiornati. Non serve un ulteriore aggiornamento di backend o sito per queste due modifiche.

## Verifiche

Superati 43 controlli automatici su apertura, ripresa, attivazione durante una sincronizzazione, pagine diverse dalla home, bozze della chat, assenza del GPS, manutenzione e distanze iniziali nei due piani. Controllata la sintassi di tutti gli script e la corrispondenza degli asset Android/iOS. APK verificato per firma e versione.

Da verificare sui dispositivi: rimettere l'app in primo piano da una chat e dalla pagina Tap dopo avere aggiunto utenti/storie/attività da un secondo account; controllare che i nuovi dati compaiano senza reload e che una nuova sessione parta da 40 km.
