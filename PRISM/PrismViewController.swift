import UIKit
import WebKit
import Security
import CoreLocation

final class PrismViewController: UIViewController, WKScriptMessageHandlerWithReply, WKNavigationDelegate, CLLocationManagerDelegate, URLSessionTaskDelegate {
    private var webView: WKWebView!
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
        configuration.userContentController.addScriptMessageHandler(self, contentWorld: .page, name: "prism")
        configuration.userContentController.addUserScript(WKUserScript(source: "window.PrismIOS={call:(action,args={})=>window.webkit.messageHandlers.prism.postMessage({action,...args})};", injectionTime: .atDocumentStart, forMainFrameOnly: true))
        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.isOpaque = false
        webView.backgroundColor = view.backgroundColor
        webView.scrollView.backgroundColor = view.backgroundColor
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        NotificationCenter.default.addObserver(self, selector: #selector(pause), name: UIScene.willDeactivateNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(resume), name: UIScene.didActivateNotification, object: nil)
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else { return }
        webRoot = url.deletingLastPathComponent().path + "/"
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
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
    private func clearToken() { SecItemDelete(tokenQuery() as CFDictionary) }
    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage, replyHandler: @escaping (Any?, String?) -> Void) {
        guard message.frameInfo.isMainFrame, let origin = message.frameInfo.request.url,
              origin.isFileURL, origin.path.hasPrefix(webRoot), let body = message.body as? [String: Any], let action = body["action"] as? String else { replyHandler(nil, "Richiesta non valida"); return }
        switch action {
        case "api": api(body, reply: replyHandler)
        case "locate":
            guard locationReply == nil else { replyHandler(["status": 0, "data": ["detail": "Posizione già in aggiornamento"]], nil); return }
            locationReply = replyHandler; locationGeneration += 1; locationStarted = false
            let generation = locationGeneration
            DispatchQueue.main.asyncAfter(deadline: .now() + 20) { [weak self] in
                guard let self = self, self.locationGeneration == generation, self.locationReply != nil else { return }
                self.finishLocation(error: "Posizione non disponibile. Riprova vicino a una finestra.")
            }
            if locationManager.authorizationStatus == .notDetermined { locationManager.requestWhenInUseAuthorization() } else { startLocation() }
        case "settings":
            if let url = URL(string: UIApplication.openSettingsURLString) { UIApplication.shared.open(url) }
            replyHandler(["ok": true], nil)
        default: replyHandler(nil, "Azione non disponibile")
        }
    }
    private func api(_ body: [String: Any], reply: @escaping (Any?, String?) -> Void) {
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
            guard content.utf8.count <= 65536 else { reply(nil, "Richiesta troppo grande"); return }
            request.httpBody = Data(content.utf8)
        }
        session.dataTask(with: request) { [weak self] data, response, error in
            DispatchQueue.main.async {
                guard let self = self else { reply(nil, "Operazione annullata"); return }
                guard error == nil, let http = response as? HTTPURLResponse, let data = data, data.count <= 2097152 else { reply(["status": 0, "data": ["detail": "Connessione non disponibile. Controlla la rete e riprova."]], nil); return }
                var payload = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] ?? [:]
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
    @objc private func pause() { webView.evaluateJavaScript("window.prismForeground=false", completionHandler: nil) }
    @objc private func resume() { webView.evaluateJavaScript("window.prismForeground=true;window.prismResume&&window.prismResume()", completionHandler: nil) }
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = action.request.url
        decisionHandler(url?.isFileURL == true && url?.path.hasPrefix(webRoot) == true ? .allow : .cancel)
    }
    deinit { NotificationCenter.default.removeObserver(self); session.invalidateAndCancel() }
    private enum SessionError: Error { case storage }
}
