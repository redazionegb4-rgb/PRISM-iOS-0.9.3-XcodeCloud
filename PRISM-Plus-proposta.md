# PRISM Extra — specifica aggiornata

## Piani

| Funzione | Free | Extra |
| --- | --- | --- |
| Foto visualizzabili una sola volta | 2 invii al giorno | Invii illimitati |
| Conferme di lettura | Non disponibili | Incluse con il servizio online |
| Raggio utenti e storie | Fino a 5 km | Fino a 50 km |
| Album personali | 1 album | 2 album |
| Foto per album | Massimo 6 | Massimo 6 |
| Visite al profilo | 5 profili più recenti visibili | Tutti i profili visibili |

I raggi di 5 e 50 km sono una scelta iniziale modificabile. Prezzo iniziale proposto: 5,99 € al mese. Nessun prodotto a pagamento è stato configurato.

## Album e ritorno al Free

Il secondo album non viene eliminato alla scadenza di Extra: resta salvato con tutte le foto, ma viene nascosto e non può essere modificato o condiviso dal piano Free. Quando si torna a Extra, viene mostrato nuovamente. Un identificatore di slot mantiene questa distinzione anche se si elimina il primo album e si crea un nuovo album Free. Le copie degli album già inviate nelle chat mantengono la propria modalità di visualizzazione e scadenza: il cambio piano non cancella retroattivamente un invio.

I due album preesistenti vengono associati agli slot primo e secondo senza perdere foto o nomi.

## Quota delle foto una sola volta

Il contatore vale per tutti i destinatari e si rinnova a mezzanotte secondo l’orario del dispositivo nella demo. Sono contati solo gli invii salvati con successo; una selezione, un annullamento o un errore non consuma quota. Eliminare una chat o bloccare un profilo non restituisce gli invii utilizzati. Gli invii fatti durante Extra sono registrati: tornando al Free nello stesso giorno, se sono già due o più non sono disponibili nuovi invii gratuiti. Le foto normali e gli album temporanei non consumano questa quota.

In produzione il contatore va applicato dal server, con una zona oraria di riferimento definita per account e senza affidarsi all’orologio modificabile del dispositivo.

## Cosa è disponibile nella versione 0.10.1

- Header aggiornato: logo P, nome PRISM senza numero versione e filtri compatti.
- Pagina di confronto Free/Extra nel profilo, con una modalità di prova chiaramente indicata.
- Quota foto singola apertura, limiti album, conservazione/nascondimento del secondo album e raggio di ricerca applicati nella demo locale.
- Nessun acquisto, addebito o rinnovo. La selezione Free/Extra è un test locale, non un abbonamento.
- Le conferme di lettura sono previste per Extra, ma non operative: la demo non comunica con destinatari reali. Non vengono generate conferme di lettura finte. I messaggi restano indicati come salvati sul dispositivo.

## Collegamento del pagamento e del servizio online

Servono account reali, backend, prodotti configurati negli store e verifica degli acquisti. Si propone StoreKit su iOS e Google Play Billing su Android, con prezzo letto dallo store, ripristino acquisti e gestione rinnovi/scadenze/rimborsi. La modalità di prova locale va rimossa dalla distribuzione pubblica e sostituita con lo stato del piano verificato dal servizio. I diritti a pagamento non devono essere decisi dal localStorage.

Le conferme di lettura devono arrivare da un evento reale del destinatario autenticato e venire mostrate al mittente avente Extra; un semplice salvataggio o l’apertura locale del messaggio non costituiscono una lettura del destinatario.

Fonti ufficiali:
- [Apple In-App Purchase](https://developer.apple.com/in-app-purchase/)
- [Google Play Billing](https://developer.android.com/google/play/billing)


## Interfaccia 0.10.2 e attività

Nuovo pulsante Extra nella barra inferiore, avvisi centrali dei limiti che mantengono la schermata aperta, miniature del profilo separate dalla foto grande e barra iOS con margine inferiore corretto.

Tap e visite hanno sezioni Ricevuti, Inviati e Visite. Ogni attività disponibile mostra giorno e orario; per Tap precedenti senza timestamp si legge “Orario non disponibile”, senza inventare una data. Nella demo le visite possono essere caricate solo con un comando esplicitamente dimostrativo. Non sono visite reali di altri utenti.

Nel Free sono visibili i cinque visitatori unici più recenti, dopo avere escluso i profili bloccati. Gli altri hanno foto sfocata e nome riservato, ma distanza e orario sempre leggibili. Le schede riservate aprono l’avviso Extra e non il profilo. Con Extra tutti i visitatori sono visibili. Bloccare un profilo rimuove anche la sua attività. In produzione dati, orari e visibilità devono essere forniti e verificati dal server.


## Correzione 0.10.3
La tua anteprima delle foto/album inviati non consuma la singola apertura e non avvia il timer. Solo i contenuti ricevuti (direction=incoming) usano la visualizzazione unica. I dati eliminati dalle versioni precedenti non sono recuperabili. Diamante neutro nel Free e ambra in Extra. Prezzo mostrato come proposta, senza acquisti attivi; in produzione il prezzo viene letto dallo store.
