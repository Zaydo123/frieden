<script>
    import { pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    
    let form = {
        name: '',
        email: '',
        message: '',
    };

    let successMessage = '';
    let errorMessage = '';

    async function sendApplication() {
        try {
            if (validateForm()) {
                const response = await pb.collection('Contact').create(form);
                if (response) {
                    successMessage = 'Your message has been sent successfully!';
                    form = {
                        name: '',
                        email: '',
                        message: '',
                    };
                }
            }
        } catch (error) {
            errorMessage = 'There was an error sending your message. Please try again later.';
            console.error(error);
        }
    }

    function validateForm() {
        return form.name && form.email && form.message;
    }

</script>

<section id="contact" class="bg-primary-500 py-10">
    <div class="w-3/4 lg:max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-white mb-4">Contact Us</h1>
        {#if successMessage}
            <p class="text-green-600 mb-4">{successMessage}</p>
        {/if}
        {#if errorMessage}
            <p class="text-red-600 mb-4">{errorMessage}</p>
        {/if}
        <form on:submit|preventDefault={sendApplication}>
            <div class="mb-4">
                <label for="name" class="block text-white font-bold mb-2">Name</label>
                <input type="text" name="name" id="name" placeholder="John Doe" required class="w-full rounded-lg bg-gray-700 border-2 border-gray-500 p-2 text-white focus:outline-none focus:border-primary-500"/>
            </div>
            <div class="mb-4">
                <label for="email" class="block text-white font-bold mb-2">Email</label>
                <input type="email" name="email" id="email" placeholder="example@example.com" required class="w-full rounded-lg bg-gray-700 border-2 border-gray-500 p-2 text-white focus:outline-none focus:border-primary-500"/>
            </div>
            <div class="mb-4">
                <label for="message" class="block text-white font-bold mb-2">Message</label>
                <textarea name="message" id="message" placeholder="Your message here" required class="w-full rounded-lg bg-gray-700 border-2 border-gray-500 p-2 text-white focus:outline-none focus:border-primary-500"></textarea>
            </div>
            <div class="text-center">
                <button type="submit" class="bg-primary-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-primary-600 focus:outline-none focus:bg-primary-600">Submit</button>
            </div>
        </form>
    </div>
</section>
