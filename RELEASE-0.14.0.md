# PRISM 0.14.0 — Foto private, chiamate e tap con intenzione

App Android 0.14.0 (codice 60), progetto iOS 0.14.0 (build locale 51). Backend 0.3.24, schema 17. Aggiornare PRIMA il backend sul VPS principale, poi installare le app.

## 1. Backend

Carica PRISM-backend-0.3.24.zip sul VPS principale tramite WinSCP, nella cartella del tuo utente SSH. NON sul server video. Da quella cartella:

```bash
unzip PRISM-backend-0.3.24.zip -d PRISM-backend-0.3.24
cd PRISM-backend-0.3.24/PRISM-backend
sudo bash install.sh
```

Lo script conserva configurazioni SMTP, Firebase, pagamenti e LiveKit, esegue backup del database e del backend, applica lo schema e avvia il servizio. Controlla l’esito prima di procedere. La pagina /health deve mostrare 0.3.24. Il test isolato sul database viene eseguito dallo script sul VPS: non modifica utenti reali. Il collegamento al server video è lo stesso delle live; non serve reinstallare LiveKit. Le pagine delle chiamate private sono servite dal VPS principale e i flussi audio/video dal server LiveKit esistente.

## 2. Android

Installa PRISM-0.14.0.apk sopra la versione precedente, senza disinstallare. Firma identica. Il progetto completo è PRISM-Android-source-0.14.0.zip.

## 3. iOS / Xcode Cloud

Aggiorna il repository collegato a Xcode Cloud con l’intero contenuto del progetto PRISM-iOS-0.14.0-XcodeCloud.zip. Avvia la compilazione e distribuisci su TestFlight. Il pacchetto conserva progetto Xcode, Swift, permessi, Firebase, firma e script CI già usati: non serve esportare dal vecchio Mac. La compilazione nativa iOS e le prove reali di microfono/videocamera devono avvenire tramite Xcode Cloud/TestFlight.

## Funzioni

- Foto private: da I miei album puoi mostrare sul profilo un album con lucchetto. Il visitatore vede solo nome e numero delle foto. Richiede accesso; il proprietario approva, rifiuta o revoca da Richieste e accessi. Nascondere l’album revoca gli accessi. Bloccare un profilo revoca gli accessi reciproci. Il secondo album resta soggetto al piano Extra.
- Chiamate audio e video: pulsanti nel profilo utente e nella testata della chat. Il destinatario accetta o rifiuta. Stanze private a due persone, senza registrazioni. Il piano di CHI AVVIA determina la durata: Free 60 secondi dal collegamento di entrambi; Extra nessun limite di durata. Il limite è applicato sul server, con chiusura della stanza. Le chiamate senza risposta scadono dopo 45 secondi.
- Tap con intenzione: Un saluto, Mi piaci, Incontriamoci. L’intenzione appare nello storico. Resta il limite di un tap allo stesso utente ogni 24 ore.
- Sincronizzazione: griglia e storie vengono controllate silenziosamente ogni 60 secondi anche mentre si è in altre pagine. Non viene sostituita la pagina aperta. Chat, attività, richieste e chiamate usano i controlli periodici dell’app senza spinner o suono di refresh automatico.

## Comportamento delle chiamate e del background

Questa versione implementa chiamate private dentro PRISM. Non include CallKit/PushKit su iOS né un servizio telefonico nativo Android: la notifica in arrivo usa Firebase/APNs esistenti e l’accettazione avviene nell’app. Portando PRISM in background durante una chiamata, la chiamata termina per fermare microfono e videocamera. L’avviso può aprire PRISM, ma non è una schermata telefonica di sistema. Quando il sistema sospende l’app, i timer della WebView non possono continuare: arrivano le notifiche push e i dati vengono sincronizzati alla riapertura. Si tratta di aggiornamento silenzioso su tutte le pagine in primo piano.

Un accesso revocato impedisce nuove richieste delle foto e chiude il visualizzatore dopo il controllo periodico. Non può cancellare contenuti già acquisiti su un altro dispositivo. Le protezioni native esistenti per schermate e registrazione rimangono attive.

## Controlli eseguiti e prove sul telefono

94 test backend passati, incluse autorizzazioni, token senza permesso iniziale di pubblicazione, sorgenti audio/video, durata Free/Extra, chiamate occupate, scadenza, rifiuto, revoca, oscuramento degli album e chiusura server con nuovo tentativo in caso di errore. Test browser sugli asset di entrambe le app: scelta del tap, profilo, richiesta/accesso album, visualizzatore, impostazione visibilità, avviso in arrivo, rifiuto e sincronizzazione fuori dalla home. Test dell’interfaccia di chiamata audio con bridge e SDK simulati, inclusa chiusura a 60 secondi. Sintassi JS/Python e ZIP/APK controllati. APK allineato, firmato e verificato; conserva il codice nativo già compilato e aggiorna gli asset e la versione. Il test SQL completo non è stato eseguito qui: è incluso nell’installazione sul VPS.

Dopo il caricamento usa due account su due telefoni: approvazione/revoca foto; tap ricevuto con intenzione; chiamata audio Free di 60 secondi; video Free; chiamata Extra oltre 60 secondi; rifiuto e nessuna risposta; notifica con app chiusa; ritorno da altre pagine con griglia/storie aggiornate. Audio/video reali e notifiche devono essere confermati sui dispositivi e sul server configurato.
