<script lang="ts">
    export let align: "left" | "center" | "right" = "left";
</script>

<p style={"text-align: " + align}><slot/></p>

<style lang="scss">
    p {
        color: white;
        font-size: 1.1em;
    }
</style>