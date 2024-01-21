<script>
    import {initGoogleAuth } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    import {onMount} from 'svelte';

    let referrer = "/";
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('referrer')){
            referrer = urlParams.get('referrer');
        }
    });
    
    function loginWithGoogle() {
        initGoogleAuth();
        goto(referrer);
    }
</script>

<main class="flex flex-col items-center justify-center m-auto ">
    <div class="ct bg-gray-1000 rounded text-center">
        <h1 class="mb-4 text-white">Login</h1>
        <button on:click={loginWithGoogle}>
            <img src={'/components/signin-assets/Web/png@3x/dark/web_dark_sq_ctn@3x.png'} alt="Google Login"/>
        </button>
    </div>
</main>


<style lang="postcss">

    h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
    }

    img {
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
        min-width: 100px;
        width: 85%;
        max-width: 500px;
        padding: 4rem;
    }

</style>

