<script>
    import { marked } from 'marked';
    import { currentUser,pb } from '$lib/pocketbase';
    import {onMount} from 'svelte';

    export let data;
    let slug = data.slug;

    let event = {
        Title: '',
        EventDate: new Date(),
        Location: '',
        MapURL: '',
        Images: '',
        Description: '',
        PageContent: ''
    };

    let pageContentElement;
    onMount(() => {
        pb.collection('Events').getOne(slug).then((res) => {
            event = res;
            pageContentElement.innerHTML = marked(event.PageContent);
        }).catch((err) => {
            console.log(err);
        });
    });

</script>

<div class="event-page bg-gray-800 p-5 rounded-lg">
    <h1 class="text-white text-3xl font-bold mt-5 mb-3">{event.Title}</h1>
    <p class="text-gray-400">{new Date(event.EventDate).toLocaleString()}</p>
    <a href={event.MapURL} class="text-blue-400 underline cursor-pointer">{event.Location}</a>
    <div class="page-content text-white mt-5 overflow-auto" bind:this={pageContentElement}></div>
</div>


<style>
    .event-page {
        max-width: 800px;
        margin: auto;
        margin-top: 6rem;
    }
</style>
