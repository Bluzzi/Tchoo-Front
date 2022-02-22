<script lang="ts">
    export let src: string;
    export let alt: string;
</script>

<div 
    class="bg-gray-1 h-12 w-12 flex 
    justify-center items-center 
    rounded-full shadow
    transform-all hover:scale-95
    hover:brightness-105"
>
    <img {src} {alt} class="h-6 w-6">
</div>