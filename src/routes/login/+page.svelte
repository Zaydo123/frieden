<script>
    import { initGoogleAuth } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let referrer = "/";
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('referrer')) {
            referrer = urlParams.get('referrer');
        }
    });

    function loginWithGoogle() {
        initGoogleAuth();
        goto(referrer);
    }
</script>

<main class="flex flex-col items-center justify-center m-auto h-70vh">
    <div class="ct bg-tertiary-900 rounded text-center w-85% max-w-500px p-16">
        <h3>Sign In</h3>
        <button on:click={loginWithGoogle}>
            <img src={'/components/signin-assets/Web/png@3x/dark/web_dark_sq_ctn@3x.png'} alt="Google Login"/>
        </button>
    </div>
</main>


<style lang="postcss">

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
    }

    img {
        padding-top:50px;
        max-width: 250px;
        width:100%;
        min-width: 100px;
        margin-top: 1rem;
        margin: auto;
    }
    
    main {
        height: 70vh;
    }
    
    .ct{
        min-width: 350px;
        width: 55%;
        max-width: 450px;
        height: 500px;
        padding: 4rem;
    }

</style>

