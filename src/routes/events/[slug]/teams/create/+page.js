import { PB_URL } from '$lib/pbConnection';

export const load = ({ locals }) => {
    if(locals?.user){
        return {
            user: locals.user,
            PB_URL: PB_URL
        };
    } else {
        return {
            user: undefined,
            PB_URL: PB_URL
        };
    }

}

