# PRISM 0.11.8 — Pannello completo e EXTRA reale

Backend 0.3.7, Android 0.11.8 (codice 32), iOS 0.11.8 (build 24).

## Aggiornamento della VPS

Carica con WinSCP `PRISM-backend-0.3.7-ADMIN-COMPLETE.zip` in `/home/ubuntu`, poi esegui da PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.7-ADMIN-COMPLETE.zip prism-admin-037
cd /home/ubuntu/prism-admin-037/PRISM-backend-restore
sudo bash install.sh
```

L’installatore salva prima il database e il backend, conserva utenti, credenziali email e notifiche, aggiorna lo schema, esegue i test in uno schema isolato e attiva i backup giornalieri. Il backup iniziale comprende database, configurazioni e backend; viene salvato sulla VPS in `/var/backups/prism/daily`, con conservazione di 14 giorni. I backup non vengono trasferiti automaticamente su un altro server.

Attendi la conferma finale dell’installazione. Se compare un errore, conserva il testo dell’errore prima di proseguire.

Se non hai già creato il tuo accesso admin:

```bash
sudo /opt/prism/venv/bin/python /opt/prism/backend/create_admin.py
```

Inserisci email, nome e password di almeno 12 caratteri. Le credenziali già create rimangono valide; ripetere questo comando con la stessa email reimposta la password e ripristina il ruolo di titolare.

Apri https://api.prismdating.app/admin. Verifica la versione:

```bash
curl --fail --silent https://api.prismdating.app/health
```

Deve riportare `0.3.7`.

## Attiva EXTRA manualmente

1. Apri **Utenti** e cerca la persona per nome o email.
2. Apri **Scheda utente → Attiva / aggiorna EXTRA**.
3. Scegli 7, 30, 90 o 365 giorni, oppure senza scadenza.
4. Inserisci un motivo e conferma.

La durata parte dalla conferma; modificare una concessione ricalcola la scadenza da quel momento. Nelle app 0.11.8 il piano si aggiorna durante la sincronizzazione, senza nuovo login. Il diamante si colora quando EXTRA è attivo.

EXTRA sblocca due album, raggio fino a 50 km, foto una volta illimitate, conferme di lettura reali e tutti i visitatori nella lista disponibile. Ogni album rimane limitato a sei foto. Alla scadenza il secondo album viene conservato nel database e nascosto, finché EXTRA non viene riattivato.

Il pulsante **Revoca concessione** rimuove soltanto l’omaggio manuale. Non cancella né rimborsa un abbonamento Apple o Google: se esiste un abbonamento valido, EXTRA resta attivo fino alla sua scadenza.

## Nuove sezioni

- **Moderazione:** rimuovi foto pubbliche dalla scheda utente e storie attive dalla sezione dedicata, con motivo registrato.
- **Assistenza:** richieste aperte, in gestione o chiuse; risposte inviate alla sezione Assistenza PRISM nel profilo dell’app. Le risposte si aggiornano mentre la richiesta è aperta nell’app. Non viene inviata una push separata per le risposte di assistenza in questa versione.
- **Statistiche:** iscrizioni, utenti verificati attivi nelle ultime 24 ore/30 giorni, EXTRA, abbonamenti store, messaggi, storie e richieste. Gli incassi effettivi restano nei rendiconti Apple e Google.
- **Amministratori:** Titolare (tutto), Moderatore (utenti, segnalazioni, contenuti, assistenza e statistiche), Assistenza (sole richieste). Solo il titolare assegna EXTRA, elimina account e gestisce amministratori/manutenzione. Cambiare i permessi revoca le sessioni del collaboratore.
- **Manutenzione:** spazio, dimensione database, stato backup, code email/push, configurazione store ed errori applicativi recenti. Le chiavi e le password non sono mostrate.

Chat e album privati non vengono esposti agli amministratori per la moderazione. La rimozione di una foto pubblica non elimina eventuali copie già inviate privatamente.

## Aggiorna Android

Installa `PRISM-0.11.8.apk` sopra la versione attuale. Mantiene lo stesso identificativo e la firma delle build di prova precedenti. È incluso anche `PRISM-Android-source-0.11.8.zip`.

## Aggiorna iOS con Xcode Cloud

Usa `PRISM-iOS-0.11.8-XcodeCloud.zip`. Sostituisci nel repository il progetto completo, mantenendo `ci_scripts`, le risorse Web, Firebase e `Package.resolved`, come per le versioni precedenti. Avvia Archive in Xcode Cloud e distribuisci la build 24 con TestFlight. Non occorre compilare o trasferire una build dal tuo Mac.

Android è stato compilato. Il progetto iOS e i file di configurazione sono stati controllati; la compilazione e la prova StoreKit sul dispositivo devono essere effettuate con Xcode Cloud/TestFlight.

## Acquisti store

Acquisto, ripristino e verifica server sono implementati, ma i pulsanti restano disabilitati finché non configuri i prodotti e le credenziali. EXTRA manuale funziona subito dopo l’aggiornamento. Segui `PRISM-EXTRA-STORE-CONFIGURAZIONE.md` per completare la configurazione degli store e i test di acquisto.

Il pacchetto non è stato installato automaticamente sulla tua VPS. I test unitari del backend, l’integrazione PostgreSQL 16/PostGIS e i flussi UI sono stati verificati prima della consegna.
