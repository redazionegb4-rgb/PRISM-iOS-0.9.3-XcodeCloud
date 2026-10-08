# PRISM 0.11.1 — interfaccia originale e verifica email con codice

Ripristina l'interfaccia completa della 0.10.4: login/registrazione, griglia con storie, Tap ricevuti/inviati e visite, profilo personale, modifica, profili pubblici, privacy e blocchi, album, conversazioni e piano Extra. La 0.11.0 semplificata viene sostituita.

## 1. Aggiorna prima il backend sulla VPS

Scarica PRISM-backend-0.3.0.zip. Con WinSCP caricalo nella cartella /home/ubuntu della VPS PRISM, poi in PuTTY esegui:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.0.zip prism-update-030
cd /home/ubuntu/prism-update-030/PRISM-backend-restore
sudo bash install.sh
```

L'installer usa la configurazione del database e dell'email già presenti, salva un backup prima della migrazione, aggiunge le tabelle e i campi necessari, aggiorna il servizio e Nginx e infine esegue un test in uno schema temporaneo. Il test non invia email all'esterno e non modifica gli account reali. L'ultima riga deve essere: «Aggiornamento PRISM 0.3.0 completato e test isolato superato».

Il test completo SQL deve essere eseguito dalla VPS: in questo ambiente sono stati eseguiti 22 test del backend su validazione, sicurezza del codice, email e protezione dei contenuti, e i test delle interfacce Android/iOS con API simulate. Nessun aggiornamento è già stato eseguito sul tuo server da questa consegna.

## 2. Android

Installa PRISM-0.11.1.apk sopra la precedente app. Stesso package app.prism.dating, stessa firma di sviluppo, versionCode 25.

## 3. iOS con Xcode Cloud

Estrai PRISM-iOS-0.11.1-XcodeCloud.zip. Aggiorna nel repository le cartelle PRISM, PRISM.xcodeproj, Config e ci_scripts mantenendo la struttura. Mantieni il Team ID Apple già usato, o imposta PRISM_TEAM_ID nel workflow. Bundle ID app.prism.dating, versione 0.11.1, build locale 15; CI_BUILD_NUMBER prevale se presente e deve essere superiore al numero già caricato.

Esegui il workflow Archive/TestFlight che usavi già: non serve compilare o trasferire direttamente dal vecchio Mac. Il lifecycle UIScene del precedente fix di avvio è mantenuto. La compilazione iOS richiede Xcode Cloud e la verifica finale su iPhone/TestFlight.

## Verifica email

La registrazione invia un codice di sei cifre. Inseriscilo nella schermata di verifica dell'app. Non serve aprire un link. Il codice scade dopo 10 minuti, ha un massimo di cinque tentativi e viene invalidato dopo l'uso. Puoi richiedere un nuovo codice ogni 60 secondi. Non ci sono codici fissi o dimostrativi.

Per un account registrato prima dell'aggiornamento e ancora da verificare, inserisci l'email e premi «Invia un nuovo codice». Il recupero password mantiene il link per scegliere una password nuova.

## Collegamenti reali aggiunti

Foto profilo fino a sei, dettagli personali e social; album personali e invio in chat; foto normali e visualizzabili una volta; vocali; storie fotografiche o testuali, risposte/reazioni con anteprima originale; visite reali; preferiti, tap e blocchi. Le storie degli altri seguono il raggio scelto entro 5 km. La tua anteprima dei contenuti visualizzabili una volta non consuma l'apertura del destinatario.

Il piano Free permette un album, due foto visualizzabili una volta al giorno (mezzanotte italiana), ricerca fino a 5 km e identità dei cinque visitatori più recenti. Gli altri visitatori hanno copertina sfocata sul server, distanza e orario; l'identità non viene inviata al client. I profili bloccati sono esclusi da griglia, chat, tap, visite e storie.

La pagina Extra conserva il confronto e il prezzo proposto di 5,99 €/mese. Gli acquisti non sono ancora attivi e non c'è un pulsante che simula un abbonamento. Push e pannello admin restano il prossimo passaggio. Gli aggiornamenti in primo piano avvengono ogni 7 secondi.

I contenuti della precedente demo non vengono caricati sul server. Gli account reali eventualmente già creati restano validi; gli account locali della demo richiedono registrazione sul servizio. Nessun profilo fittizio viene inserito. Per il primo test crea due account verificati su telefoni vicini e autorizza la posizione.

Questa rimane una build pilota: prova i flussi su dispositivi reali prima della distribuzione pubblica. I media sono compressi e limitati e vengono conservati nel database del servizio; storage dedicato, moderazione operativa, push, pannello admin e pagamenti devono essere completati prima del lancio.
