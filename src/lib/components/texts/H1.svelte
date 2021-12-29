<script lang="ts">
    export let align: "left" | "center" | "right" = "left";
    export let color: "primary" | "white" = "primary";
</script>

<p style={"text-align: " + align} class:white={color === "white"}><slot/></p>

<style lang="scss">
    p {
        color: $color-primary;
        font-size: 1.7em;
    }

    .white {
        color: white;
    }
</style>