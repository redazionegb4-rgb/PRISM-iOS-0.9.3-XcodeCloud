import UIKit
import WebKit
import AVFoundation

final class PrismViewController: UIViewController, WKScriptMessageHandlerWithReply, WKNavigationDelegate, AVAudioRecorderDelegate {
    private let account = LocalAccount()
    private var webView: WKWebView!
    private var recorder: AVAudioRecorder?
    private var voiceURL: URL?
    private var voiceTimer: Timer?
    private var recordingRequest = 0
    override var preferredStatusBarStyle: UIStatusBarStyle { .lightContent }
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.07, green: 0.06, blue: 0.09, alpha: 1)
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        let controller = configuration.userContentController
        controller.addScriptMessageHandler(self, contentWorld: .page, name: "prism")
        let initial = account.loggedIn ? "true" : "false"
        let bridge = """
        window.PrismIOS={call:(action,args={})=>window.webkit.messageHandlers.prism.postMessage({action,...args})};
        window.PrismAuth={isLoggedIn:()=>\(initial),logout:()=>PrismIOS.call('logout'),deleteAccount:()=>PrismIOS.call('delete')};
        window.PrismMedia={start:()=>PrismIOS.call('voiceStart'),stop:()=>PrismIOS.call('voiceStop'),cancel:()=>PrismIOS.call('voiceCancel')};
        """
        controller.addUserScript(WKUserScript(source: bridge, injectionTime: .atDocumentStart, forMainFrameOnly: true))
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
            webView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor)
        ])
        NotificationCenter.default.addObserver(self, selector: #selector(interrupted), name: UIScene.willDeactivateNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(interrupted), name: AVAudioSession.interruptionNotification, object: nil)
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else {
            showError("Interfaccia non trovata nel pacchetto.")
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }
    private func literal(_ value: String) -> String {
        let data = try! JSONSerialization.data(withJSONObject: [value])
        let text = String(data: data, encoding: .utf8)!
        return String(text.dropFirst().dropLast())
    }
    private func status(_ value: String) { webView.evaluateJavaScript("nativeVoiceStatus(\(literal(value)))", completionHandler: nil) }
    private func result(_ data: String = "", error: String = "") { webView.evaluateJavaScript("nativeVoiceResult(\(literal(data)),\(literal(error)))", completionHandler: nil) }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage, replyHandler: @escaping (Any?, String?) -> Void) {
        guard message.frameInfo.isMainFrame, message.frameInfo.request.url?.isFileURL == true,
              let body = message.body as? [String: Any], let action = body["action"] as? String else {
            replyHandler(nil, "Richiesta non valida")
            return
        }
        do {
            switch action {
            case "register": try account.register(email: body["email"] as? String ?? "", password: body["password"] as? String ?? "")
            case "login": try account.login(email: body["email"] as? String ?? "", password: body["password"] as? String ?? "")
            case "logout": try account.logout()
            case "delete": account.delete()
            case "voiceStart": requestRecording()
            case "voiceStop": finishRecording(send: true)
            case "voiceCancel": recordingRequest += 1; finishRecording(send: false)
            default: replyHandler(nil, "Azione non disponibile"); return
            }
            replyHandler(["ok": true], nil)
        } catch { replyHandler(["ok": false, "error": error.localizedDescription], nil) }
    }
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
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = navigationAction.request.url
        decisionHandler(url?.isFileURL == true || url?.scheme == "about" ? .allow : .cancel)
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { showError(error.localizedDescription) }
    private func showError(_ text: String) {
        let alert = UIAlertController(title: "PRISM", message: text, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    deinit { NotificationCenter.default.removeObserver(self); voiceTimer?.invalidate() }
    private enum RecorderError: Error { case failed }
}
