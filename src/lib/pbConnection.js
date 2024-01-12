import {PUBLIC_PB_HOST, PUBLIC_PB_PORT} from '$env/static/public';
import PocketBase from 'pocketbase';

//also export the pocketbase url
const PB_URL = 'http'+(PUBLIC_PB_PORT === 443 ? 's' : '')+'://'+PUBLIC_PB_HOST+':'+PUBLIC_PB_PORT;
const pb = new PocketBase(PB_URL);

export {pb, PB_URL};