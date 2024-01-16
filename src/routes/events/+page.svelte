<svelte:head>
    <title>Frieden Foundation | Events</title>
</svelte:head>

<script>
    import EventCard from './components/EventCard.svelte';
    import {pb} from '$lib/pocketbase';
    export let data; // Getting from +layout.server.js


    let currentEvents = { items: [] };
    let pastEvents = { items: [] };


    pb.collection('Events').getList(1, 30).then((res) => {
        const today = new Date();
        currentEvents.items = res.items.filter(event => new Date(event.EventDate) >= today);
        pastEvents.items = res.items.filter(event => new Date(event.EventDate) < today);
    }).catch((err) => {
        console.log(err);
    });

</script>

<h1 class="mt-20 pt-5 text-white text-center text-4xl font-bold">Upcoming Events</h1>

<div class="event-container">
    {#each currentEvents.items as event}
        <EventCard {event} PB_URL={data.PB_URL}/>
    {/each}
</div>

<h2 class="mt-20 text-gray-400 text-center text-3xl font-bold">Past Events</h2>

<div class="event-container">
    {#each pastEvents.items as event}
        <EventCard {event} PB_URL={data.PB_URL}/>
    {/each}
</div>

<style>
    .event-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 20px;
    gap: 20px;
}
</style>