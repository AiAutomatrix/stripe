import { name as integrationName } from '././package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';

// Forwarding events to botpress.
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

// Stripe webhook.
async function setWebhook(Stripe: StripeClient, webhookUrl: string) {
  const webhooks = await Stripe.listWebhooks();

  for (const webhook of webhooks) {
    if (webhook.endpoint === webhookUrl) {
      await Stripe.updateWebhook({
        endpoint: webhookUrl,
        status: 'active',
        webhookId: webhook.id,
        events: ['taskCommentPosted', 'taskCreated']
      });
      return;
    }
  }
  await Stripe.createWebhook({ endpoint: webhookUrl, events: ['taskCommentPosted', 'taskCreated'] });
}
