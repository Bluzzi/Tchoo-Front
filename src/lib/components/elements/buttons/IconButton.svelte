<script lang="ts">
    export let src: string;
    export let alt: string;

    export let onClick: () => void = () => {};
</script>

<div 
    class="bg-gray-1 h-12 w-12 flex 
    justify-center items-center 
    rounded-full shadow
    transform-all hover:scale-95
    hover:brightness-105"
    on:click={() => onClick()} 
>
    <img {src} {alt} class="h-6 w-6">
</div>