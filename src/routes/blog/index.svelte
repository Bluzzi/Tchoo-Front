<script lang="ts">
    import { browser } from "$app/env";
    import { goto } from "$app/navigation";
    import type { BlogCategory } from "$lib/api/documents/Blog";
    import Card from "$lib/components/container/Card.svelte";
    import Loading from "$lib/components/elements/navigation/Loading.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import PageBottom from "$lib/components/space/PageBottom.svelte";
    import { githubRaw, jsonFetch } from "$lib/utils/Fetch";
    import { getParam, updateParam } from "$lib/utils/Url";

    const response = jsonFetch<BlogCategory[]>(githubRaw + "blog/blog.json").then(blog => {
        if(browser){
            const category = getParam("category");

            if(category) changeCategory(blog.body.find(element => element.name === category));
        }

        return blog;
    });

    // Icon :
    interface IconInformation {
        link: string;
        alt: string;
    }

    function getIcon(categoryName: string, iconName: string) : IconInformation {
        return {
            link: githubRaw + "blog/" + categoryName + "/" + iconName,
            alt: categoryName + " icon"
        }
    }

    // Category :
    let currentCategory: BlogCategory;

    function changeCategory(category: BlogCategory) : void {
        updateParam("category", category.name);
        currentCategory = category;
    }
</script>

<Title text="Blog"/>

<span class="text-center"><Text size="xl-auto" header>Blog</Text></span>

{#await response}
    <span class="grid place-content-center"><Loading/></span>
{:then value}
    {#if value.status === 200}
        <div class="flex justify-center items-center w-full gap-16">
            {#each value.body as category}
                {@const icon = getIcon(category.folder, category.icon)}

                <div class="w-56 rounded">
                    <Card 
                        clickable on:click={() => changeCategory(category)} 
                        clicked={currentCategory && category.name === currentCategory.name}
                    >
                        <div class="flex items-center justify-center flex-col gap-3">
                            <img class="h-16 w-auto" src={icon.link} alt={icon.alt}>

                            <Text>{category.name}</Text>
                        </div>
                    </Card>
                </div>
            {/each}
        </div>

        {#if currentCategory && currentCategory.posts.length}
            <img class="h-24 w-auto mx-auto my-10" src="/img/icon/navigation/angle-down-white.svg" alt="arrow down">
            
            <div class="flex items-center justify-center flex-col gap-6">
                {#each currentCategory.posts as post}
                    <a 
                        class="w-3/4" 
                        href={
                            "/blog/" + currentCategory.name.toLocaleLowerCase() + 
                            "/" + post.name.toLocaleLowerCase().replace(/ /g, "-")
                        }
                    >
                        <Card clickable>
                            <div class="flex justify-between items-center">
                                <Text type="h2" size="large">{post.name}</Text>
                                <Text>{post.date}</Text>
                            </div>
                        </Card>
                    </a>
                {/each}
            </div>
        {:else}
            <img class="mx-auto h-80 mt-16" src="/img/other/undraw-void.svg" alt="No category selected">
        {/if}
    {:else}
        <span class="text-center"><Text>Error : Blog categories not found</Text></span>
    {/if}
{/await}

<PageBottom/>