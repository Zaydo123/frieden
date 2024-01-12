import { hydrateAuth } from 'svelte-google-auth/server';

export const load = ({ locals }) => {
    // By calling hydrateAuth, certain variables from locals are parsed to the client
    // allowing the client to access the user information and the client_id for login
    return { ...hydrateAuth(locals) };
};