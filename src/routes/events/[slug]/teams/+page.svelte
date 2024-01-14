<script>

    import {onMount} from 'svelte';

    export let data;
    let PB_URL = data.PB_URL;
    let user = data.user;

    onMount(() => {
        const pb = new PocketBase(PB_URL);
        pb.collection('users').authWithOAuth2({ provider: 'google' }).then((res) => {
            user = res;
        }).catch((err) => {
            console.log(err);
        });
    });
    

</script>


