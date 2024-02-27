<script>

    import { onMount } from "svelte";
    let failure = false;

    let defaultEmail = "_____________________";
    let email = defaultEmail;


    onMount(async () => {

        const devMode = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        let session;        

        try{
            let response = await fetch(`/api/donation/checkout/session/status?session_id=${sessionId}`);
            session = await response.json();
            response.json();
        } catch (e) {
            failure = true;
        }

        if (session.status == 'complete') {
            email = session.customer_email;
            failure = false;
        } else {
            failure = true;
        }
        
    });

</script>


<div class="m-auto pb-10 w-4/5 md:w-1/2 lg:w-2/3 xl:w-1/4 bg-tertiary-500 rounded">
    {#if failure}
    <div id="failure">
        <h1 class="text-3xl text-center mt-10 text-primary-50 p-10">An error occurred while processing your donation.</h1>
        <h3 class="text-center pt-5 text-primary-100 p-10">Please <a class="underline no-underline" href="/#contact">contact us</a> if you have any questions.</h3>
    </div>
    {:else}
    <div class="flex flex-col" id="success">
        <h1 class="text-3xl text-center pt-10 text-primary-50">Thank you for your donation!</h1>
        <p class="text-center pt-5 text-primary-100 p-10 pb-1">A receipt has been sent to <span id="customer-email" class="bg-tertiary-700 p-1">{email}</span></p>
        <button class="bg-primary-500 text-primary-50 rounded p-2 w-3/4 m-auto mt-10" on:click={() => window.location.href = '/'}>Return to Home</button>
    </div>
    {/if}
</div>




