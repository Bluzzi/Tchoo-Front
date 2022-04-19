<script lang="ts">
    import { fromMarkdown } from "mdast-util-from-markdown";
    import MarkdownElement from "./MarkdownElement.svelte";

    export let source: string;

    const jsonMarkdown = fromMarkdown(source).children;
</script>

{#each jsonMarkdown as element}
    <MarkdownElement element={element}/>
{/each}