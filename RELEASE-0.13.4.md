# PRISM 0.13.4 — Storie fotografiche e didascalie

Android 0.13.4, codice 57. iOS 0.13.4, build 48. Backend 0.3.22, schema 15.

## Novità

Le storie fotografiche mostrano la foto senza sfondo colorato: eventuali spazi intorno alla foto sono neri, senza ritagliare l’immagine. Puoi aggiungere una didascalia sotto la foto, separata dall’immagine. Il testo sovrapposto resta facoltativo: puoi pubblicare solo la foto, foto e didascalia, foto e testo oppure entrambi. Le storie di solo testo conservano gli sfondi colorati. La didascalia viene salvata e inclusa nelle anteprime delle risposte e reazioni in chat. Le storie precedenti restano compatibili.

## 1. Aggiorna prima il backend

Carica PRISM-backend-0.3.22.zip con WinSCP in /home/ubuntu sul VPS principale 141.94.224.242. In PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.22.zip prism-update-0322
cd /home/ubuntu/prism-update-0322/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.3.22. Il backend deve essere aggiornato prima di pubblicare didascalie dalle nuove app. L’installer conserva dati e configurazione e crea il backup. Nessun aggiornamento del server video o del sito è necessario.

## 2. Android

Installa PRISM-0.13.4.apk sopra la versione precedente. Firma identica, senza disinstallare. PRISM-Android-source-0.13.4.zip contiene il progetto completo.

## 3. iOS / Xcode Cloud

PRISM-iOS-0.13.4-XcodeCloud.zip contiene il progetto completo. Aggiorna il repository usato da Xcode Cloud, poi avvia archivio e distribuzione TestFlight. Versione 0.13.4, build locale 48; il workflow può usare il proprio numero progressivo di build. Mantieni la distribuzione diretta da Xcode Cloud a TestFlight, senza esportazione sul vecchio Mac.

## 4. Prova finale sui telefoni

Con due account, pubblica una foto senza testo; pubblica una foto con didascalia e nessun testo sovrapposto; prova anche didascalia e testo insieme. Guarda le storie dall’altro account, rispondi e invia una reazione: la chat deve contenere l’anteprima della foto e la didascalia. Chiudi e riapri l’app e verifica che la didascalia sia ancora presente. Controlla anche una storia di solo testo e una storia pubblicata con la versione precedente.

## Verifiche e limiti

80 test backend passati. Prove browser degli asset Android e iOS: pubblicazione, didascalia separata, testo facoltativo, sfondo nero, storie precedenti, anteprime in chat, escaping del testo e layout a 320/390/430 pixel. APK aggiornato conservando la parte nativa della versione precedente e sostituendo asset web e versione; allineamento ZIP e firma verificati. Il codice nativo non è stato modificato. La compilazione iOS avviene su Xcode Cloud; VPS e telefoni reali non sono accessibili da questo ambiente, quindi installazione e prova finale sono da eseguire con questi file.
