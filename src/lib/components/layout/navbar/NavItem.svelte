<script lang="ts">
    import { navigating } from "$app/stores";
    import { onMount } from "svelte";

    export let route: string;

    // Active state :
    let active = false;

    onMount(() => {
        if(window) active = window.location.pathname === route;
    });

    navigating.subscribe(event => {
        if(event) active = event.to.pathname === route;
    }); // border border-transparent hover:border-b-primary-1
</script>

<li 
    class="text-white uppercase my-3 mx-4
    hover:underline decoration-primary-1 
    underline-offset-4 decoration-base"
    class:underline={active}
><a href={route}><slot/></a></li>