export interface Response<T> {
    status: number;
    body: T;
}

export async function jsonFetch<T>(
    link: string, request: RequestInit = {}, fetchFunc: Function|null = null
): Promise<Response<T>> {
    const response = fetchFunc ? await fetchFunc(link, request) : await fetch(link, request);

    return {
        status: response.status,
        body: await response.json()
    }
}

export let githubRaw = "https://raw.githubusercontent.com/Meta-Friend-Team/Tchoo-Documents/main/";

export async function textFetch(link: string, fetchFunc: Function|null = null) : Promise<Response<string>> {
    const response = fetchFunc ? await fetchFunc(link) : await fetch(link);

    return {
        status: response.status,
        body: await response.text()
    }
}