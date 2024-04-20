import {stripe} from '$lib/stripe';
import { generateBasicHTTPError } from '$lib/helpers';
import {pb} from '$lib/pocketbase';

import { env } from '$env/dynamic/private';
const { SECRET_PB_ADMIN_EMAIL, SECRET_PB_ADMIN_PASSWORD } = env;
import {env as publicEnv} from '$env/dynamic/public';
const {PUBLIC_WEB_URL} = publicEnv;


export async function POST(event) {
    //event.locals.user is an option! remember for later
    let session;
    const { request } = event;
    //body is readablestream, so we need to parse it
    const body = await request.json();
    //console.log(body);

    let checkoutOptions = {
      mode: 'payment',
      ui_mode: 'embedded',
      line_items: [ 
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Frieden Foundation'
            },
          },
          quantity: 1,
        },
      ],

      return_url: `${PUBLIC_WEB_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,

    };

    // attach calculated amount to checkout options
    checkoutOptions.line_items[0].price_data.unit_amount = (body.amount*100); // set the amount to the amount provided in the body, cvt to cents**

    // if a customer signs up for monthly donations, attach the recurring interval to the checkout options
    if(body.frequency === 1) { // if the frequency is 1, then it's monthly
      //change mode to subscription
      checkoutOptions.mode = 'subscription';
      checkoutOptions.line_items[0].price_data.recurring = { interval: 'month' };
    }
    if(body.type === "event"){
      checkoutOptions.line_items[0].price_data.product_data.name = "Event Registration / Donation";
      //verify event price is accurate to db
      if(body.amount != undefined){
        const event = await pb.collection('Events').getOne(body.eventId);
        const {
          IndividualCost, GroupCost, TeamRequired, RegisteredCount, GroupMaximumSize, MaxRegistrants
        } = event;
        
        //if too many people are registered, return an error
        if(body.members.length + RegisteredCount > MaxRegistrants){
          return new Response('Event is at capacity', { status: 400 });
        }
        checkoutOptions.return_url = `${PUBLIC_WEB_URL}/donate/success?type=event&slug=${body.eventId}&team-id=${body.teamId}&session_id={CHECKOUT_SESSION_ID}`;

        let totalCost = TeamRequired ? GroupCost : IndividualCost * body.members.length;
        if (totalCost !== body.amount) {
            return new Response('Total cost does not match', { status: 400 });
        }

      }

    }



    //console.log(checkoutOptions);
    //console.log(checkoutOptions.line_items[0].price_data)


    // If a customer is provided, attach it to the checkout options
    if(body.customer){
        checkoutOptions.customer = body.customer
    }
    try{
      session = await stripe.checkout.sessions.create(checkoutOptions);
    } catch (e) {
      console.log("Error creating session: ", e);
      return generateBasicHTTPError(e);
    }

    const res = new Response(JSON.stringify({clientSecret: session.client_secret}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });


    return res;

}
