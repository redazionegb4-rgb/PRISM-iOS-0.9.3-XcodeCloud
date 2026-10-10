# PRISM 0.13.6 — Aggiornamento automatico silenzioso

Android versione 0.13.6, codice 59. iOS versione 0.13.6, build locale 50 (Xcode Cloud usa il proprio progressivo). Backend richiesto: quello già installato, 0.3.23. Nessun aggiornamento del backend o del sito necessario.

La griglia e le storie continuano ad aggiornarsi automaticamente ogni 60 secondi quando Esplora è aperta in primo piano. Il controllo viene eseguito senza ricreare l’intera home: restano gli stessi elementi e le immagini non vengono reinserite se non cambiano. Cambiano soltanto profili, informazioni e storie effettivamente aggiornati. Nessuna animazione di caricamento, suono o conferma per i controlli automatici. Durante un gesto di scorrimento l’app attende la fine del gesto prima di applicare le modifiche. L’aggiornamento manuale tirando verso il basso mantiene caricamento, suono e conferma.

## Android

Installa PRISM-0.13.6.apk sopra la versione precedente senza disinstallarla. Firma identica alle build precedenti. Il progetto completo è PRISM-Android-source-0.13.6.zip.

## iOS

Aggiorna il repository collegato a Xcode Cloud con il contenuto di PRISM-iOS-0.13.6-XcodeCloud.zip. Compila e distribuisci direttamente su TestFlight. Il progetto Xcode, il codice Swift, le impostazioni di firma, i permessi e gli script CI restano quelli precedenti: questo aggiornamento riguarda solo l’interfaccia e il numero di versione. I problemi 502 di autenticazione/esportazione segnalati nelle build Cloud 87, 88 e 92 rimangono esterni alla compilazione di questa modifica; il pacchetto non pretende di correggerli. Non occorre esportare dal vecchio Mac.

## Verifiche eseguite

Prove browser sugli asset Android e iOS: conservazione degli elementi della home, delle immagini, delle schede e dello scorrimento quando non cambiano i dati; modifiche di nome e presenza; aggiunta e rimozione profili e storie; cerchio delle storie viste; riconciliazione dell’ordine delle schede senza sostituire le immagini; gestione silenziosa degli errori di rete; applicazione differita durante un gesto; aggiornamento delle città senza spinner; mantenimento del suono e della conferma per il refresh manuale. Controllati anche popup, conferme di lettura degli avvisi, blocco manutenzione e riapertura. Sintassi JavaScript verificata. APK ricostruito mantenendo il codice nativo verificato della 0.13.3 e sostituendo asset/versione, poi allineato e firmato con lo stesso certificato. Risorse dei pacchetti confrontate con i sorgenti. La compilazione nativa iOS e la verifica su telefoni reali devono essere eseguite tramite Xcode Cloud/TestFlight.
