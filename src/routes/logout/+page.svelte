<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import {currentUser} from '$lib/pocketbase';

    let fadeOut = false;

    onMount(() => {
        currentUser.set(null);
        setTimeout(() => {
            console.log("Logged out");
            fadeOut = true;
            setTimeout(() => {
                goto('/');
            }, 1000);
        }, 3000);
    });
</script>

<div class="container-box text-center text-red-500 mt-30" class:fade-out={fadeOut}>
    <p class="text-3xl">You have been logged out.</p>
    <p class="text-3xl">Redirecting...</p>
</div>

<!-- Redirecting...-->

<style>
    .container-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 70vh;
        transition: opacity 1s;
    }

    .fade-out {
        opacity: 0;
    }
</style>
