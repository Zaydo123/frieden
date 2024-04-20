import {stripe} from '$lib/stripe';
import { generateBasicHTTPError } from '$lib/helpers';
import { pb, currentUser } from '$lib/pocketbase';
import { env } from '$env/dynamic/private';

export async function GET ({request}) {
    let session_id;
    let session;
    let url;
    try{
        url = new URL(request.url);
        session_id = url.searchParams.get('session_id');

    } catch(e){
        console.log(e);
    }

    if(!session_id){
        return generateBasicHTTPError(new Error('No session id provided'), {statusCode: 400});
    }

    try {

        session = await stripe.checkout.sessions.retrieve(session_id);
        if(session.status.includes('complete')){
            if(url.searchParams.has('team-id')){
                let team_id = url.searchParams.get('team-id');
                const authData = await pb.admins.authWithPassword(env.SECRET_PB_ADMIN_EMAIL, env.SECRET_PB_ADMIN_PASSWORD);
                currentUser.set(authData);
                const {Paid, Event, Attendees} = await pb.collection('EventRegistrations').getOne(team_id);
                if(Paid == false){
                    await pb.collection('Events').update(Event, {"RegisteredCount+": Attendees.length});
                }
                await pb.collection('EventRegistrations').update(team_id, {Paid: true})
                pb.authStore.clear();
            }
        }

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
