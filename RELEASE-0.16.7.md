# Prism 0.16.7 — chat, Il tuo spazio, privacy e avvio Live

Android versione 0.16.7 codice 98; iOS versione 0.16.7 build 88. Backend 0.4.8 invariato.

La chat misura lo spazio disponibile sopra la barra di navigazione, conservando il menu visibile. Il box per scrivere non si sovrappone al menu. Ricalcolo al cambiamento del viewport, del menu e del focus; la chat conserva un'area messaggi scorrevole indipendente.

Da Il tuo spazio sono rimosse le scorciatoie Crea una storia, Preferiti e Le mie storie. Queste funzioni restano disponibili dai rispettivi accessi di Esplora; non sono eliminati dati o storie.

Privacy e blocchi: aggiunte icone accanto alle preferenze di notifiche e suoni, alle voci di visibilità e ai titoli delle sezioni. Restano gli stessi controlli e salvataggi.

Avvio Live: pagina dimensionata sopra il menu, intestazione separata e modulo scorrevole. Il pulsante Vai in diretta resta raggiungibile scorrendo fino al fondo e non viene coperto dal menu.

## Installazione

Android: installa Prism-0.16.7.apk sopra la versione attuale senza disinstallare. La firma è identica e verificata. Il progetto completo è in Prism-Android-source-0.16.7.zip.

iOS: estrai Prism-iOS-0.16.7-XcodeCloud.zip, aggiorna il repository usato da Xcode Cloud con il contenuto di PRISM-iOS e avvia archivio/TestFlight. Versione 0.16.7, build 88.

Nessun nuovo aggiornamento del sito, pannello admin o backend: mantieni il backend 0.4.8. Le correzioni delle icone e del popup foto rifiutata della versione precedente sono incluse.

## Verifiche

Prove browser caricando i file reali di Android e iOS: rimozione delle tre voci del profilo, icone presenti nelle righe privacy, barra di menu visibile, compositore della chat sopra la barra, riduzione del viewport a 400 px, modulo Live scorrevole e pulsante di avvio interamente sopra il menu. Viewport 390×844 e 320×568 per entrambe le piattaforme. La riduzione del viewport simula la tastiera: la tastiera nativa va verificata sui telefoni. API di prova simulate; non sono avviate chiamate o live reali. APK verificato per versione, firma e corrispondenza degli asset con i sorgenti. Nessuna compilazione iOS effettuata qui.
