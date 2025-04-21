<svelte:head>
    <title>Frieden Foundation | {data.chapter.Name} Application</title>
    <meta name="description" content="Apply to join the {data.chapter.Name} chapter of Frieden Foundation!">
    <meta name="keywords" content="{data.chapter.Name}, chapter application, Frieden Foundation">
</svelte:head>

<script>
    import { pb } from '$lib/pocketbase';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { cleanPhone } from '$lib/helpers';
    
    export let data;
    
    const toastStore = getToastStore();
    
    // Load custom application fields or show error
    let appFields = [];
    let errorMessage = '';
    try {
        const raw = data.chapter.ApplicationFields;
        if (!raw) {
            throw new Error('No application fields configured');
        }
        if (typeof raw === 'string') {
            appFields = JSON.parse(raw);
        } else if (Array.isArray(raw)) {
            appFields = raw;
        } else if (typeof raw === 'object' && raw !== null) {
            appFields = raw;
        } else {
            throw new Error('Invalid application fields format');
        }
    } catch (err) {
        console.error('Error loading application fields:', err);
        errorMessage = 'Application form is not available at this time.';
    }
    
    // Initial form state with dynamic fields
    let form = {
        Name: '',
        Email: '',
        Phone: '',
        ApplicationType: 'Chapter',
        Chapter: data.chapter.id,
        ...appFields.reduce((o, f) => ({ ...o, [f.name]: '' }), {})
    };
    
    function resetForm() {
        form = {
            Name: '',
            Email: '',
            Phone: '',
            ApplicationType: 'Chapter',
            Chapter: data.chapter.id,
            ...appFields.reduce((o, f) => ({ ...o, [f.name]: '' }), {})
        };
    }
    
    const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
    
    async function sendApplication() {
        const payload = new FormData();
        // Append fixed contact and chapter fields
        payload.append('Name', form.Name);
        payload.append('Email', form.Email);
        payload.append('Phone', cleanPhone(form.Phone));
        payload.append('ApplicationType', form.ApplicationType);
        payload.append('Chapter', form.Chapter);
        // Encode custom answers as JSON
        const responses = appFields.reduce((acc, field) => {
            acc[field.name] = form[field.name];
            return acc;
        }, {});
        payload.append('Responses', JSON.stringify(responses));

        // Sending payload to the server
        pb.collection('ChapterApplications')
            .create(payload)
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
</script>

<Toast/>

{#if errorMessage}
  <div class="container mx-auto p-6 md:p-10">
    <div class="w-full max-w-lg mx-auto p-8 rounded-xl bg-secondary-900 shadow-lg">
      <p class="text-center text-red-500 text-lg">{errorMessage}</p>
    </div>
  </div>
{:else}
  <div class="container mx-auto p-6 md:p-10">
    <div class="mb-10 text-center">
        {#if data.chapter.Logo}
            <img 
                src={data.chapter.LogoUrl} 
                alt="{data.chapter.Name} logo" 
                class="w-32 h-32 mx-auto mb-4 object-contain"
            >
        {/if}
        <h1 class="text-4xl font-bold text-white">{data.chapter.Name} Chapter</h1>
        {#if data.chapter.Description}
            <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.chapter.Description}</p>
        {/if}
    </div>
    
    <div class="w-full max-w-lg mx-auto p-8 rounded-xl bg-secondary-900 shadow-lg">
        <div class="mx-auto rounded-lg overflow-hidden">
            <h2 class="text-center text-2xl font-bold text-white">Apply to Join</h2>
            <form action="" enctype="multipart/form-data" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" on:submit|preventDefault={sendApplication}>
                <!-- Name Field -->
                <div class="field-box md:col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-300">Name</label>
                    <input type="text" id="name" name="name" required autocomplete="name" class="input-field" bind:value={form.Name}>
                </div>

                <!-- Email Field -->
                <div class="field-box md:col-span-2">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" name="email" required autocomplete="email" class="input-field" bind:value={form.Email}>
                </div>

                <!-- Phone Field -->
                <div class="field-box md:col-span-2">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Phone</label>
                    <input type="tel" id="phone" name="phone" required autocomplete="tel" class="input-field" bind:value={form.Phone}>
                </div>

                <!-- Dynamic custom fields -->
                {#each appFields as field}
                    <div class="field-box md:col-span-2">
                        <label for={field.name} class="block mb-2 text-sm font-medium text-gray-300">{field.label}</label>
                        {#if field.type === 'text'}
                            <input
                                type="text"
                                id={field.name}
                                class="input-field"
                                bind:value={form[field.name]}
                                required={field.required}
                            />
                        {:else if field.type === 'select'}
                            <select
                                id={field.name}
                                class="input-field"
                                bind:value={form[field.name]}
                                required={field.required}
                            >
                                <option value="">Select {field.label}</option>
                                {#each field.options as opt}
                                    <option value={opt}>{opt}</option>
                                {/each}
                            </select>
                        {:else if field.type === 'textarea'}
                            <textarea
                                id={field.name}
                                class="input-field"
                                rows={field.type === 'textarea' ? (field.options ? field.options.length : 3) : 3}
                                bind:value={form[field.name]}
                                required={field.required}
                            ></textarea>
                        {/if}
                    </div>
                {/each}

                <button type="submit" class="w-full md:col-span-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">Submit Application</button>
            </form>
        </div>
    </div>
  </div>
{/if}

<style lang="postcss">
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

    .field-box {
        @apply mb-4;
        width: 100%;
    }
</style> 