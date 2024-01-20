<script>
    import { onMount } from 'svelte';

    let pin = Math.floor(1000 + Math.random() * 9000);
    let pinEnabled = false;

    function togglePin() {
        pinEnabled = !pinEnabled;
    }
    
    let imgFile;
</script>


<div class="form-container">
<!-- prevent default -->
    <form class="m-auto bg-gray-1000 w-3/4 md:w-1/3 rounded-lg text-white p-5" method="post" action="" >
        <h1 class="text-2xl text-center font-bold">Create a group</h1>
        <div class="mb-4">
            <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2 mt-5" for="name">Group Name</label>
            <input class="bg-transparent border rounded w-full py-2 px-3 text-gray-50 leading-tight" id="name" type="text" placeholder="Group Name" name="group-name" required />
            </div>
            <!-- image -->

            <label class="block text-gray-200 text-sm font-bold mb-2 mt-5" for="name">Group Logo</label>

            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    {#if !imgFile}
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        <!-- Attached files list -->
                    </div>
                    <ul id="attached-files" class="hidden mt-3"></ul>
                    <!-- bind files to imgFile -->
                    
                    {:else if imgFile}
                    <div class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer">
                        <img src={URL.createObjectURL(imgFile[0])} alt="preview" class="h-4/5"/>
                    </div>
                    {/if}
                    
                    <input id="dropzone-file" type="file" class="hidden" accept="image/*" bind:files={imgFile} name="group-logo" />
                </label>

                

            </div> 
            
            
            <!-- invite only? check box. -->
            <div class="checkbox mt-10 mb-4 text-left">
                <input type="checkbox" id="invite-only" name="invite-only" value="{pin}" on:click={()=>{togglePin()}}>
                <label for="invite-only" class="text-gray-200 text-sm font-bold">Invite Only</label><br>
            </div>

            <!-- invite pin -->
            {#if pinEnabled == true}
            <div class="mb-4 flex flex-col text-center bg-gray-900 w-max rounded-lg px-10 py-1 m-auto">
                <label class="block text-gray-200 text-sm font-bold mb-1 mt-2" for="pin">Invite Pin</label>

                <div class="flex justify-center items-center">
                    <h1 class="text-4xl text-center font-bold text-red-500">{pin}</h1>
                </div> 
                
            </div>
            {/if}

            <!-- Submit -->
            <div class="flex items-center justify-between">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200" type="submit">
                    Create
                </button>
            </div>
            
    </form>


</div> 



<!-- 
    {
      "id": "RECORD_ID",
      "collectionId": "h99lbvcx9t95xxb",
      "collectionName": "EventGroups",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "GroupName": "test",
      "Members": [
        "RELATION_RECORD_ID"
      ],
      "Event": "RELATION_RECORD_ID",
      "InviteURL": "https://example.com",
      "InviteOnly": true,
      "InvitePin": 123,
      "Paid": true,
      "GroupLogo": "filename.jpg",
      "GroupLeader": "RELATION_RECORD_ID",
      "Transactions": [
        "RELATION_RECORD_ID"
      ]
    }



-->
