<script>
    import { onMount } from 'svelte';

    let title = 'Frieden';
    const ipaTitle = 'fridən';
    const scrambleInterval = 75; // each scramble
    const totalScrambleTime = 1000; // total time
    let scrambleCount = 0;
    let ipaActive = false;
    let animationComplete = false;

    function playAudio() {
        const audio = document.getElementById('friedenPronunciation');
        audio.play();
    }

    function scrambleText() {
        if (scrambleCount * scrambleInterval >= totalScrambleTime) {
            clearInterval(scrambleTimer);
            title = ipaTitle;
            animationComplete = true;
            return;
        }

        const characters = 'abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ!"#*+,-./:;<=>?@^_`~';
        let result = '';
        for (let i = 0; i < title.length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        title = result;
        scrambleCount++;
    }

    let scrambleTimer;
    function handleHover(state) {
        if (!animationComplete && state) {
            scrambleCount = 0;
            scrambleTimer = setInterval(scrambleText, scrambleInterval);
            ipaActive = true;
        } else {
            setTimeout(() => {
                if (!animationComplete) {
                    title = 'Frieden';
                    ipaActive = false;
                }
            }, 1000); // Delay for the animation
        }
    }

    $: ipaActive = title === ipaTitle;
</script>

<section class="flex flex-col items-center justify-center p-8 text-white bg-black">
    <div class="flex items-center"
         role="button"
         tabindex="0"
         on:mouseenter={() => handleHover(true)}
         on:mouseleave={() => handleHover(false)}>
        <h2 class="text-4xl font-bold mr-2 cursor-pointer">About <span class:ipa-active={ipaActive}>{title}</span></h2>
        <button on:click={playAudio} on:keypress={playAudio} on:keyup={playAudio} class="w-6 h-6 cursor-pointer">
            <img src="/components/icons/select-to-speak.svg" alt="Pronounce Frieden" class="invert" />
        </button>
    </div>
    <audio id="friedenPronunciation" src="/components/audio/frieden_tts.mp3"></audio>
    <p class="text-xl text-center max-w-4xl mt-4">Founded in 2022, the Frieden Foundation, meaning 'peace' in German, has tirelessly worked to embody its name. With the help of members and volunteers worldwide, we've made a significant impact. Our projects, driven by passion and dedication, aim to make a meaningful difference in lives globally. Join us in our mission for peace.</p>
</section>

<style>
    .ipa-active {
        color: red;
        transition: color 1s ease;
    }
</style>
