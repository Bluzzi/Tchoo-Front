<script lang="ts">
    export let pySize: "small" | "base" = "base";
</script>

<div 
    class="bg-gray-1 w-full px-6 rounded shadow" 
    class:py-8={pySize === "base"} 
    class:py-4={pySize === "small"}
><slot/></div>