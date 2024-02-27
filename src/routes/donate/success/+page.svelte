<script>

    import { onMount } from "svelte";
    let failure = false;

    onMount(async () => {

        const devMode = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        const response = await fetch(`/api/donation/checkout/session/status?session_id=${sessionId}`);
        const session = await response.json();

        if (session.status == 'complete') {
            document.getElementById('success').classList.remove('hidden');
            session.customer_email = 'zaydalzein@gmail.com'
            document.getElementById('customer-email').textContent = session.customer_email;
        } else {
            failure = true;
        }
        
    });

</script>


<div class="m-auto pb-10 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-tertiary-500 rounded">
    {#if failure}
    <div id="failure">
        <h1 class="text-3xl text-center pt-10 text-primary-50">An error occurred while processing your donation.</h1>
    </div>
    {:else}
    <div id="success" class="hidden">
        <h1 class="text-3xl text-center pt-10 text-primary-50">Thank you for your donation!</h1>
        <p class="text-center pt-5 text-primary-100">A receipt has been sent to <span id="customer-email"></span>.</p>
    </div>
    {/if}
</div>
