# PRISM 0.12.17 — EXTRA: città e modalità discreta

App Android 0.12.17, codice 51. Progetto iOS 0.12.17, build 42 per Xcode Cloud. Backend 0.3.14, schema 12. Sito 1.1.0.

## Cosa cambia

- Free: la barra mantiene il diamante per aprire PRISM EXTRA.
- EXTRA attivo: il diamante lascia posto al mondo, che apre “Esplora altre città”. La gestione dell’abbonamento resta nel profilo personale.
- Il fantasmino nella home attiva o disattiva la modalità discreta. È disponibile solo con EXTRA; nel Free apre il confronto dei piani.
- Con il fantasmino attivo, le nuove visite ai profili non vengono registrate e non generano notifiche di visita. Non cancella le visite già fatte, non nasconde lo stato online e non rende anonimi Tap, chat o visualizzazioni delle storie.
- La prima versione include 90 città italiane e internazionali ricercabili. Il catalogo si può ampliare nel backend, senza ricompilare le app.
- La ricerca in una città non cambia la posizione GPS del profilo. La griglia indica le distanze dal centro della città; i profili, le chat e i preferiti mantengono la distanza reale. La preferenza di nascondere la distanza è rispettata anche nella ricerca per città.
- Le storie restano quelle vicine alla posizione reale. “Torna vicino a me” ripristina la griglia locale.
- Alla scadenza di EXTRA, entrambe le funzioni smettono di funzionare e la barra torna al diamante. Il backend controlla l’abbonamento a ogni richiesta.
- Aggiornati confronto EXTRA nell’app e sul sito, comprese le FAQ.

## 1. Aggiorna prima il backend

Con WinSCP carica PRISM-backend-0.3.14.zip in /home/ubuntu. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.14.zip prism-update-0314
cd /home/ubuntu/prism-update-0314/PRISM-backend-restore
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Il risultato di health deve mostrare versione 0.3.14. Lo script esegue la migrazione che aggiunge la preferenza discreta, conserva i dati e crea un backup prima dell’aggiornamento. Esegue inoltre il test del backend in uno schema isolato, senza inviare vere email o notifiche. Le app precedenti restano compatibili.

Non installare soltanto l’app: il backend precedente non contiene le nuove funzioni.

## 2. Android

Installa PRISM-0.12.17.apk sopra la versione precedente. La firma è la stessa, quindi non occorre disinstallare o cancellare i dati. Il pacchetto PRISM-Android-source-0.12.17.zip contiene i sorgenti completi.

## 3. iOS / Xcode Cloud

PRISM-iOS-0.12.17-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository usato da Xcode Cloud come per le versioni precedenti, poi avvia l’archiviazione e la distribuzione TestFlight. Versione 0.12.17, build 42. Non è necessario trasferire l’app dal vecchio Mac.

Il progetto iOS non è stato compilato con Xcode in questo ambiente: la compilazione e la firma avvengono su Xcode Cloud.

## 4. Sito

Carica PRISM-sito-1.1.0-VPS.zip in /home/ubuntu:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-sito-1.1.0-VPS.zip prism-sito-110
cd /home/ubuntu/prism-sito-110/PRISM-site-1.1.0
sudo bash install-site.sh
```

Il sito conserva lo stile precedente e include le nuove funzioni nella tabella EXTRA e nelle FAQ. Le istruzioni specifiche sono comprese nello ZIP. I link pubblici degli store e le informative definitive vanno ancora collegati se non lo hai già fatto: i link non sono stati inventati.

## Controlli da fare dopo l’installazione

1. Con un utente Free: diamante nella barra; fantasmino apre il piano; nessuna ricerca in un’altra città.
2. Con EXTRA: mondo nella barra; scegli una città; verifica il banner e poi “Torna vicino a me”.
3. Con due account: attiva il fantasmino su A, visita il profilo B, verifica che B non riceva una nuova visita. Disattiva il fantasmino e ripeti: la nuova visita deve comparire.
4. Controlla che le visite precedenti di B restino visibili e che i preferiti siano sempre disponibili.
5. Verifica la scadenza EXTRA in TestFlight: il ritorno al Free deve disattivare i vantaggi.

## Verifiche eseguite

Verificati con interfacce Android/iOS nel browser: cambio barra Free/Extra, fantasmino, filtro città, separazione delle distanze, posizione invariata, preferiti, profili bloccati, scadenza, ritorno alla zona reale e protezione da risposte di rete obsolete. Layout verificati a 320, 390 e 430 pixel. Passano anche i controlli di regressione su chat, menu, swipe e contatori Tap/visite.

Test HTTP del backend eseguiti con un adattatore database isolato: permessi Free/Extra, città non valide, preferenza discreta, soppressione di visite e push, ritorno al Free. Il test completo PostgreSQL/PostGIS è incluso in restore_smoke.py e viene eseguito dall’installazione sulla VPS; non è stato eseguito su un database locale in questo ambiente.

APK firmato e verificato; integrità dei pacchetti verificata. Non sono stati effettuati test su telefoni fisici né un caricamento diretto sulla VPS.
