export type WalletProviderId = "maiar_app" | "maiar_extension" | "hardware" | "web" | "empty";

export type WalletServiceConfig = {
    GatewayAddress: string
    WebWalletUrl: string
    WalletConnectBridge: string
    WalletConnectDeepLink: string
}

export type ProofableLogin = {
    signature: string
    address: string
}

export type SerializableProviderStorage = {
    providerId: WalletProviderId
    address: string
    addressIndex?: number
}

export type MaiarAppLoginData = {
    uriCode: string,
    appLink: string
}