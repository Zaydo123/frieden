<script>
    import { currentUser } from '$lib/pocketbase';
    import { onMount } from 'svelte';
    let name;

    onMount(() => {
        name = $currentUser.username;
    });

</script>


<h1 class="text-white mx-auto">Welcome {name}</h1>
<p class="text-white mx-auto">This is the admin panel</p>