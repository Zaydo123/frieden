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

<main class="flex flex-col items-center justify-center m-auto">
    <div class="ct bg-tertiary-900 rounded text-center">
        <h2 class="text-white">Sign In</h2>
        <button on:click={()=>{loginWithGoogle}}>
            <img src={'/components/signin-assets/Web/png@3x/dark/web_dark_sq_ctn@3x.png'} alt="Google Login"/>
            <p class="text-secondary-400 text-left">Allow Popups to Sign In</p>
        </button>
    </div>
</main>


<style lang="postcss">

    h2 {
        font-weight: 700;
    }

    p {
        @apply pt-2;
        font-size: 0.875rem;
    }

    img {
        padding-top:50px;
        max-width: 250px;
    }
    
    main {
        height: 80vh;
    }
    
    .ct{
        min-width: 350px;
        width: 55%;
        max-width: 450px;
        padding: 4rem 0rem 4rem 0rem;
    }

</style>

