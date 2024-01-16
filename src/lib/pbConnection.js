import {PUBLIC_PB_HOST, PUBLIC_PB_PORT} from '$env/static/public';
const PB_URL = 'http'+(PUBLIC_PB_PORT === 443 ? 's' : '')+'://'+PUBLIC_PB_HOST+':'+PUBLIC_PB_PORT;
export {PB_URL};