<script lang="ts">
    import CardClose from "$lib/components/box/card-close/CardClose.svelte";
    import Button from "$lib/components/elements/Button.svelte";
    import { isMobile } from "$lib/utils/Device";
    import H2 from "$lib/components/texts/H2.svelte";

    export let uriCode: string;
    export let appLink: string;

    const uriCodeEncoded = encodeURIComponent(uriCode);
    const qrCodeSize = "200";
</script>

<CardClose>
    <div class="container">
        <H2 color="white">Scan QR Code with Maiar App :</H2>

        <img 
            src={
                "https://api.qrserver.com/v1/create-qr-code/?size=" + 
                qrCodeSize + "x" + qrCodeSize + "&data=" + uriCodeEncoded
            } 
            alt="QR code"
        />

        {#if isMobile()}
            <!-- TODO -->
            <Button href={appLink + uriCodeEncoded}>Maiar App</Button>
        {/if}
    </div>
</CardClose>

<style lang="scss">
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            border: $color-primary solid 3px;
            border-radius: 5px;
        }
    }
</style>