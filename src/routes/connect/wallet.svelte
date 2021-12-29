<script lang="ts">
    import Button from "$lib/components/elements/Button.svelte";
    import H1 from "$lib/components/texts/H1.svelte";
    import type { ProofableLogin, WalletProviderId } from "$lib/maiar/wallet/WalletTypes";
    import { WalletService } from "$lib/maiar/wallet/WalletConnection";
    import MaiarLogin from "$lib/components/special/wallet/MaiarLogin.svelte";
    import { v4 as uuidV4 } from "uuid";
    import { onMount } from "svelte";

    let tgm: HTMLDivElement;

    async function connect(providerId: WalletProviderId) : Promise<void> {
        await WalletService.getInstance().init(providerId);

        if(providerId === "maiar_app"){
            const maiarLogin = await WalletService.getInstance().login(uuidV4()); // TODO : change with Tchoos login token

            new MaiarLogin({
                target: tgm,
                props: {
                    uriCode: maiarLogin.uriCode,
                    appLink: maiarLogin.appLink
                }
            });
        } else {
            WalletService.getInstance().login(uuidV4()); // TODO : change with Tchoos login token
        }
    }

    // Finalyze the web provider connection :
    onMount(async () => {
        const urlSearch = new URLSearchParams(window.location.search);

        if(urlSearch.get("address") && urlSearch.get("signature")){
            const proofableLogin: ProofableLogin = {
                address: urlSearch.get("address"),
                signature: urlSearch.get("signature")
            }

            await WalletService.getInstance().init("web");
            WalletService.getInstance().finalizeLogin(proofableLogin);
        }
    });
</script>

<H1 align="center" color="white">Choose the way you want to connect to the Elrond wallet :</H1>

<div class="buttons">
    <Button onClick={() => connect("maiar_app")}>Maiar App</Button>
    <Button onClick={() => connect("maiar_extension")}>Maiar Extension</Button>
    <Button onClick={() => connect("hardware")}>Ledger</Button>
    <Button onClick={() => connect("web")}>Web Wallet</Button>
</div>

<div bind:this={tgm}></div>

<style lang="scss">
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        :global(> .button) {
            margin: 10px;
        }
    }
</style>