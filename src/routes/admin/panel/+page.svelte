<script>
    let events = [
        { title: 'Event 1', date: '2022-01-01' },
        { title: 'Event 2', date: '2022-02-01' },
        { title: 'Event 3', date: '2022-03-01' },
    ];

    let announcements = [
        { title: 'Announcement 1', date: '2022-01-01' },
        { title: 'Announcement 2', date: '2022-02-01' },
        { title: 'Announcement 3', date: '2022-03-01' },
    ];

    function addEvent() {
        events = [...events, { title: 'New Event', date: '2022-04-01' }];
    }

    function deleteEvent(index) {
        events = events.filter((_, i) => i !== index);
    }
</script>

<body class="bg-gray-100">
<main class="container mx-auto bg-white mt-20 p-10 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-4">Events</h1>
    {#each events as event, index}
        <div class="bg-white rounded-lg shadow p-4 mb-4">
            <h2 class="text-lg font-bold">{event.title}</h2>
            <p class="text-red-500">{event.date}</p>
            <button on:click={() => deleteEvent(index)}>Delete</button>
        </div>
    {/each}

    <h1 class="text-2xl font-bold mb-4">Announcements</h1>
    {#each announcements as announcement}
        <div class="bg-white rounded-lg shadow p-4 mb-4">
            <h2 class="text-lg font-bold">{announcement.title}</h2>
            <p class="text-gray-500">{announcement.date}</p>
        </div>
    {/each}

    <button on:click={addEvent}>Add Event</button>
</main>
</body>   

<style lang="postcss">
    .container {
        @apply px-10;
    }
    

</style>

