<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Attributes :
    export let title: string;

    export let type = "text";
    export let placeholder = "Enter your " + type + "..";

    export let value: string = "";

    // Event dispatcher :
    const dispatch = createEventDispatcher();

    // Value updater :
    function handleInput(event: Event) : void {
        value = event.target["value"] ?? "";
    }
</script>

<div class="flex flex-col-reverse">
    <label for={type} class="text-sm text-white uppercase ml-1 font-bold">{title}</label>
    <input 
        type={type} placeholder={placeholder} 
        class="rounded outline-none px-3 py-2 border-lg border-white focus:border-primary-1"
        on:change={event => dispatch("change", { value, nativeEvent: event })}
        on:input={handleInput}
    >
</div>