# Prism — aggiornamento completo 0.16.11 / backend 0.4.13

## Cosa cambia
1. Avvio live: introduzione compatta, modulo scorrevole, campo attivo visibile, menu nascosto quando si apre la tastiera. Invio sul titolo passa al paese; sul paese chiude la tastiera. Menu visibile quando la tastiera è chiusa.
2. Spettatori: popup centrato e compatto, righe leggibili, chiusura discreta, senza maniglia da pannello inferiore.
3. Commenti live: nome e scudo sopra il testo, riquadri uniformi e pulsante di moderazione allineato a destra. Testi lunghi vanno a capo.
4. Ospiti: popup più compatto, scheda per ospite, pulsanti allineati; espulsione distinta dall’uscita dal palco.
5. Admin > Utenti > Scheda utente > Regali live > Reset invio regali. Disponibile al titolare. Ripristina i 5 invii e l’attesa sui precedenti destinatari; mantiene storico, premi e regali ricevuti. L’abbonamento Extra pagante resta necessario. Azione registrata nel registro attività.
6. Admin: suono acceso a ogni nuova apertura, anche se prima era stato silenziato. Pulsante per silenziarlo durante la sessione. Dati e contatori aggiornati ogni 30 secondi, anche con pagina in background. Popup e moduli in modifica non vengono sostituiti. I browser possono ritardare i timer di schede sospese e richiedere una prima interazione per sbloccare l’audio.

## Contenuto
- PRISM-backend-0.4.13.zip: aggiornamento completo server principale, include tutti gli aggiornamenti precedenti. Schema 29.
- PRISM-0.16.11.apk: Android, versionCode 102, stessa firma del precedente APK 0.16.10. Aggiorna senza disinstallare. Codice nativo conservato; asset web e versione aggiornati e APK rifirmato/verificato.
- PRISM-Android-0.16.11-source.zip: sorgenti Android completi.
- PRISM-iOS-0.16.11-source.zip: sorgenti iOS completi per Xcode/Xcode Cloud, versione 0.16.11, build locale 92. Xcode Cloud usa il proprio CI_BUILD_NUMBER.

## Aggiornamento server
Carica PRISM-backend-0.4.13.zip nella home dell’utente Ubuntu sul VPS principale di api.prismdating.app, poi:

```bash
cd ~
unzip -o PRISM-backend-0.4.13.zip -d prism-live-0.4.13
cd ~/prism-live-0.4.13/PRISM-backend
sudo bash install.sh
```

L’installer esegue il backup del database e del backend attuale, applica lo schema e riavvia il servizio. Non installare questo pacchetto sul server LiveKit. Dopo l’aggiornamento ricarica completamente l’admin per ottenere i nuovi script.

## Aggiornamento app
Android: installa il nuovo APK oppure genera il pacchetto store con i sorgenti inclusi.
iOS: aggiorna il repository Xcode Cloud con i sorgenti completi, inclusa la cartella PRISM/Web, poi avvia Archive/TestFlight. Non è incluso un IPA firmato.
Le modifiche alla pagina live e all’admin arrivano dal backend; il modulo di avvio live richiede questa nuova versione dell’app.

## Verifiche
254 test backend superati. Verificati popup e commenti a 320, 390 e 430 px; modulo Android/iOS con viewport ridotta per simulare tastiera aperta; raggiungibilità del pulsante Vai in diretta; regali, premi e bouncer ancora funzionanti nei test con LiveKit simulato. Verificati in browser suono predefinito, timer 30 secondi, aggiornamento in background, conservazione dei popup e reset admin con nuovo saldo.
Firma APK verificata e confrontata con 0.16.10. Non eseguiti test su telefoni fisici, build iOS o installazione sul VPS: questi passaggi restano da effettuare.
