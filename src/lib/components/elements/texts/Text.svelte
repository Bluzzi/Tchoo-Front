<script lang="ts">
    export let type: "p" | "h2" | "h1" = "p";
    export let size: "small" | "base" | "large" | "xl" | "xxl" | "xxl-auto" = "base"; 
    
    export let header = false;

    const styles = {
        "small": "text-sm",
        "base": "text-base",
        "large": "text-lg font-title",
        "xl": "text-xl font-title",
        "xxl": "text-xxl font-title",
        "xxl-auto": "text-xxl-auto font-title"
    }
</script>

{#if type === "p"}
    <p class={"text-white " + styles[size]} class:py-14={header}><slot/></p>
{:else if type === "h2"}
    <h2 class={"text-white " + styles[size]} class:py-14={header}><slot/></h2>
{:else}
    <h1 class={"text-white " +  styles[size]} class:py-14={header}><slot/></h1>
{/if}