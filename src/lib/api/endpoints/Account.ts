import { browser } from "$app/env";
import { jsonFetch } from "$lib/utils/Fetch";
import { writable } from "svelte/store";
import type { ResponseStatus } from "../AdapterInterfaces";
import { apiLink } from "../Information";
import errors from "../ErrorsList.json";

// API requests :
export async function register(uname: string, password: string) : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/create", {
        method: "POST",
        body: JSON.stringify({
            username: uname,
            password: password
        })
    });

    if(response.status === 200){
        if(response.body["success"] === true){
            token.set(response.body["token"]);
            username.set(uname);

            return {
                success: true,
                message: "Account successfuly created"
            }
        } else {
            return {
                success: false,
                message: errors[response.body["error"]]
            }
        }
    } else {
        return {
            success: false,
            message: "On going maintenance"
        }
    }
}

export async function login(uname: string, password: string) : Promise<ResponseStatus> {
    const response = await jsonFetch(apiLink + "/account/login", {
        method: "POST",
        body: JSON.stringify({
            username: uname,
            password: password
        })
    });

    if(response.status === 200){
        if(response.body["success"] === true){
            token.set(response.body["token"]);
            username.set(uname);

            return {
                success: true,
                message: "Login successful"
            }
        } else {
            return {
                success: false,
                message: errors[response.body["error"]]
            }
        }
    } else {
        return {
            success: false,
            message: "On going maintenance"
        }
    }
}