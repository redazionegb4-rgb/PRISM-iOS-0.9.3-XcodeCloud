# PRISM 0.11.7 — Huawei e privacy iPhone

## Aggiornamento per questa correzione
Il backend resta 0.3.5: se già installato, non occorre aggiornarlo di nuovo. Installare PRISM-0.11.7.apk sopra la versione precedente e caricare il progetto iOS 0.11.7 completo nel repository Xcode Cloud. Versioni: Android codice 31, iOS build iniziale 23 (numero progressivo gestito dal Cloud).

## Huawei
Oltre al badge standard Android, viene chiamata l'API di Huawei Home con il totale non letto. Il numero viene aggiornato sia ricevendo push in background sia sincronizzando i dati nell'app, e azzerato al logout. Include il permesso CHANGE_BADGE del launcher. Se il firmware o il launcher alternativo non supporta tale API, le notifiche standard continuano a funzionare.

Controllare nelle impostazioni del telefono i Badge icone app / Icone con badge e attivare PRISM; selezionare numeri, se il sistema offre questa scelta. I nomi variano secondo EMUI. Provare sul launcher Huawei originale. La consegna push già funzionante non cambia.

## iPhone
- Tolto il messaggio in basso dopo lo screenshot. Il vecchio avviso era successivo allo scatto e non bloccava la foto: non viene più presentato come una protezione dello scatto.
- Durante cambio app, blocco schermo o app inattiva, la copertura mostra soltanto PRISM, senza dire di interrompere una registrazione inesistente. Le anteprime nel selettore app restano coperte.
- Durante una vera registrazione o duplicazione schermo resta il messaggio Contenuti protetti; al termine viene ripristinato il contenuto.
- Il blocco preventivo assoluto degli screenshot su contenuti WKWebView non è garantito dalle API pubbliche iOS. Questa versione corregge gli avvisi e conserva le protezioni effettive; non promette che lo scatto sia impedito.
- Badge iOS e Package.resolved rimangono inclusi.

## Prova
1. Huawei: inviare un messaggio dall'altro telefono mentre PRISM è in background, poi verificare il numero sulla home. Leggere il messaggio e verificare decremento; uscire dall'account e verificare zero.
2. iPhone: fare uno screenshot, non deve apparire il vecchio avviso sotto. Aprire il selettore app: deve vedersi la copertura PRISM, senza messaggi di registrazione. Tornare nell'app: il contenuto deve ricomparire.
3. iPhone: avviare e fermare registrazione/duplicazione schermo, controllare la copertura e il ripristino.

## Verifiche
APK compilato con la nuova integrazione e firma verificata; controllo archivi, risorse condivise e lockfile Firebase. La prova Huawei del badge è da effettuare sul dispositivo. La compilazione nativa iOS e la prova del ciclo privacy sono da verificare su Xcode Cloud e TestFlight.

---
Istruzioni generali di installazione delle push (il backend sotto indicato è già quello della versione precedente):

# PRISM 0.11.7 — notifiche push

Android: versione 0.11.7, codice 31. iOS: versione 0.11.7, build iniziale 23 (Xcode Cloud può usare il proprio numero progressivo). Backend: 0.3.5.

## 1. Aggiornare prima il backend

