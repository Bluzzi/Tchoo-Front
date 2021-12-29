import type { WalletServiceConfig } from "./WalletTypes";

// Wallet service config :
const walletServiceConfigs: { net: WalletServiceConfig, testNet: WalletServiceConfig } = {
    net: {
        GatewayAddress: "https://gateway.elrond.com",
        WebWalletUrl: "https://wallet.elrond.com/",

        // No test-net for mobile app :
        WalletConnectBridge: "https://bridge.walletconnect.org/",
        WalletConnectDeepLink: "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/?wallet-connect="
    },
    testNet: {
        GatewayAddress: "https://testnet-gateway.elrond.com",
        WebWalletUrl: "https://testnet-wallet.elrond.com",
        WalletConnectBridge: "https://bridge.walletconnect.org/",
        WalletConnectDeepLink: "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/?wallet-connect="
    }
}

export const walletServiceConfig: WalletServiceConfig = walletServiceConfigs.testNet;