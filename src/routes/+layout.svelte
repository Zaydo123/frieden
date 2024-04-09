<svelte:head>
    <title>Frieden Foundation</title>
</svelte:head>

<script>
    import "../app.css";    
    import {currentUser} from '$lib/pocketbase';
    import { initializeStores } from '@skeletonlabs/skeleton';
    initializeStores();


    let isMenuOpen = false;

    function toggleMenu(forceClose = false) {
        isMenuOpen = forceClose ? false : !isMenuOpen;
        const menu = document.querySelector('.mobile-menu');

        if (isMenuOpen) {
            menu.style.opacity = '1';
            menu.style.pointerEvents = 'auto';
        } else {
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.style.pointerEvents = 'none';
            }, 500); // Sync with the opacity transition duration
        }
    }

    $: outerWidth = 0;
    $: innerWidth = 0;
    $: outerHeight = 0;
    $: innerHeight = 0;
    const mobileWidth = 900;

</script>


<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />

<div class={`nav-container ${isMenuOpen ? 'is-menu-open' : ''} transition-all ease-in-out duration-500`}>
    <div class="nav-header flex items-center p-4 pl-[5%] bg-primary-500 shadow-md fixed top-0 left-0 right-0 z-50">
        <div class="align-left flex items-center">
            <a href="/" class="flex items-center">
                <img id="logo" src="/frieden.svg" alt="Logo" class="w-12 h-12 rounded-full mr-4">
                <h1 class="text-success-100 text-xl font-bold m-0 p-0">Frieden Foundation</h1>
            </a>
        </div>
        <div class="align-right ml-auto font-bold">
            {#if innerWidth > mobileWidth}
            <div class="flex flex-row space-x-4">
                <a href="/" class="nav-link">Home</a>
                <a href="/about-us" class="nav-link">About Us</a>
                <a href="/faq" class="nav-link">FAQ</a>
                <a href="/donate" class="nav-link">Donate</a>
                <a href="/volunteer" class="nav-link">Volunteer</a>
                <a href="/events" class="nav-link">Events</a>
                <a href="/#contact" class="nav-link">Contact</a>
                {#if $currentUser}
                    <a href="/logout" class="nav-link">Sign Out</a>
                {:else}
                    <!-- <a href="/login" class="nav-link">Login</a> -->
                {/if}
            </div>
            {:else}
                <button class="menu-icon" on:click={() => toggleMenu()}>
                    <img src="/components/icons/menuIcon.svg" alt="Menu" class="h-10 invert sm:w-4/5">
                </button>
            {/if}
            {#if innerWidth <= mobileWidth }
                <div class={`bg-primary-500 mobile-menu absolute top-[65px] left-0 right-0 shadow-lg z-40 p-4 transition-all ease-in-out duration-500 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <a href="/" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Home</a>
                    <a href="/about-us" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>About Us</a>
                    <a href="/faq" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>FAQ</a>
                    <a href="/donate" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Donate</a>
                    <a href="/volunteer" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Volunteer</a>
                    <a href="/events" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Events</a>
                    <a href="/#contact" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Contact</a>
                    {#if $currentUser}
                        <a href="/logout" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Sign Out</a>
                    {:else}
                        <!-- <a href="/login" class="mobile-nav-link" on:click={() => toggleMenu(true)} tabindex={isMenuOpen ? 0 : -1}>Login</a>-->
                    {/if}
                </div>
            {/if}
        </div>
    </div>

</div>

<style lang="postcss">

    /*animate opacity to 1 after page load using keyframes*/
    .nav-container {
        @apply fixed top-0 left-0 right-0 z-50;
        animation-iteration-count: 1;
        animation-duration: 2s;
        animation-name: fadeIn;

    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .nav-link {
        @apply text-error-50 text-base no-underline px-4 transition-all ease-in-out hover:text-red-500;
    }

    .menu-icon {
        @apply bg-none border-none cursor-pointer p-0;
    }

    .hidden-pointer-events {
        pointer-events: none;
    }

    .mobile-menu {
        @apply bg-primary-500;
        @apply overflow-hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: left;
        padding-bottom: 100rem;
        opacity: 0;
        pointer-events: none; /* Disable interactions initially */
        transition: opacity 0.5s ease-in-out, pointer-events 0s 0.5s;
    }


    .mobile-nav-link {
        @apply text-success-100 no-underline transition-all ease-in-out duration-300 border-b border-gray-400 p-3 text-3xl hover:text-red-500;

    }

    .mobile-nav-link:last-child {
        @apply border-none;
    }
    

</style>

<div class="content-container mt-20">
    <slot/>
</div>

<p class="text-center text-white text-xs mt-10">© 2024 Frieden Foundation</p>

