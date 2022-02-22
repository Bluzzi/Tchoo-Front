<script lang="ts">
    import Text from "$lib/components/elements/Text.svelte";

    export let title: string;

    let card: HTMLDivElement;
</script>

<div bind:this={card} class="bg-gray-1 w-128 py-8 px-7 rounded">
    <div class="flex items-center justify-between pb-5">
        <Text size="large">{title.toUpperCase()}</Text>

        <span 
            class="bg-gray-2 h-10 w-14 rounded flex items-center justify-center"
            on:click={() => card.remove()}
        >
            <img 
                src="/img/icon/navigation/close.svg" 
                alt="close" class="h-6 w-6"
            >
        </span>
    </div>

    <slot/>    
</div>