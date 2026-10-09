# PRISM 0.13.1 — Correzioni e reazioni Live

App Android 0.13.1, codice 54. iOS 0.13.1, build 45. Backend 0.3.16, schema 14.

## Cosa cambia

- Corrette le query del catalogo Live e delle richieste ospiti: usano le foto approvate del profilo, senza cercare una colonna inesistente. Era la causa dell’errore di servizio nel catalogo e nel caricamento dei commenti del presentatore.
- Ogni commento appare subito dopo la conferma del server, senza duplicati. Un errore mantiene il testo da inviare. I nuovi commenti degli altri utenti vengono aggiornati ogni tre secondi.
- Microfono e fotocamera vengono avviati separatamente. Un problema con la fotocamera non blocca il microfono. Pulsanti con stato acceso/spento, spiegazioni dell’errore e pulsante Riprova audio e video.
- Sistemata la gestione nativa dei permessi affinché la richiesta di autorizzazione non interrompa l’avvio della diretta come se l’app fosse in background.
- iOS: la pagina Live segue il bordo superiore della tastiera con il sistema nativo. Eliminata la seconda sottrazione dell’altezza della tastiera; comandi compatti durante la scrittura.
- Cuori animati con pressioni ripetute, contatore condiviso tra gli utenti della diretta e protezione contro richieste eccessive. La reazione appare immediatamente per chi la invia; gli altri ricevono il conteggio tramite l’aggiornamento della sala.
- Video locale senza effetto specchio, anche dopo il cambio fotocamera.
- Sezione commenti più leggibile, barra reazioni dedicata e pannello ospiti mostrato quando serve.

## 1. Aggiorna prima il backend principale

Con WinSCP carica PRISM-backend-0.3.16.zip in /home/ubuntu del VPS principale 141.94.224.242. In PuTTY sullo stesso server:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.16.zip prism-update-0316
cd /home/ubuntu/prism-update-0316/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.3.16. L’installazione conserva i dati e la configurazione LiveKit già collegata, crea un backup e aggiorna lo schema per i cuori. Non devi reinstallare LiveKit sul server video 178.33.91.9 né trasferire di nuovo le chiavi.

Lo script include nuove prove del catalogo, delle richieste ospiti, dei commenti e dei cuori su uno schema PostgreSQL isolato; simula soltanto il server video e non crea dirette pubbliche reali.

## 2. Android

Installa PRISM-0.13.1.apk sopra la versione precedente. Stessa firma, nessuna disinstallazione necessaria. Accetta l’accesso a microfono e fotocamera quando richiesto. Se avevi già negato l’accesso, abilitalo nelle autorizzazioni di PRISM.

## 3. iOS / Xcode Cloud

Il file PRISM-iOS-0.13.1-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository usato da Xcode Cloud e avvia archivio e distribuzione TestFlight: versione 0.13.1, build 45. Il nuovo binario è necessario per le correzioni native di tastiera e permessi; il solo aggiornamento del backend non le applica alla build precedente.

## 4. Verifica sui telefoni

Apri Live: il catalogo deve caricarsi. Avvia una diretta, accetta i permessi e controlla lo stato del microfono e della fotocamera. Con un secondo telefono verifica video/audio, commenti nei due sensi, cuori, richiesta ospite e chiusura della sala. Su iPhone verifica la barra commenti subito sopra la tastiera. Controlla che scritte o oggetti inquadrati non siano invertiti nella tua anteprima.

## Verifiche effettuate

72 test backend passati. Test dell’interfaccia Live passati: avvio indipendente dei dispositivi, errore specifico della fotocamera, commenti immediati senza duplicati o salto dei commenti arrivati nel frattempo, testo sicuro, cuori, video non specchiato e layout mobile 320/390/430 pixel. Build Android release compilata e firma verificata.

La compilazione iOS avviene su Xcode Cloud. Il comportamento dei permessi e della tastiera nativa iOS, e audio/video sul VPS reale, devono essere verificati sui telefoni: non sono stati provati con dispositivi fisici in questo ambiente.
