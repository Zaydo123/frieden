<script>
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import { pb } from '$lib/pocketbase';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { putFileinFormData, cleanPhone } from '$lib/helpers';
    
    const toastStore = getToastStore();
    
    let form = {
        Name: '',
        Email: '',
        Phone: '',
        ApplicationType: 'Volunteer', // Default type set here
        DesiredPosition: '',
    };

    function resetForm() {
        form = {
            Name: '',
            Email: '',
            Phone: '',
            ApplicationType: 'Volunteer',
            DesiredPosition: '',
        };
    }
    
    let volunteerTypes = ["Volunteer", "Staff", "Intern", "Board Member"];
    let showPreview = false;
    
    async function sendApplication() {
        let formData;
        // Use the putFileinFormData function to append the file to FormData
        if (form.ApplicationType !== 'Volunteer' && !showPreview) {
            toastStore.trigger({
                message: 'Please upload your resume',
                classes: 'variant-filled-error',
            });
            return;
        } else if(form.ApplicationType !== 'Volunteer' && showPreview){
            formData = await putFileinFormData(form.Resume,"Resume");
        } else {
            formData = new FormData();
        }
        // Append other form fields to formData
        formData.append('Name', form.Name);
        formData.append('Email', form.Email);
        formData.append('Phone', cleanPhone(form.Phone));
        formData.append('ApplicationType', form.ApplicationType);
        formData.append('DesiredPosition', form.DesiredPosition);
        
        // Sending formData to the server
        pb.collection('Applicants')
            .create(formData)
            .then((res) => {
                if(res.created){
                    toastStore.trigger({
                       message: 'Your application has been sent successfully!',
                       classes: 'variant-filled-success',
                    });
                    resetForm();

                } else {
                    toastStore.trigger({
                        message: 'There was an error sending your application. Please try again later.',
                        classes: 'variant-filled-error',
                    
                    });
                }

            })
            .catch((err) => {
                console.error(err);
                toastStore.trigger({
                    message: 'There was an error sending your application. Please try again later.',
                    classes: 'variant-filled-error',
                });
            });
    }

    function changeHandler(event) {

        form.Resume = event.target.files[0];
        if (form.Resume) {
            showPreview = true;
        } else if (!form.Resume) {
            showPreview = false;
        }
    }
        

</script>

    
<Toast/>
    
    <div class="container w-max mx-auto p-10 rounded-xl bg-secondary-800">
        <div id="form" class="mx-auto rounded-lg overflow-hidden">
            <h1 class="text-center text-3xl font-bold text-white">Apply to Volunteer</h1>
            <form action="" enctype="multipart/form-data" class="p-8" on:submit|preventDefault={sendApplication}>
                <!-- Name Field -->
                <div class="field-box">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                    <input type="text" id="name" name="name" required autocomplete="name" class="input-field" bind:value={form.Name}>
                </div>

                <!-- Email Field -->
                <div class="field-box">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" name="email" required autocomplete="email" class="input-field" bind:value={form.Email}>
                </div>

                <!-- Phone Field -->
                <div class="field-box">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                    <input type="tel" id="phone" name="phone" required autocomplete="tel" class="input-field" bind:value={form.Phone}>
                </div>

                <!-- Dropdown for type of volunteer -->
                <div class="field-box">
                    <label for="typeOfVolunteer" class="block mb-2 text-sm font-medium text-gray-300">Type of Volunteer</label>
                    <select id="typeOfVolunteer" name="typeOfVolunteer" class="input-field" bind:value={form.ApplicationType}>
                        {#each volunteerTypes as volunteerType}
                            <option value={volunteerType}>{volunteerType}</option>
                        {/each}
                    </select>
                </div>
    
                <!-- Conditional Rendering based on Volunteer Type -->
                {#if form.ApplicationType !== 'Volunteer'} <!-- Adjust this condition based on your requirements -->
                    <div class="field-box">
                        <label for="position" class="block mb-2 text-sm font-medium text-gray-300">Desired Position</label>
                        <input type="text" id="position" name="position" class="input-field" bind:value={form.DesiredPosition} required>
                    </div>
    
                    <label for="dropzone" class="block mb-2 text-sm font-medium text-gray-300">Resume</label>
                    <FileDropzone id="dropzone" class="dropzone text-white mb-2 bg-secondary-500 outline-none" on:change={changeHandler} accept=".pdf" border/>                
                    <!-- uploaded file name -->    
                    {#if showPreview}
                        <div class="uploaded-file mx-auto">
                            <p class="text-primary-50 text-sm text-center mb-4">File Uploaded: {form.Resume.name}</p>
                        </div>
                    {/if}
                    
                {/if}
    
                <button type="submit" class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit Application</button>
            </form>
        </div>
    </div>

    
<style lang="postcss">

    .container {
        margin-top: 8%;
        max-width: 420px;
    }

    .uploaded-file {
        max-width: 75%;     
    }

    .input-field {
        display: flex;
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        @apply focus:border-blue-500 focus:ring focus:ring-red-500 focus:ring-opacity-100 bg-secondary-500 text-white;
    }

    .input-field:focus {
        outline: none;
    }

    .field-box{
        @apply mb-4;
        width: 100%;
        min-width: 200px;
        max-width: 350px;
    }
    
</style>
