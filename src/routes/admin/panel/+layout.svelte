
<script>

    import { pb,currentUser } from '$lib/pocketbase';
    import { onMount } from 'svelte';
    
    let ResourceList = { items: [] };

    onMount(() => {
        pb.collection('ResourceList').getList(1, 100).then((res) => {
            ResourceList.items = res.items;
        }).catch((err) => {
            alert(err);
        });
    });


    

</script>


<div class="body flex flex-col sm:flex-row gap-3 h-4/5 sm:h-screen pb-10 sm:pb-0">
    <nav class="flex flex-col text-primary-50 w-fit  gap-2">
        
            <div class="flex flex-row flex-wrap sm:flex-col justify-center p-9 bg-secondary-500 gap-2">
                <h2 class="w-full text-2xl font-bold">Quick Links</h2>
                <h4 class="w-full text-lg font-bold">Admin</h4>
                {#each ResourceList.items as resource}
                    <a href={resource.Link} class="nav-link">{resource.ResourceName}</a>
                {/each}

            </div>
            <div class="flex flex-row flex-wrap sm:flex-col justify-center p-9 bg-secondary-500 gap-2">
                <h2 class="text-2xl font-bold w-full">Apps</h2>
                <a href="/admin/panel" class="nav-link">Dashboard</a>
            </div>
            
    </nav>
    <div class="mt-2 w-4/5 max-w-full">
        <slot></slot>
    </div>
</div>

<style lang="postcss">

    .body {
        @apply bg-secondary-800;
    }

    .nav-link {
        @apply text-primary-50 text-base no-underline px-4 transition-all ease-in-out hover:text-red-500 hover:scale-105;
    }
</style>

