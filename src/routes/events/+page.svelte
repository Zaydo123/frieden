<svelte:head>
    <title>Frieden Foundation | Events</title>
    <meta name="description" content="Join our upcoming events and learn more about our past ones!">
    <meta name="keywords" content="events, charity events, fundraising events, community events, Frieden Foundation events">
</svelte:head>

<script>
    import EventCard from './components/EventCard.svelte';
    import {pb} from '$lib/pocketbase';
    import {onMount} from 'svelte';

    let currentEvents = { items: [] };
    let pastEvents = { items: [] };

    onMount(() => {
        pb.collection('Events').getList(1, 30).then((res) => {
            const today = new Date();
            currentEvents.items = res.items.filter(event => new Date(event.EventDate) >= today);
            pastEvents.items = res.items.filter(event => new Date(event.EventDate) < today);
        }).catch((err) => {
            console.log(err);
        });
    });

</script>

<h1 class="mt-20 pt-5 text-white text-center text-4xl font-bold">Upcoming Events</h1>

<div class="event-container">
    {#if currentEvents.items.length>0}
    {#each currentEvents.items as event}
        <EventCard {event}/>
    {/each}
    {:else}
    <p class="text-gray-400 text-center">No upcoming events</p>
    {/if}
</div>

<h2 class="mt-20 text-gray-400 text-center text-3xl font-bold">Past Events</h2>

<div class="event-container">
    {#if pastEvents.items.length>0}
    {#each pastEvents.items as event}
        <EventCard {event}/>
    {/each}
    {:else}
    <p class="text-gray-400 text-center">No past events</p>
    {/if}
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