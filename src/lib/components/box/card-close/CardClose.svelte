<script lang="ts">
    import closeIcon from "$lib/components/box/card-close/close.svg";

    let card: HTMLDivElement;
</script>

<div class="container" bind:this={card}>
    <img class="close" src={closeIcon} alt="close" on:click={() => card.remove()}>

    <slot/>    
</div>

<style lang="scss">
    .container {
        min-height: 100px;
        min-width: 100px;

        background-color: $color-primary-opacity;

        border-radius: 5px;

        padding: 30px 25px;

        position: relative;
        
        border: $color-primary solid 3px;

        .close {
            position: absolute;

            top: 7px;
            right: 10px;

            height: 30px;
            width: auto;

            cursor: pointer;
        }
    }
</style>