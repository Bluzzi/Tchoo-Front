<script lang="ts">
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import type { ProofableLogin, WalletProviderId } from "$lib/maiar/wallet/WalletTypes";
    import { WalletService } from "$lib/maiar/wallet/WalletConnection";
    import MaiarLogin from "$lib/components/layout/MaiarLogin.svelte";
    import { v4 as uuidV4 } from "uuid";
    import { onMount } from "svelte";

    let appLogin: HTMLDivElement;

    async function connect(providerId: WalletProviderId) : Promise<void> {
        await WalletService.getInstance().init(providerId);

        if(providerId === "maiar_app"){
            const maiarLogin = await WalletService.getInstance().login(uuidV4()); // TODO : change with Tchoos login token

            new MaiarLogin({
                target: appLogin,
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

<Title text="Link wallet"/>

<div bind:this={appLogin}></div>

<div class="h-navbar-adjust w-full flex items-center justify-center">
    <div class="w-96">
        <Card>
            <div class="flex items-center flex-col">
                <Text size="xl">LINK WALLET</Text>

                <div class="mt-4 flex flex-col items-center justify-between w-4/6 h-52">
                    <Button 
                        on:click={() => connect("maiar_app")} 
                        icon="/img/icon/wallet/app.svg" 
                        iconLeft fullWidth uppercase={false}
                    >Maiar App</Button>

                    <Button 
                        on:click={() => connect("maiar_extension")} 
                        icon="/img/icon/wallet/extension.svg" 
                        iconLeft fullWidth uppercase={false}
                    >Maiar Extension</Button>

                    <Button 
                        on:click={() => connect("hardware")} 
                        icon="/img/icon/wallet/ledger.svg" 
                        iconLeft fullWidth uppercase={false}
                    >Ledger</Button>

                    <Button 
                        on:click={() => connect("web")} 
                        icon="/img/icon/wallet/web.svg"  
                        iconLeft fullWidth uppercase={false}
                    >Web Wallet</Button>
                </div>
            </div>
        </Card>
    </div>
</div>