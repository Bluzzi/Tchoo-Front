import { get, writable } from "svelte/store";
import { browser } from "$app/env";
import { isTokenValid, updateInfo } from "./endpoints/Account";
import { gotoConnection } from "$lib/utils/Redirect";

interface Wallet {
    address: string;
    signature: string;
}

export const token = writable(browser && localStorage.getItem("token"));
export const username = writable(browser && localStorage.getItem("username"));
export const wallet = writable<Wallet | null>(
    browser && localStorage.getItem("wallet") ? JSON.parse(localStorage.getItem("wallet")) : null
);

token.subscribe(value => browser && localStorage.setItem("token", value ?? ""));
username.subscribe(value => browser && localStorage.setItem("username", value ?? ""));
wallet.subscribe(value => browser && localStorage.setItem("wallet", value ? JSON.stringify(value) : ""));

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