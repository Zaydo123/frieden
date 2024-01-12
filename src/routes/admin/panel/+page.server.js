import { hydrateAuth } from 'svelte-google-auth/server';
import { redirect } from '@sveltejs/kit';
import { isSignedIn, generateAuthUrl } from 'svelte-google-auth';
    
const SCOPES = ['openid', 'profile', 'email'];

export const load = ({ locals, url }) => {
    if (!isSignedIn(locals)) {
        console.log("Not signed in")
        throw redirect(302, generateAuthUrl(locals, url, SCOPES, url.pathname));

    }
    console.log("Signed in")
    // By calling hydateAuth, certain variables from locals are parsed to the client
    // allowing the client to access the user information and the client_id for login
    return { ...hydrateAuth(locals) };
};

