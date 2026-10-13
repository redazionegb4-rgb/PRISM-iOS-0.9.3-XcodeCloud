# Prism 0.16.13 — scheda regali, conteggi chiari e pulsante aggiorna

## Interventi
- Il tuo spazio: Regali e premi spostato nella sezione degli album, fuori dal blocco Assistenza. Scheda a tutta larghezza con icona nel riquadro, testo su due righe e freccia allineata a destra.
- Regali e premi: totale ricevuto, regali validi per il prossimo premio, regali omaggio e regali già usati per premi vengono distinti. Quando il totale è 2 ma il progresso è 0/10, la pagina spiega che i 2 regali omaggio non aumentano il traguardo. Le regole dei premi restano quelle concordate: sono validi i regali inviati dagli abbonati paganti. Non viene alterata retroattivamente la validità dei regali.
- Aggiorna: icona e testo centrati sulla stessa linea, pulsante più compatto, indicazione Aggiornamento… e animazione dell’icona durante l’aggiornamento manuale; invio ripetuto impedito durante la richiesta. Il testo sotto segnala che l’aggiornamento automatico è attivo.
- Conservati storico, paginazione, premi, reset admin, quote, bouncer e tutte le funzioni precedenti.

## Contenuto
PRISM-backend-0.4.16.zip: backend completo; schema invariato 30; aggiunti i contatori espliciti omaggio e già utilizzati.
PRISM-0.16.13.apk: Android versionCode 104, firma invariata rispetto alla versione precedente; installabile senza disinstallare. Codice nativo conservato, asset aggiornati e APK rifirmato/verificato.
PRISM-Android-0.16.13-source.zip: sorgenti completi Android.
PRISM-iOS-0.16.13-source.zip: sorgenti completi iOS, versione 0.16.13/build locale 94; Xcode Cloud utilizza il proprio CI_BUILD_NUMBER. IPA non incluso.

## Installazione backend
Estrai PRISM-backend-0.4.16.zip e caricalo nella home del VPS principale di api.prismdating.app, non sul server LiveKit:

```bash
cd ~
unzip -o PRISM-backend-0.4.16.zip -d prism-live-0.4.16
cd ~/prism-live-0.4.16/PRISM-backend
sudo bash install.sh
```

L’installer fa il backup e riavvia il servizio. Aggiorna prima il backend, poi le app.
Android: installa il nuovo APK o genera la release store dai sorgenti.
iOS: aggiorna il repository Xcode Cloud con tutti i sorgenti, inclusa PRISM/Web, e avvia Archive/TestFlight.
Queste correzioni alla scheda personale e al pulsante richiedono la nuova app.

## Verifiche
267 test backend superati. Verificato esplicitamente che 2 regali omaggio restano visibili nel totale ma non incrementano il traguardo, senza cambiare la regola economica.
UI Android/iOS provate in browser a 320, 390 e 430 px: posizione fuori Assistenza, scheda e freccia entro i bordi, icona e freccia centrate, paginazione, aggiornamento in arrivo, attivazione premio, spiegazione del conteggio, pulsante allineato e stato di caricamento manuale. Firma e versione APK verificate.
API e LiveKit simulati nei test. Non effettuata l’installazione sul VPS, la verifica su telefoni fisici o la compilazione iOS in Xcode Cloud.
