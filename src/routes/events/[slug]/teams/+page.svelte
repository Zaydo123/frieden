<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { currentUser } from '$lib/pocketbase';

    export let data;
    let currenturl;
    let referrer = `/events/${data.slug}/teams`;

    onMount(() => {
        currenturl = window.location.href;
    });

    function createTeam() {
        //goto currenturl /create
        goto(`${currenturl}/create`);
    }

    function joinTeam() {
        //goto currenturl /join
        goto(`${currenturl}/join`);
    }

</script>

<div class="container-box">

    <div class="box flex flex-col items-center justify-center bg-gray-1000 py-12 px-4 lg:px-8 w-4/5 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg m-auto mt-30">
        {#if $currentUser}

            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-white mb-4">Groups</h1>
                <p class="text-lg text-gray-400">Create or join a group for the event.</p>
            </div>

            <div class="space-x-4 flex-row flex items-center">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300" on:click={createTeam}>Create a Team</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300" on:click={joinTeam}>Join a Team</button>
            </div>
        

        {:else}
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-white mb-4">Welcome!</h1>
                <p class="text-white mb-10">Please log in to continue</p>
                <a href="/login?referrer={referrer}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-10 rounded shadow-lg transition duration-300">Login</a>
            </div>
        {/if}
    
    </div>

</div>



