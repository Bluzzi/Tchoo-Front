<script lang="ts">
    export let type: "p" | "h2" | "h1" = "p";
    export let size: "small" | "base" | "large" | "xl" = "base"; 

    const styles = {
        small: "text-sm",
        base: "",
        large: "text-lg text-bold",
        xl: "text-xl text-bold"
    }
</script>

{#if type === "p"}
    <p class={"text-white " + styles[size]}><slot/></p>
{:else if type === "h2"}
    <h2 class={"text-white " + styles[size]}><slot/></h2>
{:else}
    <h1 class={"text-white " +  styles[size]}><slot/></h1>
{/if}