import { goto } from "$app/navigation";

/**
 * Goto the path in the "redirect" parameter in pathname.
 */
export function redirectByParam(location: Location) : void {
    const param = new URLSearchParams(location.search).get("redirect");

    goto(param ? param : "/");
}