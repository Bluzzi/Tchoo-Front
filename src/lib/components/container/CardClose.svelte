<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Card from "$lib/components/container/Card.svelte";

    export let title: string;

    let card: HTMLDivElement;
</script>

<div bind:this={card}>
    <Card>
        <div class="flex items-center justify-between pb-5">
            <Text size="large">{title.toUpperCase()}</Text>

            <span 
                class="bg-gray-2 h-10 w-14 rounded flex items-center justify-center hover:bg-primary-1"
                on:click={() => card.remove()}
            >
                <img 
                    src="/img/icon/navigation/xmark-white.svg" 
                    alt="close" class="h-6 w-6"
                >
            </span>
        </div>

        <slot/>  
    </Card>
</div>