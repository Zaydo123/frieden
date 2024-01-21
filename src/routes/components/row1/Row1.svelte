<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let originalText = 'FRIEDEN FOUNDATION';
    const chars = "☺Σ×Π#-_¯—→↓↑←0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let glitchedText = writable(originalText);

    let isMobile = false;
    let isAlreadyDoingAnimation = false;

    function createGlitchEffect(originalText, numberOfGlitchedLetters, timeGlitch, timePerLetter, timeBetweenGlitch) {
        let maxCount = Math.floor(timeGlitch / timePerLetter);
        let count = 0;
        let interval;

        function randomize() {
            let textArray = originalText.split('');
            for (let i = 0; i < numberOfGlitchedLetters; i++) {
                let randIndex = Math.floor(Math.random() * chars.length);
                let randCharIndex = Math.floor(Math.random() * textArray.length);
                textArray[randCharIndex] = chars[randIndex];
            }
            glitchedText.set(textArray.join(''));
        }

        function update() {
            if (count >= maxCount - 1) {
                clearInterval(interval);
                glitchedText.set(originalText);
                count = 0;
                isAlreadyDoingAnimation = false;
            } else {
                randomize();
                count++;
            }
        }

        interval = setInterval(update, timePerLetter);
    }

    function doAnimation() {
        if (isAlreadyDoingAnimation) return;
        isAlreadyDoingAnimation = true;
        createGlitchEffect(originalText, 1, 2000, 65, 500);
    }

    let innerWidth = 0;
    $: isMobile = innerWidth < 768;

    $: {
        if (!isMobile) {
            doAnimation();
        }
    }

</script>

<!-- bind svelte width live instead of event listener-->
<svelte:window bind:innerWidth />


{#if !isMobile} <!-- if not mobile -->
<section class="m-auto">
    <div class="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h2 class="text-5xl mb-10 text-red-500 font-bold max-w-max m-auto" on:focus={() => console.log("doing nothing")} on:mouseover={() => doAnimation()}>{$glitchedText}</h2>
        <p class="text-2xl w-1/2 sm:w-4/5 lg:w-1/2 m-auto text-white">Founded in 2022, the Frieden Foundation, meaning "peace" in German, has tirelessly worked to embody its name. With the help of members and volunteers worldwide, we've made a significant impact. Our projects, driven by passion and dedication, aim to make a meaningful difference in lives globally. Join us in our mission for peace.</p>
    </div>
</section>
{:else} <!-- if mobile -->
<section class="m-auto">
    <div class="text-center mb-1">
        <h2 class="text-3xl mb-2 text-red-500 font-extrabold max-w-max m-auto" on:focus={() => console.log("doing nothing")} on:mouseover={() => doAnimation()}>{$glitchedText}</h2>
        <p class="w-4/5 m-auto text-white font-thin">Founded in 2022, the Frieden Foundation, meaning "peace" in German, has tirelessly worked to embody its name. With the help of members and volunteers worldwide, we've made a significant impact. Our projects, driven by passion and dedication, aim to make a meaningful difference in lives globally. Join us in our mission for peace.</p>
    </div>
</section>
{/if}
