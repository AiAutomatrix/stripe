import * as botpress from '@botpress/sdk'; // Correct the import path if necessary
import { StripeClient } from './client'; // Import the StripeClient from client.ts

const logger = console;
logger.info('starting integration');

class NotImplementedError extends Error {
  constructor() {
    super('Not Implemented');
  }
}

export default new botpress.Integration({
  register: async ({ config, secrets }) => {
    /**
     * This is called when a bot installs the integration.
     * You should use this handler to instantiate resources in the external service and ensure that the configuration is valid.
     */
    const stripeClient = new StripeClient(secrets.Secretkey);
    logger.info('Stripe client initialized');
    return { stripeClient };
  },
  unregister: async () => {
    /**
     * This is called when a bot uninstalls the integration.
     * You should use this handler to clean up resources in the external service.
     */
    logger.info('Integration unregistered');
  },
  actions: {
    createTask: async ({ req, ctx }) => {
      const { stripeClient } = ctx;
      const { listId, name, description } = req.params;
      const task = await stripeClient.createTask(listId, name, description);
      return { id: task.id };
    }
  },
  channels: {
    channel: {
      messages: {
        text: async () => {
          throw new NotImplementedError();
        },
        image: async () => {
          throw new NotImplementedError();
        },
        markdown: async () => {
          throw new NotImplementedError();
        },
        audio: async () => {
          throw new NotImplementedError();
        },
        video: async () => {
          throw new NotImplementedError();
        },
        file: async () => {
          throw new NotImplementedError();
        },
        location: async () => {
          throw new NotImplementedError();
        },
        carousel: async () => {
          throw new NotImplementedError();
        },
        card: async () => {
          throw new NotImplementedError();
        },
        choice: async () => {
          throw new NotImplementedError();
        },
        dropdown: async () => {
          throw new NotImplementedError();
        },
      },
      handler: async () => {
        throw new NotImplementedError();
      },
    },
  },
});
