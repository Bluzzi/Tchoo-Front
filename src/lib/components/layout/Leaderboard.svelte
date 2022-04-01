<script lang="ts">
    import Card from "../container/Card.svelte";
    import Link from "../elements/texts/Link.svelte";
    import Text from "../elements/texts/Text.svelte";
    import Loading from "$lib/components/elements/navigation/Loading.svelte";
    import Pagination from "../elements/navigation/pagination/Pagination.svelte";
    import Line from "../elements/geometry/Line.svelte";
    import { getLeaderboard, NFT } from "$lib/api/endpoints/Pets";
    import { browser } from "$app/env";
    import { getParam, updateParam } from "$lib/utils/Url";
    import { onMount } from "svelte";

    // Constants :
    const pageSize = 100;

    // Data :
    let leaderboardSize = 0;
    let leaderboard: NFT[] = [];

    // Page :
    let currentPage = 1;
    let maxPage = 1;
    let pageDosentExist = false;

    // Functions :
    async function updateLeaderboard(start: number, end: number) : Promise<void> {
        // Reset leaderboard :
        leaderboard = [];

        // Update current page variable and url param :
        currentPage = Math.floor(start / pageSize) + 1;

        if(browser) updateParam("page", currentPage.toString());

        // Get the data of this page :
        const lb = await getLeaderboard(start, end);

        if(!lb.success){
            updateLeaderboard(0, 99);

            return;
        }

        // Update leaderboard data :
        leaderboardSize = lb.body.total_count;
        leaderboard = lb.body.top_nfts;

        // Update max page :
        maxPage = Math.ceil(leaderboardSize / pageSize);
    }

    // Events : 
    function changePage(event: CustomEvent) : void {
        const page: number = event.detail.page;

        updateLeaderboard(page * pageSize - 100, page * pageSize);
    }

    // Svelte cycle :
    onMount(() => {
        currentPage = browser ? +getParam("page") || 1 : 1;

        updateLeaderboard(currentPage * pageSize - 100, currentPage * pageSize);
    });
</script>

<div class="w-8/12">
    <Card pySize="small">
        <!-- Table header -->
        <div class="flex justify-between">
            <div class="flex">
                <span class="w-16"><Text size="large">#</Text></span>
    
                <Text size="large">NFT</Text>
            </div>
    
            <Text size="large">Prestige Points</Text>
        </div>
    
        <div class="-mx-6"><Line/></div>
    
        <!-- Table body -->
        {#if leaderboard.length}
            {#each leaderboard as nft, i}
                <div class="flex justify-between items-center my-4">
                    <div class="flex items-center">
                        <span class="w-16"><Text>{i + (currentPage - 1) * pageSize + 1}</Text></span>

                        <div class="flex items-center">
                            <img src={nft.two_d_picture} alt={nft.name + " picture"} class="h-12 w-12 rounded-full mr-4">

                            <div>
                                <Text>{nft.name}</Text>
                                <Text size="small">
                                    owned by 
                                    <Link href={"/profile/" + nft.holder_username}>
                                        @{nft.holder_username}
                                    </Link>
                                </Text>
                            </div>
                        </div>
                    </div>

                    <Text>{nft.prestige_balance}</Text>
                </div>
            {/each}
        {:else}
            <span class="flex justify-center"><Loading/></span>
        {/if}
    
        <div class="-mx-6"><Line/></div>
    
        <!-- Table pages -->
        <span class="flex justify-center items-center">
            <Pagination 
                bind:currentPage={currentPage} 
                bind:maxPage={maxPage} 
                on:click={e => changePage(e)}
            />
        </span>
    </Card>
</div>