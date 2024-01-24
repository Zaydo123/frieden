<script>
    import {pb} from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    function sendApplication() {
        if (form.valid) {
            pb.collection('Contact')
                .create(form)
                .then((res) => {
                    goto('/');
                })
                .catch((err) => {
                    console.log("err")
                });
        }
    }

</script>

<section id="contact" class="">
    
    <div class="contact-us__container mt-10 bg-primary-500">
        <div class="contact-us__container__logo flex flex-row justify-center items-center">
            <h1 class="mr-5 text-primary-50">Contact Us</h1>
            <img src="/frieden.svg" alt="Logo" class="logo pb-3"/>
        </div>

        <form class="contact-us__container__form flex flex-col justify-center items-center" on:submit|preventDefault={sendApplication}>
            <div class="contact-us__container__form__name flex flex-col justify-center items-center">
                <label for="name" class="text-primary-50 font-bold">Name</label>
                <input type="text" name="name" id="name" placeholder="John Doe" required class="w-3/4 md:w-1/2 rounded-lg border-2 border-primary-500 p-2"/>
            </div>
            <div class="contact-us__container__form__email flex flex-col justify-center items-center">
                <label for="email" class="text-primary-50 font-bold">Email</label>
                <input type="email" name="email" id="email" placeholder="" required class="w-3/4 md:w-1/2 rounded-lg border-2 border-primary-500 p-2"/>
            </div>
        </form>


    </div>

</section>

<style>
    .logo{
        width: 55px;
        height: 55px;
    }
</style>