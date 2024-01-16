import { PB_URL } from "../../../lib/pbConnection";

export function GET(){

    return new Response(PB_URL, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });

}