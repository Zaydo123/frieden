<script>

</script>

<div class="contact-us">
    <div class="contact-us__container">
        <div class="contact-us__container__logo">

        <div class="contact-us__title">
            <h1>Contact Us</h1>
        </div>
            <img src="/frieden.svg" alt="Logo">
        </div>


        <div class="contact-us__container__form">
            <form action="https://formspree.io/f/xnqoqjzq" method="POST">
                <div class="contact-us__container__form__name">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="John Doe" required>
                </div>
                <div class="contact-us__container__form__email">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="abc@email.com" required>
                </div>
                <div class="contact-us__container__form__message">
                    <label for="message">Message</label>
                    <textarea name="message" id="message" rows="8" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>

<style lang="postcss">
    .contact-us {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #000000;
        color: #ffffff;
        padding: 2rem;
    }

    .contact-us__title {
        margin: auto;
    }

    .contact-us__container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 900px;
    }

    .contact-us__container__logo {
        display: flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 2rem;
    }

    .contact-us__container__form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
    }

    .contact-us__container__form__name,
    .contact-us__container__form__email,
    .contact-us__container__form__message {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .contact-us__container__form__name label,
    .contact-us__container__form__email label,
    .contact-us__container__form__message label {
        width: 500px;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    input[type="text"],
    input[type="email"],
    textarea {
        padding: .5rem;
        border-radius: 4px;
        border: 1px solid #ffffff;
        background-color: #000000;
        color: #ffffff;
    }


    .contact-us__container__form__message textarea {
        width: 100%;
        resize: vertical;
    }

    button[type="submit"] {
        padding: 0.5rem 1rem;
        background-color: #ffffff;
        color: #000000;
        border: none;
        cursor: pointer;
    }

    img {
        width: 200px;
        height: 200px;
    }

    @media (max-width: 900px) {

        img{
            width: 100px;
            height: 100px;
        }

        .contact-us {
            padding: 1rem;
        }

        .contact-us__container {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .contact-us__container__logo {
            width: 100%;
            margin-right: 0;
        }

        .contact-us__container__form {
            width: 100%;
            align-items: center;
        }

        .contact-us__container__form__name label,
        .contact-us__container__form__email label,
        .contact-us__container__form__message label {
            width: 60vw;
        }

        .contact-us__container__form__message textarea {
            width: 100%;
        }
    }

</style>