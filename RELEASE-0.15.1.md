# PRISM 0.15.1 — note brevi e reazioni corrette

Android 0.15.1/codice 89. Progetto iOS 0.15.1/build locale 80. Backend 0.4.1/schema 24. Installa prima il backend, poi le app.

## Note e disponibilità

In Esplora tocca **Libero adesso / Nota**. Il popup contiene due scelte:

- **Libero adesso:** scegli l'attività e la durata di 1, 3 o 6 ore. Puoi aggiungere una nota facoltativa.
- **Solo una nota:** scrivi un pensiero di massimo 60 caratteri. Resta visibile per 24 ore, senza dichiararti disponibile.

Puoi modificare o rimuovere lo stato riaprendo lo stesso pulsante. Pubblicarne uno nuovo sostituisce il precedente e riavvia la durata. La nota compare come fumetto sulla card del profilo e nel profilo completo. La nota associata alla disponibilità scade insieme allo stato; le note sole sono escluse da Solo disponibili. Gli stati si spengono anche quando l'app è chiusa. Emoji e testo vengono mostrati come testo semplice.

## Reazioni

Il selettore si chiude prima della richiesta al server: l'attesa della rete non blocca la chat. Gli aggiornamenti usano una firma dei dati invece di confrontare continuamente l'HTML, evitando riscritture ripetute. Ripristinata la possibilità di scorrere e usare i pulsanti dopo una reazione.

Una reazione al messaggio di un'altra persona crea un avviso, il conteggio non letto nella chat e la notifica push. Una reazione identica reinviata non crea notifiche duplicate. Reagire a un proprio messaggio o rimuovere una reazione non avvisa l'altra persona. La lettura avviene quando la chat è aperta in primo piano. Le impostazioni Messaggi e Anteprima, i permessi del telefono e la configurazione push esistente restano rispettati. Toccando la notifica si apre la chat.

## Aggiornamento backend

Carica PRISM-backend-0.4.1.zip in /home/ubuntu sulla VPS principale, poi:

```bash
cd /home/ubuntu
python3 -m zipfile -e PRISM-backend-0.4.1.zip prism-backend-041
cd /home/ubuntu/prism-backend-041/PRISM-backend
sudo bash install.sh
curl --fail --silent https://api.prismdating.app/health
```

Health deve indicare 0.4.1. L'installer salva un backup, conserva i dati e applica lo schema. Il test PostgreSQL isolato include le nuove note, il filtro e la lettura degli avvisi di reazione. Non reinstallare il server LiveKit. Il pacchetto include anche tutte le funzioni della 0.4.0: puoi aggiornare direttamente dalle versioni precedenti.

## App

- Installa PRISM-0.15.1.apk sopra la versione precedente, senza disinstallare. Firma identica; aggiornati asset e versione conservando il codice nativo precedente.
- PRISM-Android-source-0.15.1.zip contiene i sorgenti completi.
- Per iOS aggiorna il repository Xcode Cloud con PRISM-iOS-0.15.1-XcodeCloud.zip e avvia archivio/distribuzione TestFlight. È un progetto completo, non un IPA. File Swift e dipendenze native invariati.

## Prova finale e verifiche

Con due account prova la nota sola, disponibilità con nota, modifica e rimozione. Reagisci a un messaggio ricevuto, scorri la conversazione e scrivi un nuovo messaggio; verifica l'avviso sul telefono dell'autore. Prova anche con l'app del destinatario in background e con le notifiche autorizzate.

185 test backend superati. Browser con API simulate a 320/390/430 px: note, cambio modalità, limite/durata, reazioni, scorrimento di chat lunga dopo la reazione, assenza di riscritture continue, bozze, ricerca, pin e interesse reciproco. Verificati JavaScript/CSS, asset identici Android/iOS, firma/versione APK e ZIP.

Nessuna installazione remota o invio push reale eseguito. PostgreSQL reale viene collaudato dall'installer sulla VPS; iOS deve essere compilato tramite Xcode Cloud. La consegna push e la correzione sui telefoni reali restano da confermare con le prove sopra.
