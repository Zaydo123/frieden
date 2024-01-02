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



<main>
    <h1>Meaningful Work</h1>
    {#each rows as row}
        <div class="row">
            <div class="image">
                <img src={row.image} alt={row.title} />
            </div>
            <div class="content">
                <h2>{row.title}</h2>
                {#if innerWidth < 900}
                    <p>{row.mobileDescription}</p>
                {:else}
                <p>{row.description}</p>
                {/if}
            </div>
        </div>
    {/each}
</main>

<style lang="postcss">
    h1{
        text-align: left;
        margin-bottom: 2rem;
        color:white;
    }

    main {
        color:white;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 4px;
        padding: 2rem;
    }

    .row {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        padding: 2rem;
        background-color: #120f0f;
    }

    .image {
        flex: 1;
        margin-right: 1rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .content {
        flex: 2;
    }

    @media (max-width: 900px) {
        main {
            height: max-content;
            max-width: 560px;
            width: 80%;
            padding: 1rem;
            margin-bottom: 50px;
        }

        .row {
            flex-direction: column;
        }

        .image {
            margin-bottom: 1rem;
        }
    }

</style>
