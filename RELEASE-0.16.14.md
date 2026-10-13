# Prism 0.16.14 — schede allineate e regole dei regali più chiare

## Correzione grafica
I miei album e Regali e premi condividono la stessa struttura, larghezza, spazi interni, dimensioni delle icone e allineamento di titolo, descrizione e freccia. Rimossa la cornice aggiuntiva attorno all’icona regalo. Corretto lo span degli album che creava una colonna implicita della griglia.

## Chiarimento sui regali
Il catalogo è uno solo: non esistono due tipi di rosa, corona o caffè. La precedente dicitura regali omaggio indicava quelli inviati con Extra assegnato gratuitamente/manuale o vinto, anziché con un abbonamento Extra acquistato. Ora la pagina parla di regali conteggiati o non conteggiati nel traguardo e spiega il motivo.
Non sono state cambiate le regole dei premi: solo gli invii da abbonamenti Extra acquistati maturano giorni Extra; gli altri si possono inviare e ricevere, ma non generano altri premi. Questo evita che l’Extra vinto generi ulteriori premi tramite regali. I dati e lo storico restano invariati.

## Contenuto e aggiornamento
- PRISM-0.16.14.apk: Android versionCode 105; stessa firma; installabile sulla precedente versione senza disinstallare. Codice nativo conservato, asset web aggiornati, APK rifirmato e verificato.
- PRISM-Android-0.16.14-source.zip: sorgenti completi Android.
- PRISM-iOS-0.16.14-source.zip: sorgenti completi iOS, versione 0.16.14/build locale 95. Xcode Cloud utilizza CI_BUILD_NUMBER. IPA non incluso.
- PRISM-backend-0.4.16.zip: lo stesso backend del pacchetto precedente, senza modifiche.

Se hai già installato il backend 0.4.16, devi aggiornare soltanto le app.
Android: installa il nuovo APK oppure genera la release store dai sorgenti.
iOS: aggiorna il repository Xcode Cloud con i sorgenti completi, inclusa PRISM/Web, e avvia Archive/TestFlight.

Solo se il server è ancora precedente a 0.4.16, carica il relativo ZIP sul VPS principale di api.prismdating.app ed esegui:

```bash
cd ~
unzip -o PRISM-backend-0.4.16.zip -d prism-live-0.4.16
cd ~/prism-live-0.4.16/PRISM-backend
sudo bash install.sh
```

## Verifiche
Test browser su entrambe le UI Android/iOS a 320, 390 e 430 px: stessa posizione e larghezza dei due box, stesse coordinate di icona, testo e freccia, nessuna eccedenza orizzontale. Verificati storico, paginazione, aggiornamento manuale, stato caricamento, premi e testo esplicativo. Firma APK verificata. Non effettuati test su telefoni fisici o compilazione iOS. Backend invariato rispetto alla release precedente.
