import * as sdk from '@botpress/sdk';
import * as bp from '.botpress';
import { StripeClient } from './client';
import integrationDefinition from './integration.definition';
import { comment } from '.botpress/implementation/channels';

export default new bp.Integration({
  register: async ({ ctx, logger, webhookUrl }) => {
    logger.forBot().info('Stripe integration enabled');
    const Stripe = new StripeClient(ctx.configuration.apiKey, ctx.configuration.teamId);

    // Fetching the user and registering the webhook.
    await Stripe.getUser();
    await setWebhook(Stripe, webhookUrl);
  },

  unregister: async () => {},

  actions: {
    createTask: async ({ ctx, input }) => {
      const Stripe = new StripeClient(ctx.configuration.apiKey, ctx.configuration.teamId);
      const task = await Stripe.createTask(input);
      return { id: task.id };
    }
  },

  channels: {
    comment: {
      messages: {
        text: async ({ ctx, conversation, ack, payload, logger }) => {
          const Stripe = new StripeClient(ctx.configuration.apiKey, ctx.configuration.teamId);
          const comment = await Stripe.createComment({ text: payload.text, taskId: conversation.tags["taskId"] });
          logger.forBot().debug(`Comment Logs: ${comment}`);
          logger.forBot().debug(`Logs: ${payload.text}`);
          await ack({ tags: { "id": comment.id.toString() } });
        }
      }
    }
  },

  handler: async ({ ctx, req, client, logger }) => {
    if (!req.body) return;
    const body = JSON.parse(req.body);

    if (body.event === "taskCommentPosted") {
      const Stripe = new StripeClient(ctx.configuration.apiKey, ctx.configuration.teamId);
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
  }
});

// Function to set webhook for the Stripe events.
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
};
