<script lang="ts">
    import "/static/css/tailwind.css"
    import Navbar from "$lib/components/navigation/Navbar.svelte";
</script>

<Navbar/>

<div class="container">
    <slot/>
</div>

<style lang="scss">
    .container {
        height: calc(100vh - $size-navbar-height);
        width: 100%;

        background-color: #2C2F33;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>