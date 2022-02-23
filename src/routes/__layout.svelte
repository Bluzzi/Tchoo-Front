<script lang="ts">
    import "/static/css/tailwind.css"

    import Navbar from "$lib/components/layout/navbar/Navbar.svelte";
    import MediaLinks from "$lib/components/layout/MediaLinks.svelte";
</script>

<div class="min-h-screen max-w-full bg-purple-2">
    <Navbar/>

    <slot/>
</div>

<!-- Fixed components -->
<MediaLinks/>