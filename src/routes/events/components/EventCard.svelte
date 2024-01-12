<script>
    export let PB_URL;
    export let event;
</script>

<div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <div class="md:flex md:flex-row-reverse">
        <div class="md:flex-1">
            <!-- Adjusting the image classes for better scaling -->
            <img src={`${PB_URL}/api/files/Events/${event.id}/${event.Images[0]}`} 
                 alt="event image" 
                 class="w-full md:h-full object-cover object-center"/>
        </div>
    </div>
        <div class="p-6 flex flex-col justify-between md:flex-1">
            <div>
                <h2 class="text-2xl font-bold text-white">{event.Title}</h2>
                <p class="text-gray-300 mt-2">{event.Description}</p>
            </div>
            <div class="mt-4">
                <a href="/events/{event.id}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">View Event</a>
            </div>
        </div>
</div>
