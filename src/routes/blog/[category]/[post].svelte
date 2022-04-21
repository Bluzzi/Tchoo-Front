<script lang="ts" context="module">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit";

    export async function load(request: LoadInput) : Promise<LoadOutput> {
        return {
            props: {
                category: request.params.category,
                post: request.params.post.replace(/\-/g, " ")
            }
        }
    }
</script>

<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import { firstLetterToUpperCase } from "$lib/utils/Utils";
    import { githubRaw, jsonFetch, textFetch } from "$lib/utils/Fetch";
    import type { BlogCategory, Post } from "$lib/api/documents/Blog";
    import PageBottom from "$lib/components/space/PageBottom.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Markdown from "$lib/components/container/markdown/Markdown.svelte";
    import Loading from "$lib/components/elements/navigation/Loading.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";

    export let category: string;
    export let post: string;

    let categoryInstance: BlogCategory;
    let postInstance: Post;
    let postMd: string;

    let postNotFound = false;

    (async () => {
        const blogResponse = await jsonFetch<BlogCategory[]>(githubRaw + "blog/blog.json");

        if(blogResponse.status === 200){
            categoryInstance = blogResponse.body.find(element => element.name.toLowerCase() === category);
            postInstance = categoryInstance.posts.find(element => element.name.toLocaleLowerCase() === post);

            const postMdResponse = await textFetch(githubRaw + "blog/" + categoryInstance.folder + "/" + postInstance.file);

            if(postMdResponse.status === 200){
                postMd = postMdResponse.body;
            } else {
                postNotFound = true;    
            }
        } else {
            postNotFound = true;
        }
    })();
</script>

<Title text={firstLetterToUpperCase(category) + ", " + firstLetterToUpperCase(post)}/>

{#if postNotFound}
    <div class="grid place-content-center h-navbar-adjust">
        <Text size="large">
            Post <span class="underline">{firstLetterToUpperCase(category) + "/" + firstLetterToUpperCase(post)}</span> does not exist 🔍
        </Text>
        <span class="mt-4"><Button href={"/blog?category=" + categoryInstance.name}>Back to blog page</Button></span>
    </div>
{:else}
    {#if categoryInstance && postInstance && postMd}
        <span class="text-center">
            <Text header size="xl-auto">{postInstance.name}</Text>
        </span>

        <div class="w-10/12 sm:w-11/12 mx-auto">
            <Card>
                <div class="flex flex-col gap-4"><Markdown source={postMd}/></div>
            </Card>

            <span class="block mt-10"><Button href={"/blog?category=" + categoryInstance.name}>Back to blog page</Button></span>
        </div>

        <PageBottom/>
    {:else}
        <span class="grid place-content-center h-navbar-adjust"><Loading/></span>
    {/if}
{/if}