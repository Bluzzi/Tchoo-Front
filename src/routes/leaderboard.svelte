<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import Leaderboard from "$lib/components/layout/Leaderboard.svelte";
</script>

<Title text="Leaderboard"/>

<div class="flex flex-col items-center">
    <Text size="xl" header>LEADERBOARD</Text>

    <Leaderboard/>
</div>