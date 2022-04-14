import { jsonFetch } from "$lib/utils/Fetch";
import { apiLink } from "../Information";
import { request } from "../RequestManager";
import type { ResponseStatus } from "../RequestManager";

export interface Leaderboard {
    total_count: number;
    top_nfts: NFT[];
}

export interface NFT {
    nonce: number;

    name: string;
    holder_username: string;

    two_d_picture: string;

    prestige_balance: number;
}

export async function getLeaderboard(min: number, max: number) : Promise<ResponseStatus<Leaderboard>> {
    const response = await jsonFetch<Leaderboard>(apiLink + "/pets/get_top", {
        method: "POST",
        body: JSON.stringify({
            start_index: min,
            stop_index: max
        })
    });

    return await request(response, "Pets list received");
}