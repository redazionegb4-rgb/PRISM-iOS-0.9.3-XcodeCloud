# PRISM iOS 0.9.3 — progetto per Xcode Cloud e TestFlight

Apri PRISM.xcodeproj. Schema condiviso: PRISM. Solo iPhone, iOS 16 o superiore. Codice Swift 5, nessun CocoaPods, SPM o pacchetto esterno da scaricare. Interfaccia della versione Android 0.9.3 con wrapper WKWebView, account locale nel Portachiavi e registrazione vocale nativa AVAudioRecorder.

## Il tuo Mac vecchio
La compilazione e la firma finale devono essere eseguite da Xcode Cloud usando un Xcode recente. Non devi compilare sul Mac o trasferire la build usando il suo vecchio Organizer. Il percorso principale è Archive in Xcode Cloud → App Store Connect → post-action TestFlight → iPhone.

Il primo collegamento di una nuova app/repository a Xcode Cloud può richiedere l'onboarding in una versione di Xcode supportata. Il file ZIP non può sostituire quel collegamento. Dopo l'onboarding, workflow e build si possono gestire su App Store Connect dal browser. Un workflow di ATX Player non va sovrascritto con PRISM: sono due app con bundle ID e schemi diversi.

## Prima di caricare i file
1. In Config/App.xcconfig inserisci il tuo DEVELOPMENT_TEAM (Team ID Apple di 10 caratteri).
2. Il bundle predefinito è app.prism.dating. Registralo nel tuo account Apple o sostituiscilo con un identificativo disponibile. Lo stesso identificativo deve essere scelto nel record app su App Store Connect.
3. Crea il record app PRISM in App Store Connect, piattaforma iOS, bundle ID corrispondente e SKU a tua scelta.
4. Metti tutti i file dello ZIP in un repository Git dedicato a PRISM, con PRISM.xcodeproj, PRISM e ci_scripts alla radice. Non mettere una cartella extra sopra al progetto senza adeguare il percorso nel workflow.
5. Conserva il permesso eseguibile degli script. Da Terminale nella cartella del progetto: `git add .` e `git update-index --chmod=+x ci_scripts/ci_post_clone.sh ci_scripts/ci_post_xcodebuild.sh export_ipa.sh`, poi commit e push. Il Mac vecchio può gestire i file/Git; non serve compilare.

## Workflow Xcode Cloud
- Progetto: PRISM.xcodeproj; schema: PRISM.
- Ambiente: ultima versione stabile di Xcode disponibile nel tuo account Cloud e macOS corrispondente.
- Azione: Archive, piattaforma iOS, configurazione Release, dispositivo generico iOS.
- Preparazione distribuzione: TestFlight/App Store Connect (o equivalente etichetta della UI Apple).
- Firma automatica col tuo Team Apple.
- Post-action: TestFlight Internal Testing, scegli un gruppo interno già creato su App Store Connect. Per il primo test personale usa un gruppo interno a cui appartieni.
- Puoi fornire PRISM_TEAM_ID e PRISM_BUNDLE_ID come variabili del workflow al posto di modificare Config/App.xcconfig. Lo script post-clone imposta il numero build dal CI_BUILD_NUMBER.
- Non serve una chiave API .p8 per questo percorso gestito da Apple.

Una volta completata l'elaborazione della build su App Store Connect, assegnala al gruppo se non lo fa la post-action, compila le informazioni richieste e installala dall'app TestFlight sull'iPhone. I tester esterni hanno un processo beta review separato.

## Se vuoi comunque scaricare un IPA
Scarica l'artefatto App Store Connect firmato dalla build Cloud quando disponibile. Se hai soltanto un .xcarchive, lo script export_ipa.sh può esportarlo usando Xcode recente, Team e firma validi; non rende compatibile il vecchio Xcode e non firma senza account Apple. Non serve per il percorso TestFlight diretto. Non usare un IPA da simulatore o firmato Ad Hoc per il caricamento App Store Connect.

## Cosa è incluso e cosa no
Incluse le funzioni locali sviluppate su Android: profili, anteprima e gallerie a schermo intero, album personali e condivisione temporanea, storie, reazioni, Tap, chat, voce, privacy/blocchi, social, filtri e raggio dimostrativo. Non si trasferiscono i dati locali già salvati su Android. Foto/scadenze sono meccanismi dimostrativi locali, non protezione da screenshot.

Non è presente un server: non ci sono persone reali, distanza GPS, account remoti o consegna di messaggi tra dispositivi. L'accesso demo resta disponibile. Il Portachiavi conserva l'account locale; può sopravvivere a una disinstallazione, usa Elimina account nell'app se vuoi rimuoverlo.

## Verifica e limiti
Questo pacchetto è un progetto sorgente, non un IPA compilato o firmato. In questo ambiente non è disponibile Xcode/macOS: non è stata eseguita una build iOS. Sono stati controllati struttura del progetto/schema, plist, risorse, asset icona, script e JavaScript. La prima build Xcode Cloud deve confermare compilazione, firma e funzionamento su iPhone, in particolare foto, microfono, tastiera, gesti e audio. Non si garantisce approvazione Apple.

Fonti Apple:
- https://developer.apple.com/documentation/xcode/configuring-your-first-xcode-cloud-workflow
- https://developer.apple.com/documentation/xcode/distributing-your-xcode-cloud-builds-through-testflight
- https://developer.apple.com/documentation/xcode/environment-variable-reference
