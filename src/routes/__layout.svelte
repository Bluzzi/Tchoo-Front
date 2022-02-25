<script lang="ts">
    import Navbar from "$lib/components/layout/navbar/Navbar.svelte";
    import MediaLinks from "$lib/components/layout/MediaLinks.svelte";
    import Notifications from "$lib/components/layout/notification/Notifications.svelte";
    import "/static/css/tailwind.css"
</script>

<div class="min-h-screen max-w-full bg-purple-2">
    <Navbar/>

    <slot/>
</div>

<!-- Fixed components -->
<Notifications/>
<MediaLinks/>