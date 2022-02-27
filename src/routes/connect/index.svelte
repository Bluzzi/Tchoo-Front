<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Link from "$lib/components/elements/texts/Link.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Input from "$lib/components/elements/form/Input.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import { login } from "$lib/api/endpoints/Account";
    import { redirectByParam } from "$lib/utils/Redirect";
    import { pushNotification } from "$lib/components/layout/notification/Notifications";

    let username: string;
    let password: string;

    async function apiRequest() : Promise<void> {
        const response = await login(username, password);

        if(response.success){
            redirectByParam(window.location);
        } else {
            pushNotification(response.message);
        }
    } 
</script>

<div class="flex items-center justify-center h-navbar-adjust">
    <div class="w-96 lg:w-11/12">
        <Card>
            <div class="flex items-center justify-between flex-col h-96">
                <Text size="xl">LOGIN</Text>
    
                <div class="h-44 flex justify-between flex-col w-5/6">
                    <Input title="Username" type="username" bind:value={username}/>
                    <Input title="Password" type="password" bind:value={password}/>
                </div>
    
                <div class="flex items-center justify-center flex-col w-4/6">
                    <Button on:click={() => apiRequest()} fullWidth>Login</Button>
                    <Text size="small">Not account yet ? <Link href="/connect/register">Register</Link></Text>
                </div>
            </div>
        </Card>
    </div>
</div>