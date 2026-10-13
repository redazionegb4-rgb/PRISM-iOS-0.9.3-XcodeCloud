# Prism 0.16.12 — regali ricevuti e traguardo Extra

## Novità e correzioni
1. Premi live: il totale dei regali ricevuti si aggiorna separatamente dai regali validi per il traguardo Extra. Il riepilogo viene aggiornato prima dell’animazione, per non lasciare il contatore fermo se l’effetto grafico fallisce. I regali omaggio sono visibili ma non aumentano il progresso dei premi riservati agli abbonati paganti.
2. Invii e ricezioni distinti: il controllo dell’attesa di 7 giorni identifica esplicitamente chi invia e chi riceve. Ricevere un regalo da una persona non consuma quota e non impedisce di ricambiare. Il messaggio di blocco indica che si tratta di un precedente invio fatto dall’utente, non di un regalo ricevuto.
3. Il tuo spazio > Regali e premi: totale ricevuto, barra del prossimo premio, numero di abbonati diversi, giorni Extra conservati, scadenza del premio attivo e storico dei regali. Ogni regalo riporta mittente, data, tipo e validità per il traguardo. Il pulsante Mostra altri carica lo storico senza scroll infinito. Puoi attivare un premio conservato anche fuori da una live.
4. La nuova schermata si aggiorna ogni 3 secondi quando è aperta e l’app è in primo piano; conserva le pagine dello storico già caricate. Le icone vettoriali sono uniformi al catalogo live.
5. Restano tutte le modifiche precedenti: Extra manuale può inviare, solo i regali di paganti maturano premi, quota 5/settimana, 1 invio verso lo stesso destinatario/7 giorni, reset admin, suono e refresh admin, scudi bouncer e popup compatti.

## Contenuto
- PRISM-backend-0.4.15.zip: backend completo, schema 30, con indice per lo storico ricevuto.
- PRISM-0.16.12.apk: Android versionCode 103, stessa firma di 0.16.11; installabile sopra la precedente versione senza disinstallare. Codice nativo conservato, asset web aggiornati e APK rifirmato e verificato.
- PRISM-Android-0.16.12-source.zip: sorgenti Android completi.
- PRISM-iOS-0.16.12-source.zip: sorgenti iOS completi, versione 0.16.12/build locale 93. Xcode Cloud usa il proprio CI_BUILD_NUMBER. IPA non incluso.

## Installazione backend
Estrai PRISM-backend-0.4.15.zip dal pacchetto completo e caricalo nella home sul VPS principale di api.prismdating.app. Non usare il server LiveKit:

```bash
cd ~
unzip -o PRISM-backend-0.4.15.zip -d prism-live-0.4.15
cd ~/prism-live-0.4.15/PRISM-backend
sudo bash install.sh
```

L’installer fa backup del database e del backend attuale, applica lo schema e riavvia il servizio. Poi esci e rientra nella live; ricarica completamente l’admin.

## App
Android: installa il nuovo APK o genera la release store con i sorgenti.
iOS: aggiorna i sorgenti nel repository Xcode Cloud, inclusa PRISM/Web, poi avvia Archive/TestFlight.
Le correzioni della live arrivano dal backend. La voce Regali e premi in Il tuo spazio richiede questa nuova versione delle app. Aggiorna prima il backend per rendere disponibili gli endpoint del nuovo storico.

## Verifiche
266 test backend superati, inclusi un regalo ricevuto che non consuma quota, invio di ritorno permesso, secondo invio proprio bloccato, storico filtrato per destinatario e paginato, premio attivabile fuori da una live, Extra manuale/store/premio e reset admin.
Test browser live a 320, 390 e 430 px: aggiornamento totale ricevuto e progresso distinto, invio regali, premi, popup, bouncer. Test della nuova pagina su entrambe le UI Android/iOS a 320–430 px: storico, nuovi regali, paginazione, attivazione del premio e menu.
Firma e versione APK verificate. Test con API/LiveKit simulati. Non effettuati installazione sul VPS, test su telefoni fisici o compilazione iOS in Xcode Cloud.
