<script lang="ts">
    import P from "$lib/components/texts/P.svelte";

    export let onClick: () => void = () => {};
    export let href: string|null = null;
</script>

<div class="button" on:click={() => onClick()}>
    {#if href}
        <a href={href}><slot/></a>
    {:else}
        <P><slot/></P>
    {/if}
</div>

<style lang="scss">
    @import "../../scss/variables.scss";

    @mixin button-style {
        padding: 10px 20px;

        background-color: $color-primary;

        border: $color-primary 3px solid;
        border-radius: 5px;

        color: white;
        text-decoration: none;

        cursor: pointer;

        &:hover {
            background-color: $color-primary-opacity;
        }
    }

    .button :global(p) {
        @include button-style;
    }

    .button :global(a) {
        @include button-style;
    }
</style>