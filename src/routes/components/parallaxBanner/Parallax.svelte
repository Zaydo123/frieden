<script>
    let y;
    let innerWidth;
  
    $: translateY = y * 0.50 - 20;
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
    }
  </style>
  
  <svelte:window bind:scrollY={y} bind:innerWidth />
  
  <div class="mb-7 parallax h-screen overflow-hidden flex items-center justify-center transform -translate-y-11">
    <div class="text-center selection:bg-fuchsia-300 selection:text-fuchsia-900" style="transform: translateY({translateY}px);">
      <h1 class="lg:text-5xl md:text-4xl gradient-text sm: text-2xl font-bold">Committed to making our planet</h1>
      <h1 class="lg:text-5xl md:text-4xl sm: text-2xl gradient-text font-bold">a better place.</h1>
    </div>
  </div>
