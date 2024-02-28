<script>
  import { onMount } from "svelte";
  
  let rows = [
    {
      title: "Emergency Relief",
      description:
        "We are dedicated to offering emergency medical care to people and communities impacted by natural disasters.",
      image: "/home/components/meaningfulWork/destroyedBuilding.webp",
    },
    {
      title: "Refugee Care",
      description:
        "We acknowledge the hardships displaced people endure and are dedicated to improving their living circumstances and well-being. We help individuals who have suffered greatly find hope and support.",
      image: "/home/components/meaningfulWork/wires.webp",
    },
    {
      title: "Community Integration",
      description:
        "Join our community-focused events and tournaments, blending enjoyment with meaningful support for local and international causes.",
      image: "/home/components/meaningfulWork/bballTeam.jpeg",
    },
    {
      title: "Education",
      description:
        "We believe that education is the key to a brighter future. We are dedicated to providing educational resources and opportunities to those in need.",
      image: "/home/components/meaningfulWork/unicef-education.webp",
    },
    {
      title: "Healthcare",
      description:
        "We are dedicated to providing healthcare to those in need. We believe that everyone deserves access to quality healthcare.",
      image: "/home/components/meaningfulWork/who-medical-crowd.jpg",
    },
    {
      title: "Food Security",
      description:
        "We are dedicated to providing food security to those in need. We believe that everyone deserves access to quality food.",
      image: "/home/components/meaningfulWork/ukraine-food-drive.jpeg",
    },
  ];
    
  let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />  
  
<main class="flex mx-auto p-8 bg-tertiary-900 gap-20 items-center justify-center min-h-screen">
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:w-max gap-8">
      {#each rows as row, index}
        <div class="work-row relative flex flex-col items-center justify-center p-8 rounded-xl w-full h-96 md:flex-row md:w-96 md:items-start md:text-left hover:shadow-lg" role="cell" tabindex="0">
          <img src={row.image} alt="{row.title}" class="absolute inset-0 w-full h-full object-cover rounded-xl">
          <div class="relative z-10 text-center md:text-left md:ml-4">
            <h2 class="title text-2xl text-white font-bold lg:mb-4 selection:bg-warning-500">
              {row.title}
            </h2>
            {#if row.description}
              <p class="description text-white mb-4 opacity-0 overflow-hidden" style="max-height: 1000px;">
                {row.description}
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style lang="postcss">
  .work-row {
    position: relative; /* Ensure relative positioning for background image placement */
  }

  .work-row img {
    transition: transform 0.5s, filter 0.5s;
    background-size: cover;
    position: absolute;
    z-index: 0;
  }

  .description {
    transition: opacity 0.5s;
  }


  @media (max-width: 768px) {
    .title {
      transition: all .5s;
      @apply mt-20 sm:mt-14;
    }

    .work-row:hover .title {
      @apply mt-0;
    }

  }


  .work-row:hover {
    filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
  }

  .work-row:hover img {
    transform: scale(1.005);
    filter: brightness(0.8) contrast(1.1) blur(1px);
  }

  .work-row:hover .description {
    opacity: 1;
  }

  .centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  
  .description {
      @apply overflow-hidden text-white;
      border-radius: 0.5rem;
      z-index: 10; /* Bring the text above the background image */
    }
</style>
