# PRISM 0.13.5 — Avvisi popup e manutenzione

Android 0.13.5, codice 58. iOS 0.13.5, build 49. Backend 0.3.23, schema 16.

## Nuove funzioni

Nel pannello https://api.prismdating.app/admin trovi “Avvisi e accesso app”, riservato al titolare.

### Avvisi popup

Inserisci titolo e messaggio, scegli la durata (1, 7, 30 o 90 giorni) e premi “Pubblica avviso”. Il popup raggiunge tutti gli utenti che accedono durante la sua disponibilità. La comparsa avviene nell’app aperta, non come notifica di sistema. Premi “Ho capito” per confermare: la lettura viene salvata sul singolo account, quindi non ricompare sui suoi altri dispositivi o al riavvio. Se la conferma fallisce, l’utente può riprovare. Gli avvisi non letti vengono mostrati dal più vecchio al più nuovo; puoi ritirarli e controllare il numero di letture. Massimo 20 avvisi attivi. Durante la manutenzione aspettano la riapertura.

### Modalità manutenzione

Personalizza titolo e messaggio, premi “Attiva manutenzione” e conferma. App già aperte: la schermata viene bloccata al controllo periodico (ogni 10 secondi in primo piano) o alla successiva operazione sul server. Chi apre l’app vede il popup anche prima del login. Il blocco non si chiude con Escape o toccando fuori; le richieste API dell’app vengono rifiutate dal server con 503. Account e dati rimangono conservati. Le Live rilevano il blocco al successivo polling e disconnettono audio/video, mostrando il messaggio del team. Il pannello admin, lo stato del servizio e il logout restano accessibili.

Premi “Riapri PRISM” per disattivare: l’app si sblocca al successivo controllo e riprende la sincronizzazione. “Salva messaggio” aggiorna il testo mantenendo lo stato corrente. Le azioni vengono registrate nel registro attività.

## 1. Backend — installare per primo

Carica PRISM-backend-0.3.23.zip con WinSCP in /home/ubuntu sul VPS principale 141.94.224.242. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.23.zip prism-update-0323
cd /home/ubuntu/prism-update-0323/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

La versione deve risultare 0.3.23. L’installer crea un backup, applica lo schema 16 e conserva dati e configurazioni. Il test PostgreSQL viene eseguito in uno schema isolato: gli avvisi e la manutenzione della prova non raggiungono gli utenti reali. Non occorre reinstallare il server video o il sito.

## 2. Android

Installa PRISM-0.13.5.apk sopra la versione precedente, senza disinstallare. Firma identica. Il progetto completo è in PRISM-Android-source-0.13.5.zip.

## 3. iOS / Xcode Cloud

PRISM-iOS-0.13.5-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository collegato a Xcode Cloud, poi avvia archivio e distribuzione diretta TestFlight. Versione 0.13.5, build locale 49 (il workflow può usare il proprio progressivo). Nessuna esportazione sul vecchio Mac necessaria.

Le nuove build sono necessarie per visualizzare i popup con la nuova grafica. Il blocco sul server riguarda anche le vecchie app, che potrebbero mostrare un errore generico invece del messaggio personalizzato.

## Prova finale

Aggiorna due telefoni e pubblica un avviso dal pannello: verifica che compaia su entrambi gli account. Conferma su uno, riapri l’app e verifica che non ricompaia. Ritira l’avviso e verifica che sparisca dagli altri utenti. Attiva manutenzione con le app aperte e durante una Live: nessuna azione deve essere disponibile. Prova anche ad aprire l’app dalla schermata login. Riapri PRISM dal pannello e verifica che riprenda a funzionare.

## Verifiche

88 test backend passati, inclusi autorizzazioni del titolare, CSRF, blocco accesso/azioni, riapertura, letture idempotenti per account, ritiro e validazione avvisi. Prove browser sugli asset Android/iOS a 320/390/430 pixel; pannello admin desktop/mobile e Live, con simulazioni locali. APK aggiornato mantenendo la parte nativa precedente e sostituendo asset web/versione; allineamento ZIP e firma verificati. Nessuna modifica nativa. iOS va compilata su Xcode Cloud. La prova PostgreSQL completa viene eseguita dall’installer sul VPS; da questo ambiente non sono stati installati gli aggiornamenti sul server né provati su telefoni reali.
