import { jsonFetch } from "$lib/utils/Fetch";
import { apiLink } from "../Information";
import { request, type ResponseStatus } from "../RequestManager";

export interface PublicAccount {
    username: string;
    unique_username: string;
    
    wallet: string;
    
    is_whitelisted: boolean;

    owned_pets: number[];
}

export async function getInfoByUsername(uname: string) : Promise<ResponseStatus<PublicAccount>> {
    const response = await jsonFetch<PublicAccount>(apiLink + "/account/get_infos_by_username", {
        method: "POST",
        body: JSON.stringify({
            username: uname
        })
    });

    return await request(response, "Information received");
}