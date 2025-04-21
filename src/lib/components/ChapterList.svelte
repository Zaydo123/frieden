<script>
  import { onMount } from 'svelte';
  import { pb } from '$lib/pocketbase';
  
  export let type = 'desktop'; // 'desktop' or 'mobile'
  export let onMobileClick = () => {}; // For mobile menu handling
  export let isMenuOpen = false; // For mobile menu accessibility
  
  let chapters = [];
  let loading = true;
  let error = null;
  
  onMount(async () => {
    try {
      // Fetch active chapters only
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

{#if loading}
  <!-- Don't show anything during loading to avoid flashing -->
{:else if error}
  <!-- Silently fail but log to console -->
{:else}
  {#if chapters.length > 0}
    {#if type === 'desktop'}
      <div class="relative group">
        <a href="/chapters" class="nav-link">Chapters</a>
        <div class="absolute hidden group-hover:block bg-primary-600 rounded shadow-lg z-50 min-w-[150px]">
          {#each chapters as chapter}
            <a href="/chapters/{chapter.Slug}" class="block px-4 py-2 text-error-50 hover:bg-primary-700 hover:text-red-500">
              {chapter.Name}
            </a>
          {/each}
        </div>
      </div>
    {:else if type === 'mobile'}
      <div>
        <a href="/chapters" class="mobile-nav-link" on:click={onMobileClick} tabindex={isMenuOpen ? 0 : -1}>Chapters</a>
        <div class="ml-4">
          {#each chapters as chapter}
            <a 
              href="/chapters/{chapter.Slug}" 
              class="mobile-nav-link text-xl" 
              on:click={onMobileClick}
              tabindex={isMenuOpen ? 0 : -1}
            >
              - {chapter.Name}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
{/if} 