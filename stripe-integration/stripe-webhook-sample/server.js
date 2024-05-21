import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import axios from 'axios';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;


config(); // Load environment variables from .env file

const app = express();

app.use(bodyParser.json());

app.post('/webhook/:userId', express.raw({ type: 'application/json' }), async (request, response) => {
    const userId = request.params.userId;
    let event = request.body;
  
    // Fetch user-specific Stripe credentials from Botpress
    const userCredentials = await getUserCredentials(userId);
    const stripe = new Stripe(userCredentials.stripeApiKey, { apiVersion: '2022-11-15' });
    const endpointSecret = userCredentials.stripeEndpointSecret;
  
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
            // Forward the event to Botpress
            await forwardEventToBotpress('payment_intent.succeeded', paymentIntent, userId);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Handle the successful attachment of a PaymentMethod.
            // Forward the event to Botpress
            await forwardEventToBotpress('payment_method.attached', paymentMethod, userId);
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    response.send();
});

async function getUserCredentials(userId) {
    try {
        const response = await axios.get(`${process.env.BOTPRESS_API_URL}/users/${userId}/credentials`, {
            headers: {
                'Authorization': `Bearer ${process.env.BOTPRESS_API_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching user credentials: ${error.message}`);
        throw new Error('Failed to fetch user credentials');
    }
}

async function forwardEventToBotpress(eventType, eventData, userId) {
    try {
        const botpressEndpoint = process.env.BOTPRESS_WEBHOOK_URL; // Define your Botpress webhook URL in .env
        await axios.post(botpressEndpoint, {
            eventType,
            eventData,
            userId
        });
        console.log(`Event ${eventType} forwarded to Botpress successfully.`);
    } catch (error) {
        console.error(`Error forwarding event to Botpress: ${error.message}`);
    }
}

app.listen(4242, () => console.log('Running on port 4242'));
