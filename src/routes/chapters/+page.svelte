<svelte:head>
    <title>Frieden Foundation | Chapters</title>
    <meta name="description" content="Explore Frieden Foundation chapters at various schools and universities.">
    <meta name="keywords" content="chapters, university chapters, school chapters, Frieden Foundation chapters">
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { pb } from '$lib/pocketbase';
    
    let chapters = [];
    let loading = true;
    let error = null;
    
    onMount(async () => {
        try {
            // Fetch active chapters
            const response = await pb.collection('Chapters').getList(1, 50, {
                filter: 'Active = true',
                sort: 'Name'
            });
            
            chapters = response.items;
            loading = false;
        } catch (err) {
            console.error('Error loading chapters:', err);
            error = 'Failed to load chapters';
            loading = false;
        }
    });
</script>

<div class="container mx-auto p-6 md:p-10">
    <h1 class="text-4xl font-bold text-white text-center mb-8">Our Chapters</h1>
    
    {#if loading}
        <div class="text-center text-white">
            <p>Loading chapters...</p>
        </div>
    {:else if error}
        <div class="text-center text-red-500">
            <p>{error}</p>
        </div>
    {:else if chapters.length === 0}
        <div class="text-center text-white">
            <p>No chapters available at this time. Check back soon!</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each chapters as chapter}
                <a href="/chapters/{chapter.Slug}" class="block hover:no-underline">
                    <div class="bg-secondary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        {#if chapter.Logo}
                            <div class="h-48 bg-primary-700 flex items-center justify-center p-4">
                                <img 
                                    src={pb.getFileUrl(chapter, chapter.Logo)} 
                                    alt="{chapter.Name} logo" 
                                    class="max-h-full max-w-full object-contain"
                                >
                            </div>
                        {:else}
                            <div class="h-48 bg-primary-700 flex items-center justify-center">
                                <span class="text-6xl text-white font-bold opacity-30">{chapter.Name[0]}</span>
                            </div>
                        {/if}
                        
                        <div class="p-4">
                            <h2 class="text-2xl font-bold text-white mb-2">{chapter.Name}</h2>
                            {#if chapter.Description}
                                <p class="text-gray-300">{chapter.Description.length > 100 ? `${chapter.Description.substring(0, 100)}...` : chapter.Description}</p>
                            {:else}
                                <p class="text-gray-300">Join our chapter at {chapter.Name}.</p>
                            {/if}
                            <div class="mt-4">
                                <button class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div> 