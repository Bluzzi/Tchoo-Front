import {
    IDappProvider,
    ExtensionProvider,
    Transaction,
    IProvider,
    ProxyProvider,
    Address,
    SignableMessage,
    WalletProvider as WebWalletProvider,
    WalletConnectProvider,
    HWProvider,
} from "@elrondnetwork/erdjs/out-browser/erdjs.js";
import type {
    WalletProviderId,
    WalletServiceConfig,
    ProofableLogin,
    SerializableProviderStorage,
    MaiarAppLoginData
} from "./WalletTypes";
import { wallet } from "$lib/api/AccountStore";
import { get } from "svelte/store";
import { Buffer } from "buffer";
import { walletServiceConfig } from "$lib/maiar/wallet/WalletConfig";
import { linkWallet } from "$lib/api/endpoints/Account";

class EmptyProvider implements IDappProvider {
    init = () => new Promise<boolean>((resolve) => resolve(true));
    login = () => new Promise<string>((resolve) => resolve(""));
    logout = () => new Promise<boolean>((resolve) => resolve(true));
    getAddress = () => new Promise<string>((resolve) => resolve(""));
    isInitialized = () => true;
    isConnected = () => new Promise<boolean>((resolve) => resolve(true));
    sendTransaction = () => new Promise<Transaction>((resolve) => resolve(new Transaction({ receiver: new Address("erd1Empty") })));
    signTransaction = () => new Promise<Transaction>((resolve) => resolve(new Transaction({ receiver: new Address("erd1Empty") })));
    signTransactions = () => new Promise<Array<Transaction>>((resolve) => resolve([new Transaction({ receiver: new Address("erd1Empty") })]));
    signMessage = () => new Promise<SignableMessage>((resolve) => resolve(new SignableMessage({})));
}

export class WalletService {

    private static _instance: WalletService = new WalletService();

    private config: WalletServiceConfig = walletServiceConfig;

    private address: string | null = null;
    private signature: string | null = null;

    private provider: IDappProvider = new EmptyProvider();
    private providerId: WalletProviderId = "empty";

    private proxy: IProvider | null = new ProxyProvider(this.config.GatewayAddress, { timeout: 5000 });

    constructor(){
        if (WalletService._instance) {
            throw new Error("Use getInstance() for construction of wallet service");
        }

        WalletService._instance = this;
    }

    public static getInstance() : WalletService {
        return WalletService._instance;
    }

    // GENERAL METHODS

    /**
     * Init the provider by the provider ID
     * 
     * @returns {boolean} true if the provider are already init
     */
    public async init(providerId?: WalletProviderId) : Promise<boolean> {
        if(this.providerId !== "empty" && !providerId) return true; // prevent empty init if already set provider
        if(this.providerId === providerId) return true; // prevent double-init for same provider

        const storedWallet = this.loadFromStorage();

        providerId = providerId || storedWallet?.providerId || "empty";

        switch(providerId){
            case "maiar_app":
                this.provider = new WalletConnectProvider(this.proxy, this.config.WalletConnectBridge, {
                    onClientLogin: async () => {
                        const castedProvider = this.provider as WalletConnectProvider;

                        this.finalizeLogin({ 
                            signature: await castedProvider.getSignature(), 
                            address: await castedProvider.getAddress() 
                        });
                    },
                    onClientLogout: async () => this.logout()
                });
            break;

            case "maiar_extension":
                this.provider = storedWallet ? 
                    ExtensionProvider.getInstance().setAddress(storedWallet.address) : 
                    ExtensionProvider.getInstance();
            break;

            case "hardware":
                this.provider = new HWProvider(this.proxy);
            break;

            case "web":
                this.provider = new WebWalletProvider(this.config.WebWalletUrl);
            break;
        }

        this.providerId = providerId;
        this.address = storedWallet ? storedWallet.address : null;

        return await this.provider.init();
    }

