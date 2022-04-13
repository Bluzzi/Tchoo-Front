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

    type Size = "normal" | "large";
    export let size: Size = "normal";

    // Event dispatcher :
    const dispatch = createEventDispatcher();

    // Button CSS definition :
    const baseStyle = `flex justify-center items-center text-white
        rounded transition-all delay-75 hover:scale-98 relative`;

    const variantsStyle: { [key in Theme]: string } = {
        solid: "bg-primary-1 border border-primary-1 shadow-sm",
        outline: "border border-primary-1 shadow-sm",
        void: ""
    }

    const sizeStyle: { [key in Size]: string } = {
        normal: "px-2.5 py-2",
        large: "px-7 py-3"
    }
</script>

<a 
    {href} target={target === "_blank" ? "_blank" : ""} 
    on:click={e => dispatch("click", { nativeEvent: e })}
    
    class={baseStyle + " " + variantsStyle[theme] + " " + sizeStyle[size]}
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