<script>
    import { invalidateAll } from '$app/navigation';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

</script>

<div class="flex flex-col items-center justify-center min-h-screen text-white">
    <div class="p-10 rounded-lg shadow-lg bg-gray-800">
        <div class="flex items-center mb-6">
            <img src="/frieden.svg" alt="Frieden Logo" class="w-20 h-20 mr-4">
            <div>
                <h1 class="text-3xl font-bold">Frieden Foundation</h1>
                <h2 class="text-lg text-red-500 font-semibold">Admin Panel</h2>
            </div>
        </div>

        <div class="text-left">
            {#if data.auth.user?.name}
                <h2 class="text-xl mb-4 font-bold">Hello, {data.auth.user.name}</h2>
                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-sm font-semibold mb-2" on:click={() => signOut()}>Sign Out</button>
                <button class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded shadow text-sm font-semibold" on:click={() => goto('/admin/panel')}>Continue</button>
            {:else}
                <h2 class="text-xl mb-4">Please Sign In</h2>
                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow text-sm font-semibold mb-2" on:click={() => signIn()}>Sign In</button>
                <button class="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded shadow text-sm font-semibold" on:click={() => goto('/')}>Cancel</button>
            {/if}
        </div>
    </div>
</div>
