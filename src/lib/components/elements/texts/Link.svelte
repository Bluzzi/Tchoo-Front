<script lang="ts">
    export let href: string | null = null;
    export let target: "internal" | "external" = "internal";
</script>

<a {href} target={target === "external" ? "_blank" : ""} class="text-primary-1 hover:underline"><slot/></a>