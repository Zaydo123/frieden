<script>
  import { afterUpdate } from 'svelte';

  let y;
  let innerWidth;
  let showText = false;

  $: translateY = y * 0.50 - 20;

  afterUpdate(() => {
    showText = true;
  });
</script>

<style lang="postcss">
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .gradient-text {
    padding-bottom: 3px;
    background: linear-gradient(45deg, #ff0000, #db4343, #6dd5ed);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: gradient 5s ease infinite;
    opacity: 0;
    transition: opacity 5s;
  }

  .show-text .gradient-text {
    opacity: 1;
  }

  @media (max-width: 768px) {
    
    .section {
      height: 84vh;
      padding-top:70px;
    }
  }

</style>

<svelte:window bind:scrollY={y} bind:innerWidth />

<div class="section mb-7 h-screen overflow-hidden flex items-center justify-center transform -translate-y-11">
  
  {#if innerWidth > 768}
  <div class="text-center selection:bg-red-900 selection:text-white" style="transform: translateY({translateY}px);" class:show-text={showText}>
    <h1 class="lg:text-5xl md:text-4xl gradient-text sm: text-3xl font-bold">Frieden Foundation</h1>
  </div>
  {:else}
    <div class="text-center selection:bg-red-900 selection:text-white" class:show-text={showText}>
      <h1 class="lg:text-5xl md:text-4xl gradient-text sm: text-3xl font-bold">Frieden Foundation</h1>
    </div>  
  {/if}


</div>
