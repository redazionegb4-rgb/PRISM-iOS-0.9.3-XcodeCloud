# PRISM iOS 0.11.6 — FIX2 Package.resolved incluso

La correzione precedente tentava di generare il lockfile nello script, ma Xcode Cloud bloccava anche quel comando. Questo pacchetto include direttamente Package.resolved e lo script si limita a verificarlo. Non esegue più xcodebuild -resolvePackageDependencies.

## Aggiornamento
1. Estrarre PRISM-iOS-0.11.6-XcodeCloud-FIX2-LOCKFILE.zip.
2. Caricare i file dentro PRISM-iOS alla radice del repository già collegato. PRISM.xcodeproj, Config, ci_scripts e PRISM devono restare affiancati.
3. Verificare che GitHub mostri il NUOVO file: PRISM.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved. La cartella contiene ora il file JSON delle versioni: deve essere presente nel commit, non solo sul PC.
4. Aggiornare anche ci_scripts/ci_post_clone.sh e PRISM.xcodeproj/project.pbxproj. Usare il progetto completo evita di dimenticare i file Firebase introdotti in 0.11.6.
5. Eseguire il commit e avviare una nuova build sul nuovo commit. Non ricreare la build collegata al commit vecchio.
6. Il post-clone deve riportare: Package.resolved incluso e verificato. Pronto per Archive.

Android, backend, certificati e chiave APNs non richiedono modifiche. Versione app 0.11.6; il numero build viene aggiornato da Xcode Cloud.

## Verifica
14 versioni delle dipendenze fissate nel lockfile; commit dei tag verificati nei repository ufficiali, vincoli dei manifest controllati. Script testato per presenza del lockfile, versione Firebase 11.15.0, numero build Cloud e interruzione chiara se il file viene omesso. Archivio ZIP controllato. La compilazione nativa finale deve essere verificata su Xcode Cloud; non è stata eseguita in questo ambiente.
