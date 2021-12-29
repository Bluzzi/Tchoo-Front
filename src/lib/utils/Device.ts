import platform from "platform";

export function isMobile() : boolean {
    return platform.os?.family === "iOS" || platform.os?.family === "Android";
}