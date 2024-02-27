import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

export const stripe = Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15'
})

export const getCustomers = async (limit = 100, startingAfter=null) => {

  if(!startingAfter){
    return await stripe.customers.list({
      limit,
    })
  } else {
    return await stripe.customers.list({
      limit,
      starting_after: startingAfter
    })
  }



} 

