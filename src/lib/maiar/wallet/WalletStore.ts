import { writable } from "svelte/store";
import { browser } from "$app/env";

export const walletAuth = writable<string>(browser && localStorage.getItem("walletAuth") || "");

walletAuth.subscribe(value => browser && localStorage.setItem("walletAuth", value?.toString() ?? ""));