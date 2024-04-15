<!-- FAQ PAGE -->
<svelte:head>
    <title>Frieden Foundation | FAQ</title>
    <meta name="description" content="Frequently asked questions about Frieden Foundation, including transparency, accountability, and donation impact.">
    <meta name="keywords" content="FAQ, frequently asked questions, Frieden Foundation, transparency, accountability, donation impact">
</svelte:head>

<script>
    let message = `lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui eget nunc tincidunt aliquam nec nec libero dolor sit amet, consectetur adipiscing elit. Nulla nec dui eget nunc tincidunt aliquam nec nec libero`;

    let QA = [
        {
            question: "Transparency and Accountability",
            sub: "How do I know my donation is being used effectively?",
            answer: "We are committed to transparency and accountability. We provide regular updates on our website and social media platforms to keep our donors informed about the impact of their contributions. We also publish our financial reports and annual reports to ensure that our donors are aware of how their donations are being used."
        },
        {
            question:"Your Donation's Impact",
            sub: "How will my donation be used?",
            answer: "We strive to ensure that the maximum possible amount of your donation goes directly to supporting our cause. On average, 90% of each donation goes directly to those in need, while the remaining 10% covers fundraising and operation costs. We are committed to being transparent about our expenses and regularly share our financial information on our website, annual reports, and other communication channels. Additionally, we continuously work to improve our efficiency and reduce our overhead costs to ensure that we maximize the impact of every dollar donated. We deeply appreciate your support and are always happy to answer any questions you may have. We have partnered with UNRWA and UNICEF in providing aid directly to displaced families. At Frieden Foundation we primarily focus on providing humanitarian aid to Refugee camps in Jordan and other countries worldwide."
        }

    ]

</script>

<div class="bg-tertiary-900 py-10 px-3 lg:px-8 lg:py-16" >

    <h2 class="text-success-50 text-4xl sm:mb-10 text-center font-bold selection:bg-warning-500 mt-4 mb-4">Frequently Asked Questions</h2>

    <div class="faq-container m-auto flex flex-col gap-8">
        {#each QA as { question, sub, answer }, index}
            <div class="faq-question w-4/5 sm:w-2/3 m-auto">
                <h3 class="text-2xl font-bold text-primary-50">{question}</h3>
                <p class="question-sub">{sub}</p>
                <div class="faq-answer">
                    <p>{answer}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">

    .faq-question {
        @apply bg-secondary-500 p-4 rounded-xl;
    }

    .faq-question h3 {
        @apply text-primary-50 selection:bg-warning-500;
    }

    .faq-question p {
        @apply text-secondary-300;
    }

    .question-sub {
        @apply text-secondary-300;
    }
</style>
