<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let pySize: "small" | "base" = "base";

    export let clickable: boolean = false;
    export let clicked: boolean = false;

    // Event dispatcher :
    const dispatch = createEventDispatcher();
</script>

<div 
    class="bg-gray-1 w-full px-6 rounded shadow
        border border-transparent" 
    class:hover:border-primary-1={clickable}
    class:!border-primary-1={clicked}
    class:py-8={pySize === "base"} 
    class:py-4={pySize === "small"}
    on:click={event => dispatch("click", { nativeEvent: event })}
><slot/></div>