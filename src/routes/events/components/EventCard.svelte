<script>
    export let PB_URL;
    export let event;

    //get the date from event.EventDate and format it to be english
    let date = new Date(event.EventDate);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    event.EventDate = date.toLocaleDateString('en-US', options);
</script>

<div class="EventCard bg-gray-1000 p-4 rounded-lg shadow-md w-11/12 md:w-3/4 lg:min-h-30 flex flex-col md:flex-row" role="button" tabindex="0" on:click={() => window.location.href = `/events/${event.id}`} on:keydown={(e) => {if (e.key === 'Enter') window.location.href = "/events/${event.id}"}}>
    <div class="EventCard-img w-full md:w-64 h-64 overflow-hidden rounded-md shadow-md flex-shrink-0">
        <img src={`${PB_URL}/api/files/Events/${event.id}/${event.Images[0]}`} class="object-cover object-center w-full h-full transform hover:scale-105 transition duration-500 ease-in-out" alt="event">
    </div>
    <div class="EventCard-content text-left text-white ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 class="text-3xl font-bold mb-2">{event.Title}</h1>
        <p class="text-blue-400 text-sm mb-1">{event.EventDate}</p>
        {#if event.MapURL != ""}
        <a href={event.MapURL} target="_blank" class="flex items-center text-sm text-blue-400 hover:text-blue-600 mb-4 w-max">
            <img src="components/icons/location.svg" alt="map pin icon" class="w-4 h-4 mr-1 invert">
            {event.Location}
        </a>
        {/if}
        <p class="text-gray-400 text-sm">{event.Description}</p>
    </div>
</div>


<style lang="postcss">

    /*custom really dark colors*/

    .bg-gray-1000 {
        --bg-opacity: 1;
        background-color: #0d1117;
        background-color: rgba(13, 17, 23, var(--bg-opacity));
    }

</style>
