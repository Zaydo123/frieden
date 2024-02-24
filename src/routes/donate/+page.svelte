<script>
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";


    let pricePresetsOneTime = [10, 20, 50, 100];
    let pricePresetsMonthly = [5, 10, 20, 50];

    let isCustomAmount = false;
    let contributionFrequency = 0; //0 representing one time, 1 representing monthly

    let contribution = 0;



</script>


<div class="m-auto pb-10 w-4/5 bg-tertiary-900 rounded">

    <h1 class="text-4xl pt-10 text-center font-bold text-primary-50">Donate</h1>
    

    <div class="m-auto mt-0 w-4/5">
        <p class="text-center text-secondary-300 text-sm mt-3">Your donation will help us in our mission to create a better world for <span class="text-red-500">everyone.</span></p>
    </div>

    <!--onetime vs monthly select-->
    <div class="m-auto mt-5 mb-4 w-3/4 flex justify-center gap-2 text-center">
    <RadioGroup background="bg-tertiary-700" border="border-2 border-primary-600" hover="hover:bg-red-100">
        <RadioItem bind:group={contributionFrequency} name="justify" value={0} fill="bg-red-500" >One Time</RadioItem>
        <RadioItem bind:group={contributionFrequency} name="justify" value={1} fill="bg-red-500" >Monthly</RadioItem>
    </RadioGroup>
    </div>


    <!-- quick donate buttons -->
    <div class="m-auto flex justify-center gap-2 pb-10 text-center w-3/4 flex-wrap">

        {#if contributionFrequency === 0}
            {#each pricePresetsOneTime as price}
                <button class="text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                    <p class="text-center">${price}</p>
                </button>
            {/each}
        {:else}
            {#each pricePresetsMonthly as price}
                <button class="text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => { isCustomAmount = false; contribution = price; } }>
                    <p class="text-center">${price}</p>
                </button>
            {/each}
        {/if}
        
        {#if isCustomAmount}
            <input type="number" class="text-primary-50 bg-secondary-500 w-20 h-8 p-2 rounded-xl" bind:value={contribution}>
        {:else}
        
        <button class="other text-primary-50 bg-secondary-500 w-20 h-8 rounded-xl" on:click={() => isCustomAmount = !isCustomAmount}>
            <p class="text-center">Other</p>
        </button>

        {/if}
        

    </div>

    <!-- fake receipt look -->
    <div class="m-auto w-3/4 bg-secondary-500 rounded p-5">
        <h2 class="text-primary-50 text-2xl font-bold">Your Donation</h2>
        <div class="flex justify-between mt-5">
            <p class="text-primary-50">Donation Amount</p>
            <p class="text-primary-50">$10</p>
        </div>
        <div class="flex justify-between mt-5">
            <p class="text-primary-50">Donation Type</p>
            {#if contributionFrequency === 0}
            <p class="text-primary-50">One Time</p>
            {:else}
            <p class="text-primary-50">Monthly</p>
            {/if}
        </div>
        <div class="flex justify-between mt-5">
            <p class="text-primary-50">Total</p>
            <p class="text-primary-50">${contribution}</p>
        </div>
        <button class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5">Donate</button>  
    </div>


    
</div>