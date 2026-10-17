# Prism: badge profilo

Inclusi Verificato, Pioniere ed Extra. Il moderatore delle live resta quello esistente.

- **Verificato**: assegnabile solo dal titolare admin, dopo aver confermato una verifica reale dell’identità e il metodo usato (videochiamata, di persona o documento). Approvare una foto o verificare un’email non assegna questo badge. Non è stato aggiunto un servizio automatico di riconoscimento o raccolta documenti.
- **Pioniere**: automatico per gli account con email confermata, registrati prima della data impostata da «App lanciata» nel pannello. Finché il lancio non è impostato, gli iscritti verificati fanno parte dell’anteprima. Il titolare può assegnare o revocare il badge manualmente.
- **Extra**: calcolato dal piano effettivo, inclusi Extra manuale, abbonamento store e premi attivi. Scade con il piano e rispetta le disabilitazioni. Assegnare il badge non concede vantaggi né attiva un abbonamento.

I badge sono visibili sui profili, nell’anteprima personale e nella griglia. Toccandoli si apre una spiegazione. In **Il tuo spazio → Modifica profilo → I tuoi badge** l’utente può nascondere Extra; l’opzione viene salvata subito senza modificare il piano.

Nel pannello web e nell’app admin: **Badge** per elenco, ricerca e filtro; **Utenti → scheda utente** per assegnare, revocare o modificare la visibilità. Per i badge manuali è disponibile una durata in giorni; 0 significa nessuna scadenza aggiuntiva. Il limite del piano Extra rimane sempre vincolante. Le operazioni sono registrate nel registro attività. Le revoche prevalgono sui badge automatici finché non viene assegnato nuovamente il badge.

## Ordine di aggiornamento

1. **Backend 0.4.20**, che contiene anche il pannello web.
2. **Prism 0.17.0** per gli utenti.
3. **Prism Admin 2.1.0** per la gestione dal telefono.

Sono pacchetti da installare: questa consegna non ha modificato il server di produzione né pubblicato build sugli store.

## Server VPS

Carica `PRISM-backend-0.4.20.zip` sul VPS, ad esempio in `/root`, poi esegui:

```bash
cd /root
unzip -o PRISM-backend-0.4.20.zip -d prism-badges-0.4.20
cd /root/prism-badges-0.4.20/PRISM-backend
sudo bash install.sh
```

L’installer conserva il backup previsto dal progetto, applica lo schema aggiornato e riavvia il servizio. Utilizza la configurazione database/SMTP già esistente. Non eseguire installer di pacchetti backend precedenti dopo questo aggiornamento.

## Android

Installa `Prism-0.17.0.apk` e `PrismAdmin-2.1.0.apk` come aggiornamenti delle rispettive app. Sono state mantenute le firme originali: gli account e le sessioni restano quelli esistenti.

## iPhone / Xcode Cloud

Estrai i progetti iOS delle due app e aggiorna i rispettivi repository privati collegati ai workflow già configurati. Mantieni tutte le cartelle e i file del progetto, compreso il workspace condiviso e Package.resolved dell’admin. Esegui i workflow separati per Prism e PrismAdmin, poi installa le nuove versioni da TestFlight.

Versioni locali: Prism 0.17.0 build 102; PrismAdmin 2.1.0 build 11. I workflow Xcode Cloud con numerazione automatica useranno il proprio progressivo. Non sono inclusi IPA firmati: la compilazione e la prova iOS richiedono Xcode Cloud/TestFlight.

## Controllo dopo l’installazione

Apri un profilo dopo il backend aggiornato; verifica Pioniere per un iscritto di anteprima con email confermata. Da admin assegna Verificato dopo un controllo reale, poi riapri il profilo nell’app. Con un piano Extra attivo nascondi il relativo badge e controlla l’anteprima. Prova una revoca e una scadenza su un account di test. Il badge moderatore delle live non viene gestito da questa sezione.
