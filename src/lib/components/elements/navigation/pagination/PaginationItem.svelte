<script lang="ts">
    import type { PageType } from "./Pagination";
    import { createEventDispatcher } from "svelte";

    // Attribute :
    export let active = false;
    export let page: PageType;

    // Create disptacher :
    const disptach = createEventDispatcher();

    // Events :
    function onClick(){
        if(!active && page !== "...") disptach("click", { page: page });
    }
</script>

<div 
    on:click={() => onClick()} 

    class="flex items-center justify-center mx-0.5 h-10 
        min-w-max w-10 rounded text-primary-1 text-base
        transition-all duration-500"

    class:bg-primary-1={active}

    class:cursor-pointer={page !== "..."}
    class:hover:bg-primary-1={page !== "..."}
    class:hover:bg-opacity-80={page !== "..."}
    class:hover:text-white={page !== "..."}
>
    {#if active}
        <p class="text-white">{page}</p>
    {:else if page === "prev"}
        <p class="px-2">&lt; Prev</p>
    {:else if page === "next"}
        <p class="px-2">Next &gt;</p>
    {:else if page === "..."}
        <p>...</p>
    {:else}
        <p>{page}</p>
    {/if}
</div>