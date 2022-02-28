import { writable } from "svelte/store";
import { browser } from "$app/env";

interface Wallet {
    address: string;
    signature: string;
}

export const token = writable(browser && localStorage.getItem("token"));
export const username = writable(browser && localStorage.getItem("username"));
export const wallet = writable<Wallet | null>(browser && JSON.parse(localStorage.getItem("wallet")));

token.subscribe(value => browser && value && localStorage.setItem("token", value));
username.subscribe(value => browser && value && localStorage.setItem("username", value));
wallet.subscribe(value => browser && value && localStorage.setItem("wallet", JSON.stringify(value)));