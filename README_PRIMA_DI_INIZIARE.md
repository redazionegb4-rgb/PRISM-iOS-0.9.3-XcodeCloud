# PRISM 0.11.4 — Android 28, iOS 18, backend 0.3.3

Aggiornare prima il backend, poi le app. Non eliminare database o configurazioni email esistenti.

## Backend OVH
Caricare PRISM-backend-0.3.3.zip in /home/ubuntu con WinSCP. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.3.zip prism-update-033
cd /home/ubuntu/prism-update-033/PRISM-backend-restore
sudo bash install.sh
```

L'installer conserva la configurazione SMTP e il database, crea un backup, aggiunge la tabella delle storie viste e avvia i controlli API in uno schema isolato. Le vecchie visualizzazioni mai salvate sul server non si possono recuperare: dopo questa versione saranno persistenti.

## Android
Installare PRISM-0.11.4.apk sopra la precedente. Stessa firma di sviluppo; per pubblicazione Play Store occorre la firma di produzione.

## iOS / Xcode Cloud / TestFlight
Estrarre PRISM-iOS-0.11.4-XcodeCloud.zip e aggiornare il repository già collegato a Xcode Cloud, includendo Web, file Swift, Config e ci_scripts. Versione 0.11.4, build 18. Avviare il workflow Archive e distribuzione TestFlight da Xcode Cloud/App Store Connect. Non serve esportare il progetto dal vecchio Mac. La compilazione iOS nativa e la prova su dispositivo devono essere completate tramite Cloud e TestFlight.

## Modifiche
- Email HTML con logo PRISM incorporato, codice ben visibile e versione testo semplice di compatibilità. Anche il recupero password usa la nuova grafica.
- Android: FLAG_SECURE per bloccare screenshot e cattura sui display non sicuri; menu foto e download disabilitati.
- iOS: contenuto nascosto durante registrazione/duplicazione schermo e in background; menu di salvataggio disabilitato; avviso dopo uno screenshot. Le API pubbliche iOS non garantiscono il blocco preventivo degli screenshot. Non viene promesso un divieto assoluto di copia.
- Storie: visione dal profilo e dalla home salvata sul server. Il cerchio resta spento alla riapertura, ma torna colorato quando ci sono nuove storie non viste.
- Modifica profilo: frecce sotto ogni foto per riordinare; la prima è la principale. Premere Salva per confermare. I campi compilati restano conservati durante il riordino.
- “Come appare”: senza foto personali mostra esclusivamente il segnaposto, mai immagini di altri utenti.

## Verifica su due telefoni
1. Richiedere un nuovo codice email e controllare grafica, codice e consegna.
2. Guardare una storia dal profilo, chiudere e riaprire l'app; verificare cerchio spento. Pubblicare una nuova storia dall'altro account: deve comparire il cerchio colorato.
3. Riordinare tre foto, salvare e riaprire; controllare anteprima e profilo dall'altro account. Ripetere senza foto personali.
4. Android: provare screenshot e registrazione. iPhone: provare registrazione, duplicazione e cambio app; dopo screenshot compare l'avviso, lo scatto non è garantito bloccato.
5. Verificare chat, invio foto, album e selezione di nuove foto dalla galleria dopo il cambio app.
