# PRISM 0.13.2 — Nuova Live e sito

Android 0.13.2, codice 55. iOS 0.13.2, build 46. Backend 0.3.17, schema 15. Sito 1.2.0.

## Modifiche

- Nuova schermata Live: video fermo, commenti sovrapposti in un’area con scorrimento indipendente, comandi compatti e pannello ospiti separato. Il video non viene spinto fuori dalla pagina dai commenti.
- Eliminato il pulsante invia: il commento si pubblica con Invio della tastiera. Il testo resta disponibile se l’invio fallisce.
- Anteprima locale tramite il flusso video originale, senza trasformazioni a specchio; aggiornamento del flusso anche dopo il cambio fotocamera.
- Cuori inviati subito e distribuiti tramite il canale dati LiveKit agli utenti collegati. Conteggio condiviso, animazioni e protezione contro conteggi doppi nei reinvii. Il refresh rimane come recupero in caso di problemi di collegamento.
- Sito: nuova sezione Live, anteprima illustrativa, menu e FAQ aggiornati. Dirette pubbliche globali, un presentatore e fino a tre ospiti accettati. Nessuna registrazione o replay.

## 1. Backend: aggiorna per primo

Carica PRISM-backend-0.3.17.zip con WinSCP in /home/ubuntu sul VPS principale 141.94.224.242. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.17.zip prism-update-0317
cd /home/ubuntu/prism-update-0317/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.3.17. L’installazione conserva i dati e la configurazione LiveKit, crea il backup e applica lo schema 15. Non reinstallare il server video 178.33.91.9 e non trasferire nuovamente le chiavi.

Le nuove pagine Live sono servite dal backend: questo aggiornamento è necessario anche installando il nuovo APK o la nuova build iOS.

## 2. Android

Installa PRISM-0.13.2.apk sopra la versione precedente. Stessa firma, nessuna disinstallazione necessaria. Il progetto completo è in PRISM-Android-source-0.13.2.zip.

## 3. iOS / Xcode Cloud

PRISM-iOS-0.13.2-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository usato da Xcode Cloud e avvia archivio e distribuzione TestFlight: versione 0.13.2, build 46. Mantieni il workflow che distribuisce da Xcode Cloud, senza esportare sul vecchio Mac.

## 4. Sito

Carica PRISM-sito-1.2.0-VPS.zip in /home/ubuntu sul VPS principale. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-sito-1.2.0-VPS.zip prism-sito-120
cd /home/ubuntu/prism-sito-120/PRISM-site-1.2.0
sudo bash install-site.sh
```

Apri https://prismdating.app. CSS e JavaScript hanno un nuovo identificatore per evitare la vecchia grafica in cache. Il sito presenta le Live; le dirette si guardano nelle app.

## 5. Prova sui telefoni

Avvia una Live su un telefono e guardala dall’altro. Controlla scritte non invertite nell’anteprima e dopo il cambio fotocamera, video sempre fermo mentre arrivano molti commenti, Invio della tastiera e barra subito sopra la tastiera su iPhone. Invia più cuori dal telefono spettatore: sul telefono presentatore devono apparire subito animazioni e conteggio. Verifica anche una richiesta ospite e l’apertura del pannello ospiti.

## Verifiche

74 test backend passati. Build Android release compilata e firma verificata. Verifiche browser: 300 commenti senza spostare il video, invio con Invio, cambio flusso fotocamera, cuori tramite pacchetti server, rifiuto dei pacchetti provenienti da utenti, pannello ospiti e layout/tastiera a 320/390/430 pixel. Sito verificato a 320/390/430/768/1440 pixel. Catalogo Live verificato con gli asset di entrambe le app.

Le prove del canale video e del broadcast usano simulazioni locali. Audio/video reali, cuori attraverso il VPS e tastiera iOS devono essere confermati sui telefoni. La compilazione iOS avviene su Xcode Cloud. Gli aggiornamenti remoti non sono stati eseguiti da questo ambiente.
