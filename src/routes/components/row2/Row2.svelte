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



<main class="text-white mx-auto mt-5 rounded p-8">
    <h1 class="text-left mb-8 font-bold">Meaningful Work</h1>
    {#each rows as row}
        <div class="flex items-center mb-8 p-8 bg-dark-mode rounded-xl">
            <div class="mr-4">
                <img src={row.image} alt={row.title} class="w-full h-full object-cover" />
            </div>
            <div>
                <h2 class="text-2xl font-bold mb-4">{row.title}</h2>
                {#if innerWidth < 900}
                    <p class="mb-4">{row.mobileDescription}</p>
                {:else}
                <p class="mb-4">{row.description}</p>
                {/if}
            </div>
        </div>
    {/each}
</main>

<style lang="postcss">
    @media (max-width: 900px) {
        .flex {
            flex-direction: column;
        }
        .mr-4 {
            margin-bottom: 1rem;
            margin-right: 0;
        }
    }

    .bg-dark-mode {
        background-color: #1F1F1F;
    }
</style>    