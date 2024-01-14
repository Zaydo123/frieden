import { writable } from 'svelte/store';
import {PUBLIC_PB_HOST, PUBLIC_PB_PORT} from '$env/static/public';
import PocketBase from 'pocketbase';

//also export the pocketbase url
const PB_URL = 'http'+(PUBLIC_PB_PORT === 443 ? 's' : '')+'://'+PUBLIC_PB_HOST+':'+PUBLIC_PB_PORT;
const pb = new PocketBase(PB_URL);

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) =>{
    console.log("Auth changed", auth);
    currentUser.set(pb.authStore.model);

});


export {pb, PB_URL};