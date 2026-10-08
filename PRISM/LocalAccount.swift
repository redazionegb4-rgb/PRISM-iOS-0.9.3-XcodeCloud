import Foundation
import Security
import CommonCrypto

final class LocalAccount {
    private let service = "PRISM.LocalAccount"
    private var query: [String: Any] { [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service, kSecAttrAccount as String: "local-user"] }
    private func read() -> [String: Any]? {
        var q = query
        q[kSecReturnData as String] = true
        q[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: CFTypeRef?
        guard SecItemCopyMatching(q as CFDictionary, &result) == errSecSuccess, let data = result as? Data else { return nil }
        return (try? JSONSerialization.jsonObject(with: data)) as? [String: Any]
    }
    private func store(_ record: [String: Any]) throws {
        let data = try JSONSerialization.data(withJSONObject: record)
        var q = query
        let update = SecItemUpdate(q as CFDictionary, [kSecValueData as String: data] as CFDictionary)
        if update == errSecItemNotFound {
            q[kSecValueData as String] = data
            q[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
            guard SecItemAdd(q as CFDictionary, nil) == errSecSuccess else { throw AccountError.storage }
        } else if update != errSecSuccess { throw AccountError.storage }
    }
    private func derive(_ password: String, salt: Data) throws -> Data {
        let bytes = Array(password.utf8)
        var output = [UInt8](repeating: 0, count: 32)
        let code: Int32 = bytes.withUnsafeBytes { passwordBytes in
            salt.withUnsafeBytes { saltBytes in
                CCKeyDerivationPBKDF(CCPBKDFAlgorithm(kCCPBKDF2), passwordBytes.baseAddress!.assumingMemoryBound(to: Int8.self), bytes.count, saltBytes.baseAddress!.assumingMemoryBound(to: UInt8.self), salt.count, CCPseudoRandomAlgorithm(kCCPRFHmacAlgSHA256), 120_000, &output, 32)
            }
        }
        guard code == kCCSuccess else { throw AccountError.storage }
        return Data(output)
    }
    var loggedIn: Bool { read()?["session"] as? Bool ?? false }
    func register(email: String, password: String) throws {
        guard read() == nil else { throw AccountError.exists }
        guard email.contains("@"), password.count >= 8, password.count <= 128 else { throw AccountError.invalid }
        var salt = [UInt8](repeating: 0, count: 16)
        guard SecRandomCopyBytes(kSecRandomDefault, salt.count, &salt) == errSecSuccess else { throw AccountError.storage }
        let hash = try derive(password, salt: Data(salt))
        try store(["email": email, "salt": Data(salt).base64EncodedString(), "hash": hash.base64EncodedString(), "session": true])
    }
    func login(email: String, password: String) throws {
        guard var record = read(), record["email"] as? String == email,
              let saltString = record["salt"] as? String, let hashString = record["hash"] as? String,
              let salt = Data(base64Encoded: saltString), let expected = Data(base64Encoded: hashString),
              !password.isEmpty else { throw AccountError.invalid }
        let supplied = try derive(password, salt: salt)
        guard supplied.count == expected.count else { throw AccountError.invalid }
        let difference = zip(supplied, expected).reduce(UInt8(0)) { $0 | ($1.0 ^ $1.1) }
        guard difference == 0 else { throw AccountError.invalid }
        record["session"] = true
        try store(record)
    }
    func logout() throws { if var record = read() { record["session"] = false; try store(record) } }
    func delete() { SecItemDelete(query as CFDictionary) }
    enum AccountError: LocalizedError {
        case exists, invalid, storage
        var errorDescription: String? {
            switch self {
            case .exists: return "Un account esiste già su questo iPhone. Accedi con quello."
            case .invalid: return "Email o password errata. Registrati prima se non hai un account locale."
            case .storage: return "Impossibile salvare l’account locale."
            }
        }
    }
}
