export function updateParam(name: string, value: string) : void {
    const params = new URLSearchParams(window.location.search);

    params.set(name, value);

    window.history.replaceState(null, null, "?" + params.toString());
}

export function getParam(name: string) : string|null {
    return new URLSearchParams(window.location.search).get(name) ?? null;
}