<svelte:head>
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<script>
    import "../app.css";    
    import {currentUser} from '$lib/pocketbase';


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

<div class={`nav-container ${isMenuOpen ? 'is-menu-open' : ''}`}>
    <div class="nav-header flex flex-row items-center p-4 pl-[5%] bg-primary-500 shadow-md fixed top-0 left-0 right-0 z-50">
        <div class="align-left flex flex-row items-center">
            <a href="/" class="flex flex-row items-center">
                <img id="logo" src="/frieden.svg" alt="Logo" class="w-12 h-12 rounded-full mr-4">
                <h1 class="text-success-100 text-xl font-bold m-0 p-0">Frieden Foundation</h1>
            </a>
        </div>
        <div class="align-right ml-auto font-bold">
            {#if innerWidth > mobileWidth}
            <a href="/" class="nav-link">Home</a>
            <a href="/page" class="nav-link">Donate</a>
            <a href="/volunteer" class="nav-link">Volunteer</a>
            <a href="/events" class="nav-link">Events</a>
                <a href="/#contact" class="nav-link">Contact</a>
                {#if $currentUser}
                    <a href="/logout" class="nav-link">Sign Out</a>
                {:else}
                    <a href="/login" class="nav-link">Login</a>
                {/if}
            {:else}
                <button class="menu-icon" on:click={() => toggleMenu()}>
                    <img src="/components/icons/menuIcon.svg" alt="Menu" class="h-10 invert w-3/4">
                </button>
            {/if}
            {#if innerWidth <= mobileWidth }
                <div class={`bg-primary-500 mobile-menu absolute top-[65px] left-0 right-0 shadow-lg z-40 p-4 transition-all ease-in-out duration-500 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <a href="/" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Home</a>
                    <a href="/page" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Donate</a>
                    <a href="/volunteer" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Volunteer</a>
                    <a href="/events" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Events</a>
                    <a href="/#contact" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Contact</a>
                    {#if $currentUser}
                        <a href="/logout" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Sign Out</a>
                    {:else}
                        <a href="/login" class="mobile-nav-link" on:click={() => toggleMenu(true)}>Login</a>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

</div>

<style lang="postcss">
    .nav-link {
        @apply text-error-50 text-xs no-underline px-4 transition-all ease-in-out hover:text-red-500;
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