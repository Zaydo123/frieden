<script>
    import { onMount } from 'svelte';

    let scrollPosition = 0;
    let zoomLevel = 1;

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        scrollPosition = window.scrollY;
    }

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0

    const mobileWidth = 768;

</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />


{#if innerWidth > mobileWidth}
<div class="parallax-image">
    <img src="/home/components/parallax/badrWalkingDownStreet.webp" alt="Parallax" style="--scroll-position: {scrollPosition}px; --zoom-level: {zoomLevel}" />
</div>
{/if}

{#if innerWidth < mobileWidth}
<div class="parallax-image mobile">
    <img src="/home/components/parallax/badrWalkingDownStreet.webp" alt="Parallax" />
</div>
{/if}


<style>
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
        opacity: .9;
        height: auto;
        transform: translateY(calc(-20% + var(--scroll-position) * 0.5));
    }

    .mobile {
        height: 50vh;
    }

</style>

