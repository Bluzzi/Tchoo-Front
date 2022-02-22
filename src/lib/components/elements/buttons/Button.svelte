<script lang="ts">
    // Parameters :
    export let onClick: () => void = () => {};

    export let href: string | null = null;
    export let target: "internal" | "external" = "internal";

    export let background = true;

    export let disabled = false;

    export let icon: string | null = null;

    // Button styles :
    const buttonStyles = {
        base: `
            border border-primary-1
            text-white uppercase 
            px-4 py-2 m-2 rounded shadow-sm
            flex justify-center items-center
        `,
        actived: `
            bg-primary-1 hover:scale-98
            transition-all delay-75
        `,
        disabled: `
            bg-transparent
        `
    }

    const disabledStyle = buttonStyles[disabled ? "disabled" : "actived"];

    let finalStyle = buttonStyles.base + disabledStyle;
    finalStyle = background ? 
        finalStyle : 
        finalStyle.replace(/bg-primary-1|bg-transparent|border|shadow/gm, "");

    // Icon style :
    const iconStyle = "h-5 w-5 mr-2";
</script>

{#if href}
    <a {href} target={target === "external" ? "_blank" : ""}>
        <button 
            class={finalStyle} 
            disabled={disabled}
        >
            {#if icon}
                <img src={icon} alt="logo" class={iconStyle}>
            {/if}

            <slot/>
        </button>
    </a>
{:else}
    <button 
        on:click={() => onClick()} 
        class={finalStyle} 
        disabled={disabled}
    >
        {#if icon}
            <img src={icon} alt="logo" class={iconStyle}>
        {/if}

        <slot/>
    </button>
{/if}