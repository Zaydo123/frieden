<script>
    import { pb, currentUser } from '$lib/pocketbase';
    import { onMount } from 'svelte';
    let name;

    onMount(() => {
        name = $currentUser.username;
    });
</script>