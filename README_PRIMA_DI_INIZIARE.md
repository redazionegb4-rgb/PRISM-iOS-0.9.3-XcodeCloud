# PRISM 0.13.0 — Live pubbliche

Android: versione 0.13.0, codice 53. iOS: versione 0.13.0, build 44. Backend: 0.3.15, schema 13.

## Novità

- Pulsante Live nella home e catalogo delle dirette di tutto il mondo, indipendente dal raggio di ricerca.
- Un presentatore e fino a tre ospiti accettati: quattro persone in video. Spettatori, commenti, richieste di partecipazione e gestione degli ospiti.
- Nessuna registrazione o replay. Il presentatore può rimuovere gli ospiti e chiudere la diretta; dal pannello amministrativo si possono interrompere le dirette.
- Icona mondo con colore neutro come le altre icone della barra.
- Aggiornamento automatico della griglia e delle storie ogni 60 secondi mentre Esplora è visibile, e al ritorno nell’app. Il refresh automatico è silenzioso e rinvia il ridisegno durante lo scorrimento.
- Nuovo suono dedicato al refresh manuale, nel rispetto delle impostazioni audio.

## 1. Aggiorna il backend principale

Carica PRISM-backend-0.3.15.zip con WinSCP in /home/ubuntu del VPS principale (141.94.224.242). In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.15.zip prism-update-0315
cd /home/ubuntu/prism-update-0315/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.3.15. L’installazione esegue backup, migrazione dello schema e controlli del backend. Non modificare il server LiveKit già installato per aggiornare il backend PRISM.

## 2. Collega le chiavi del server video

Le chiavi restano soltanto nei server, mai nelle app o in chat.

Dal pacchetto backend estratto sul PC, carica deploy/export-live-connection.py tramite WinSCP in /root del server video 178.33.91.9. In PuTTY sul server video, come root:

```bash
python3 /root/export-live-connection.py
```

Scarica privatamente /root/prism-live-connection.json con WinSCP e caricalo in /home/ubuntu/prism-live-connection.json sul VPS principale. Non inviare questo file in chat. Sul VPS principale:

```bash
cd /home/ubuntu/prism-update-0315/PRISM-backend
sudo /opt/prism/venv/bin/python prepare-live.py /home/ubuntu/prism-live-connection.json
```

Il comando deve confermare «Connessione LiveKit verificata». Salva la configurazione con permessi riservati in /etc/prism/live.json. Solo dopo la verifica riuscita elimina le copie di trasferimento dal PC e dai due server:

Sul VPS principale:

```bash
rm /home/ubuntu/prism-live-connection.json
sudo systemctl restart prism-api
curl --fail --silent https://api.prismdating.app/health
```

Sul server video:

```bash
rm /root/prism-live-connection.json
```

Le soglie iniziali sono 10 dirette e 100 partecipanti per sala: sono limiti operativi da validare con prove di carico, non una capacità garantita del VPS.

## 3. Installa le app

Android: installa PRISM-0.13.0.apk sopra la versione precedente. La firma è la stessa; non occorre disinstallare l’app. Il pacchetto sorgenti contiene il progetto completo.

iOS: PRISM-iOS-0.13.0-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository collegato a Xcode Cloud e avvia archivio e distribuzione TestFlight. Versione 0.13.0, build 44. Non serve trasferire un archivio dal vecchio Mac. La nuova build nativa è necessaria per fotocamera, microfono e pagina video sicura.

## 4. Prova reale prima del rilascio pubblico

1. Usa due telefoni, possibilmente uno su Wi-Fi e uno su rete mobile: avvia una diretta e aprila come spettatore.
2. Verifica video, audio, commenti, richiesta di partecipazione e accettazione da parte del presentatore.
3. Con altri dispositivi verifica il limite di tre ospiti, rimozione e blocco dalla sala.
4. Prova disattivazione microfono, fotocamera, cambio fotocamera, uscita e chiusura della diretta. Quando il presentatore resta in background a lungo, la sala viene chiusa dopo il timeout.
5. Verifica l’interruzione dal pannello amministrativo e l’aggiornamento del catalogo.

## Controlli eseguiti

Build Android release completata. 67 test backend passati, inclusi permessi e gestione delle dirette con servizi video simulati. Controlli dell’interfaccia condivisa Android/iOS passati alle larghezze 320, 390 e 430 pixel.

La compilazione iOS richiede Xcode Cloud. Audio e video reali sul VPS e sui telefoni non sono stati verificati in questo ambiente: il collegamento delle chiavi e la prova con i dispositivi restano necessari. Questi pacchetti non implicano che il backend remoto sia già aggiornato.
