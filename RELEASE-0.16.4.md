# Prism 0.16.4 — icona, popup admin e verifica foto

Android 0.16.4 codice 95 · iOS 0.16.4 build 85 · backend 0.4.8 · schema 26.

## Cosa cambia

- P dell'icona Android spostata di 4 unità a destra e in basso per centrarne il peso visivo. Forma arrotondata e colori conservati; nome Prism.
- Popup admin rifatti nella struttura e nella grafica: intestazione con icona, titolo, chiusura centrata, contenuto con scroll proprio, campi e informazioni ordinati, azioni ben separate. Schede utente e assistenza hanno una larghezza maggiore; su mobile i pulsanti si dispongono in colonna.
- Ogni approvazione o rifiuto di una foto genera un aggiornamento persistente e una notifica push. Ripetere la stessa decisione con lo stesso motivo non genera duplicati. Le notifiche di moderazione sono separate dalle preferenze dei messaggi; servono comunque permesso notifiche del telefono e registrazione del dispositivo nel servizio push già configurato.
- Nell'app le approvazioni vengono comunicate con un avviso. Per le foto rifiutate, all'apertura compare un popup con foto, motivo, Elimina dal profilo e Più tardi. Se rinviato, non si ripete a ogni polling: ricompare al successivo accesso o ritorno in primo piano. Anche le foto rifiutate prima di questo aggiornamento vengono rilevate.
- Elimina rimuove solo la foto rifiutata e libera il relativo spazio. Il server verifica che sia ancora rifiutata: un popup vecchio non può cancellare una foto riapprovata. Le altre foto e i dati del profilo restano disponibili; il profilo sceglie la nuova foto principale dalla lista rimanente.

## 1. Aggiorna prima il backend

Estrai Prism-0.16.4-COMPLETO.zip sul computer. Carica il file PRISM-backend-0.4.8.zip contenuto nel pacchetto in /home/ubuntu sul VPS principale. In SSH:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.4.8.zip prism-foto-048
cd /home/ubuntu/prism-foto-048/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.4.8. L'installer salva i backup, applica schema 26 e aggiorna i popup del pannello. Ricarica https://api.prismdating.app/admin dopo l'installazione. Non reinstallare sito o server video. Incluse le precedenti correzioni di foto/iscrizione e pannello admin.

## 2. Android

Installa Prism-0.16.4.apk sopra la versione attuale senza disinstallare. Firma identica alla 0.16.3, verificata. Il progetto completo è in Prism-Android-source-0.16.4.zip. Le classi native sono preservate dall'APK precedente; sono aggiornati manifesto/versione, risorsa dell'icona e asset Web.

## 3. iOS

Estrai Prism-iOS-0.16.4-XcodeCloud.zip, aggiorna il repository usato da Xcode Cloud con il contenuto di PRISM-iOS, poi avvia archivio e distribuzione TestFlight. Versione 0.16.4, build 85. Il nome visualizzato resta Prism. Nessuna compilazione iOS è stata eseguita in questo ambiente.

## Prova finale sui telefoni

Carica una nuova foto e approvala dal pannello: deve arrivare la notifica, e al successivo controllo compare l'avviso di approvazione. Rifiuta una seconda foto inserendo un motivo, riapri l'app, verifica foto e motivo nel popup. Premi Più tardi: non deve riapparire nel polling corrente. Riapri, premi Elimina dal profilo: deve liberarsi il posto senza rimuovere le altre foto. La notifica push dipende dai servizi Apple/Google e dai permessi del telefono, da verificare sui dispositivi reali.

## Verifiche eseguite

216 test Python passati. Test browser dei popup admin a 1440 e 390 pixel, con verifica della chiusura e centratura della X; layout ispezionati. Test dell'interfaccia app: avviso di approvazione singolo, foto rifiutata, rinvio, riapertura e eliminazione mantenendo l'altra foto. API browser simulate. Confermate idempotenza delle decisioni, protezione dalla cancellazione di foto riapprovate, modifica dei soli dati foto. APK verificato per firma, versione, icona e corrispondenza di tutti gli asset con il sorgente. Asset della funzione identici su Android e iOS. Lo smoke test PostgreSQL dell'installer include lettura notifiche, isolamento utenti e rimozione della foto rifiutata. Nessuna installazione remota o consegna push reale è stata eseguita qui.
