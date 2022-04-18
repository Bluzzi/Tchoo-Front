<script lang="ts">
    import Navbar from "$lib/components/layout/navbar/Navbar.svelte";
    import Notifications from "$lib/components/layout/notification/Notifications.svelte";
    import { updateConnection } from "$lib/api/stores/Account";
    import { onMount } from "svelte";
    import "/static/css/tailwind.css"

    onMount(() => window && updateConnection(window.location));
</script>

<div class="min-h-screen max-w-full bg-purple-2">
    <Navbar/>

    <slot/>
</div>

<!-- Fixed components -->
<Notifications/>