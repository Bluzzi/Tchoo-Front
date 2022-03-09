<script lang="ts">
    import PaginationItem from "./PaginationItem.svelte";
    import { generatePageList, PageType } from "./Pagination";
    import { createEventDispatcher } from "svelte";

    // Attribute :
    export let currentPage = 1;
    export let maxPage: number;

    // Get page list :
    let pageList = generatePageList(currentPage, maxPage);

    // Update page list when max page is updated :
    $: maxPage, pageList = generatePageList(currentPage, maxPage);

    // Events :
    const disptach = createEventDispatcher();

    function changePage(event: CustomEvent) : void {
        const page: PageType = event.detail.page;

        if(page === "prev") currentPage--;
        if(page === "next") currentPage++;
        if(page !== "prev" && page !== "next" && page !== "...") currentPage = page;        

        disptach("click", { page: currentPage });

        pageList = generatePageList(currentPage, maxPage);
    }
</script>

<div class="flex">
    {#each pageList as page}
        <PaginationItem active={page === currentPage} page={page} on:click={e => changePage(e)}/>
    {/each}
</div>