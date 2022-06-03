<script lang="ts" context="module">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit";

    export async function load(request: LoadInput) : Promise<LoadOutput> {
        return {
            props: {
                username: request.params.username
            }
        }
    }
</script>

<script lang="ts">
    import Text from "$lib/components/elements/texts/Text.svelte";
    import { getInfoByUsername, type PublicAccount } from "$lib/api/endpoints/ExternalAccount";
    import Title from "$lib/components/elements/Title.svelte";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import "swiper/css";

    // User information :
    let userDoesNotExist = false;

    export let username: string;
    let user: PublicAccount;

    async function checkUser() : Promise<void> {
        const response = await getInfoByUsername(username);

        if(response.success){
            user = response.body;
        } else {
            userDoesNotExist = true;
        }
    }

    checkUser();

    // Mechanics :
    let tgm;
    
    function navigation(direction: "right" | "left") : void {
        console.log(tgm.virtualIndex);
    }
</script>

<Title text={"Profile " + username}/>

{#if userDoesNotExist}
    <div class="grid place-content-center h-navbar-adjust">
        <Text size="large">User <span class="underline">{username}</span> does not exist 🔍</Text>
    </div>
{:else}
    <div class="h-navbar-adjust grid grid-rows-4">
        <span class="text-center grid place-content-center">
            <Text header type="h2" size="xxl-auto">
                <span class="underline">{username}</span>'s collection
            </Text>
        </span>

        <div class="flex items-center justify-center gap-10 flex-wrap bg-gray-1 rounded-t-lg row-span-3 pt-8">
            <div class="h-full grid place-content-center bg-gray-1">
                <img 
                    src="/img/icon/navigation/arrow-left-white.svg" 
                    alt="arrow left" class="h-10 cursor-pointer" 
                    on:click={() => navigation("left")}
                >
            </div>

            <div class="h-[450px] w-[1200px]">
                <Swiper slidesPerView={3} loop
                    on:slideChange={e => console.log("slide change", e.detail[0].activeIndex)}
                    on:swiper={e => console.log(e.detail[0].activeIndex)}
                >
                    <SwiperSlide>
                        <div class="flex items-center justify-center rounded shadow bg-primary-1 h-[400px] w-[400px]">
                            <img src="/img/logo.png" alt="logo" class="h-auto w-9/12">
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div class="flex items-center justify-center rounded shadow bg-secondary h-[450px] w-[450px]">
                            <img src="/img/logo.png" alt="logo" class="h-auto w-9/12">
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div class="flex items-center justify-center rounded shadow bg-primary-2 h-[400px] w-[400px]">
                            <img src="/img/logo.png" alt="logo" class="h-auto w-9/12">
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <img 
                src="/img/icon/navigation/arrow-right-white.svg" 
                alt="arrow right" class="h-10 cursor-pointer" 
                on:click={() => navigation("right")}
            >
        </div>
    </div>
{/if}

<!-- <style lang="scss">
    .tgm {
        // 29272B

        box-shadow: 15px 0 10px rgba($color: #29272B, $alpha: 0.7);
        z-index: 5;
    }

    .tgm1 {
        animation: test 4s forwards;
    }

    .tgm2 {
        animation: test2 4s forwards;
    }

    .tgm3 {
        animation: test3 4s forwards;
    }

    @keyframes test {
        from {
            transform: translateX(0);
            opacity: 1;
        }

        to {
            transform: translateX(-440px);
            opacity: 0;
        }
    }

    @keyframes test2 {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-440px);
            height: 400px;
            width: 400px;
        }
    }

    @keyframes test3 {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-440px);
            height: 450px;
            width: 450px;
        }
    }
</style> -->