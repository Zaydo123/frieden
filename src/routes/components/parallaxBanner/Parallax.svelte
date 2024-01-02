<script>
    let y;
    let innerWidth;
  
    $: translateY = y * 0.22;
  </script>
  
  <style>
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
      background: linear-gradient(45deg, #ff0000, #db4343, #6dd5ed);
      background-size: 200% 200%;
      padding-bottom: 4px;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradient 5s ease infinite;
    }
  </style>
  
  <svelte:window bind:scrollY={y} bind:innerWidth />
  
  <div class="mb-7 parallax h-screen overflow-hidden flex items-center justify-center">
    <div class="text-center" style="transform: translateY({translateY}px);">
      <h1 class="text-4xl md:text-6xl gradient-text">
        Committed to making our planet
      </h1>
      <h1 class="text-4xl md:text-6xl gradient-text">
        a better place.
      </h1>
    </div>
  </div>
  