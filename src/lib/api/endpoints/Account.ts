import { jsonFetch } from "$lib/utils/Fetch";
import { apiLink } from "../Information";
import { token, username, wallet, type Wallet } from "../stores/Account";
import { request } from "../RequestManager";
import type { ResponseStatus } from "../RequestManager";
import { get } from "svelte/store";

export async function register(uname: string, password: string) : Promise<ResponseStatus<Object>> {
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

export async function login(uname: string, password: string) : Promise<ResponseStatus<Object>> {
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

export async function changePassword(oldPassword: string, newPassword: string) : Promise<ResponseStatus<Object>> {
    const response = await jsonFetch(apiLink + "/account/change_password", {
        method: "POST",
        body: JSON.stringify({
            token: get(token),
            old_password: oldPassword,
            new_password: newPassword
        })
    });

    return await request(response, "Password change successful");
}

export async function logout() : Promise<ResponseStatus<Object>> {
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
    });
}

export async function linkWallet(address: string, signature: string) : Promise<ResponseStatus<Object>> {
    const response = await jsonFetch(apiLink + "/account/link_wallet", {
        method: "POST", 
        body: JSON.stringify({
            token: get(token),
            address: address,
            signature: signature
        })
    });

    return await request(response, "The wallet has been linked", () => {
        const walletData = get(wallet);

        walletData.address = address;
        walletData.signature = signature;

        wallet.set(walletData);
    });
}

export async function isTokenValid() : Promise<ResponseStatus<Object>> {
    const response = await jsonFetch(apiLink + "/account/is_token_valid", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Token is valid");
}

export async function isWalletLinked() : Promise<ResponseStatus<Object>> {
    const response = await jsonFetch(apiLink + "/account/is_wallet_linked", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Wallet is linked");
}

export async function updateInfo() : Promise<ResponseStatus<Object>> {
    const response = await jsonFetch(apiLink + "/account/get_infos_by_token", {
        method: "POST",
        body: JSON.stringify({
            token: get(token)
        })
    });

    return await request(response, "Account informations updated", () => {
        username.set(response.body["username"]);

        if(response.body["wallet"]){
            const walletData: Wallet = get(wallet) ?? {
                address: response.body["wallet"]
            }
            
            walletData.address = response.body["wallet"];

            wallet.set(walletData);
        }
    });
}