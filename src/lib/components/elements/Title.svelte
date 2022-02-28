<script lang="ts">
    export let text: string | null = null;
</script>

<svelte:head>
    <title>The Tchoos {text ? "- " + text : ""}</title>
</svelte:head>