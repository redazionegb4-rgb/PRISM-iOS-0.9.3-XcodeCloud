# PRISM 0.11.9 — Assistenza, sospensioni e foto pubbliche

Versioni: backend 0.3.8, schema 9; Android 0.11.9 (codice 33); iOS 0.11.9 (build iniziale 25, poi numero progressivo Xcode Cloud).

## 1. Aggiorna prima la VPS

Con WinSCP carica `PRISM-backend-0.3.8-MODERATION.zip` in `/home/ubuntu`. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.8-MODERATION.zip prism-admin-038
cd /home/ubuntu/prism-admin-038/PRISM-backend-restore
sudo bash install.sh
```

L'installatore conserva gli account e le configurazioni SMTP, Firebase, database e acquisti già presenti. Esegue un backup prima dell'aggiornamento e un test in uno schema isolato. Il pannello resta su https://api.prismdating.app/admin, con gli stessi amministratori e password.

```bash
curl --fail --silent https://api.prismdating.app/health
```

Deve riportare `0.3.8`. Il pacchetto non è stato installato automaticamente sulla VPS.

## 2. Foto profilo: verifica prima della pubblicazione

Nel pannello apri **Foto da verificare**. Ogni foto del profilo pubblico deve essere approvata dal titolare o da un moderatore. Foto HOT con nudità esplicita e pornografia devono essere rifiutate: non sono ammesse nei profili pubblici.

**Anche le foto già caricate prima di questo aggiornamento vengono messe in verifica e nascoste agli altri finché non le approvi.** Dopo l'aggiornamento controlla subito questa sezione. Non vengono cancellate dall'account.

- Le foto in attesa o rifiutate restano visibili soltanto al proprietario e agli amministratori autorizzati.
- Griglia, profili, chat, Tap, visite e preferiti ricevono soltanto foto approvate dal server.
- Nell'editor app compaiono In verifica / Approvata / Non approvata.
- La funzione Come appare mostra le sole foto approvate.
- Riordinare una foto già approvata conserva l'approvazione; un nuovo file richiede una nuova verifica.
- Una foto rifiutata non viene approvata automaticamente quando viene caricata di nuovo.
- Gli album privati e le foto inviate in chat non sono esposti al pannello per questo controllo.

Il controllo è **umano, preventivo**. Non è un classificatore automatico della nudità: devi verificare le immagini prima di approvarle. Puoi rifiutare anche una foto già approvata, nascondendola subito nelle risposte successive del server. Una copia già caricata sul dispositivo può rimanere visibile finché il dispositivo aggiorna i dati.

## 3. Sospensioni e motivi facoltativi

Le note amministrative non sono più obbligatorie per sospendere/riattivare, eliminare account, concedere/revocare EXTRA o rimuovere foto/storie. Rimangono il registro attività e la conferma mediante email per eliminare un account.

Quando sospendi un utente, il motivo eventualmente scritto viene mostrato nel popup al suo successivo login con credenziali corrette. Se lasci il campo vuoto, appare un messaggio standard. La sospensione revoca le sessioni e nasconde il profilo. Non scrivere nel motivo informazioni interne che non vuoi mostrare all'utente.

## 4. Assistenza Android e iOS

Rifatti il pulsante Assistenza PRISM nel profilo, l'elenco richieste, il modulo Nuova richiesta e la conversazione con il team. Pulsanti scuri/oro coerenti, testo leggibile, stato della richiesta, campi da 16px per evitare lo zoom automatico su iPhone. Oggetto, messaggi e motivi sono mostrati come testo e non come HTML.

Le risposte del pannello compaiono nell'app mentre la richiesta è aperta. Una richiesta chiusa non accetta altre risposte: l'utente può aprirne una nuova. Non è stata aggiunta una push separata per l'assistenza.

## 5. Aggiorna le app

Android: installa `PRISM-0.11.9.apk` sopra la versione attuale. Stesso identificativo e firma delle build precedenti. Sorgenti completi: `PRISM-Android-source-0.11.9.zip`.

iOS: estrai `PRISM-iOS-0.11.9-XcodeCloud.zip`, sostituisci i file nel repository già collegato a Xcode Cloud mantenendo progetto, Config, PRISM, ci_scripts e Package.resolved. Esegui commit e avvia una nuova Archive sul nuovo commit. Distribuisci con TestFlight. Non serve compilare o esportare dal vecchio Mac.

## 6. Acquisto EXTRA dalle app

Acquisto, ripristino, gestione abbonamento e verifica server Apple/Google sono presenti. Il prezzo è quello restituito dallo store; l'app non simula pagamenti. EXTRA viene concesso soltanto dopo verifica del server e abbinamento all'account PRISM.

Per rendere disponibile il pagamento devi creare i prodotti, attivare le credenziali sulla VPS e provare gli acquisti negli ambienti store. Segui **PRISM-EXTRA-STORE-0.11.9.md**. Senza quelle configurazioni la pagina mostra che gli acquisti non sono ancora disponibili. L'attivazione manuale dal pannello continua a funzionare senza credenziali store.

## Verifica

58 test unitari superati; integrazione PostgreSQL 16/PostGIS superata, compresi moderazione preventiva, approvazione/rifiuto, mancata ripubblicazione di una foto rifiutata, motivi facoltativi e popup sospensione. Interfacce app verificate a 320–430px, pannello a 320–1440px. APK compilato e risorse confrontate con i sorgenti. Le prove UI del pagamento usano uno store simulato per verificare il collegamento dei pulsanti; non dimostrano un pagamento reale. iOS richiede compilazione con Xcode Cloud e prove StoreKit/TestFlight; acquisti reali Apple/Google richiedono configurazione e test negli store.
