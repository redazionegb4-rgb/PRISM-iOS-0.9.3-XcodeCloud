# PRISM 0.14.1 — Correzioni e nuova condivisione foto/album

Android 0.14.1 (codice 61). Progetto iOS 0.14.1 (build locale 52). Backend richiesto: 0.3.24, schema 17.

## Prima aggiorna il backend

Il controllo pubblico effettuato il 10 ottobre 2026 ha restituito backend 0.3.23. Questa versione non contiene le nuove API per album privati e chiamate; da qui gli errori Not Found. Non basta installare la nuova app. Usa il pacchetto PRISM-backend-0.3.24.zip già fornito, sul VPS PRINCIPALE e non sul server video. Caricalo con WinSCP nella cartella del tuo utente SSH. In quella cartella:

```bash
unzip PRISM-backend-0.3.24.zip -d PRISM-backend-0.3.24
cd PRISM-backend-0.3.24/PRISM-backend
sudo bash install.sh
curl -sS https://api.prismdating.app/health
```

L’ultima risposta deve riportare "version":"0.3.24". Lo script effettua backup, conserva le configurazioni esistenti, applica lo schema e copia anche private149.py e le pagine delle chiamate. Il test SQL isolato viene eseguito sul VPS. Se il comando di installazione fallisce, conserva e comunica l’errore completo prima di procedere. Non è stata effettuata alcuna installazione remota da questa sessione.

## Poi aggiorna le app

Android: installa PRISM-0.14.1.apk sopra la versione precedente. La firma è la stessa. Il progetto completo è PRISM-Android-source-0.14.1.zip.

iOS: sostituisci il progetto nel repository collegato a Xcode Cloud con il contenuto completo di PRISM-iOS-0.14.1-XcodeCloud.zip. Avvia la build e distribuisci su TestFlight; non serve esportare dal vecchio Mac. La compilazione iOS deve avvenire su Xcode Cloud: qui non è disponibile Xcode.

## Correzioni

- Compatibilità server: controllo della versione per le nuove funzioni. Se il backend è precedente a 0.3.24, viene mostrato un messaggio comprensibile anziché inviare ripetutamente richieste a percorsi inesistenti. Il controllo viene ripetuto dopo un minuto per rilevare l’aggiornamento del server.
- Rete: massimo due richieste native in corso, letture duplicate condivise, priorità alle azioni di scrittura. Una lettura fallita per rete o gateway viene ritentata una volta. Gli invii non sono ritentati automaticamente: resta l’anteprima e puoi riprovare, usando lo stesso identificatore per evitare duplicati.
- Chat: il caricamento iniziale dei messaggi aggiorna solo il contenuto, non ricrea il campo di testo. Non viene più inviato il segnale di lettura identico a ogni controllo. I pulsanti di azione non possono inviare accidentalmente il form. Gli aggiornamenti di preferiti/album non ridisegnano la pagina mentre è aperta la chat o un pannello.
- Tap: il controllo dello storico successivo è separato dall’invio. Un tap già salvato non viene più indicato come fallito se quel controllo incontra un errore.
- Album privati: la richiesta di accesso aggiorna la scheda in posto senza riaprire il profilo. Il messaggio di backend non aggiornato appare nella pagina, senza continui toast.

## Nuove schermate

Invia una foto: due schede, normale e una sola volta. Foto temporanea: anteprima prima dell’invio, cambio foto, descrizione della durata e conferma. Condividi un album: copertine, selezione, modalità normale/una sola volta e conferma. Stile scuro glass, pannelli scorrevoli anche su schermi piccoli. Si aprono sopra la conversazione; chiudendoli ritrovi lo stesso testo e la stessa chat. Indicatore di invio ed errore nel pannello; anteprima conservata se la rete cade. Restano attivi i limiti Free/Extra e le regole di apertura unica del backend.

## Verifica eseguita

94 test backend superati. Test browser sugli asset iOS e Android: backend vecchio/aggiornato, coda delle richieste, deduplicazione, ritentativo delle sole letture, stessa chat/campo/bozza, errore e nuovo tentativo di invio senza doppio identificatore, foto temporanea, album temporaneo, layout a 320 e 390 px, segnali di lettura senza duplicati. Test esistenti per tap con intenzione, album privati, chiamate simulate e refresh silenzioso superati. APK firmato e verificato; asset identici nei due progetti. L’APK riutilizza il codice nativo già compilato e aggiorna gli asset e la versione. Queste prove non sostituiscono TestFlight e i telefoni reali; non dimostrano l’eliminazione di eventuali guasti della connessione o del VPS.

Dopo l’installazione: verifica /health, poi con due account invia un tap con intenzione, richiedi e approva un album privato, condividi foto/album normale e temporaneo. In chat scrivi una bozza, apri e chiudi i quattro pulsanti della barra e attendi un aggiornamento automatico: bozza e conversazione devono rimanere ferme. Prova anche una perdita reale di rete e un successivo nuovo tentativo.
