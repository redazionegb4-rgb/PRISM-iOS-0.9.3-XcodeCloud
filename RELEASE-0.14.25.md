# PRISM 0.14.25 — ricerca città e menu

Corretto il backend 0.3.35: richiedeva `lang=it` al geocoder pubblico, che rispondeva HTTP 400 perché supporta default/de/en/fr. Ora la richiesta omette la lingua forzata. Verificata la risposta reale usando il codice aggiornato per Scilla e New York. Non vengono inviati GPS, credenziali PRISM o email del titolare al geocoder.

“Esplora il mondo” ora prende la selezione del menu appena si apre: un solo pulsante evidenziato con lo stesso riquadro delle altre sezioni. Alla chiusura o al cambio sezione la selezione torna alla pagina corretta. La barra resta visibile. Lo stato rimane coerente anche con gli aggiornamenti in background.

## Aggiornare il server principale

Carica `PRISM-backend-0.3.36.zip` sul VPS dell’API, non sul server video. Nella cartella contenente lo ZIP:

```bash
python3 -m zipfile -e PRISM-backend-0.3.36.zip prism-backend-036
cd prism-backend-036/PRISM-backend
sudo bash install.sh
curl -sS https://api.prismdating.app/health
```

La risposta deve indicare `"version":"0.3.36"`. L’installer conserva un backup e mantiene i dati. La correzione della ricerca funziona anche con l’app 0.14.24: per il riquadro del menu occorre la nuova app 0.14.25. Non ho installato il pacchetto sul tuo VPS.

## App

- Android: `PRISM-0.14.25.apk`, codice 85, stessa firma di sviluppo. Installa sopra la versione precedente. Progetto completo: `PRISM-Android-source-0.14.25.zip`.
- iOS: progetto completo `PRISM-iOS-0.14.25-XcodeCloud.zip`, versione 0.14.25, build base 76. Aggiorna il repository collegato, avvia Xcode Cloud e distribuisci su TestFlight.

## Controllo rapido

Apri il mondo da Chat e dal tuo profilo: il riquadro deve spostarsi sul mondo e scomparire dall’icona precedente. Cerca Scilla o New York, scegli una città e premi Esplora. Prova poi chiusura, cambio sezione e Torna alla mia posizione. Il GPS reale resta invariato.

Verifiche: 160 test backend superati; test UI simulata per selezione unica, aggiornamento in background e ripristino alla chiusura; sintassi di tutti i file JS controllata; richieste reali al geocoder aggiornato riuscite; APK con nuove risorse e firma verificata. Restano da effettuare installazione sul VPS, build nativa iOS e prova sui tuoi telefoni. Il servizio geografico pubblico mantiene i propri limiti di disponibilità: questa correzione elimina l’errore deterministico della lingua, non eventuali future interruzioni del servizio.
