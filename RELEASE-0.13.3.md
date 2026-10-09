# PRISM 0.13.3 — Live: orientamento, palco e ingressi

Android 0.13.3 codice 56; iOS 0.13.3 build 47; backend 0.3.18. Schema 15 invariato. Il sito 1.2.0 non richiede un nuovo aggiornamento.

## Cosa cambia

- Anteprima frontale selfie: i gesti seguono il movimento percepito da chi si inquadra. Il pulsante orientamento permette di passare alla vista degli spettatori. È una trasformazione della sola anteprima locale, non modifica il flusso trasmesso. Fotocamera posteriore e video ricevuti restano non specchiati.
- Due partecipanti: riquadri uno sopra l’altro sui telefoni, senza le due strisce verticali della versione precedente. Tre: presentatore sopra e due ospiti sotto. Quattro: griglia 2×2. Inquadrature multiple adattate senza tagliare l’immagine.
- Chat sotto il palco nelle Live con ospiti, scorrimento indipendente e comandi più compatti. Gli avvisi di stato normali spariscono dopo pochi secondi; gli errori rimangono visibili. Invio dalla tastiera, senza pulsante invia.
- Nome è entrato nella Live: avviso immediato dal collegamento del partecipante al server video. Nome sale sul palco: avviso quando il presentatore accetta l’ospite. Avvisi temporanei, con nome e senza allungare la schermata; gli spettatori già presenti all’apertura non generano false notifiche di ingresso.
- Cattura video richiesta a 720p, 24 fps, bitrate massimo 1,2 Mbit/s per pubblicazione. Simulcast e adattamento della ricezione restano attivi: la qualità effettiva dipende da dispositivo e rete. Nessuna registrazione o replay.
- Restano attivi i cuori in tempo reale e la protezione dai conteggi doppi.

## 1. Aggiorna il backend principale

Carica PRISM-backend-0.3.18.zip con WinSCP in /home/ubuntu sul VPS principale 141.94.224.242. In PuTTY sullo stesso server:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.18.zip prism-update-0318
cd /home/ubuntu/prism-update-0318/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.3.18. L’installazione conserva dati e configurazione LiveKit. Non reinstallare il server video 178.33.91.9 e non trasferire nuovamente le chiavi. Le nuove pagine Live vengono servite dal backend: installare soltanto le app non aggiorna queste schermate.

## 2. Android

Installa PRISM-0.13.3.apk sopra la versione attuale, senza disinstallarla. Stessa firma. PRISM-Android-source-0.13.3.zip contiene il progetto completo.

## 3. iOS

PRISM-iOS-0.13.3-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository di Xcode Cloud, avvia la build e distribuisci su TestFlight: versione 0.13.3, build 47. Mantieni la distribuzione da Xcode Cloud, senza esportare dal vecchio Mac.

## 4. Test sui telefoni

Chiudi e riapri la Live dopo l’aggiornamento del backend. Con due telefoni: verifica l’anteprima frontale alzando la mano destra, poi usa il comando orientamento e confrontala con il video visto dallo spettatore. La selfie locale può mostrare scritte invertite: passando alla vista degli spettatori le scritte tornano leggibili. Verifica anche la posteriore.

Fai entrare un terzo utente: il nome deve comparire subito come nuovo ingresso. Accettalo sul palco e controlla l’avviso di partecipazione, la disposizione con 2/3/4 persone e la chat sotto i riquadri. Scrivi diversi commenti, manda cuori e apri la tastiera su iPhone: il palco deve restare visibile.

## Verifiche svolte

74 test backend passati. Android release compilata, versione e firma verificate. Test browser con partecipanti e server simulati: orientamento locale, nessuna inversione dei video remoti, cambio frontale/posteriore, eventi di ingresso con nome sicuro, 300 commenti senza spostare il palco, cuori, disposizione 2/4 persone e apertura tastiera. Controllati layout mobile 320/390/430 pixel.

Audio/video e ingressi sul VPS reale vanno confermati sui telefoni. La build iOS deve essere compilata da Xcode Cloud; non sono stati eseguiti aggiornamenti remoti da questo ambiente.

