<script>
  
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
        "We acknowledge the hardships displaced people endure and are dedicated to improving their living circumstances and well-being.",
      image: "/home/components/meaningfulWork/friedenRefugeeCamp.png",
    },
    {
      title: "Community Integration",
      description:
        "Join our community-focused events and tournaments, blending enjoyment with meaningful support for local and international causes.",
      image: "/home/components/meaningfulWork/bballTeam.jpeg",
    },
    {
      title: "Financial Aid",
      description:
        "We firmly believe in giving back to communities in need. We provide financial aid to families and individuals who need it most in local communities and abroad.",
      image: "/home/components/meaningfulWork/financial-aid.jpg",
    },
    {
      title: "Ground Missions",
      description:
        "By participating in our ground missions which consist of distributing food, clothing, medical supplies, and conducting research, you can make a difference in the lives of those in need. Sign up to become a volunteer today!",
      image: "/home/components/meaningfulWork/ground-mission.jpg",
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
    {
      title: "Career Development",
      description:
        "We aim to provide full and part-time paid service opportunities for individuals who are looking to make a difference in the world. Please apply to join our team today!",
      image: "/home/components/meaningfulWork/career-development.jpg",
    }

  ];
    
  let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />  
  
<main class="flex mx-auto p-8 bg-tertiary-900 gap-20 items-center justify-center min-h-screen">
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:w-max gap-8">
      {#each rows as row, index}
        <div class="work-row relative flex flex-col items-center justify-center p-5 rounded-xl w-full h-96 md:flex-row md:w-96 md:items-start md:text-left hover:shadow-lg" role="cell" tabindex="0">
          <img src={row.image} alt="{row.title}" class="absolute inset-0 w-full h-full object-cover rounded-xl">
          <div class="relative z-10 text-center md:text-left md:ml-4 p-3">
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

  /* Small Screens*/
  @media (max-width: 768px) {
    .title {
      transition: all .5s;
      margin-top: 6rem;
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

  
  .description {
      @apply overflow-hidden text-white;
      border-radius: 0.5rem;
      z-index: 10; /* Bring the text above the background image */
    }
</style>
