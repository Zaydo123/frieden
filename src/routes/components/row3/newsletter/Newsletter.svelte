<script>
    let email = '';

    function handleSubmit() {
        // Perform validation and submit logic here
        console.log('Email:', email);
    }
</script>

<main>
    <h1>Email Updates</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>
        <button type="submit">Sign Up</button>
    </form>
</main>

<style lang="postcss">
    main {
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 4px;
        padding: 2rem;
        background-color: white;
    }

    h1 {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-weight: bold;
    }

    input[type="email"] {
        padding: 0.5rem;
        border-radius: 4px;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    @media (max-width: 900px) {
        main {
            height: max-content;
            max-width: 360px;
            width: 80%;
            padding: 1rem;
            border: 1px solid #ccc;
            margin-bottom: 50px;
        }
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    
</style>
