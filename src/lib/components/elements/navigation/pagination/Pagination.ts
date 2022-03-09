import { range } from "$lib/utils/Utils";

export type PageType = "prev" | "next" | "..." | number;

export function generatePageList(currentPage: number, maxPage: number) : PageType[] {
    const pageList: PageType[] = [];
    
    // If the number of pages is less than or equal to 5, else normal pagination :
    if(maxPage <= 5){
        pageList.push(...range(1, maxPage));
    } else {
        // If the current page is not the first one, add the "previous" button :
        if(currentPage !== 1) pageList.push("prev");

        // Creation of the list of pages :
        if(currentPage < 4){
            pageList.push(...range(1, 4));
            pageList.push("...", maxPage);
        } else if(currentPage >= 4 && currentPage <= maxPage - 4){
            pageList.push(1, "...");
            pageList.push(currentPage - 1, currentPage, currentPage + 1);
            pageList.push("...", maxPage);
        } else {
            pageList.push(1, "...");
            pageList.push(...range(maxPage - 3, maxPage));
        }

        // If the current page is not the last one, add the "next" button :
        if(currentPage !== maxPage) pageList.push("next");
    }

    return pageList;
}