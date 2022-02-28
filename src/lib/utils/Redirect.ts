import { goto } from "$app/navigation";

/**
 * Goto the path in the "redirect" parameter in pathname.
 */
export function redirectByParam(location: Location) : void {
    const param = new URLSearchParams(location.search).get("redirect");

    goto(param ? param : "/");
}

/**
 * Goto a connection page (login or register) with a redirect 
 * parameter defined by the current page.
 */
export function gotoConnection(type: "login" | "register", location: Location) : void {
    const currentPath = location.pathname;

    const route = type === "login" ? "/connect" : "/connect/register";
    const redirect = currentPath && !["/", "/connect", "/connect/register"].includes(currentPath) ? 
        "?redirect=" + currentPath : "";

    goto(route + redirect);
}