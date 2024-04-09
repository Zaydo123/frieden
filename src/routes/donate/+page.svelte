<svelte:head>
    <script src="https://js.stripe.com/v3/"></script>
    <title>Frieden Foundation | Donate</title>
</svelte:head>

<script>
    import { RadioGroup, RadioItem, Toast, getToastStore } from "@skeletonlabs/skeleton";
    import { env } from '$env/dynamic/public';
    const { PUBLIC_PUB_STRIPE_KEY } = env;
    import { browser } from '$app/environment';
    let isCheckingOut = false;
    let stripe;

    const toastStore = getToastStore();

    let pricePresetsOneTime = [10, 20, 50, 100];
    let pricePresetsMonthly = [5, 10, 20, 50];

    let isCustomAmount = false;
    let contributionFrequency = 0; //0 representing one time, 1 representing monthly

    let contributionUnvalidated = 1;
    let contribution = 1;

    function formatAmount(amount) {
        amount = Math.round(amount * 100) / 100;
        return amount;
    }

    function isValueValid(value) {
        return value >= 1;
    }

    async function initialize() {
        const response = await fetch("/api/donation/checkout/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: contribution,
                frequency: contributionFrequency,
            }),
        });

        const { clientSecret } = await response.json();
        isCheckingOut = true;
        stripe = new Stripe(PUBLIC_PUB_STRIPE_KEY);
        const checkout = await stripe.initEmbeddedCheckout({
            clientSecret,
        });
        
        // Mount Checkout
        checkout.mount('#checkout');
    }

    function handleDonation() {
        if (!isValueValid(contribution)) {
            toastStore.trigger({ message: 'Donation must be at least $1.', classes: 'variant-filled-error', });
            return;
        }

        if(browser){
            initialize();
        }
        
    }
    
    //only set unvalidated to contribution once it has been validated
    $: contribution = isCustomAmount ? isValueValid(contributionUnvalidated) ? formatAmount(contributionUnvalidated) : 0 : contribution;


</script>


<div class="m-auto pb-10 w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-tertiary-500 rounded">
    <h1 class="text-4xl pt-10 text-center font-bold text-primary-50">Donate</h1>

    <div class="m-auto mt-0 w-4/5">
        <p class="text-center text-secondary-300 text-sm mt-3">Your donation will help us in our mission to create a better world for <span class="text-red-500">everyone.</span></p>
    </div>
    {#if isCheckingOut}
        <div class="mt-10" id="checkout"></div>
    {:else}
   `     <!--onetime vs monthly select-->
        <div class="m-auto mt-5 mb-4 w-3/4 flex justify-center gap-2 text-center">
        <RadioGroup background="bg-tertiary-700" border="border border-secondary-600 text-primary-50" hover="hover:bg-primary-600">
            <RadioItem bind:group={contributionFrequency} name="justify" value={0} fill="bg-red-500">One Time</RadioItem>
            <RadioItem bind:group={contributionFrequency} name="justify" value={1} fill="bg-red-500">Monthly</RadioItem>
        </RadioGroup>
        </div>

        <!-- quick donate buttons -->
        <div class="m-auto flex justify-center gap-2 p-4 pb-10 text-center w-full sm:w-2/3 max-w-sm flex-wrap">
            {#if contributionFrequency == 0}
                {#each pricePresetsOneTime as price}
                    {#if contribution == price && !isCustomAmount}
                        <button class="selected-preset text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                            <p class="text-center">${price}</p>
                        </button>  
                    {:else}
                        <button class="text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                            <p class="text-center">${price}</p>
                        </button>
                    {/if}
                {/each}
            {:else}
                {#each pricePresetsMonthly as price}
                {#if contribution == price && !isCustomAmount}
                    <button class="selected-preset text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                        <p class="text-center">${price}</p>
                    </button>  
                {:else}
                    <button class="text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                        <p class="text-center">${price}</p>
                    </button>
                {/if}
        {/each}
            {/if}
            
            {#if isCustomAmount}
                    <input type="number" min="1" step="0.01" class="selected-preset text-primary-50 bg-secondary-500 w-20 h-8 p-2 rounded-xl" bind:value={contributionUnvalidated}>
            {:else}
                <button class="other text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => isCustomAmount = !isCustomAmount }>
                    <p class="text-center">Other</p>
                </button>
            {/if}
            

        </div>

        <!-- fake receipt look -->
        <div class="m-auto w-3/4 bg-secondary-500 rounded p-5">
            <h2 class="text-primary-50 text-2xl font-bold">Your Donation</h2>
            <div class="flex justify-between mt-5">
                <p class="text-primary-50">Donation Amount</p>
                <p class="text-primary-50">${contribution.toFixed(2)}</p>
            </div>
            <div class="flex justify-between mt-5">
                <p class="text-primary-50">Donation Type</p>
                {#if contributionFrequency === 0}
                <p class="text-primary-50">One Time</p>
                {:else}
                <p class="text-primary-50">Monthly</p>
                {/if}
            </div>
            <!-- line -->
            <div class="w-full h-0.5 bg-primary-50 mt-5 mb-5"></div>
            <div class="flex justify-between mt-5">
                <p class="text-primary-50">Total</p>
                <p class="text-primary-50">${contribution.toFixed(2)}</p>
            </div>
            <button class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5" on:click={ () => handleDonation() }>Donate</button>
        </div>

        <div class="m-auto w-4/5 mt-5 text-secondary-400 text-sm">
            <p class="text-center">Frieden Foundation is a 501(c)(3) non-profit organization. Your contribution is tax-deductible to the extent allowed by law.</p>
            <p class="text-center">Tax ID: 93-2292269.</p>
        </div>

    {/if}
    
    
</div>

<Toast />

<style lang="postcss">

    .selected-preset {
        background-color: rgb(105, 84, 84);
    }

</style>