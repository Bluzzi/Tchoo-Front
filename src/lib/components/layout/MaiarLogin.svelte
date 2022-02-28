<script lang="ts">
    import CardClose from "$lib/components/container/Popup.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import { isMobile } from "$lib/utils/Device";

    export let uriCode: string;
    export let appLink: string;

    const uriCodeEncoded = encodeURIComponent(uriCode);
    const qrCodeSize = "300";
</script>

<CardClose title="Scan QR code with Maiar App">
    <div class="flex flex-col items-center justify-center">
        <div class="border-[12px] border-white rounded">
            <img 
                src={
                    "https://api.qrserver.com/v1/create-qr-code/?size=" + 
                    qrCodeSize + "x" + qrCodeSize + "&data=" + uriCodeEncoded
                } 
                class="h-[{qrCodeSize}px] w-[{qrCodeSize}px]" alt="QR code"
            />
        </div>
    
        {#if isMobile()}
            <div class="mt-5 w-6/12">
                <Button href={appLink + uriCodeEncoded} target="_blank" fullWidth>Maiar App</Button>
            </div>
        {/if}
    </div>
</CardClose>