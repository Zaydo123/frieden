<script>
    import { pb } from '$lib/pocketbase';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();

    let form = {
        Name: '',
        Email: '',
        Message: '',
    };

    function resetForm() {
        form = {
            Name: '',
            Email: '',
            Message: '',
        }
    }


    async function sendApplication() {
        try {
            if (validateForm()) {
                const response = await pb.collection('Contact').create(form);
                if (response) {
                    form = {
                        Name: '',
                        Email: '',
                        Message: '',
                    }

                    toastStore.trigger({message: 'Your message has been sent successfully!',})
                    resetForm();
                    
                } else {
                    toastStore.trigger({message: 'There was an error sending your message. Please try again later.', classes: 'variant-filled-error',});
                }

            } else {
                toastStore.trigger({message: 'Please fill out all fields', classes: 'variant-filled-error',});
            }
        } catch (error) {
            toastStore.trigger({message: 'There was an error sending your message. Please try again later.', classes: 'variant-filled-error',});
        }
    }

    function validateForm() {
        return form.Name && form.Email && form.Message;
    }


</script>

<section id="contact" class="flex flex-col items-center justify-center p-8 md:flex-row  md:items-start md:text-left">
    <div class="text-center md:text-left md:ml-4 md:w-4/5">
        <h2 class="text-2xl text-white font-bold mb-4 selection:bg-secondary-500">Contact Us</h2>
        <p class="text-white mb-4 p-2 selection:bg-tertiary-500">We would love to hear from you. Please fill out the form below and we will get back to you as soon as possible. If you have any support related questions, please also feel free to reach out to us <a href="mailto:support@friedenfoundation.org" class="text-warning-500">here</a>.</p>
    </div>
    <form class="flex flex-col items-center w-1/2" on:submit|preventDefault={sendApplication}>
        <div class="flex flex-col w-full mb-4">
            <label for="name" class="text-white mb-2">Name</label>
            <input type="text" id="name" name="name" class="input h-9 rounded" required bind:value={form.Name} />
        </div>
        <div class="flex flex-col w-full mb-4">
            <label for="email" class="text-white mb-2">Email</label>
            <input type="email" id="email" name="email" class="input h-9 rounded" required bind:value={form.Email} />
        </div>
        <div class="flex flex-col w-full mb-4">
            <label for="message" class="text-white mb-2">Message</label>
            <textarea id="message" name="message" class="input h-20 rounded-none" required bind:value={form.Message}></textarea>
        </div>

        <div class="submit-button w-full mb-4">
        <!-- aligned left button that has white outline like the rest of everything. yes outline. very wide-->
        <button class="text-white outline w-1/5 p-2 bg-secondary-900 selection:outline-red-500" type="submit">Send</button>
        </div>

        
    </form>
    
    <Toast />

</section>

<style lang="postcss">

    .input {
        @apply w-full p-2 bg-primary-500 text-white rounded-none;
        border: none;
        border-bottom: 1px solid #fff;
        max-width: 700px;
    }


    section {
            @apply gap-10;
            @apply w-full;

        }




    form {
        @apply w-full;
    }

</style>