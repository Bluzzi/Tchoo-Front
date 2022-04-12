<script lang="ts">
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
</script>

<Title/>

<header class="h-navbar-adjust pt-32 bg-sun-tornado-animated bg-fixed bg-cover bg-center lg:h-screen lg:flex lg:justify-center lg:flex-col">
    <img 
        src="/img/banner/banner-white.svg" 
        alt="The Tchoos banner"
        class="h-40 mx-auto lg:h-auto lg:w-9/12"
    />

    <img 
        src="/img/other/triple-tchoos.png" 
        alt="Triple Tchoos"
        class="mx-auto mb-10 lg:w-11/12 lg:mb-32"
    />

    <span class="w-max mx-auto block"><Button>Mint a NFT</Button></span>

    <img src="/img/icon/navigation/down-arrows-white.svg" alt="scroll arrows indicator" class="h-6 w-6 mx-auto mt-9 animate-bounce">
</header>

<section class="h-screen bg-gray-2">
    <!-- TODO -->
</section>

<Footer/>