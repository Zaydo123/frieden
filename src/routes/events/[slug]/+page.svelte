<script>
    import { onMount } from 'svelte';
    import PocketBase from 'pocketbase';
    import { marked } from 'marked';

    export let data;
    let PB_URL = data.PB_URL;
    let slug = data.slug;

    let event = {
        Title: '',
        EventDate: '',
        Location: '',
        MapURL: '',
        Images: '',
        Description: '',
        PageContent: ''
    };

    let pageContentElement;

    onMount(async () => {
        const pb = new PocketBase(PB_URL);
        try {
            const res = await pb.collection('Events').getOne(slug);
            event = res;
            if (event.PageContent) {
                event.PageContent = marked(event.PageContent);
                pageContentElement.innerHTML = event.PageContent;
            }
        } catch (err) {
            console.error(err);
        }
    });

</script>

<div class="event-page bg-gray-800 p-5 rounded-lg">
    <h1 class="text-white text-3xl font-bold mt-5 mb-3">{event.Title}</h1>
    <p class="text-gray-400">{new Date(event.EventDate).toLocaleString()}</p>
    <a href={event.MapURL} class="text-blue-400 underline cursor-pointer">{event.Location}</a>
    <p class="text-white">{event.Description}</p>
    <div class="page-content text-white mt-5 overflow-auto" bind:this={pageContentElement}></div>
</div>


<style>
    .event-page {
        max-width: 800px;
        margin: auto;
        margin-top: 6rem;
    }
</style>
