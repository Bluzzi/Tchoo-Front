<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import NavItem from "$lib/components/navigation/navbar/NavItem.svelte";
    import IconButton from "$lib/components/elements/buttons/IconButton.svelte";
    import { navigating } from "$app/stores";

    let active = true;

    navigating.subscribe(() => active = false);
</script>

<nav 
    class:lg:hidden={!active}
    class="bg-gray-2 h-navbar w-full
    flex justify-around items-center
    lg:h-screen lg:flex-col lg:justify-evenly lg:fixed"
>
    <Button background={false} href="/"><Text type="h1" size="large">THE TCHOOS</Text></Button>
    
    <ul class="flex lg:flex-col lg:items-center">
        <NavItem route="/lottery">Lottery</NavItem>
        <NavItem route="/leaderboard">Leaderboard</NavItem>
        <NavItem route="/the-lab">The lab</NavItem>
    </ul>

    <div class="flex lg:flex-col lg:items-center">
        <Button background={false}>Login</Button>
        <Button>Sign in</Button>
    </div>
</nav>

<span class="fixed right-5 bottom-5 hidden lg:block">
    <IconButton 
        src={active ? "/img/icon/navigation/xmark-white.svg" : "/img/icon/navigation/bars-white.svg"} 
        alt="Open navbar" onClick={() => active = !active}
    />
</span>