<script>
import {onMount} from 'svelte';
import { FileDropzone} from '@skeletonlabs/skeleton';
import {pb} from '$lib/pocketbase';
import { Toast, getToastStore } from '@skeletonlabs/skeleton';
const toastStore = getToastStore();

const ToastSettings = {
    message: 'Your application has been sent successfully!',
}

let form = {
    Name: '',
    Email: '',
    Phone: '',
    ApplicationType: '',
    DesiredPosition: '',
    Resume: '',
}


let volunteerTypes = ["Volunteer", "Staff", "Intern", "Board Member"]
let typeOfVolunteer = volunteerTypes[0];


let errorVisible = false;
let errorMessage = "";

function sendApplication() {

        pb.collection('Applicants')
            .create(form)
            .then((res) => {

                if(res.valid){
                    errorVisible = false;
                    toastStore.trigger(ToastSettings);

                }else{    
                    errorVisible = true;
                    errorMessage = res.errors;
                }

            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong. Please try again later.");
            });
}

// sure you want to leave message init

</script>


<Toast/>

<div class="container w-max mx-auto px-10 py-10">
    <h1 class="text-center text-3xl font-bold text-white">Apply to Volunteer</h1>
    <div id="form" class="max-w-md mx-auto rounded-lg shadow-md overflow-hidden">
        <form action="" enctype="multipart/form-data" class="p-8" on:submit|preventDefault={sendApplication}>
            <!-- Name Field -->
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" name="name" required autocomplete="name" class="input-field" bind:value={form.Name}>
            </div>

            <!-- Email Field -->
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" required autocomplete="email" class="input-field" bind:value={form.Email}>
            </div>

            <!-- Phone Field -->
            <div class="mb-6">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                <input type="number" id="phone" name="phone" required autocomplete="tel" class="input-field" bind:value={form.Phone}>
            </div>


            <!-- dropdown for type of volunteer -->
            <div class="mb-6">
                <label for="typeOfVolunteer" class="block mb-2 text-sm font-medium text-gray-300">Type of Volunteer</label>
                <select id="typeOfVolunteer" name="typeOfVolunteer" required autocomplete="typeOfVolunteer" class="input-field" bind:value={form.ApplicationType}>
                    {#each volunteerTypes as volunteerType}
                        <option selected={volunteerType === typeOfVolunteer}>{volunteerType}</option>
                    {/each}
                </select>
            </div>

            {#if form.ApplicationType != typeOfVolunteer}
                <!-- Desired Position Field -->
                <div class="mb-6">
                    <label for="position" class="block mb-2 text-sm font-medium text-gray-300">Desired Position</label>
                    <input type="text" id="position" name="position" placeholder="" class="input-field" bind:value={form.DesiredPosition} required>
                </div>
                
                <!-- Location -->
                
                <label for="dropzone" class="block mb-2 text-sm font-medium text-gray-300">Resume</label>
                <FileDropzone id="dropzone" class="text-white mb-10" bind:files={form.Resume} accept=".pdf">
                {#if form.Resume!=''}
                    <div class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer text-white">
                        <img src="/components/icons/pdf.svg" alt="preview" class="h-4/5"/>
                        <h1>{form.Resume}</h1>
                    </div>
                {/if}

                </FileDropzone>

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
