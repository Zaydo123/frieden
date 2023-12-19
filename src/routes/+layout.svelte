<link rel="stylesheet" href="/global.css">
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

<script>

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0

    const mobileWidth = 768;

</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />





<div class="nav-header">
    <div class="align-left">
        <a href="/" style="display: flex; flex-direction: row; align-items: center;">
            <img id="logo" src="/frieden.svg" alt="Logo" width="50" height="50">
            <h1>Frieden Foundation</h1>
        </a>
    </div>
    <div class="align-right">
        {#if innerWidth > mobileWidth}
        <a href="/page">About</a>
        <a href="/page">Contact</a>
        <a href="/page">FAQ</a>
        {/if}
        <a href="/page">Events</a>
        <a href="/page">Donate</a>
        <a href="/page">Volunteer</a>
    </div>
</div>

<style>

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
    }

    .align-right {
        margin-left: auto;
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

    @media (max-width: 768px) {
        .nav-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .nav-header a {
            padding: 0.5rem 1rem;
        }

        .align-right {
            margin-left: 0;
        }

        #logo {
            margin-bottom: 1rem;
        }
    }

</style>




<slot></slot>