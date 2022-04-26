<script lang="ts">
    import { githubRaw, textFetch } from "$lib/utils/Fetch";
    import Loading from "$lib/components/elements/navigation/Loading.svelte";
    import Markdown from "$lib/components/container/markdown/Markdown.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import PageBottom from "$lib/components/space/PageBottom.svelte";

    const sourceMd = textFetch(githubRaw + "/legal/privacy/Privacy-Policy-EN.md");
</script>

<Title text="Privacy Policy"/>

<span class="text-center">
    <Text header size="xxl-auto">Privacy Policy</Text>
</span>

<div class="w-10/12 sm:w-11/12 mx-auto">
    <Card>
        <div class="flex flex-col gap-4">
            {#await sourceMd}
                <Loading/>
            {:then value}
                {#if value.status === 200}
                    <Markdown source={value.body.substring(value.body.indexOf("\n") + 1)}/>
                {:else}
                    <Text>Error : Privacy Policy not found</Text>
                {/if}
            {/await}
        </div>
    </Card>
</div>

<PageBottom/>