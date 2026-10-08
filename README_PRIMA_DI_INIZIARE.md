# PRISM 0.11.2 — aggiornamenti immediati, chat iPhone e notifiche interne

Mantiene la grafica completa della 0.10.4 ripristinata nella 0.11.1 e la verifica email con codice di sei cifre.

## Aggiorna prima il server

Con WinSCP carica PRISM-backend-0.3.1.zip in /home/ubuntu della VPS. Poi esegui in PuTTY:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.3.1.zip prism-update-031
cd /home/ubuntu/prism-update-031/PRISM-backend-restore
sudo bash install.sh
```

L'installer mantiene database e configurazioni email esistenti, salva un backup e aggiunge le tabelle dei contatori letti. Include un test SQL isolato su codici email, media, notifiche, lettura selettiva, nuovi eventi dopo la lettura e blocchi. L'ultima riga deve essere «Aggiornamento PRISM 0.3.1 completato e test isolato superato». Il server non è stato aggiornato da remoto.

## Android

Installa PRISM-0.11.2.apk sopra la versione precedente: stesso package e stessa firma di sviluppo, versionCode 26. I sorgenti completi sono nel pacchetto Android-source.

## iPhone / Xcode Cloud

Estrai il pacchetto iOS e aggiorna nel repository le cartelle PRISM, Config, ci_scripts e PRISM.xcodeproj. Versione 0.11.2, build locale 16; CI_BUILD_NUMBER del workflow prevale e deve superare l'ultima build caricata. Mantieni il workflow Archive/TestFlight già usato: non occorre trasferire direttamente dal vecchio Mac. Team B8SC92LPR5, bundle app.prism.dating. La compilazione e la prova con tastiera reale richiedono Xcode Cloud/TestFlight.

## Modifiche

- Preferiti: la stellina e i conteggi cambiano subito; il salvataggio è sul server. In caso di errore lo stato viene ripristinato e compare un messaggio. Le richieste già in corso non sovrascrivono un'azione nuova. Il caricamento iniziale ripristina tutti i preferiti anche oltre il raggio vicino.
- Album: dopo la conferma del server la raccolta, la disponibilità Free e il conteggio nel proprio profilo si aggiornano senza riaprire la pagina. I pulsanti di salvataggio vengono disabilitati durante l'invio e le vecchie risposte non sovrascrivono il nuovo album.
- Chat iPhone: campi ad almeno 16 px per impedire lo zoom automatico durante la scrittura; chat dimensionata all'area effettivamente visibile sopra la tastiera. L'invio di testo mantiene lo stesso campo invece di ricreare tutta la schermata.
- Avvisi interni: banner per nuovi messaggi, Tap e visite, centro Notifiche con orari, contatori numerici sulle icone Tap/Chat e sulle conversazioni non lette. Il pulsante Notifiche è disponibile su Vicino a te, Chat e Il mio profilo. L'icona Tap somma Tap ricevuti e visite non letti.
- La lettura dei Tap ricevuti azzera solo il contatore Tap; la pagina Visite azzera solo le visite; una conversazione aperta azzera solo i messaggi effettivamente caricati di quella chat. I punti di lettura sono salvati sul server, anche dopo chiusura o accesso da un altro dispositivo. L'eliminazione di chat e i blocchi escludono la relativa attività dai conteggi.
- Suono breve per nuova attività con app aperta, dopo il primo tocco necessario ad abilitare l'audio. Disattivabile dal centro Notifiche. All'accesso le attività precedenti vengono contate senza riprodurre tutti i suoni arretrati.
- Le modifiche effettuate sul telefono aggiornano subito le schermate; le attività degli altri vengono controllate ogni due secondi mentre l'app è in primo piano. Bozze, pagina profilo aperta e campo messaggio vengono conservati.

Questi sono avvisi dentro l'app. Le notifiche push con app chiusa, il badge sull'icona di sistema iOS/Android, gli acquisti Extra e il pannello admin non sono inclusi in questo aggiornamento.

## Verifiche e prova

25 test backend superati. Controllate entrambe le interfacce con API simulate: preferiti immediati e ripristino dopo errore, conteggio album, dimensioni del campo messaggio, banner, contatori e azzeramento selettivo; confermati i flussi precedenti per email, profili, storie, messaggi e album. APK firmato e verificato. Il test completo SQL viene eseguito dall'installer sulla VPS; la build nativa iOS non è stata compilata in questo ambiente.

Dopo l'aggiornamento del server, prova con due account verificati: dal secondo invia un Tap, visita il primo profilo e scrivi un messaggio. Sul primo telefono, lasciato su Vicino a te, devono apparire banner, suono e contatori. Apri Ricevuti, Visite e poi la chat: ogni contatore deve azzerarsi separatamente. Su iPhone prova anche l'apertura e la chiusura della tastiera, mantenendo visibili campo e pulsante Invio.
