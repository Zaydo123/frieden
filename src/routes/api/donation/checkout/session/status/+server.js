import {stripe} from '$lib/stripe';
import { generateBasicHTTPError } from '$lib/helpers';

export async function GET ({request}) {
    let session_id;
    let session;

    try{
        session_id = request.url.split('?')[1].split('=')[1];
    } catch(e){
        console.log(e);
    }

    if(!session_id){
        return generateBasicHTTPError(new Error('No session id provided'), {statusCode: 400});
    }

    try {
        session = await stripe.checkout.sessions.retrieve(session_id);
    } catch(e){
        return generateBasicHTTPError(e);
    }

    return new Response(JSON.stringify({
        status: session.status,
        customer_email: session.customer_details.email
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
}
