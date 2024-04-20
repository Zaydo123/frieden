<svelte:head>
    <script src="https://js.stripe.com/v3/"></script>
    <title>Frieden Foundation | Event Registration</title>
    <meta name="description" content="Register for the upcoming event!">
    <meta name="keywords" content="Event, event registration, event registration form, Frieden Foundation event">
</svelte:head>

<script>
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import {pb} from '$lib/pocketbase';
    import { browser } from '$app/environment';
    import { env } from '$env/dynamic/public';
    const { PUBLIC_PUB_STRIPE_KEY } = env;
    import { onMount } from 'svelte';

    let stripe;

    export let data;
    let slug = data.slug;
    let groupName;
    let email;
    let groupMembers = [];
    let eventHasTShirt = false;
    let minMembers = 1;
    let maxMembers = 1;
    let price = 0;
    let teamRequired = false;
    let isCheckingOut = false;
    let registrationDeadline = new Date();
    let paymentWindowOpen = false;
    let myRegistrationId;

    async function openPaymentWindow() {
        paymentWindowOpen = true;
        if (browser) {
            initialize();
        }
    }

    let individualCost = 0;
    let groupCost = 0;

    let payButtonEnabled = false;

    //whenever the groupMembers array changes, call costLogic
    
    function addMember() {
        if (groupMembers.length < maxMembers) {
            groupMembers = [...groupMembers, { name: '', tShirtSize: 'M' }]; // Initialized with default values
        } else {
            toastStore.trigger({message: `Maximum group size is ${maxMembers}`, classes: 'variant-filled-error'});
        }
        costLogic();
    }


    onMount(async () => {
        await pb.collection('Events').getOne(slug).then((res) => {
            
            eventHasTShirt = res.TShirtsProvided;
            minMembers = res.GroupMinimumSize;
            maxMembers = res.GroupMaximumSize;
            individualCost = res.IndividualCost;
            groupCost = res.GroupCost;
            teamRequired = res.TeamRequired;
            registrationDeadline = new   Date(res.RegistrationDeadline);
            
        }).catch((err) => {
            console.log(err);
        });
    });
    

    async function initialize() {
        toastStore.trigger({message: 'Initializing payment...', classes: 'variant-filled-info'});
        console.log("your team id is " + myRegistrationId);
        const response = await fetch("/api/donation/checkout/session", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                amount: price,
                frequency: 0,
                type: "event",
                eventId: slug,
                members: groupMembers,
                teamId: myRegistrationId,
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
    
    function costLogic() {
        if (teamRequired) {
            if (groupMembers.length >= minMembers && groupMembers.length <= maxMembers && new Date() < registrationDeadline) {
                payButtonEnabled = true;
                price = groupCost;
            } else {
                payButtonEnabled = false;
            }
        } else if (!teamRequired && groupMembers.length === 1) {
            if (groupMembers.length === 1 && new Date() < registrationDeadline) {
                payButtonEnabled = true;
                price = individualCost;
            } else {
                payButtonEnabled = false;
            }
        } else {
            payButtonEnabled = false;
            price = individualCost * groupMembers.length;
        }
    }

    function removeMember(index) {
        groupMembers = groupMembers.filter((_, i) => i !== index);
        costLogic();
    }

    async function handleSubmit() {
        //submit to same page with post request
        let response = await fetch(`/events/${slug}/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                groupName: groupName,
                members: groupMembers,
                totalCost: price,
                teamId: slug,
            })
        })
        .then(async function(response){

            if(!response.ok){
                toastStore.trigger({message: 'Registration failed. Please try again later.', classes: 'variant-filled-error'});
            } else {
                let res = await response.json();
                myRegistrationId = res.id;
                paymentWindowOpen = true;
                openPaymentWindow();
            }
        })
        .then(function(data){
            console.log("data is ");
            console.log(data);
        })
        .catch(function(error) {
            toastStore.trigger({message: 'Registration failed. Please try again later.', classes: 'variant-filled-error'}) 
            console.log('Request failed', error);
        });



        

    }


</script>

<div class="form-container">
    {#if !paymentWindowOpen}
    <form class="m-auto bg-gray-1000 w-3/4 md:w-1/3 rounded-lg text-white p-5" on:submit|preventDefault={handleSubmit}>
        <h1 class="text-2xl text-center font-bold">Event Registration</h1>
        
        <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2 mt-5" for="group-name" >Group Name</label>
            <input class="bg-transparent border rounded w-full py-2 px-3 text-gray-50 leading-tight" id="group-name" type="text" placeholder="Group Name" name="group-name" bind:value={groupName} required />
        </div>

        <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="email">Email</label>
            <input class="bg-transparent border rounded w-full py-2 px-3 text-gray-50 leading-tight" id="email" type="email" placeholder="Email" name="email" bind:value={email} required />
        </div>

        <div class="mb-4">
            <div class="flex flex-row w-full justify-between">
                <label class="block text-gray-200 text-sm font-bold mb-2" for="member-name">Group Members</label>
                {#if eventHasTShirt}
                    <label class="block text gray-200 text-sm font-bold mb-2" for="t-shirt-size">T-Shirt Size</label>
                {/if}
            </div>
            

            {#each groupMembers as member, i (i)}
            <div class="flex flex-row items-center pb-2 gap-2">
                <input class="bg-transparent border rounded w-full py-2 px-3 text-gray-50 leading-tight" id={`member-name-${i}`} type="text" placeholder="Name" bind:value={member.name} required />
                {#if eventHasTShirt}
                <select class="bg-transparent border rounded py-2 px-3 text-gray-50 leading-tight" bind:value={member.tShirtSize}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                {/if}
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ml-2" type="button" on:click={() => removeMember(i)}>X</button>
            </div>
            {/each}
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200" type="button" on:click={addMember}>Add Member</button>
        </div>

        <div class="flex items-center justify-between">
            {#if payButtonEnabled}
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200" type="submit">
                Checkout
            </button>
            {:else}
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:opacity-20" type="button" disabled>
                Checkout
            </button>
            {/if}

            <p class="text-gray-200 text-sm">Total: ${price}</p>
        </div>


    </form>
    {/if}
    {#if paymentWindowOpen}
    <div class="m-auto bg-gray-1000 w-3/4 md:w-1/3 rounded-lg text-white p-5 mt-5">
        <h1 class="text-2xl text-center font-bold">Payment</h1>
        <div class="mt-10 pb-4" id="checkout"></div>
    </div>
    {/if}

    <Toast/>
</div>
