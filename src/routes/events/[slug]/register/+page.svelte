<script>
    import {pb} from '$lib/pocketbase';
    import {onMount} from 'svelte';

    export let data;
    let slug = data.slug;
    let groupName;
    let groupMembers = [];
    let eventHasTShirt = false;
    let minMembers;
    let maxMembers;
    let price = 0;
    let teamRequired = false;
    let registrationDeadline = new Date();

    let individualCost = 0;
    let groupCost = 0;

    let payButtonEnabled = false;

    //whenever the groupMembers array changes, call costLogic
    
    function addMember() {
        if (groupMembers.length < maxMembers) {
            groupMembers = [...groupMembers, { name: '', tShirtSize: 'M' }]; // Initialized with default values
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
                groupName: groupName,
                members: groupMembers,
                totalCost: price
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }


</script>

<div class="form-container">
    <form class="m-auto bg-gray-1000 w-3/4 md:w-1/3 rounded-lg text-white p-5" on:submit|preventDefault={handleSubmit}>
        <h1 class="text-2xl text-center font-bold">Event Registration</h1>
        
        <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2 mt-5" for="group-name" >Group Name</label>
            <input class="bg-transparent border rounded w-full py-2 px-3 text-gray-50 leading-tight" id="group-name" type="text" placeholder="Group Name" name="group-name" bind:value={groupName} required />
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
                Continue to Payment
            </button>
            {:else}
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:opacity-20" type="button" disabled>
                Continue to Payment
            </button>
            {/if}

            <p class="text-gray-200 text-sm">Total: ${price}</p>
        </div>

    </form>
</div>
