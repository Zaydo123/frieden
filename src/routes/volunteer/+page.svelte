<script>
export let data;
import { superForm } from 'sveltekit-superforms/client';
import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
import {onMount} from 'svelte';

let volunteerTypes = ["Volunteer", "Staff", "Intern", "Board Member"]
let typeOfVolunteer = volunteerTypes[0];

const { form, enhance, tainted, errors, constraints } = superForm(data.form,{applyAction: true, invalidateAll: true, resetForm: false, taintedMessage: 'You have unsaved changes. Are you sure you want to leave this page?'});

onMount(() => {
    tainted.subscribe((value) => {
        if (value) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    });

});    

function deleteFile() {
    $form.resume = null;
}

</script>

<SuperDebug data={$form} />


<div class="container mx-auto px-4 py-10">
    <h1 class="text-center text-3xl font-bold text-white">Apply to Volunteer</h1>
    <div id="form" class="max-w-md mx-auto rounded-lg shadow-md overflow-hidden">
        <form action="" method="POST" enctype="multipart/form-data" class="p-8" use:enhance>
            <!-- Name Field -->
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" name="name" required autocomplete="name" class="input-field" bind:value={$form.name}>
            </div>

            <!-- Email Field -->
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" required autocomplete="email" class="input-field" bind:value={$form.email}>
            </div>

            <!-- Phone Field -->
            <div class="mb-6">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                <input type="tel" id="phone" name="phone" required autocomplete="tel" class="input-field" bind:value={$form.phone}>
            </div>


            <!-- dropdown for type of volunteer -->
            <div class="mb-6">
                <label for="typeOfVolunteer" class="block mb-2 text-sm font-medium text-gray-300">Type of Volunteer</label>
                <select id="typeOfVolunteer" name="typeOfVolunteer" required autocomplete="typeOfVolunteer" class="input-field" bind:value={$form.typeOfVolunteer}>
                    {#each volunteerTypes as volunteerType}
                        <option selected={volunteerType === typeOfVolunteer}>{volunteerType}</option>
                    {/each}
                </select>
            </div>

            {#if $form.typeOfVolunteer !== typeOfVolunteer}
                <!-- Desired Position Field -->
                <div class="mb-6">
                    <label for="position" class="block mb-2 text-sm font-medium text-gray-300">Desired Position</label>
                    <input type="text" id="position" name="position" placeholder="" class="input-field" bind:value={$form.position} required>
                </div>
                
                <!-- Location -->
                
                
                <label for="dropzone" class="block mb-2 text-sm font-medium text-gray-300">Resume</label>
                <div class="flex flex-col items-center justify-center w-full mb-10" >
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer" draggable="true">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
                            <!-- Attached files list -->
                        </div>
                        <ul id="attached-files" class="hidden mt-3"></ul>


                        <input id="dropzone-file" type="file" class="focusable m-1 text-white" accept=".pdf" bind:files={$form.resume} name="pdf-file" required >
                    </label>
                </div>

            {/if}
            <button type="submit" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Application</button>
        

        </form>
    </div>
</div>

<style>
    :global(.input-field) {
        display: block;
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        @apply focus:border-blue-500 focus:ring focus:ring-red-500 focus:ring-opacity-100;
    }

    :global(.input-field:focus) {
        outline: none;
    }
    
</style>
