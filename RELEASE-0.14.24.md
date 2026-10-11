# PRISM 0.14.24 — ricerca città mondiale

La ricerca di Esplora il mondo non è più limitata alle 90 città suggerite. Digitando un nome cerca città, comuni e località nel database geografico OpenStreetMap tramite Photon. Mostra regione e Paese per distinguere omonimi, con 8 risultati per pagina. L’elenco iniziale rimane solo una selezione di suggerimenti.

La scelta usa il centro geografico restituito dal servizio e il raggio Extra fino a 150 km; non cambia il GPS del profilo né le storie vicine alla posizione reale. “Torna alla mia posizione” ripristina la ricerca locale. Invio chiude la tastiera senza scegliere automaticamente una città.

## 1. Aggiornare prima il backend

Carica `PRISM-backend-0.3.35.zip` sul VPS principale dell’API, non sul server video. Dalla cartella contenente lo ZIP:

```bash
python3 -m zipfile -e PRISM-backend-0.3.35.zip prism-backend-035
cd prism-backend-035/PRISM-backend
sudo bash install.sh
curl -sS https://api.prismdating.app/health
```

La risposta deve indicare `"version":"0.3.35"`. L’installer conserva un backup e aggiunge la tabella delle destinazioni trovate senza eliminare utenti o contenuti. Non ho installato l’aggiornamento sul VPS da questo ambiente.

Il server deve poter raggiungere `https://photon.komoot.io/api/` via HTTPS. La configurazione iniziale usa l’istanza pubblica Photon: non richiede una chiave o un abbonamento, ma non offre disponibilità garantita e permette solo un uso ragionevole. Sono presenti cache 24 ore, attesa tra richieste per processo e timeout. Per traffico elevato occorre configurare un endpoint Photon dedicato tramite `PRISM_GEOCODER_URL` nel servizio API, senza cambiare le app. Non è stato acquistato o installato un nuovo servizio.

Al geocoder viene inviata la ricerca digitata, non l’ID dell’utente, il suo GPS o il token PRISM. Dati: © OpenStreetMap contributors. Documentazione: https://github.com/komoot/photon e https://github.com/komoot/photon/blob/master/docs/api-v1.md . La copertura dipende dal database: non si può garantire ogni singola località esistente; per omonimi o risultati mancanti provare nome completo e Paese.

## 2. Aggiornare le app

- Android: installa `PRISM-0.14.24.apk` sopra la versione precedente (codice 84, stessa firma di sviluppo). Il progetto completo è `PRISM-Android-source-0.14.24.zip`.
- iOS: sostituisci il contenuto del progetto con `PRISM-iOS-0.14.24-XcodeCloud.zip`, mantenendo repository e credenziali. Versione 0.14.24, build base 75; avvia la build Xcode Cloud e distribuisci su TestFlight.

## Verifica dopo l’installazione

Con un account Extra cerca un piccolo comune non suggerito, ad esempio Scilla, poi una città estera. Verifica nome, regione e Paese, scegli la destinazione e premi Esplora. Nessun profilo in zona è un risultato valido, distinto dall’errore della ricerca geografica. Controlla anche nomi con spazi, accenti e alfabeti non latini, Invio per chiudere la tastiera, cambio pagina e ritorno alla tua posizione.

Verifiche locali: test automatici backend e UI simulata, cache, risposte obsolete, Unicode, selezione di destinazioni non predefinite, limiti Extra, GPS invariato, popup e regressioni. APK assemblato con nuove risorse e firma verificata. Non effettuati qui: build nativa iOS, prove su telefono, installazione VPS e verifica della risposta reale del geocoder sul VPS.
