<script lang="ts">
    import type { PageType } from "./Pagination";
    import { createEventDispatcher } from "svelte";

    // Attribute :
    export let active = false;
    export let page: PageType;

    // Create disptacher :
    const disptach = createEventDispatcher();

    // Change page :
    function changePage() : void {
        if(!active && page !== "...") disptach("click", { page: page });
    }

    // Input :
    let input: HTMLInputElement;
    let inputActived = false;

    function setInputState(state: "actived" | "desactived") : void {
        if(state === "actived"){
            inputActived = true;

            setTimeout(() => input.focus(), 50);
        } else {
            input.value = "";
            inputActived = false;
        }
    }

    function inputEnter(event: KeyboardEvent) : void {
        if(event.key === "Enter"){
            disptach("click", { page: input.value });
            setInputState("desactived");
        }
    }
</script>

<div 
    on:click={() => changePage()} 

    class="grid place-content-center mx-0.5 h-10 
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
        <p on:click={() => setInputState("actived")} class:hidden={inputActived}>...</p>

        <input 
            type="text" bind:this={input} 
            on:blur={() => setInputState("desactived")} 
            class:hidden={!inputActived}
            on:keyup={e => inputEnter(e)}
            maxlength="2" pattern="[0-9]+"
            class="rounded outline-none px-1 py-2 border-lg w-12 text-center text-black
                cursor-pointer border-white focus:border-primary-1"
        >
    {:else} 
        <p>{page}</p>
    {/if}
</div>