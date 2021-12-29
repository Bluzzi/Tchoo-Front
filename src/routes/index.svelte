<script>
    import H1 from "$lib/components/texts/H1.svelte";
    import Button from "$lib/components/elements/Button.svelte";
</script>

<H1 color="white">Welcome !</H1>

<div class="buttons">
    <Button href="/connect">Login to the Tchoos</Button>
    <Button href="/connect/wallet">Connect to Elrond Wallet</Button>
</div>

<style lang="scss">
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        :global(> .button) {
            margin: 0 10px;
        }
    }
</style>