    /**
     * Depending on the provider, login might be a 2-step process that ends by calling finalizeLogin()
     * 
     * @returns {MaiarAppLoginData|null} ONLY FOR MaiarApp PROVIDER : a objet with URI code for genrate QR code and a app link for direct connect
     */
    public async login(proofableToken: string, addressIndex?: number) : Promise<MaiarAppLoginData|null> {
        this.ensureInitialized();

        switch(this.providerId){
            case "maiar_app":
                const loginUri = await (this.provider as WalletConnectProvider).login();

                return {
                    uriCode: loginUri + "&token=" + proofableToken,
                    appLink: this.config.WalletConnectDeepLink // TODO : check for the valid link
                }
            break;

            case "maiar_extension":
                const extensionProvider = this.provider as ExtensionProvider;

                await extensionProvider.login({ token: proofableToken });

                const extensionAccount = extensionProvider.account;

                this.finalizeLogin({ 
                    signature: extensionAccount.signature || "", 
                    address: extensionAccount.address 
                });
            break;

            case "hardware":
                const login = await (this.provider as HWProvider).tokenLogin({ 
                    token: Buffer.from(proofableToken + "{}"), 
                    addressIndex: addressIndex 
                });
                
                this.finalizeLogin(
                    { 
                        signature: login.signature.hex(), 
                        address: login.address 
                    }, 
                    addressIndex
                );
            break;

            case "web":
                (this.provider as WebWalletProvider).login({
                    token: proofableToken,
                    callbackUrl: location.protocol + "//" + location.host + location.pathname
                });
            break;
        }

        return null;
    }

    /**
     * Finalize the connection and get final informations 
     */
    public finalizeLogin(proofableLogin: ProofableLogin, addressIndex?: number) : void {
        this.persistLoginInStorage(proofableLogin.address, addressIndex);

        this.address = proofableLogin.address;
        this.signature = proofableLogin.signature;

        this.onLogin(proofableLogin);
    }

    /**
     * Stop the WebSocket connection and clear local storage informations
     */
    public async logout() : Promise<void> {
        this.ensureInitialized();

        await this.provider.logout();

        this.clearStorage();

        this.onLogout();
    }
   
    // GET INFORMATIONS

    /**
     * Get the wallet service configuration with the gateway address, web wallet url, 
     * wallet connect bridge and wallet connect deep link
     */
    public getConfig() : WalletServiceConfig {
        this.ensureInitialized();

        return this.config!;
    }

    /**
     * Wallet public address
     */
    public getAddress() : string {
        this.ensureLoggedIn();

        return this.address as string;
    }

    /**
     * This return a signature generated by the wallet with adress and proofable token
     */
    public getSignature() : string {
        this.ensureLoggedIn();

        return this.signature as string;
    }

    public getProviderID() : WalletProviderId {
        return this.providerId;
    }

    public getProvider() : IDappProvider {
        return this.provider;
    }

    public isLoggedIn() : boolean {
        return this.address !== null;
    }

    // LOCAL STORAGE METHODS

    private loadFromStorage() : SerializableProviderStorage | null {
        if(typeof window === "undefined") return null;

        const serialized = JSON.stringify(get(wallet));

        return serialized ? (JSON.parse(serialized) as SerializableProviderStorage) : null;
    }

    private persistLoginInStorage(address: string, addressIndex?: number) : void {
        const serializableStorage: SerializableProviderStorage = {
            providerId: this.providerId,
            address: address,
            addressIndex: addressIndex,
        }

        wallet.set(serializableStorage);
    }

    private clearStorage() : void {
        wallet.set(null);
    }

    // ERROR METHODS CHECKERS

    private ensureInitialized()  : void {
        if(this.providerId === "empty") throw new Error("Wallet not initialized. call init() first");

        if(!this.proxy) throw new Error("wallet >proxy< needs configuration");
    }

    private ensureLoggedIn() : void {
        if(!this.address) throw new Error("Wallet user needs to login before");
    }

    // EVENTS

    public onLogin(proofableLogin: ProofableLogin) : void {
        console.log("Successful connection with " + this.providerId + " provider, wallet informations :");
        console.log("Address : " + proofableLogin.address);
        console.log("Signature : " + proofableLogin.signature);

        // Request for link the API :
        linkWallet(proofableLogin.address, proofableLogin.signature);
    }

    public onLogout() : void {
        console.log("Connection finished.");
    }
}