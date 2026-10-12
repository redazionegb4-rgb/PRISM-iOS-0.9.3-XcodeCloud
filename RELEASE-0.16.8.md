# Prism 0.16.8 — menu nascosto nella conversazione

Android versione 0.16.8 codice 99; iOS versione 0.16.8 build 89. Backend 0.4.8 invariato.

La barra di navigazione scompare quando è aperta una conversazione. La chat utilizza tutta l'altezza disponibile fino al box per scrivere, compreso il ricalcolo con viewport ridotto. Il menu ricompare uscendo dalla conversazione. La lista delle chat, Esplora, profili e le altre pagine mantengono il menu. Il modulo di avvio Live conserva lo scorrimento e lo spazio riservato alla barra.

Restano tutte le modifiche della 0.16.7: rimozione delle tre scorciatoie da Il tuo spazio, icone Privacy e blocchi, correzione del modulo Live; incluso il popup foto rifiutata compatto della 0.16.6.

## Android

Installa Prism-0.16.8.apk sopra la versione attuale. Firma identica verificata, senza disinstallazione. Il sorgente completo è in Prism-Android-source-0.16.8.zip.

## iOS

Estrai Prism-iOS-0.16.8-XcodeCloud.zip e aggiorna il repository utilizzato da Xcode Cloud con il contenuto di PRISM-iOS. Avvia archivio/TestFlight: versione 0.16.8, build 89.

Non serve aggiornare nuovamente il backend o il sito.

## Verifiche

Prove browser sui file di Android e iOS a 390×844 e 320×568 pixel: menu nascosto soltanto nella conversazione, box di scrittura entro l'intera altezza visibile, viewport ridotto a 400 pixel, menu nuovamente visibile nel modulo Live e pulsante Vai in diretta raggiungibile tramite scroll. Controllate anche rimozione delle voci e icone privacy. API di prova simulate. Le prove del viewport simulano lo spazio della tastiera: tastiera nativa e build iOS vanno confermate sui telefoni/Xcode Cloud. Verificati integrità/firma APK e corrispondenza degli asset con i sorgenti.
