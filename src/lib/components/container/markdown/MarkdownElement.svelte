<script lang="ts">
    import type { Content } from "mdast";
    import Line from "$lib/components/elements/geometry/Line.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import List from "$lib/components/elements/list/List.svelte";
    import ListItem from "$lib/components/elements/list/ListItem.svelte";
    import Link from "$lib/components/elements/texts/Link.svelte";

    export let parent: Content | null = null;
    export let element: Content;
</script>

{#if parent}
    {#if parent.type === "heading" && element.type === "text"}
        {#if parent.depth === 1}
            <span class="text-center"><Text size="xl">{element.value}</Text></span>
        {:else}
            <Text size="large">{element.value}</Text>
        {/if}
    {:else if parent.type === "blockquote" && element.type === "paragraph" && element.children[0].type === "text"}
        <Text size="small">{element.children[0].value}</Text>
    {:else if parent.type === "paragraph"}
        {#if element.type === "strong" && element.children[0].type === "text"}
            <strong>{element.children[0].value}</strong>
        {:else if element.type === "text"}
            {element.value}
        {:else if element.type === "link" && element.children[0].type === "text"}
            <Link href={element.url} target="external">{element.children[0].value}</Link>
        {/if}
    {:else if element.type === "listItem"}
        {#each element.children as item}
            {#if item.type === "paragraph"}
                <ListItem><svelte:self element={item}/></ListItem>
            {:else if item.type === "list"}
                <svelte:self element={item}/>
            {/if}
        {/each}
    {:else}
        <Text>ERROR (Unsupported element) : {parent.type}/{element.type}</Text>
    {/if}
{:else}
    {#if element.type === "thematicBreak"}
        <Line/>
    {:else if element.type === "heading"}
        <svelte:self parent={element} element={element.children[0]}/>
    {:else if element.type === "blockquote"}
        <svelte:self parent={element} element={element.children[0]}/>
    {:else if element.type === "paragraph"}
        <Text>
            {#each element.children as item}
                <svelte:self parent={element} element={item}/>
            {/each}
        </Text>
    {:else if element.type === "list"}
        <List>
            {#each element.children as item}
                <svelte:self parent={element} element={item}/>
            {/each}
        </List>
    {:else}
        <Text>ERROR (Unsupported element) : {element.type}</Text>
    {/if}
{/if}