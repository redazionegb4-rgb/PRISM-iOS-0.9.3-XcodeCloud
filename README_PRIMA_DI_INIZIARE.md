# PRISM 0.11.0 — prima anteprima online

Questa versione usa https://api.prismdating.app e richiede il backend PRISM 0.2.0 già installato. Non richiede un nuovo aggiornamento del VPS.

## Cosa è collegato al server
Registrazione con email, password di almeno 12 caratteri, data di nascita e conferma maggiore età; verifica email e recupero password tramite link; accesso e uscita; modifica del profilo e social; posizione autorizzata dal telefono e ricerca entro 1–5 km; filtri Tutti/Online/Preferiti; preferiti; tap ricevuti e inviati con data e intervallo di 24 ore; chat di testo con emoji, ordinamento recente e cancellazione dalla propria lista tramite swipe; blocco/sblocco e segnalazione; privacy di stato online, ultimo accesso e distanza; eliminazione account con credenziali.

La sessione viene conservata nel Keychain su iOS e cifrata con Android Keystore su Android; il token non viene passato al JavaScript. I dati personali visualizzati restano in memoria nel client. Il server salva i dati reali. Nessun profilo o messaggio dimostrativo viene creato.

## Primo test su due telefoni
1. Installa l'APK aggiornato o la nuova build TestFlight.
2. Registra due account nuovi con email differenti. Gli account locali della demo non sono account del server e non vengono trasferiti.
3. Apri il link di conferma ricevuto via email, quindi accedi nell'app.
4. Consenti la posizione su entrambi i telefoni e premi Attiva posizione. I telefoni devono essere entro il raggio selezionato, massimo 5 km, e aver aggiornato la posizione.
5. Controlla profili, preferiti, tap, chat, modifica profilo e blocco. Se non ci sono utenti reali in zona, la griglia vuota è corretta.
6. Prova il recupero password e, con un account di prova, la cancellazione account.

## Limiti di questa fase
Questa è una build pilota per verificare il collegamento reale, non la versione finale per il pubblico. Foto profilo, foto in chat, album, storie e audio non sono ancora collegati al backend e non sono disponibili in questa build. Non vengono inviati finti contenuti e i dati della precedente demo non vengono caricati sul server.

Gli aggiornamenti delle chat e delle liste arrivano ogni 7 secondi mentre l'app è aperta. Non sono ancora notifiche push: ad app chiusa non arriva una notifica. Anche pannello amministrativo, gestione operativa delle segnalazioni, visualizzazioni del profilo e acquisti PRISM EXTRA restano da implementare. Le segnalazioni vengono salvate nel database, ma non c'è ancora un pannello per lavorarle.

## Verifiche effettuate
Compilazione Java e DEX, confezionamento e firma dell'APK; confronto della firma con la versione precedente; controlli JavaScript; test automatici delle due interfacce su registrazione/verifica/accesso, posizione, preferiti, tap, retry dei messaggi senza duplicati, ricezione messaggi senza perdere la bozza, blocco, privacy, modifica e swipe di cancellazione; controllo visivo delle schermate su formato telefono.

I test del client usano un server simulato solo nell'ambiente di verifica, escluso dai pacchetti distribuiti. Non sostituiscono il test reale fra dispositivi sul VPS. Il progetto iOS è preparato per Xcode Cloud; la compilazione iOS e il test su dispositivo devono essere completati su Xcode Cloud/TestFlight.

## Pubblicare la build iOS con Xcode Cloud
1. Estrai il pacchetto completo e aggiorna nel repository le cartelle PRISM, PRISM.xcodeproj, Config e ci_scripts, mantenendo la stessa struttura. Non caricare lo ZIP come file unico nel repository.
2. Mantieni il Bundle ID app.prism.dating e il tuo Team ID Apple. In Config/App.xcconfig il Team è lasciato vuoto: puoi conservarlo dal repository esistente o impostare PRISM_TEAM_ID nel workflow Xcode Cloud.
3. La versione è 0.11.0, build locale 14. Il post-clone usa CI_BUILD_NUMBER se presente: il numero finale deve essere superiore a quello già caricato su App Store Connect.
4. Esegui il workflow Archive e distribuzione a TestFlight che usavi già. Non serve compilare o trasferire dal vecchio Mac.
5. La gestione UIScene del fix di avvio è mantenuta. Il post-clone non scarica dipendenze esterne.
6. Dopo la compilazione, prova registrazione, apertura email, accesso e permesso posizione su iPhone.

Il manifest privacy è aggiornato per i dati dell'anteprima online. Prima della distribuzione pubblica aggiorna anche le risposte App Privacy in App Store Connect e la policy del servizio. Riferimenti tecnici: https://developer.apple.com/documentation/technotes/tn3184-adding-data-collection-details-to-your-privacy-manifest e https://developer.apple.com/documentation/bundleresources/app-privacy-configuration/nsprivacycollecteddatatypes/nsprivacycollecteddatatype
