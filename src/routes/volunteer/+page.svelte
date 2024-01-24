<script>
import {onMount} from 'svelte';
import { goto } from '$app/navigation';
import { superForm } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { FileDropzone} from '@skeletonlabs/skeleton';
import {pb} from '$lib/pocketbase';

export let data;

let schema = z.object({
    name: z.string().default(''),
    email: z.string().email().min(5).max(50).default(''),
    phone: z.string().min(3).max(15).default(''),
    typeOfVolunteer: z.string().min(1).max(20).default('Volunteer'),
    position: z.string().max(50).default('').optional(),
});


const { form, enhance, tainted, errors, constraints } = superForm(data.form,
{applyAction: true, invalidateAll: true, resetForm: false,
 taintedMessage: 'You have unsaved changes. Are you sure you want to leave this page?',
 validators: schema,
 validationMethod: 'auto',
 defaultValidator: 'clear',
});

let volunteerTypes = ["Volunteer", "Staff", "Intern", "Board Member"]
let typeOfVolunteer = volunteerTypes[0];
let files = [];

let errorVisible = false;
let errorMessage = "";

function sendApplication() {
    if (form.valid) {
        let formData = new FormData();
        formData.append('Name', form.name);
        formData.append('Email', form.email);
        formData.append('Phone', form.phone);
        formData.append('ApplicationType', form.typeOfVolunteer);
        formData.append('DesiredPosition', form.position);
        formData.append('Resume', files[0]);
        pb.collection('VolunteerApplications')
            .create(formData)
            .then((res) => {

                if(res.valid){
                    errorVisible = false;
                }else{    
                    errorVisible = true;
                    errorMessage = res.errors[0];

                }

                goto('/');
            })
            .catch((err) => {
                console.log("err")
            });
    }
}

// sure you want to leave message init
onMount(() => {
    tainted.subscribe((value) => {
        if (value) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    });

});    


</script>


<!-- <SuperDebug data={$form} /> -->

{#if errorVisible}
    <aside class="alert variant-ghost">
        <!-- Icon -->
        <div>(icon)</div>
        <!-- Message -->
        <div class="alert-message">
            <h3 class="h3">(title)</h3>
            <p>{errorMessage}</p>
        </div>
        <!-- Actions -->
        <div class="alert-actions">
            <!-- Dismiss -->
            <button class="">Dismiss</button>
        </div>
    </aside>
{/if}


<div class="container w-max mx-auto px-10 py-10">
    <h1 class="text-center text-3xl font-bold text-white">Apply to Volunteer</h1>
    <div id="form" class="max-w-md mx-auto rounded-lg shadow-md overflow-hidden">
        <form action="" method="POST" enctype="multipart/form-data" class="p-8" use:enhance>
            <!-- Name Field -->
            <div class="mb-6">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" name="name" required autocomplete="name" class="input-field" bind:value={$form.name} {...$constraints.email}>
            </div>

            <!-- Email Field -->
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" required autocomplete="email" class="input-field" bind:value={$form.email}>
            </div>

            <!-- Phone Field -->
            <div class="mb-6">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                <input type="number" id="phone" name="phone" required autocomplete="tel" class="input-field" bind:value={$form.phone}>
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

            {#if $form.typeOfVolunteer != typeOfVolunteer}
                <!-- Desired Position Field -->
                <div class="mb-6">
                    <label for="position" class="block mb-2 text-sm font-medium text-gray-300">Desired Position</label>
                    <input type="text" id="position" name="position" placeholder="" class="input-field" bind:value={$form.position} required>
                </div>
                
                <!-- Location -->
                
                <label for="dropzone" class="block mb-2 text-sm font-medium text-gray-300">Resume</label>
                <FileDropzone id="dropzone" class="text-white mb-10" bind:files={files} accept=".pdf">
                {#if files!=[]}
                    <div class="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer text-white">
                        <img src="/components/icons/pdf.svg" alt="preview" class="h-4/5"/>
                        <h1>{files[0].name}</h1>
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
