<script>
    let rows = [
        {
            title: "Emergency Relief",
            description: "The Frieden Foundation is dedicated to offering emergency medical care to people and communities impacted by natural disasters. Our organization is committed to helping those in need, whether that means raising money for first aid and emergency medical services or raising money to send mobile clinics to disaster-stricken areas. Additionally, our team is prepared to offer vital support to those suffering from the trauma and stress of a natural disaster because we understand how important mental health services are in such circumstances.",
            mobileDescription: "We are dedicated to offering emergency medical care to people and communities impacted by natural disasters.",
            image: "/home/components/meaningfulWork/destroyedBuilding.webp"
        },
        {
            title: "Refugee Care",
            description: "We provide relief to refugee camps around the world. Our goal is to address the many pressing needs of those in these underprivileged countries, including providing access to essential resources such as food, water, and shelter, as well as medical care and other forms of support. We understand the immense challenges faced by those who have been displaced due to conflict and persecution, and we are committed to helping improve their living conditions and overall well-being. Our work is an important part of providing hope and support to those who have experienced great hardship.",
            mobileDescription: "We aid refugee camps worldwide. We acknowledge the hardships displaced people endure and are dedicated to improving their living circumstances and well-being. We help individuals who have suffered greatly find hope and support.",
            image: "/home/components/meaningfulWork/wires.webp"
        },
        {
            title: "Community Integration",
            description: "Frieden Foundation unites communities through engaging events and tournaments that also serve a dual purpose of supporting refugees. Our local activities, infused with fun and a sense of togetherness, raise funds and awareness for those in need, fostering a spirit of empathy and global responsibility.",
            mobileDescription: "Join our community-focused events and tournaments, blending enjoyment with meaningful support for local and international causes.",
            image: "/home/components/meaningfulWork/bballTeam.jpeg"
        }
    ];

    $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />


<main class="mx-auto p-8 bg-tertiary-900">
    <h1 class="text-center sm:text-left mb-8 font-bold text-warning-400 selection:bg-warning-500 selection:text-warning-50">Meaningful Work</h1>
    {#each rows as row}
        <div class="work-row flex items-center mb-8 p-8 rounded-xl bg-tertiary-700 ">
            <div class="mr-4">
                <img src={row.image} alt={row.title} class="w-full h-full object-cover uniform-img" />
            </div>
            <div>
                <h2 class="text-2xl text-primary-50 font-bold mb-4 selection:bg-warning-500">{row.title}</h2>
                {#if innerWidth < 900}
                    <p class="mb-4 text-tertiary-300 selection:bg-warning-400 selection:text-white">{row.mobileDescription}</p>
                {:else}
                <p class="mb-4 text-tertiary-300 selection:bg-warning-400 selection:text-white">{row.description}</p>
                {/if}
            </div>
        </div>
    {/each}
</main>

<style lang="postcss">
    @media (max-width: 768px) {
        .flex {
            flex-direction: column;
        }
        .mr-4 {
            margin-bottom: 1rem;
            margin-right: 0;
        }
    }

    /*make all desktop images 3x2 aspect ratio*/

    .uniform-img{
        min-width: 265px;
        min-height: 177px;
        max-height: 265px;
    }

    /* hover effects */
    
    .work-row {
        transition: transform 0.5s ease;
    }

    .work-row:hover {
        transform: scale(1.01);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }

</style>    