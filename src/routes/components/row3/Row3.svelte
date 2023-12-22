<script>
    import News from "./news/News.svelte"
    
    let newsItems = [
        {"title":"Basketball Registration is Open!", "description": "no way! you must be lying, please click to see more.", "date":"March 24"},
        {"title":"Basketball Registration is Open!", "description": "no way! you must be lying, please click to see more.", "date":"March 24"},
        {"title":"Basketball Registration is Open!", "description": "no way! you must be lying, please click to see more.", "date":"March 24"},
    ]

	$: outerWidth = 0
	$: innerWidth = 0
	$: outerHeight = 0
	$: innerHeight = 0

    const mobileWidth = 900;

</script>

<svelte:window bind:outerWidth bind:innerWidth bind:outerHeight bind:innerHeight />

{#if innerWidth >= mobileWidth}
<div class="row1">
    <News {newsItems}/>    
</div>
{/if}

{#if innerWidth < mobileWidth}
<div class="row1">
    <News {newsItems}/>
</div>
{/if}

<style lang="postcss">
    .row1 {
        max-height: 70vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: wrap;
        align-items: center;
        width: 100%;
        height: 70vh;
    }

    
    @media (max-width: 900px) {
        .row1 {
            flex-direction: column;
            height: auto;
            justify-content: center;
        }
    }

</style>