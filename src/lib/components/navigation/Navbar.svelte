<script lang="ts">
    import { goto } from "$app/navigation";
    import H3 from "$lib/components/texts/H3.svelte";
</script>

<nav>
    <img src="/img/logo/logo-transparent.png" alt="logo">
    
    <ul>
        <li on:click={() => goto("/")}><H3>Home</H3></li>
        <li on:click={() => goto("/")}><H3>My pets</H3></li>
    </ul>
</nav>

<style lang="scss">
    nav {
        height: $size-navbar-height;
        width: 100%;

        background-color: $color-primary;

        display: flex;
        align-items: center;
        justify-content: space-between;

        $padding-x: 30px;

        :first-child {
            margin-left: $padding-x;
        }

        :last-child {
            margin-right: $padding-x;
        }

        img {
            height: 75%;
            width: auto;
        }

        ul {
            display: flex;
            align-items: center;
            justify-content: center;

            li {
                margin: 0 10px;

                cursor: pointer;

                list-style: none;

                color: white;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>