# Prism 0.16.5 — centratura icone e popup foto compatto

Android 0.16.5 codice 96; iOS 0.16.5 build 86. Backend richiesto: 0.4.8 già fornito, senza nuovo aggiornamento server.

- Android: P rialzata di 4 unità rispetto alla 0.16.4; mantenuta la correzione orizzontale e lo sfondo arrotondato.
- iOS: aggiornate tutte le dimensioni dell'icona applicazione usando le stesse forme vettoriali della P, con allineamento orizzontale corretto. Immagini RGB senza trasparenza e dimensioni corrispondenti al catalogo Xcode.
- Foto rifiutata: avviso compatto centrato sul telefono, titolo breve, miniatura da 112 px, motivo e due pulsanti. Larghezza massima 330 px; nei test a 390×844 l'avviso misura circa 276×384 px ed è centrato su entrambi gli assi. Il motivo lungo ha una propria area di scorrimento. Restano Elimina dal profilo e Più tardi, con lo stesso comportamento della 0.16.4.

## Android

Installa Prism-0.16.5.apk sopra la versione attuale senza disinstallare. Firma identica verificata. Il progetto Android completo è in Prism-Android-source-0.16.5.zip.

## iOS

Estrai Prism-iOS-0.16.5-XcodeCloud.zip. Aggiorna il repository utilizzato da Xcode Cloud con il contenuto di PRISM-iOS e avvia archivio/distribuzione TestFlight: versione 0.16.5, build 86. Sono cambiate anche le icone iOS, non solo il codice del popup.

## Verifiche

Verificati firma/versione dell'APK, risorsa vettoriale Android e conservazione delle altre classi native. Verificate tutte le dimensioni e il formato RGB delle icone iOS. Sintassi JavaScript e asset condivisi Android/iOS. Test browser: popup centrato e compatto, avviso approvazione singolo, rinvio fino alla riapertura, rimozione della foto rifiutata mantenendo l'altra foto. Restano le prove del precedente pannello admin. Nessuna compilazione iOS o prova del launcher sui telefoni è stata eseguita qui.
