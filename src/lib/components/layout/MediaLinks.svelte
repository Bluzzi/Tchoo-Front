<script lang="ts">
    import IconButton from "$lib/components/elements/buttons/IconButton.svelte";
</script>

<div class="h-44 fixed left-9 bottom-9 flex flex-col justify-between lg:flex-row lg:h-max lg:w-44 lg:left-5 lg:bottom-5">
    <IconButton src="/img/icon/social/instagram.svg" alt="Instagram" onClick={() => window.open("https://www.instagram.com/thetchoos", "_blank")}/>
    <IconButton src="/img/icon/social/discord.svg" alt="Discord" onClick={() => window.open("https://discord.gg/XE45DJ3TVa", "_blank")}/>
    <IconButton src="/img/icon/social/twitter.svg" alt="Twitter" onClick={() => window.open("https://twitter.com/TheTchoos", "_blank")}/>
</div>