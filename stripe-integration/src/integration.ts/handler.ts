import { name as integrationName } from '././package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { IntegrationProps, IntegrationAction, IntegrationChannel, IntegrationEventHandler } from '@botpress/sdk';
import { StripeClient } from './client';


// This is a handler for a stripe client
export const handler: IntegrationEventHandler = async ({ ctx, req, client, logger }: IntegrationProps) => {
    if (!req.body) return;
    const body = JSON.parse(req.body);
  
    if (body.event === "taskCommentPosted") {
      const Stripe = new StripeClient(ctx.configuration.Publishablekey, ctx.configuration.Secretkey);
      const botUser = await Stripe.getUser();
  
      for (const historyItem of body.history_items) {
        if (botUser.id === historyItem.user.id) continue;
  
        const { user } = await client.getOrCreateUser({ tags: { "id": historyItem.user.id.toString() } });
        const { conversation } = await client.getOrCreateConversation({ channel: "comment", tags: { "taskId": body.task_id.toString() } });
        const { message } = await client.getOrCreateMessage({
          conversationId: conversation.id,
          userId: user.id,
          type: "text",
          payload: { text: historyItem.comment.text_content },
          tags: { "id": historyItem.comment.id.toString() }
        });
  
        logger.forBot().debug(`Received comment from Stripe: ${message.payload.text}`);
      }
    }
  };

  export const handler: async ({ req }) => {
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

  