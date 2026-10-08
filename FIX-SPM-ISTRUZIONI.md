# PRISM iOS 0.11.5 — FIX dipendenze Xcode Cloud

L'archivio precedente si fermava perché manca Package.resolved e Xcode Cloud disabilita la risoluzione automatica delle dipendenze durante Archive.

## Cosa fare
1. Estrarre PRISM-iOS-0.11.5-XcodeCloud-FIX-SPM.zip.
2. Aggiornare il repository collegato a Xcode Cloud usando i file dentro PRISM-iOS: mantenere PRISM.xcodeproj, Config, PRISM e ci_scripts alla stessa radice. Non creare una seconda cartella PRISM-iOS dentro il progetto esistente.
3. Includere nel commit soprattutto ci_scripts/ci_post_clone.sh e PRISM.xcodeproj/project.pbxproj. Le altre cartelle sono incluse per fornire il progetto completo.
4. Eseguire il commit e avviare una nuova build sul nuovo commit. Ricreare solo la build vecchia senza aggiornare il repository riprodurrebbe l'errore.
5. Nel log post-clone deve comparire: Package.resolved pronto; avvio archivio con dipendenze fissate. La prima risoluzione può richiedere qualche minuto.

Firebase è fissato alla versione 11.15.0. Lo script esegue esplicitamente xcodebuild -resolvePackageDependencies prima dell'archivio, usando opzioni valide solo per quel processo; controlla che il file di lock generato contenga Firebase. La compilazione Archive successiva mantiene il controllo delle versioni risolte. La versione app rimane 0.11.5; Xcode Cloud assegna il proprio nuovo numero di build.

Non occorre aggiornare nuovamente Android o il backend. Configurazione Firebase, Push Notifications e chiave APNs restano quelle già impostate.

## Verifica eseguita
Sintassi shell e test dello script con xcodebuild simulato: percorso progetto e scheme corretti, creazione e validazione del lock, numero build Cloud e interruzione se manca il lock. Non è stata eseguita una compilazione Xcode nativa in questo ambiente: la verifica definitiva deve avvenire con la nuova build Cloud.
