<svelte:head>
    <title>Frieden Foundation | Events</title>
    <script src="/sdk/pocketbase.umd.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import EventCard from './components/EventCard.svelte';
    export let data; // Getting from +layout.server.js

    let currentEvents = { items: [] };
    let pastEvents = { items: [] };

    onMount(() => {
        const pb = new PocketBase(data.PB_URL);
        pb.collection('Events').getList(1, 30, {
            filter: 'created >= 0',
        }).then((res) => {
            const today = new Date();
            currentEvents.items = res.items.filter(event => new Date(event.EventDate) >= today);
            pastEvents.items = res.items.filter(event => new Date(event.EventDate) < today);
        }).catch((err) => {
            console.log(err);
        });
    });
</script>

<h1 class="mt-20 pt-5 text-white text-center text-4xl font-bold">Current Events</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4 md:px-8">
    {#each currentEvents.items as event}
        <EventCard {event} PB_URL={data.PB_URL}/>
    {/each}
</div>

<h2 class="mt-20 text-gray-400 text-center text-3xl font-bold">Past Events</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 md:px-8">
    {#each pastEvents.items as event}
        <EventCard {event} PB_URL={data.PB_URL}/>
    {/each}
</div>
