# PRISM 0.11.3 — social, chat e attività riconoscibili

Mantiene la grafica e le funzioni della versione completa precedente, la verifica email con codice e i salvataggi sul server.

## Aggiorna prima il server

Scarica PRISM-backend-0.3.2.zip e caricalo con WinSCP nella cartella `/home/ubuntu` della VPS. In PuTTY esegui:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.2.zip prism-update-032
cd /home/ubuntu/prism-update-032/PRISM-backend-restore
sudo bash install.sh
```

L'installer mantiene gli account, il database e la configurazione SMTP esistenti, crea un backup e include tutte le migrazioni precedenti. Il backend restituisce ora lo stato letto/non letto su ogni Tap ricevuto e visita, compresi quelli fuori dai primi venti avvisi. Non basta aggiornare solo le app: questa informazione richiede il nuovo backend.

L'ultima riga deve essere «Aggiornamento PRISM 0.3.2 completato e test isolato superato». Il server non è stato aggiornato da remoto. Il test SQL isolato dell'installer verifica anche gli stati Nuovo/letti e la conservazione degli eventi arrivati dopo l'ultimo elenco visualizzato, senza inviare email esterne o modificare i dati reali.

## Android

Installa PRISM-0.11.3.apk sopra la precedente versione. Package `app.prism.dating`, versionCode 27, stessa firma di sviluppo. Nel pacchetto Android-source ci sono i sorgenti completi e lo script di compilazione.

## iPhone / Xcode Cloud

Estrai PRISM-iOS-0.11.3-XcodeCloud.zip e aggiorna nel repository le cartelle PRISM, Config, ci_scripts e PRISM.xcodeproj mantenendo la struttura. Versione 0.11.3, build locale 17; CI_BUILD_NUMBER del workflow prevale e deve superare l'ultima build già caricata. Team B8SC92LPR5, bundle `app.prism.dating`.

Usa il workflow Archive/TestFlight già configurato. Non serve compilare o trasferire dal vecchio Mac. La compilazione e la prova nativa iPhone rimangono da eseguire tramite Xcode Cloud/TestFlight.

## Modifiche

- Social: righe compatte distanziate, icona su un piccolo fondo, nome della piattaforma e username distinti. La stessa grafica viene usata nel proprio profilo, nell'anteprima e nei profili degli altri. I nomi lunghi vanno a capo senza uscire dal riquadro.
- Chat: riquadri con bordo continuo e fondo uniforme, avatar, nome, anteprima e orario allineati. Il contatore dei messaggi non letti ha uno spazio dedicato. Lo swipe a sinistra per eliminare resta disponibile e non si richiude a causa di un aggiornamento in arrivo.
- Aggiornamento: suono breve dedicato dopo un aggiornamento manuale della griglia completato. Nessun suono di successo se la posizione o la connessione falliscono, né a ogni aggiornamento automatico.
- Avvisi: rimossi campanella, pagina Notifiche e banner aggiunti nella 0.11.2. Rimangono i suoni per nuove attività e i numeri sulle icone Tap/Chat e sulle conversazioni. I suoni si possono disattivare in Profilo → Privacy e profili bloccati → Suoni dell'app.
- Tap ricevuti e visite: etichetta «Nuovo», riga evidenziata e gruppi «Nuovi» / «Già visti». Ogni scheda mostra il proprio numero di nuove attività. Aprire la scheda non cancella immediatamente l'indicazione.
- Premi «Segna come letti» per togliere l'evidenziazione: lo stato viene salvato sul server e resta dopo una riapertura o l'accesso da un altro dispositivo. La lettura dei Tap non cancella le visite e viceversa. Se arrivano nuove attività dopo l'elenco che stavi leggendo, non vengono segnate come lette insieme alle precedenti.
- Tap inviati: evidenziato «Ultimo inviato», con data e orario e attesa prima del prossimo invio. Non vengono conteggiati come notifiche ricevute.
- Anche le visite riservate oltre le cinque del piano Free mostrano Nuovo/letto, distanza e orario, senza rivelare il profilo nascosto.

Le nuove attività vengono controllate ogni due secondi mentre l'app è aperta. Il suono web richiede almeno un tocco nell'app per abilitare l'audio. Restano invariati i fix dei salvataggi e della tastiera introdotti nella 0.11.2.

Non sono incluse le notifiche push con app chiusa, i badge sull'icona di sistema, gli acquisti Extra o il pannello admin.

## Controlli

25 test backend superati. Interfacce Android/iOS controllate nel browser con API simulate: social personali/pubblici, righe chat, swipe conservato, suono refresh solo in caso di successo, assenza campanella/banner, evidenziazioni Nuovo e azzeramento selettivo, oltre ai flussi precedenti per accesso, profili, storie, media e album. Controllate larghezze di 320, 390 e 430 px. Il test SQL completo viene eseguito dall'installer sulla VPS. APK firmato e verificato; iOS non compilato in questo ambiente.

Per la prova finale usa due account: invia un Tap e visita il primo profilo dal secondo. Sul primo telefono devono apparire i contatori; in Ricevuti/Visite devi distinguere le righe Nuovo e Già viste. Segna solo i Tap come letti e controlla che le visite restino nuove. Riapri l'app e verifica che la lettura sia conservata.
