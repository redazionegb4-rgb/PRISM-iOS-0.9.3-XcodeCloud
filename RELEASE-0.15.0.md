# PRISM 0.15.0 — nuove connessioni e chat

Android: versione 0.15.0, codice 88. iOS: versione 0.15.0, build locale 79. Backend: 0.4.0, schema 23. Aggiornare prima il backend, poi le app. Non serve aggiornare o reinstallare LiveKit.

## Cosa cambia

- **Libero adesso:** dalla home scegli Un caffè, Due chiacchiere, Una passeggiata o Stasera. Durata selezionabile: 1, 3 o 6 ore. Puoi disattivarlo subito. Lo stato scade sul server anche se chiudi l'app. Solo disponibili filtra la griglia nella zona di ricerca; i preferiti continuano a essere mostrati indipendentemente dal raggio.
- **Interesse reciproco:** due Tap Mi piaci generano un interesse reciproco, unico per coppia. Entrambi vedono un popup con Scrivigli e Più tardi. La chiusura viene registrata per account, anche sugli altri dispositivi. Se la conferma non raggiunge il server, il popup può ricomparire al successivo accesso. Vale per i nuovi Tap; lo storico precedente non genera popup retroattivi.
- **Risposte in chat:** il riferimento usa il numero del messaggio sul server, non la sua posizione sul telefono. Il server verifica la conversazione e costruisce l'anteprima. Non copia foto temporanee o contenuti privati nella citazione.
- **Reazioni:** cuore, pollice, risata, fuoco, sorpresa e tristezza. Una reazione per persona sul messaggio, modificabile o rimovibile. Aggiornamento tramite sincronizzazione silenziosa, non ricaricamento della pagina.
- **Ricerca:** dai tre puntini della chat, Cerca nella chat. Almeno due caratteri, risultati datati e caricamento dei risultati successivi. Toccando un risultato si raggiunge il messaggio. Le conversazioni eliminate e i blocchi restano rispettati.
- **Chat fissate:** dai tre puntini, Fissa in alto/Non fissare più. Preferenza personale, salvata sul server e ordinata prima delle altre conversazioni.
- **Grafica:** header e storie di Esplora compatti; disponibilità direttamente visibile. Popup, pulsanti, centratura delle chiusure e animazioni coerenti. Anche i popup delle Live hanno lo stesso stile. Movimento ridotto rispettato. La barra del menu resta visibile con gli spazi già previsti nelle pagine.

Le nuove funzioni sono disponibili sia nel Free sia in Extra. I limiti delle funzioni esistenti non cambiano: Free 40 km, Extra 150 km; le chiamate conservano le regole precedenti.

## 1. Aggiorna il backend sulla VPS principale

Carica PRISM-backend-0.4.0.zip con WinSCP in /home/ubuntu, poi:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.4.0.zip prism-backend-040
cd /home/ubuntu/prism-backend-040/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve mostrare `"version":"0.4.0"`. L'installer conserva configurazione e dati, crea un backup e aggiunge le tabelle delle nuove funzioni. Non cancellare il database. Esegue il collaudo PostgreSQL in uno schema isolato, incluse le nuove funzioni; il server video non va modificato.

## 2. Android

Installa PRISM-0.15.0.apk sopra la precedente, senza disinstallare: stessa firma. PRISM-Android-source-0.15.0.zip contiene il progetto completo. Il pacchetto allegato aggiorna gli asset web e la versione dell'APK precedente conservando codice e librerie native; firma e allineamento verificati. La compilazione Gradle completa non è stata disponibile in questo ambiente per dipendenze mancanti.

## 3. iOS / Xcode Cloud

Estrai PRISM-iOS-0.15.0-XcodeCloud.zip e aggiorna il repository collegato al tuo workflow, includendo Web, Config e gli script CI. Avvia archivio e distribuzione TestFlight. Lo ZIP è un progetto completo, non un IPA compilato. I file Swift e le dipendenze native restano invariati. Xcode Cloud può assegnare il proprio numero progressivo.

## Prova con due account

1. Attiva una disponibilità e verifica dall'altro account badge, filtro e disattivazione.
2. Inviatevi entrambi Mi piaci: entrambi devono ricevere il popup. Se il Tap è in attesa, usa il reset già presente nel pannello admin.
3. Scrivi alcuni messaggi, rispondi a uno specifico e controlla dall'altro telefono la citazione.
4. Aggiungi e rimuovi reazioni da entrambi; tieni una bozza aperta durante l'aggiornamento.
5. Fissa una chat, torna all'elenco e cercane un messaggio dal menu interno.
6. Verifica tastiera, popup e barra del menu su entrambi i sistemi.

## Verifiche e limiti

179 test backend passati, inclusi validazione, blocchi, citazioni, reazioni e pin. Prove browser con API simulate a 320/390/430 px: disponibilità, risposte con ID stabile, reazioni bidirezionali, conservazione delle bozze, pin, ricerca, popup reciproco e conferma server. Controllati CSS, JavaScript, asset identici Android/iOS, versioni, firma APK e integrità dei pacchetti.

La prova con PostgreSQL reale non è stata possibile qui: il collaudo isolato aggiornato viene eseguito dall'installer sulla VPS. Nessun aggiornamento remoto, invio di messaggi reali o pubblicazione sugli store è stato effettuato. La compilazione iOS e le prove finali sui telefoni restano da completare con Xcode Cloud/TestFlight e l'APK.
