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
  channels: {}, // Add the channels property to the integration definition
  actions: {
    fetchStripeData: async (props: any) => { // Use any type for now until ActionProps is resolved
      const { stripeApiKey } = props.ctx.configuration;
      const client = new Stripe(stripeApiKey!, { apiVersion: '2023-08-16' }); // Use the non-null assertion operator (!) or handle undefined values
      const data = await client.customers.retrieve(props.input.dataId); // Adjust the method as per your needs
      return {
        result: data,
      };
    },
  },
  handler: async ({ req }) => {
    if (!req.body) {
      console.warn('Handler received an empty body');
      return;
    }

    const event = JSON.parse(req.body);
    console.info(`Handler received event of type ${event.type}`);

    if (!event.id) {
      return;
    }

    // Handle the Stripe event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Forward the event to Botpress
        await forwardEventToBotpress('payment_intent.succeeded', paymentIntent, event.user_id);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Handle the successful attachment of a PaymentMethod.
        // Forward the event to Botpress
        await forwardEventToBotpress('payment_method.attached', paymentMethod, event.user_id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
  },
});

async function forwardEventToBotpress(eventType: string, eventData: any, userId: string) {
  try {
    const botpressEndpoint = process.env.BOTPRESS_WEBHOOK_URL;
    await axios.post(botpressEndpoint!, { // Use the non-null assertion operator (!) or handle undefined values
      eventType,
      eventData,
      userId,
    });
    console.log(`Event ${eventType} forwarded to Botpress successfully.`);
  } catch (error: any) { // Explicitly specify the type of the error variable
    console.error(`Error forwarding event to Botpress: ${error.message}`);
  }
}