Caricare `PRISM-backend-0.3.5.zip` in `/home/ubuntu` con WinSCP. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.5.zip prism-update-035
cd /home/ubuntu/prism-update-035/PRISM-backend-restore
sudo bash install.sh
```

L'installer crea un backup, conserva database, configurazione email e `/etc/prism/firebase-admin.json`, aggiunge le tabelle push e riavvia il servizio. Esegue un controllo API in uno schema isolato, senza inviare notifiche ai veri utenti.

Controllo versione:

```bash
curl --fail --silent https://api.prismdating.app/health
```

Deve riportare `0.3.5`. La chiave privata Firebase già configurata rimane esclusivamente sulla VPS: non è inclusa nei pacchetti.

## 2. Android

Installare `PRISM-0.11.7.apk` sopra la versione precedente: mantiene la stessa firma di sviluppo. Alla richiesta, consentire le notifiche. Il progetto sorgente ora include Gradle, Firebase Messaging e `google-services.json` per `prism-78dd7`.

Per ricompilare servono JDK 17 e Android SDK 35. Da Windows, nella cartella `prism`: `gradlew.bat :app:assembleRelease`. Su Linux/macOS: `bash build.sh`. L'APK usa la firma di sviluppo per i test; per Play Store serve la propria firma di produzione.

## 3. iOS / Xcode Cloud / TestFlight

Estrarre `PRISM-iOS-0.11.7-XcodeCloud.zip` e aggiornare il repository già collegato a Xcode Cloud. Includere **tutta** la cartella del progetto: `.xcodeproj`, `Config`, `ci_scripts`, `PRISM/Web`, file Swift, `GoogleService-Info.plist` e `PRISM.entitlements`.

Avviare il workflow Archive e distribuzione TestFlight già usato. Xcode Cloud risolverà Firebase tramite Swift Package Manager. Team e bundle sono già configurati: `B8SC92LPR5`, `app.prism.dating`. La capability Push Notifications deve restare abilitata sul tuo identificatore Apple, come appena fatto. La chiave APNs caricata su Firebase non va inserita nel repository.

Non serve esportare dal vecchio Mac. Questo pacchetto contiene il sorgente completo; la compilazione e firma iOS devono essere eseguite su Xcode Cloud. Non sono state eseguite qui una compilazione iOS nativa o una prova APNs su iPhone.

## Funzioni aggiunte

- Push per messaggi (anche risposte alle storie), Tap ricevuti e, se abilitate, visite al profilo.
- In Privacy e blocchi: autorizzazione telefono e preferenze separate. Messaggi e Tap attivi inizialmente; visite e anteprima disattivate.
- Le visite inviano un avviso anonimo. Le informazioni sui visitatori restano nella sezione Tap con i limiti del piano.
- Toccando la notifica si apre la chat oppure Tap ricevuti/visite. Una notifica di un altro account non apre i suoi contenuti.
- Logout e scadenza della sessione escludono il telefono dall'invio. I blocchi vengono controllati prima dell'invio.
- In primo piano restano i suoni e i contatori interni già presenti, senza aggiungere una campanella.
- Invio mediante coda persistente, tentativi successivi per errori temporanei e rimozione dei token dichiarati scaduti da Firebase.

Le correzioni 0.11.4 rimangono: email grafica con codice, storie viste persistenti, riordino foto, anteprima personale e protezioni foto. Su iOS gli screenshot hanno un avviso successivo; il blocco preventivo assoluto non è garantito dalle API pubbliche.

## Prova su due telefoni

1. Aggiornare backend e app; accedere con due account diversi e consentire le notifiche.
2. Mettere il telefono destinatario in background e bloccare lo schermo. Inviare un messaggio dall'altro account: deve arrivare una notifica PRISM generica con suono. Toccarla: deve aprirsi la chat corretta.
3. Ripetere con un Tap; toccare la notifica deve aprire Tap ricevuti.
4. Attivare Visite al profilo sul destinatario e visitarlo dall'altro account: l'avviso deve essere anonimo. Le visite sono limitate a un avviso per visitatore/ora per evitare ripetizioni.
5. Attivare Anteprima messaggi e ripetere l'invio; poi disattivare Messaggi e verificare che una nuova push messaggio non arrivi. Le preferenze valgono per tutti i telefoni dello stesso account.
6. Bloccare l'altro account e controllare che non arrivino nuove push da lui. Provare anche logout e cambio account.
7. Aprire l'app in primo piano: verificare i contatori e i suoni già presenti senza doppio avviso di sistema.

Un avviso già consegnato dal sistema prima di disattivare una preferenza o bloccare qualcuno non può essere richiamato dal server. Su Android, dopo un Arresto forzato dalle impostazioni, riaprire l'app prima di provare le push.

## Se non arrivano

Verificare autorizzazione notifiche e modalità Silenzioso/Non disturbare, poi aprire Privacy e blocchi per controllare lo stato del telefono. Nel progetto Firebase `prism-78dd7` deve essere abilitata Firebase Cloud Messaging API (V1); la chiave APNs di produzione già caricata serve alla build TestFlight.

Controllo server senza mostrare chiavi o token:

```bash
sudo journalctl -u prism-api -n 60 --no-pager
sudo -u prism /opt/prism/venv/bin/python -c 'import json; p="/etc/prism/firebase-admin.json"; c=json.load(open(p)); print("Progetto:", c.get("project_id")); print("Chiave presente:", bool(c.get("private_key")))'
```

Non condividere il contenuto della chiave privata o i token dei telefoni.

## Verifiche eseguite

34 test backend superati; controlli browser sulle interfacce Android/iOS, preferenze con ripristino in caso di errore, apertura notifiche e regressioni delle funzioni precedenti. APK compilato con Firebase e verificato nella firma. File condivisi delle due app identici e archivi controllati. La consegna reale FCM/APNs resta da verificare sui tuoi dispositivi dopo l'aggiornamento.

## Contatore sull’icona del telefono
- iPhone: ogni push include il totale non letto di messaggi, Tap e visite calcolato dal server. Aprendo l’app il numero viene riallineato ai dati del server; leggere gli elementi lo riduce, il logout lo azzera. Verificare che Impostazioni > Notifiche > PRISM > Badge sia abilitato.
- Android: notifiche e canale comunicano il numero non letto al launcher. PRISM usa una notifica aggregata per evitare somme duplicate; la notifica viene rimossa quando non resta nulla da leggere. Il telefono può mostrare un numero oppure un puntino, secondo il launcher e le impostazioni.
- I contatori interni su Chat e Tap restano presenti. Quando si legge da un altro dispositivo, il badge viene riallineato alla successiva apertura/sincronizzazione oppure alla successiva push.
- Il progetto iOS include Package.resolved e il post-clone lo valida, mantenendo la correzione delle dipendenze Xcode Cloud.

Prova: inviare due messaggi e un Tap con destinatario in background; verificare il numero, aprire la chat e leggere, poi leggere il Tap e verificare il decremento. Ripetere logout e cambio account. Compilazione iOS da confermare su Xcode Cloud.
