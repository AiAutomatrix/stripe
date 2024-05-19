// server.js (located in src/stripe-webhook-sample/)

import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const app = express();

app.use(bodyParser.json());

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    let event = request.body;
  
    if (endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
    }
  
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Here you could forward this event to Botpress
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Handle the successful attachment of a PaymentMethod.
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));
