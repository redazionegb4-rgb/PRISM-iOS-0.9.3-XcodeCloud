import UIKit
import UserNotifications
import FirebaseCore
import FirebaseMessaging

@main
final class AppDelegate: UIResponder, UIApplicationDelegate, MessagingDelegate, UNUserNotificationCenterDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        Messaging.messaging().delegate = self
        UNUserNotificationCenter.current().delegate = self
        return true
    }
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) { Messaging.messaging().apnsToken = deviceToken }
    func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) { UserDefaults.standard.set(fcmToken,forKey:"prismPushToken") }
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) { completionHandler([]) }
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        let data=response.notification.request.content.userInfo
        var clean:[String:String]=[:]
        for key in ["kind","target","recipient","event"] { if let value=data[key] as? String { clean[key]=value } }
        UserDefaults.standard.set(clean,forKey:"prismPushPending")
        completionHandler()
    }

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let configuration = UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
        configuration.sceneClass = UIWindowScene.self
        configuration.delegateClass = PrismSceneDelegate.self
        return configuration
    }
}

// Kept in this existing target source so no .pbxproj changes are needed.
@objc(PrismSceneDelegate)
final class PrismSceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }
        let window = UIWindow(windowScene: windowScene)
        window.overrideUserInterfaceStyle = .dark
        window.backgroundColor = UIColor(red: 9.0/255, green: 11.0/255, blue: 14.0/255, alpha: 1)
        window.rootViewController = PrismViewController()
        self.window = window
        window.makeKeyAndVisible()
    }
}
