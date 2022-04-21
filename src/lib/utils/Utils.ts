export function range(start: number, end: number) : number[] {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
}

export function firstLetterToUpperCase(message: string) : string {
    return message.charAt(0).toUpperCase() + message.slice(1);
}