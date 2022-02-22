<script lang="ts">
    import Text from "$lib/components/elements/Text.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
</script>

<nav class="pl-5 pr-5 h-16 bg-gray-1 flex justify-around items-center">
    <Button background={false}><Text type="h1" size="large">THE TCHOOS</Text></Button>
    
    <ul class="flex">
        <li><Button background={false}>LOTTERY</Button></li>
        <li><Button background={false}>LEADERBOARD</Button></li>
        <li><Button background={false}>THE LAB</Button></li>
    </ul>

    <div class="flex">
        <Button background={false}>Login</Button>
        <Button>Sign in</Button>
    </div>
</nav>