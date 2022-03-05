import { get } from "svelte/store";
import { writable } from "svelte-local-storage-store";
import { isTokenValid, updateInfo } from "../endpoints/Account";
import { gotoConnection } from "$lib/utils/Redirect";
import type { WalletProviderId } from "$lib/maiar/wallet/WalletTypes";

interface Wallet {
    providerId?: WalletProviderId;
    address: string;
    signature?: string;
    addressIndex?: number;
}

export const token = writable<string | null>("token", null);
export const username = writable<string | null>("username", null);
export const wallet = writable<Wallet | null>("wallet", null);

export async function updateConnection(location: Location) : Promise<void> {
    if(!get(token)) return;

    const tokenIsValid = (await isTokenValid()).success;

    if(tokenIsValid){
        updateInfo();
    } else {
        token.set("");
        username.set("");
        wallet.set(null);

        gotoConnection("login", location);
    }
}