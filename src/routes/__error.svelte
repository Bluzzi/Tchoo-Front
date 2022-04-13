<script context="module" lang="ts">
    import type { ErrorLoadInput, LoadOutput } from "@sveltejs/kit";

    export function load({ error, status }: ErrorLoadInput) : LoadOutput {
        return {
            props: {
                statusCode: status,
                message: error.message
            }
        };
    }
</script>

<script lang="ts">
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Title from "$lib/components/elements/Title.svelte";

    export let statusCode: string;
    export let message: string;
</script>

<Title text={"Error " + statusCode}/>

<div class="grid place-content-center h-navbar-adjust px-5 break-all">
    <Text size="xl">Error {statusCode}</Text>
    <Text size="large">{message}</Text>

    <span class="h-5"></span>

    <Button href="/">Back to home</Button>
</div>