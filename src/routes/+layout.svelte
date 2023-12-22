<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

<script>
    import "../app.css";
    
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    $: outerWidth = 0;
    $: innerWidth = 0;
    $: outerHeight = 0;
    $: innerHeight =  0;
    const mobileWidth = 900;
</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />

<div class="nav-container {isMenuOpen ? 'is-menu-open' : ''}">
    <div class="nav-header">
        <div class="align-left">
            <a href="/" style="display: flex; flex-direction: row; align-items: center;">
                <img id="logo" src="/frieden.svg" alt="Logo" width="50" height="50">
                <h1>Frieden Foundation</h1>
            </a>
        </div>
        <div class="align-right">
            {#if innerWidth > mobileWidth}
            <a href="#about">About</a>
            <a href="/page">Contact</a>
            <a href="/page">FAQ</a>
            <a href="/page">Events</a>
            <a href="/page">Donate</a>
            <a href="/page">Volunteer</a>
            {:else}
            <button class="menu-icon" on:click={toggleMenu}>
                <img src="components/icons/menuIcon.svg" alt="Menu" width="50" height="50">
            </button>
            {/if}
        </div>
    </div>

    {#if innerWidth <= mobileWidth}
    <div class="mobile-menu">
        <a href="#about">About</a>
        <a href="/page">Contact</a>
        <a href="/page">FAQ</a>
        <a href="/page">Events</a>
        <a href="/page">Donate</a>
        <a href="/page">Volunteer</a>
    </div>
    {/if}
</div>

<style lang="postcss">
    .nav-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem;
        padding-left: 5%;
        background-color: #000000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    .nav-header a {
        font-family: 'Montserrat';
        font-size: .8rem;
        text-decoration: none;
        color: #ffff;
        padding: 0 1rem;
        transition: all 0.2s ease-in-out;
    }

    .nav-header h1 {
        color: #ffff;
        margin-left: 1rem;
    }

    .nav-header a:hover {
        color: #ff0000;
    }

    #logo {
        border-radius: 50%;
        margin-right: 1rem; 
    }

    .align-right {
        margin-left: auto;
    }

    .menu-icon {
        filter: invert(1);
        transform: scale(80%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .align-left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    h1 {
        font-family: 'Montserrat';
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
        padding: 0;
    }

    @media (max-width: 900px) {
        .nav-header {
            flex-direction: row;
            align-items: center;
        }
    }

    .mobile-menu {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        position: absolute;
        top: 85px;
        left: 0;
        right: 0;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 999;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    .is-menu-open .mobile-menu {
        max-height: 500px;
        opacity: 1;
    }

    .mobile-menu a {
        font-family: 'Montserrat';
        color: #000;
        padding: 0.5rem 1rem;
        text-decoration: none;
    }

    .mobile-menu a:hover {
        background-color: #f0f0f0;
    }
</style>

<slot/>

