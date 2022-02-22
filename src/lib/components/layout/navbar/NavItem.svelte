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
    });
</script>

<li 
    class="text-white uppercase my-3 mx-4
    border border-transparent hover:border-b-primary-1"
    class:border-b-primary-1={active}
><a href={route}><slot/></a></li>