# Prism 0.16.6 — popup foto rifiutata con dimensioni vincolate

Android versione 0.16.6 codice 97; iOS versione 0.16.6 build 87. Backend 0.4.8 invariato.

Il popup applica ora dimensioni direttamente ai propri elementi, con precedenza sugli stili condivisi. Foto da 64×64 pixel, popup largo massimo 320 pixel, motivo su massimo tre righe, pulsanti da 42 pixel con testo centrato. Se lo schermo è molto basso la miniatura passa a 48 pixel. L'immagine originale, anche molto grande, non determina più le dimensioni dell'avviso. Per motivi molto lunghi il testo nel riquadro è abbreviato; la motivazione completa rimane nei dati di verifica foto del profilo.

Nuovi nomi degli asset della funzione per evitare di usare i vecchi file del popup. Restano approvazione/rifiuto, Più tardi e rimozione della sola foto rifiutata. Le icone mantengono la correzione della 0.16.5.

## Android

Installa Prism-0.16.6.apk sopra la versione attuale. Non disinstallare: firma identica verificata. Il sorgente completo è in Prism-Android-source-0.16.6.zip.

## iOS

Estrai Prism-iOS-0.16.6-XcodeCloud.zip, aggiorna il repository utilizzato da Xcode Cloud con il contenuto di PRISM-iOS e avvia archivio e TestFlight. Versione 0.16.6, build 87.

Non serve aggiornare nuovamente il backend: resta necessario lo 0.4.8 già fornito. Non ci sono modifiche al pannello admin, al sito o alla posizione delle icone in questa versione.

## Verifiche

Prova browser caricando tutti gli stili dell'app e una foto originale di 4000×6000 pixel: miniatura sempre 64×64, popup 320×349 pixel a schermo 390×844, senza scroll del riquadro e centrato sui due assi. Verifiche a larghezze 320, 390 e 430 pixel. Avviso approvazione singolo, rinvio fino al ritorno in primo piano ed eliminazione mantenendo l'altra foto. Confermate firma/versione APK, corrispondenza asset con sorgente e parità dei nuovi asset Android/iOS. Non è stata compilata la versione iOS né effettuata una prova fisica su Android/iPhone in questo ambiente.
