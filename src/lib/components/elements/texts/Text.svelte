<script lang="ts">
    export let type: "p" | "h2" | "h1" = "p";
    export let size: "small" | "base" | "large" | "xl" = "base"; 
    
    export let header = false;

    const styles = {
        small: "text-sm",
        base: "",
        large: "text-lg text-bold font-title",
        xl: "text-xl text-bold font-title"
    }
</script>

{#if type === "p"}
    <p class={"text-white " + styles[size]} class:my-14={header}><slot/></p>
{:else if type === "h2"}
    <h2 class={"text-white " + styles[size]} class:my-14={header}><slot/></h2>
{:else}
    <h1 class={"text-white " +  styles[size]} class:my-14={header}><slot/></h1>
{/if}