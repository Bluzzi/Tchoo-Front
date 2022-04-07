<script context="module" lang="ts">
    import type { ErrorLoadInput } from "@sveltejs/kit";

    export function load({ error, status }: ErrorLoadInput) {
        return {
            props: {
                title: `${status}: ${error.message}`
            }
        };
    }
</script>

<script>
    export let title;
</script>

<h1>{title}</h1>