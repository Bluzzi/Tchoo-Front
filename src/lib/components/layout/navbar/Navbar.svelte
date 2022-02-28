<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import NavItem from "$lib/components/layout/navbar/NavItem.svelte";
    import IconButton from "$lib/components/elements/buttons/IconButton.svelte";
    import { navigating } from "$app/stores";
    import { token, username, wallet } from "$lib/api/AccountStore";
    import { goto } from "$app/navigation";

    // Active state for mobile device :
    let active = true;

    navigating.subscribe(() => active = false);

    // Redirect function for login/register pages :
    function connect(type: "login" | "register") : void {
        const currentPath = window.location.pathname;

        const route = type === "login" ? "/connect" : "/connect/register";
        const redirect = currentPath && !["/", "/connect", "/connect/register"].includes(currentPath) ? 
            "?redirect=" + currentPath : "";

        goto(route + redirect);
    }
</script>

<nav 
    class:lg:hidden={!active}
    class="bg-gray-2 h-navbar w-full
    flex justify-around items-center
    lg:h-screen lg:flex-col lg:justify-evenly lg:fixed lg:z-50"
>
    <!-- Title -->
    <Button theme="void" href="/"><Text type="h1" size="large">THE TCHOOS</Text></Button>
    
    <!-- Navbar elements -->
    <ul class="flex lg:flex-col lg:items-center">
        <NavItem route="/lottery">Lottery</NavItem>
        <NavItem route="/leaderboard">Leaderboard</NavItem>
        <NavItem route="/the-lab">The lab</NavItem>
    </ul>

    <div class="flex lg:flex-col lg:items-center">
        {#if $token}
            {#if $wallet}
                <!-- Login and wallet linked -->
                <Button theme="void" uppercase={false}>@{$username}</Button>
                
                <span class="w-2"></span>
                
                <Button 
                    theme="outline" uppercase={false}
                    icon="/img/icon/other/link-primary.svg" 
                    href="/connect/wallet"
                >{$wallet.slice(0, 3)}...{$wallet.slice($wallet.length - 4)}</Button>
            {:else}
                <!-- Login but wallet not linked -->
                <Button theme="void" uppercase={false}>@{$username}</Button>

                <span class="w-2"></span>

                <Button href="/connect/wallet">Link wallet</Button>
            {/if}
        {:else}
            <!-- Not login -->
            <Button theme="void" on:click={() => connect("login")}>Login</Button>

            <span class="w-2"></span>

            <Button on:click={() => connect("register")}>Sign up</Button>
        {/if}
    </div>
</nav>

<!-- Mobile icon for open navbar -->
<span class="fixed right-5 bottom-5 hidden lg:block lg:z-50">
    <IconButton 
        src={active ? "/img/icon/navigation/xmark-white.svg" : "/img/icon/navigation/bars-white.svg"} 
        alt="Open navbar" on:click={() => active = !active}
    />
</span>