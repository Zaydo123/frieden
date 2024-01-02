<script>
    import "../app.css";
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    $: outerWidth = 0;
    $: innerWidth = 0;
    $: outerHeight = 0;
    $: innerHeight = 0;
    const mobileWidth = 900;
</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />

<div class={`nav-container ${isMenuOpen ? 'is-menu-open' : ''}`}>
    <div class="nav-header flex flex-row items-center p-4 pl-[5%] bg-black shadow-md fixed top-0 left-0 right-0 z-50">
        <div class="align-left flex flex-row items-center">
            <a href="/" class="flex flex-row items-center">
                <img id="logo" src="/frieden.svg" alt="Logo" class="w-12 h-12 rounded-full mr-4">
                <h1 class="text-white text-xl font-medium m-0 p-0">Frieden Foundation</h1>
            </a>
        </div>
        <div class="align-right ml-auto">
            {#if innerWidth > mobileWidth}
                <a href="#about" class="nav-link">About</a>
                <a href="/page" class="nav-link">Contact</a>
                <a href="/page" class="nav-link">FAQ</a>
                <a href="/page" class="nav-link">Events</a>
                <a href="/page" class="nav-link">Donate</a>
                <a href="/page" class="nav-link">Volunteer</a>
            {:else}
                <button class="menu-icon" on:click={toggleMenu}>
                    <img src="components/icons/menuIcon.svg" alt="Menu" class="h-12 invert w-3/4">
                </button>
            {/if}
            {#if innerWidth <= mobileWidth}
                <div class={`mobile-menu absolute top-[85px] left-0 right-0 bg-black shadow-lg z-40 p-4 transition-all ease-in-out duration-300 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <a href="#about" class="mobile-nav-link">About</a>
                    <a href="/page" class="mobile-nav-link">Contact</a>
                    <a href="/page" class="mobile-nav-link">FAQ</a>
                    <a href="/page" class="mobile-nav-link">Events</a>
                    <a href="/page" class="mobile-nav-link">Donate</a>
                    <a href="/page" class="mobile-nav-link">Volunteer</a>
                </div>
            {/if}
        </div>
    </div>

</div>

<style lang="postcss">
    .nav-link {
        @apply text-white text-sm no-underline px-4 transition-all ease-in-out;
    }

    .menu-icon {
        @apply bg-none border-none cursor-pointer p-0;
    }

    .mobile-menu {
        @apply overflow-hidden;
        height: 100vh;
        background-color: #000000;
        display: flex;
        flex-direction: column;
        align-left: center;
    }

    .mobile-nav-link {
        @apply text-white no-underline transition-all ease-in-out duration-300 border-b border-gray-400 p-3 text-3xl hover:text-red-500;

    }

    .mobile-nav-link:last-child {
        @apply border-none;
    }
    

</style>

<slot/>
