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
  register: async ({ ctx, configuration }: botpress.IntegrationProps) => {
    /**
     * This is called when a bot installs the integration.
     * You should use this handler to instantiate resources in the external service and ensure that the configuration is valid.
     */
    ctx.state.stripeClient = new StripeClient(configuration.Secretkey);
    logger.info('Stripe client initialized');
  },
  unregister: async ({ ctx }: botpress.IntegrationProps) => {
    /**
     * This is called when a bot uninstalls the integration.
     * You should use this handler to clean up resources in the external service.
     */
    logger.info('Integration unregistered');
  },
  actions: {
    createTask: async ({ ctx, input }: botpress.ActionProps) => {
      const { stripeClient } = ctx.state;
      const { listId, name, description } = input;
      const task = await stripeClient.createTask(listId, name, description);
      return { id: task.id };
    }
  },
  channels: {
    comment: {
      messages: {
        text: async () => {
          throw new NotImplementedError();
        }
      }
    }
  },
  handler: async ({ ctx, event }: botpress.IntegrationProps) => {
    // Define the main handler logic for your integration.
    // This function will be executed when the integration receives events or actions.
    // You can implement the necessary logic here to handle events and actions from Botpress.
    logger.info('Handler triggered');
  }
});
