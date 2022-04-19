<script lang="ts">
    export let margin: boolean = true;
</script>

<ul class="list-disc" class:ml-8={margin}>
    <slot/>
</ul>