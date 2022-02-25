<script lang="ts">
    import Card from "$lib/components/container/Card.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import { fly } from "svelte/transition";
    import { notifications } from "./Notifications";
</script>

<div 
    class="fixed top-20 right-7 
    lg:top-1 lg:right-1/2 lg:translate-x-1/2"
>
    {#each $notifications as message}
        <div class="w-80 my-3" transition:fly={{ x: 200, duration: 500 }}>
            <Card pySize="small">
                <img 
                    src="/img/icon/information/exclamation-white.svg" 
                    alt="exclamation" class="h-6 w-6 mr-2 float-left"
                >

                <Text>{message}</Text>
            </Card>
        </div>
    {/each}
</div>