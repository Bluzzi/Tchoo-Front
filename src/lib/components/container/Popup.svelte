<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Card from "$lib/components/container/Card.svelte";

    export let title: string;

    let card: HTMLDivElement;
    let background: HTMLDivElement;

    function removeCard() : void {
        background.remove();
        card.remove();
    }
</script>

<div 
    bind:this={background} 
    class="fixed top-0 left-0 z-20 h-screen w-screen 
        overflow-hidden bg-black-transparent"
></div>

<div 
    class="fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 z-30 flex 
        items-center justify-center" 
    bind:this={card}
>
    <Card>
        <div class="flex items-center justify-between pb-8">
            <span class="mr-5"><Text size="large">{title}</Text></span>

            <span 
                class="bg-gray-2 h-10 w-14 rounded flex 
                    items-center justify-center hover:bg-primary-1"
                on:click={() => removeCard()}
            >
                <img 
                    src="/img/icon/navigation/xmark-white.svg" 
                    alt="close" class="h-4 w-4"
                >
            </span>
        </div>

        <slot/>  
    </Card>
</div>