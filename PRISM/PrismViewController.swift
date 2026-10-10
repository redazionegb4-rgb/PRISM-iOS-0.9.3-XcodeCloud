import UIKit
import WebKit
import Security
import CoreLocation
import AVFoundation
import UserNotifications
import FirebaseMessaging
import StoreKit

final class PrismViewController: UIViewController, WKScriptMessageHandlerWithReply, WKNavigationDelegate, WKUIDelegate, CLLocationManagerDelegate, URLSessionTaskDelegate, AVAudioRecorderDelegate {
    private var purchaseObserver: Task<Void,Never>?
    private var storeBusy = false
    private var storeRequestID: UUID?
    private let privacyShield = UIView()
    private let protectionLabel = UILabel()
    private var inBackground = false
    private var livePermissionBusy = false
    private var standardBottom: NSLayoutConstraint!
    private var liveBottom: NSLayoutConstraint!
    private var webView: WKWebView!
    private var recorder: AVAudioRecorder?
    private var voiceURL: URL?
    private var voiceTimer: Timer?
    private var recordingRequest = 0
    private let locationManager = CLLocationManager()
    private var locationReply: ((Any?, String?) -> Void)?
    private var locationGeneration = 0
    private var locationStarted = false
    private var webRoot = ""
    private lazy var session: URLSession = {
        let configuration = URLSessionConfiguration.ephemeral
        configuration.timeoutIntervalForRequest = 20
        configuration.timeoutIntervalForResource = 30
        return URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
    }()
    override var preferredStatusBarStyle: UIStatusBarStyle { .lightContent }
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.067, green: 0.063, blue: 0.086, alpha: 1)
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.applicationNameForUserAgent = "PRISM/0.13.3 (+https://prismdating.app)"
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        configuration.userContentController.addScriptMessageHandler(self, contentWorld: .page, name: "prism")
        configuration.userContentController.addUserScript(WKUserScript(source: "window.PrismMedia={start:()=>window.webkit.messageHandlers.prism.postMessage({action:'voiceStart'}),stop:()=>window.webkit.messageHandlers.prism.postMessage({action:'voiceStop'}),cancel:()=>window.webkit.messageHandlers.prism.postMessage({action:'voiceCancel'})};window.PrismIOS={call:(action,args={})=>window.webkit.messageHandlers.prism.postMessage({action,...args})};", injectionTime: .atDocumentStart, forMainFrameOnly: true))
        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.allowsLinkPreview = false
        webView.isOpaque = false
        webView.backgroundColor = view.backgroundColor
        webView.scrollView.backgroundColor = view.backgroundColor
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        standardBottom = webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        liveBottom = webView.bottomAnchor.constraint(equalTo: view.keyboardLayoutGuide.topAnchor)
        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            standardBottom
        ])
        purchaseObserver = Task { [weak self] in
            for await update in StoreKit.Transaction.updates {
                guard let self = self, case .verified(let transaction) = update,
                      transaction.productID == "app.prism.dating.extra.monthly", self.savedToken() != nil else { continue }
                if (try? await self.verifyStoreTransaction(transaction)) != nil {
                    await transaction.finish()
                    await MainActor.run { self.webView.evaluateJavaScript("window.prismResume&&window.prismResume()",completionHandler:nil) }
                }
            }
        }
        locationManager.delegate = self
        privacyShield.backgroundColor = view.backgroundColor
        privacyShield.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(privacyShield)
        NSLayoutConstraint.activate([privacyShield.leadingAnchor.constraint(equalTo: view.leadingAnchor),privacyShield.trailingAnchor.constraint(equalTo: view.trailingAnchor),privacyShield.topAnchor.constraint(equalTo: view.topAnchor),privacyShield.bottomAnchor.constraint(equalTo: view.bottomAnchor)])
        let label = protectionLabel
        label.text = "PRISM\n\nContenuti protetti\nInterrompi la registrazione o la duplicazione dello schermo per continuare."
        label.textColor = .white
        label.font = .systemFont(ofSize: 20, weight: .medium)
        label.numberOfLines = 0
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        privacyShield.addSubview(label)
        NSLayoutConstraint.activate([label.leadingAnchor.constraint(equalTo: privacyShield.leadingAnchor,constant: 28),label.trailingAnchor.constraint(equalTo: privacyShield.trailingAnchor,constant: -28),label.centerYAnchor.constraint(equalTo: privacyShield.centerYAnchor)])
        privacyShield.isHidden = true
        NotificationCenter.default.addObserver(self, selector: #selector(updateProtection), name: UIScreen.capturedDidChangeNotification, object: nil)
        locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardFrame127(_:)), name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardFrame127(_:)), name: UIResponder.keyboardDidChangeFrameNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(interrupted), name: AVAudioSession.interruptionNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(pause), name: UIScene.willDeactivateNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(callBackground153), name: UIScene.didEnterBackgroundNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(resume), name: UIScene.didActivateNotification, object: nil)
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else { return }
        webRoot = url.deletingLastPathComponent().path + "/"
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        if webView?.url?.path == "/static/live/index.html" {
            webView.evaluateJavaScript("window.prismLiveViewport140&&window.prismLiveViewport140(\(webView.bounds.height))",completionHandler:nil)
        }
    }
    private func liveLayout(_ enabled: Bool) {
        standardBottom.isActive = false; liveBottom.isActive = false
        if enabled { liveBottom.isActive = true } else { standardBottom.isActive = true }
        view.layoutIfNeeded()
    }
    @objc private func keyboardFrame127(_ notification: Notification) {
        if webView.url?.path == "/static/live/index.html" { return }
        guard let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
        let local = webView.convert(frame, from: nil)
        let intersection = webView.bounds.intersection(local)
        let overlap = intersection.isNull ? 0 : intersection.height
        let height = max(0, webView.bounds.height - overlap)
        webView.evaluateJavaScript("window.prismKeyboardChanged127&&window.prismKeyboardChanged127(\(height),\(overlap > 0 ? "true" : "false"))", completionHandler: nil)
    }
    private func tokenQuery() -> [String: Any] {
        [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: "app.prism.dating.online", kSecAttrAccount as String: "session"]
    }
    private func savedToken() -> String? {
        var query = tokenQuery()
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess, let data = result as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }
    private func storeToken(_ token: String) throws {
        let data = Data(token.utf8)
        let query = tokenQuery()
        let update = SecItemUpdate(query as CFDictionary, [kSecValueData as String: data] as CFDictionary)
        if update == errSecSuccess { return }
        guard update == errSecItemNotFound else { throw SessionError.storage }
        var item = query
        item[kSecValueData as String] = data
        item[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        guard SecItemAdd(item as CFDictionary, nil) == errSecSuccess else { throw SessionError.storage }
    }
    private func clearToken() { SecItemDelete(tokenQuery() as CFDictionary); UserDefaults.standard.removeObject(forKey:"prismPushPending"); UNUserNotificationCenter.current().removeAllDeliveredNotifications(); UNUserNotificationCenter.current().setBadgeCount(0) }
    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage, replyHandler: @escaping (Any?, String?) -> Void) {
        guard message.frameInfo.isMainFrame, let origin = message.frameInfo.request.url,
              ((origin.isFileURL && origin.path.hasPrefix(webRoot)) || (origin.scheme == "https" && origin.host == "api.prismdating.app" && origin.path == "/static/live/index.html")), let body = message.body as? [String: Any], let action = body["action"] as? String else { replyHandler(nil, "Richiesta non valida"); return }
        switch action {
        case "liveOpen", "callOpen":
            guard let room = body["room"] as? String, UUID(uuidString:room) != nil, let url = URL(string:"https://api.prismdating.app/static/live/index.html?room=\(room)") else { replyHandler(["status":422,"data":["detail":"Diretta non valida"]],nil); return }
            replyHandler(["status":200,"data":[:]],nil)
            DispatchQueue.main.asyncAfter(deadline:.now()+0.1) { self.liveLayout(true); self.webView.load(URLRequest(url: action == "callOpen" ? URL(string:url.absoluteString+"&kind=call")! : url)) }
        case "liveClose":
            replyHandler(["status":200,"data":[:]],nil)
            DispatchQueue.main.asyncAfter(deadline:.now()+0.1) { self.liveLayout(false); if let url = Bundle.main.url(forResource:"index",withExtension:"html",subdirectory:"Web") { self.webView.loadFileURL(url,allowingReadAccessTo:url.deletingLastPathComponent()) } }
        case "pushInfo": pushInfo(replyHandler)
        case "pushEnable":
            UNUserNotificationCenter.current().requestAuthorization(options:[.alert,.sound,.badge]) { [weak self] granted,_ in
                DispatchQueue.main.async { if granted { UIApplication.shared.registerForRemoteNotifications() }; self?.pushInfo(replyHandler) }
            }
        case "pushConsumed": UserDefaults.standard.removeObject(forKey:"prismPushPending"); replyHandler(["status":200,"data":[:]],nil)
        case "billing": storeAction(body,reply:replyHandler)
        case "api": api(body, reply: replyHandler)
        case "voiceStart": requestRecording(); replyHandler(["ok": true], nil)
        case "voiceStop": finishRecording(send: true); replyHandler(["ok": true], nil)
        case "voiceCancel": recordingRequest += 1; finishRecording(send: false); replyHandler(["ok": true], nil)
        case "locate":
            guard locationReply == nil else { replyHandler(["status": 0, "data": ["detail": "Posizione già in aggiornamento"]], nil); return }
            locationReply = replyHandler; locationGeneration += 1; locationStarted = false
            let generation = locationGeneration
            DispatchQueue.main.asyncAfter(deadline: .now() + 20) { [weak self] in
                guard let self = self, self.locationGeneration == generation, self.locationReply != nil else { return }
                self.finishLocation(error: "Posizione non disponibile. Riprova vicino a una finestra.")
            }
            if locationManager.authorizationStatus == .notDetermined { locationManager.requestWhenInUseAuthorization() } else { startLocation() }
        case "openLocation":
            guard let latitude = body["latitude"] as? Double, let longitude = body["longitude"] as? Double,
                  latitude.isFinite, longitude.isFinite, abs(latitude) <= 90, abs(longitude) <= 180,
                  let url = URL(string: "https://maps.apple.com/?ll=\(latitude),\(longitude)&q=Posizione") else {
                replyHandler(["status":422,"data":["detail":"Posizione non valida"]],nil); return
            }
            UIApplication.shared.open(url) { success in replyHandler(["status":success ? 200 : 0,"data":[:]],nil) }
        case "settings":
            if let url = URL(string: UIApplication.openSettingsURLString) { UIApplication.shared.open(url) }
            replyHandler(["ok": true], nil)
        default: replyHandler(nil, "Azione non disponibile")
        }
    }
    private func api(_ body: [String: Any], reply: @escaping (Any?, String?) -> Void) {
        if UIScreen.main.isCaptured, let path = body["path"] as? String, path.hasPrefix("/v1/messages/"), path.hasSuffix("/open") {
            reply(["status":403,"data":["detail":"Interrompi la registrazione dello schermo per aprire il contenuto."]],nil); return
        }
        guard let path = body["path"] as? String, path.range(of: "^/(health|v1/[A-Za-z0-9_/?=&.\\-]+)$", options: .regularExpression) != nil,
              let method = body["method"] as? String, ["GET", "POST", "PUT", "DELETE"].contains(method),
              let url = URL(string: "https://api.prismdating.app" + path) else { reply(nil, "Richiesta non valida"); return }
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        let publicAuth = path.hasPrefix("/v1/auth/") && path != "/v1/auth/logout"
        if !publicAuth, let token = savedToken() { request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization") }
        if let content = body["body"] as? String, !content.isEmpty {
            guard content.utf8.count <= 4194304 else { reply(nil, "Richiesta troppo grande"); return }
            request.httpBody = Data(content.utf8)
        }
        session.dataTask(with: request) { [weak self] data, response, error in
            DispatchQueue.main.async {
                guard let self = self else { reply(nil, "Operazione annullata"); return }
                guard error == nil, let http = response as? HTTPURLResponse, let data = data, data.count <= 67108864 else { reply(["status": 0, "data": ["detail": "Connessione non disponibile. Controlla la rete e riprova."]], nil); return }
                var payload = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] ?? [:]
                if http.statusCode == 200 && path == "/v1/notifications", let counts = payload["counts"] as? [String:Any] {
                    let total = ["message","tap","visit"].reduce(0) { $0 + max(0,(counts[$1] as? NSNumber)?.intValue ?? 0) }
                    UNUserNotificationCenter.current().setBadgeCount(total)
                    if total == 0 { UNUserNotificationCenter.current().removeAllDeliveredNotifications() }
                }
                if http.statusCode == 200 && path == "/v1/auth/login" {
                    guard let token = payload["access_token"] as? String else { reply(nil, "Sessione non disponibile"); return }
                    do { try self.storeToken(token) } catch { reply(nil, "Impossibile salvare la sessione sul telefono"); return }
                    payload.removeValue(forKey: "access_token")
                }
                if (http.statusCode == 401 && !publicAuth) || (http.statusCode == 204 && (path == "/v1/auth/logout" || (path == "/v1/me" && method == "DELETE"))) { self.clearToken() }
                reply(["status": http.statusCode, "data": payload], nil)
            }
        }.resume()
    }
    private func pushInfo(_ reply: @escaping (Any?,String?) -> Void) {
        let defaults=UserDefaults.standard
        if defaults.string(forKey:"prismPushID")==nil { defaults.set(UUID().uuidString,forKey:"prismPushID") }
        UNUserNotificationCenter.current().getNotificationSettings { settings in
            DispatchQueue.main.async {
                let enabled=settings.authorizationStatus == .authorized || settings.authorizationStatus == .provisional
                if enabled { UIApplication.shared.registerForRemoteNotifications() }
                var data:[String:Any]=["id":defaults.string(forKey:"prismPushID")!,"platform":"ios","token":defaults.string(forKey:"prismPushToken") ?? "","enabled":enabled]
                if let pending=defaults.dictionary(forKey:"prismPushPending") { data["pending"]=pending }
                reply(["status":200,"data":data],nil)
            }
        }
    }
    func urlSession(_ session: URLSession, task: URLSessionTask, willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest, completionHandler: @escaping (URLRequest?) -> Void) { completionHandler(nil) }
    private func startLocation() {
        guard locationReply != nil else { return }
        switch locationManager.authorizationStatus {
        case .authorizedAlways, .authorizedWhenInUse:
            if !locationStarted { locationStarted = true; locationManager.requestLocation() }
        case .denied, .restricted: finishLocation(error: "Posizione non autorizzata. Abilitala nelle impostazioni iPhone.")
        default: break
        }
    }
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) { startLocation() }
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let point = locations.last, point.horizontalAccuracy >= 0, point.horizontalAccuracy <= 2000, abs(point.timestamp.timeIntervalSinceNow) < 120 else { finishLocation(error: "Posizione poco precisa. Riprova."); return }
        let reply = locationReply; locationReply = nil
        reply?(["status": 200, "data": ["latitude": point.coordinate.latitude, "longitude": point.coordinate.longitude]], nil)
    }
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) { finishLocation(error: "Posizione non disponibile. Controlla le impostazioni e riprova.") }
    private func finishLocation(error: String) {
        locationManager.stopUpdatingLocation()
        let reply = locationReply; locationReply = nil
        reply?(["status": 0, "data": ["detail": error]], nil)
    }
    @objc private func pause() { if livePermissionBusy { return }; inBackground = true; updateProtection(); if recorder != nil { finishRecording(send: false); result(error: "Registrazione annullata in background.") }; webView.evaluateJavaScript("window.prismForeground=false", completionHandler: nil) }
    @objc private func callBackground153() { webView.evaluateJavaScript("window.prismLivePause&&window.prismLivePause()",completionHandler:nil) }
    @objc private func resume() { inBackground = false; updateProtection(); webView.evaluateJavaScript("window.prismForeground=true;window.prismResume&&window.prismResume()", completionHandler: nil) }
    override func viewDidAppear(_ animated: Bool) { super.viewDidAppear(animated); updateProtection() }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) { updateProtection() }
    @objc private func updateProtection() {
        let captured = (view.window?.windowScene?.screen ?? UIScreen.main).isCaptured
        protectionLabel.text = captured ? "PRISM\n\nContenuti protetti\nInterrompi la registrazione o la duplicazione dello schermo per continuare." : "PRISM"
        privacyShield.isHidden = !inBackground && !captured
        webView.isHidden = inBackground || captured
        webView.evaluateJavaScript("window.prismCaptureChanged&&window.prismCaptureChanged(\(captured ? "true" : "false"))",completionHandler:nil)
    }
    func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin, initiatedByFrame frame: WKFrameInfo, type: WKMediaCaptureType, decisionHandler: @escaping (WKPermissionDecision) -> Void) {
        guard origin.protocol == "https", origin.host == "api.prismdating.app", frame.isMainFrame, webView.url?.path == "/static/live/index.html" else { decisionHandler(.deny); return }
        livePermissionBusy = true
        let devices: [AVMediaType] = type == .camera ? [.video] : type == .microphone ? [.audio] : [.video, .audio]
        func authorize(_ index: Int, _ allowed: Bool) {
            if index == devices.count {
                DispatchQueue.main.async {
                    self.livePermissionBusy = false
                    let active = self.webView.url?.path == "/static/live/index.html" && !self.inBackground
                    decisionHandler(allowed && active ? .grant : .deny)
                }
                return
            }
            let device = devices[index]
            switch AVCaptureDevice.authorizationStatus(for: device) {
            case .authorized: authorize(index+1, allowed)
            case .notDetermined: AVCaptureDevice.requestAccess(for: device) { ok in authorize(index+1, allowed && ok) }
            default: authorize(index+1, false)
            }
        }
        authorize(0, true)
    }
    func webView(_ webView: WKWebView, contextMenuConfigurationFor elementInfo: WKContextMenuElementInfo, completionHandler: @escaping (UIContextMenuConfiguration?) -> Void) { completionHandler(nil) }
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = action.request.url
        let local = url?.isFileURL == true && url?.path.hasPrefix(webRoot) == true
        let live = url?.scheme == "https" && url?.host == "api.prismdating.app" && url?.path == "/static/live/index.html"
        decisionHandler(local || live ? .allow : .cancel)
    }
    private func literal(_ value: String) -> String {
        let data = try! JSONSerialization.data(withJSONObject: [value])
        let text = String(data: data, encoding: .utf8)!
        return String(text.dropFirst().dropLast())
    }
    private func status(_ value: String) { webView.evaluateJavaScript("nativeVoiceStatus(\(literal(value)))", completionHandler: nil) }
    private func result(_ data: String = "", error: String = "") { webView.evaluateJavaScript("nativeVoiceResult(\(literal(data)),\(literal(error)))", completionHandler: nil) }
    private func requestRecording() {
        guard recorder == nil else { return }
        recordingRequest += 1
        let request = recordingRequest
        status("pending")
        AVAudioSession.sharedInstance().requestRecordPermission { [weak self] allowed in
            DispatchQueue.main.async {
                guard let self = self, self.recordingRequest == request else { return }
                guard allowed else { self.status("idle"); self.result(error: "Microfono non autorizzato. Abilitalo nelle impostazioni iPhone."); return }
                self.beginRecording()
            }
        }
    }
    private func beginRecording() {
        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker])
            try session.setActive(true)
            let url = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString).appendingPathExtension("m4a")
            voiceURL = url
            let recorder = try AVAudioRecorder(url: url, settings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 22050.0, AVNumberOfChannelsKey: 1, AVEncoderBitRateKey: 32000])
            recorder.delegate = self
            recorder.prepareToRecord()
            guard recorder.record() else { throw RecorderError.failed }
            self.recorder = recorder
            status("recording")
            voiceTimer = Timer.scheduledTimer(withTimeInterval: 60, repeats: false) { [weak self] _ in self?.finishRecording(send: true) }
        } catch { finishRecording(send: false); result(error: "Impossibile avviare la registrazione.") }
    }
    private func finishRecording(send: Bool) {
        voiceTimer?.invalidate(); voiceTimer = nil
        let duration = recorder?.currentTime ?? 0
        recorder?.stop(); recorder = nil
        status("idle")
        let url = voiceURL; voiceURL = nil
        defer {
            if let url = url { try? FileManager.default.removeItem(at: url) }
            try? AVAudioSession.sharedInstance().setCategory(.playback)
            try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
        }
        if send {
            guard duration > 0.2, let url = url, let data = try? Data(contentsOf: url) else { result(error: "Registrazione troppo breve: riprova."); return }
            result("data:audio/mp4;base64," + data.base64EncodedString())
        }
    }
    @objc private func interrupted() {
        if recorder != nil { finishRecording(send: false); result(error: "Registrazione annullata durante l’interruzione.") }
    }
    func audioRecorderEncodeErrorDidOccur(_ recorder: AVAudioRecorder, error: Error?) { finishRecording(send: false); result(error: "Errore nella registrazione.") }
    private enum RecorderError: Error { case failed }
    private func verifyStoreTransaction(_ transaction: StoreKit.Transaction) async throws -> [String:Any] {
        guard let token = savedToken() else { throw StoreFailure.message("Accedi prima di ripristinare gli acquisti.") }
        var request = URLRequest(url:URL(string:"https://api.prismdating.app/v1/me/purchase")!)
        request.httpMethod = "POST"
        request.setValue("application/json",forHTTPHeaderField:"Content-Type")
        request.setValue("Bearer " + token,forHTTPHeaderField:"Authorization")
        request.httpBody = try JSONSerialization.data(withJSONObject:["store":"apple","reference":String(transaction.originalID)])
        let (data,response) = try await session.data(for:request)
        let value = (try? JSONSerialization.jsonObject(with:data)) as? [String:Any] ?? [:]
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw StoreFailure.message(value["detail"] as? String ?? "Verifica non riuscita. Usa Ripristina acquisti.") }
        return value
    }
    private enum StoreFailure: Error { case message(String) }
    private func storeAction(_ body:[String:Any],reply:@escaping(Any?,String?)->Void) {
        if body["operation"] as? String == "manage" {
            UIApplication.shared.open(URL(string:"https://apps.apple.com/account/subscriptions")!)
            reply(["status":200,"data":[:]],nil); return
        }
        guard !storeBusy, savedToken() != nil else { reply(["status":0,"data":["detail":"Accedi oppure attendi la richiesta allo store in corso."]],nil); return }
        let action = body["operation"] as? String ?? "info"
        guard ["info","buy","restore"].contains(action) else { reply(nil,"Azione non valida"); return }
        storeBusy = true
        let requestID = UUID()
        storeRequestID = requestID
        var replied = false
        let finish: (Any?,String?) -> Void = { value,error in
            guard !replied else { return }
            replied = true
            reply(value,error)
        }
        if action == "info" {
            Task { @MainActor [weak self] in
                try? await Task.sleep(nanoseconds:25_000_000_000)
                guard let self = self, !replied, self.storeRequestID == requestID else { return }
                self.storeBusy = false
                self.storeRequestID = nil
                finish(["status":0,"data":["detail":"Apple non ha risposto in tempo. Tocca Riprova caricamento."]],nil)
            }
        }
        Task { @MainActor [weak self] in
            guard let self = self else { finish(nil,"Operazione annullata"); return }
            defer { if self.storeRequestID == requestID { self.storeBusy = false; self.storeRequestID = nil } }
            do {
                if action == "restore" {
                    try await AppStore.sync()
                    var restored = 0
                    for await result in StoreKit.Transaction.currentEntitlements {
                        guard case .verified(let transaction) = result, transaction.productID == "app.prism.dating.extra.monthly" else { continue }
                        _ = try await self.verifyStoreTransaction(transaction)
                        await transaction.finish(); restored += 1
                    }
                    finish(["status":200,"data":["restored":restored]],nil); return
                }
                var products = try await Product.products(for:["app.prism.dating.extra.monthly"])
                if action == "info" && products.isEmpty && !replied {
                    try await Task.sleep(nanoseconds:1_000_000_000)
                    products = try await Product.products(for:["app.prism.dating.extra.monthly"])
                }
                guard !replied else { return }
                guard let product = products.first else {
                    let storefront = await Storefront.current
                    finish(["status":0,"data":[
                        "detail":"Apple non restituisce il prodotto PRISM EXTRA. Controlla l’ID prodotto, il prezzo, la localizzazione e la disponibilità in App Store Connect.",
                        "diagnostics":[
                            "product_id":"app.prism.dating.extra.monthly",
                            "bundle_id":Bundle.main.bundleIdentifier ?? "Non disponibile",
                            "version":Bundle.main.object(forInfoDictionaryKey:"CFBundleShortVersionString") as? String ?? "Non disponibile",
                            "build":Bundle.main.object(forInfoDictionaryKey:"CFBundleVersion") as? String ?? "Non disponibile",
                            "storefront":storefront?.countryCode ?? "Non disponibile",
                            "products_found":0
                        ]
                    ]],nil)
                    return
                }
                guard let period = product.subscription?.subscriptionPeriod, period.unit == .month, period.value == 1 else { throw StoreFailure.message("Il piano mensile non è disponibile.") }
                if action == "info" { finish(["status":200,"data":["price":product.displayPrice]],nil); return }
                guard let account = body["user_id"] as? String, let uid = UUID(uuidString:account) else { throw StoreFailure.message("Account PRISM non disponibile. Accedi di nuovo.") }
                let result = try await product.purchase(options:[.appAccountToken(uid)])
                switch result {
                case .success(let verification):
                    guard case .verified(let transaction) = verification else { throw StoreFailure.message("Acquisto non verificato da Apple.") }
                    let entitlement = try await self.verifyStoreTransaction(transaction)
                    await transaction.finish()
                    finish(["status":200,"data":["entitlement":entitlement]],nil)
                case .userCancelled:finish(["status":200,"data":["cancelled":true]],nil)
                case .pending:finish(["status":200,"data":["pending":true]],nil)
                @unknown default:throw StoreFailure.message("Acquisto non completato.")
                }
            } catch StoreFailure.message(let message) { finish(["status":0,"data":["detail":message]],nil)
            } catch { finish(["status":0,"data":["detail":"Store temporaneamente non disponibile. Riprova o ripristina gli acquisti."]],nil) }
        }
    }
    deinit { purchaseObserver?.cancel(); voiceTimer?.invalidate(); recorder?.stop(); if let url = voiceURL { try? FileManager.default.removeItem(at: url) }; NotificationCenter.default.removeObserver(self); session.invalidateAndCancel() }
    private enum SessionError: Error { case storage }
}
