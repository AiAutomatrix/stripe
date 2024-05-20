// integration.ts
import * as sdk from '@botpress/sdk';
import axios from 'axios';
import Stripe from 'stripe';

export default new sdk.Integration({
  register: async ({ ctx }) => {
    console.info(`Integration installed in bot ${ctx.botId}`);
  },
  unregister: async ({ ctx }) => {
    console.info(`Integration uninstalled from bot ${ctx.botId}`);
  },
  actions: {
    fetchStripeData: async (props) => {
      const { stripeApiKey } = props.ctx.configuration;
      const client = new Stripe(stripeApiKey, { apiVersion: '2022-11-15' });
      const data = await client.customers.retrieve(props.input.dataId); // Adjust the method as per your needs
      return {
        result: data,
      };
    },
  },
  events: {
    stripeEvent: async (props) => {
      // Handle Stripe events if needed
    },
  },
  handler: async ({ req, client }) => {
    if (!req.body) {
      console.warn('Handler received an empty body');
      return;
    }

    const event = JSON.parse(req.body);
    console.info(`Handler received event of type ${event.type}`);

    if (!event.id) {
      return;
    }

    // Fetch user-specific credentials
    const userId = event.user_id; // Assuming the event contains a user_id field
    const userCredentials = await getUserCredentials(userId);
    const stripe = new Stripe(userCredentials.stripeApiKey, { apiVersion: '2022-11-15' });

    // Handle the Stripe event
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
  },
});

async function getUserCredentials(userId: string) {
  try {
    const response = await axios.get(`${process.env.BOTPRESS_API_URL}/users/${userId}/credentials`, {
      headers: {
        'Authorization': `Bearer ${process.env.BOTPRESS_API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user credentials: ${error.message}`);
    throw new Error('Failed to fetch user credentials');
  }
}

async function forwardEventToBotpress(eventType: string, eventData: any, userId: string) {
  try {
    const botpressEndpoint = process.env.BOTPRESS_WEBHOOK_URL;
    await axios.post(botpressEndpoint, {
      eventType,
      eventData,
      userId,
    });
    console.log(`Event ${eventType} forwarded to Botpress successfully.`);
  } catch (error) {
    console.error(`Error forwarding event to Botpress: ${error.message}`);
  }
}

