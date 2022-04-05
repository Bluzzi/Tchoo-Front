<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Input from "$lib/components/elements/form/Input.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import { changePassword } from "$lib/api/endpoints/Account";
    import { goto } from "$app/navigation";
    import { username } from "$lib/api/stores/Account";
    import { pushNotification } from "$lib/components/layout/notification/Notifications";

    let oldPassword: string;
    let newPassword: string;

    async function apiRequest() : Promise<void> {
        const response = await changePassword(oldPassword, newPassword);

        if(response.success){
            goto("/profile/" + $username);
        } else {
            pushNotification(response.message);
        }
    } 
</script>

<Title text="Change password"/>

<div class="grid place-content-center h-navbar-adjust">
    <div class="w-96 lg:w-11/12">
        <Card>
            <div class="flex items-center justify-between flex-col">
                <span class="text-center"><Text size="xl">CHANGE PASSWORD</Text></span>
    
                <div class="h-40 flex justify-between flex-col w-10/12 my-6">
                    <Input title="Old password" type="password" bind:value={oldPassword}/>
                    <Input title="New password" type="password" bind:value={newPassword}/>
                </div>
    
                <div class="flex items-center justify-center flex-col w-4/6">
                    <Button on:click={() => apiRequest()} fullWidth>Change password</Button>
                </div>
            </div>
        </Card>
    </div>
</div>