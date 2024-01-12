import { SvelteGoogleAuthHook } from 'svelte-google-auth/server';

// Import client credentials from json file
import client_secret from '../secret.oauth.json';
const auth = new SvelteGoogleAuthHook(client_secret.web);

export const handle = async ({ event, resolve }) => {
    return await auth.handleAuth({ event, resolve });
};