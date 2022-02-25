import { goto } from "$app/navigation";

export function redirectByParam(location: Location) : void {
    const param = new URLSearchParams(location.search).get("redirect");

    goto(param ? param : "/");
}