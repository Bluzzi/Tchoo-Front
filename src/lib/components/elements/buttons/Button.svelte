<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Basic attributes :
    export let href: string | null = "javascript:void(0);";
    export let target: "_self" | "_blank" = "_self";

    export let icon: string | null = null;

    // Styles attributes :
    type Theme = "solid" | "outline" | "void";
    export let theme: Theme = "solid";

    export let uppercase = true;
    export let fullWidth = false;

    export let iconLeft = false;

    // Event dispatcher :
    const dispatch = createEventDispatcher();

    // Button CSS definition :
    const baseStyle = `flex justify-center items-center text-white px-5 py-2 
        rounded transition-all delay-75 hover:scale-98 relative`;

    const variantsStyle: { [key in Theme]: string } = {
        solid: "bg-primary-1 border border-primary-1 shadow-sm",
        outline: "border border-primary-1 shadow-sm",
        void: ""
    }
</script>

<a 
    {href} target={target === "_blank" ? "_blank" : ""} 
    on:click={e => dispatch("click", { nativeEvent: e })}
    
    class={baseStyle + " " + variantsStyle[theme]}
    class:uppercase={uppercase} class:w-full={fullWidth} 
    class:w-max={!fullWidth}
>
    {#if icon}
        <img src={icon} alt="icon" class="h-5 w-5 mr-2" 
            class:absolute={iconLeft} class:left-2={iconLeft}
        >
    {/if}

    <slot/>
</a>