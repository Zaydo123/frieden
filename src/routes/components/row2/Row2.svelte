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
    
    let hoveredCardIndex = -1;
    
    function setHoveredCard(index) {
      hoveredCardIndex = index;
    }
    
    function resetHoveredCard() {
      hoveredCardIndex = -1;
    }
    
    onMount(() => {
      let frost = document.querySelectorAll(".frost");
      frost.forEach((el, i) => {
        el.style.backgroundImage = `url(${rows[i].image})`;
      });
    });
    
    let innerWidth = 0;
  </script>
  
  <svelte:window bind:innerWidth />
  
  <main class="flex mx-auto p-8 bg-tertiary-900 gap-10 items-center justify-center min-h-screen">
    <div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {#each rows as row, index}
          <div class="frost work-row flex flex-col items-center justify-center p-8 rounded-xl w-full h-96
                                 md:flex-row md:h-80 md:w-96 md:items-start md:text-left
                                 hover:shadow-lg hover:scale-105 transition-transform"
                    on:mouseenter={() => setHoveredCard(index)}
                    on:mouseleave={resetHoveredCard}
                    role="cell"
                    tabindex="0"
                >
  
            <div class="text-center md:text-left md:ml-4">
              <h2
                class="text-2xl text-white font-bold mb-4 selection:bg-warning-500"
                class:top={hoveredCardIndex === index}
                class:centered={hoveredCardIndex !== index}
              >
                {row.title}
              </h2>
              {#if row.description}
                <p
                  class="text-white mb-4 opacity-0 overflow-hidden"
                  class:visible={hoveredCardIndex === index}
                  style="max-height: 1000px; transition: all 0.5s ease"
                >
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
      transition: all 1.5s ease;
    }
  
    .frost {
      background-size: cover;
      background-color: rgba(255, 255, 255, 0.1);
    }
  
    .work-row .top {
      transition: transform 0.5s ease;
    }
  
    .work-row .visible {
      opacity: 1;
    }
  
    .work-row:hover {
      transform: scale(1.005);
      filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
      filter: brightness(1.1);
    }
  
  
    .centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
  </style>
  
  