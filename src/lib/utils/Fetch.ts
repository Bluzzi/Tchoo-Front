interface Response<T> {
    status: number;
    body: T;
}

export async function jsonFetch<T>(
    link: string, request: RequestInit = {}, fetchFunc: Function|null = null
): Promise<Response<T>> {
    let response;

    if(fetchFunc){
        response = await fetchFunc(link, request);
    } else {
        response = await fetch(link, request);
    }

    return {
        status: response.status,
        body: await response.json()
    };
}