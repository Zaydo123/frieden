<script>
    import { onMount, afterUpdate } from 'svelte';

    let scrollPosition = 0;
    let zoomLevel = 1;

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
    });

    afterUpdate(() => {
        if (innerWidth >= mobileWidth) {
            zoomLevel = 1;
        } else {
            zoomLevel = innerWidth / mobileWidth;
        }
    });

    function handleScroll() {
        scrollPosition = window.scrollY;
    }

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0

    const mobileWidth = 900;

</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />

<div class="parallax">

{#if innerWidth >= mobileWidth}
<div class="parallax-image">
    <img src="/home/components/parallax/badrWalkingDownStreet.webp" alt="Parallax" style="--scroll-position: {scrollPosition}px; --zoom-level: {zoomLevel}" />
    <div class="parallax-text">
        <h1>Committed to making our planet</h1>  
        <h1><b>a better place.</b></h1>
    </div>
</div>
{/if}

{#if innerWidth < mobileWidth}
<div class="parallax-image mobile">
    <img src="/home/components/parallax/badrWalkingDownStreet.webp" alt="Parallax" />
    <div class="parallax-text">
        <h1>Committed to making our planet</h1>  
        <h1><b>a better place.</b></h1>
    </div>
</div>
{/if}


</div>

<style lang="postcss">

    .parallax{
        margin-bottom: 30px;
    }

    .parallax-image {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }

    .parallax-image img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 1;
        height: auto;
        transform: translateY(calc(-20% + var(--scroll-position) * 0.5));
    }

    .mobile {
        height: 50vh;
        width: 100%;
    }

    .parallax-text {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 25%;
        left: 60%;
        transform: translate(-50%);
        color: #ffffff;
        font-size: 3.5rem;
        text-align: left;
        width: 100%;
    }

    .parallax-text h1 {
        font-size: 3rem;
        margin-bottom: 0;        
    }

    @media (max-width: 900px) {
        .parallax-text {
            top: 25%;
            left: 52%;
            transform: translate(-50%);
            color: #ffffff;
            font-size: 2.5rem;
            text-align: left;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }

</style>

