import { jsonFetch } from "$lib/utils/Fetch";
import { apiLink } from "../Information";
import { token, username, wallet } from "../AccountStore";
import { request, ResponseStatus } from "../RequestManager";
import { get } from "svelte/store";

export async function register(uname: string, password: string) : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/create", {
        method: "POST",
        body: JSON.stringify({
            username: uname,
            password: password
        })
    });

    return await request(response, "Account successfuly created", () => {
        token.set(response.body["token"]);
        username.set(uname);
    });
}

export async function login(uname: string, password: string) : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/login", {
        method: "POST",
        body: JSON.stringify({
            username: uname,
            password: password
        })
    });

    return await request(response, "Login successful", () => {
        token.set(response.body["token"]);
        username.set(uname);
    });
}

export async function logout() : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/logout", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Logout successful", () => {
        username.set("");
        token.set("");
        wallet.set(null);
    })
}

export async function linkWallet(address: string, signature: string) : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/link_wallet", {
        method: "POST", 
        body: JSON.stringify({
            token: get(token),
            address: address,
            signature: signature
        })
    });

    return await request(response, "The wallet has been linked", () => {
        wallet.set({ address: address, signature: signature });
    });
}

export async function isTokenValid() : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/is_token_valid", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Token is valid");
}

export async function isWalletLinked() : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/is_wallet_linked", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Wallet is linked");
}

export async function updateInfo() : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/get_infos", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Account informations updated", () => {
        username.set(response.body["username"] ?? "");
        wallet.set({ address: response.body["wallet"] ?? "", signature: get(wallet).signature });
    });
}