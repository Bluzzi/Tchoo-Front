<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Attributes :
    export let src: string;
    export let alt: string;

    export let href: string | null = "javascript:void(0);";
    export let target: "_self" | "_blank" = "_self";

    // Dispatcher :
    const dispatch = createEventDispatcher();
</script>

<a 
    {href} target={target === "_blank" ? "_blank" : ""} 
    on:click={e => dispatch("click", { nativeEvent: e })} 
    class="bg-gray-1 h-12 w-12 flex 
        justify-center items-center 
        rounded-full shadow
        transform-all hover:scale-95
        hover:brightness-105"
><img {src} {alt} class="h-6 w-6"></a>