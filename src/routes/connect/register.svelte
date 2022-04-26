<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import Link from "$lib/components/elements/texts/Link.svelte";
    import Card from "$lib/components/container/Card.svelte";
    import Input from "$lib/components/elements/form/Input.svelte";
    import Button from "$lib/components/elements/buttons/Button.svelte";
    import Title from "$lib/components/elements/Title.svelte";
    import { register } from "$lib/api/endpoints/Account";
    import { redirectByParam } from "$lib/utils/Redirect";
    import { pushNotification } from "$lib/components/layout/notification/Notifications";

    let username: string;
    let password: string;

    async function apiRequest() : Promise<void> {
        const response = await register(username, password);

        if(response.success){
            redirectByParam(window.location);
        } else {
            pushNotification(response.message);
        }
    } 
</script>

<Title text="Register"/>

<div class="flex items-center justify-center h-navbar-adjust">
    <div class="w-96 lg:w-11/12">
        <Card>
            <div class="flex items-center justify-between flex-col h-96">
                <Text size="xxl">REGISTER</Text>
    
                <div class="h-40 flex justify-between flex-col w-10/12">
                    <Input title="Username" type="username" bind:value={username}/>
                    <Input title="Password" type="password" bind:value={password}/>
                </div>
    
                <div class="flex items-center justify-center flex-col w-4/6">
                    <Button on:click={() => apiRequest()} fullWidth>Register</Button>

                    <span class="h-3"></span>
                    
                    <Text size="small">Already have an account ? <Link href="/connect">Login</Link></Text>
                </div>
            </div>
        </Card>
    </div>
</div>