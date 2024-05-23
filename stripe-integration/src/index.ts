import * as botpress from '@botpress/sdk';
import cards from './src/definitions/cards'; // Correct the import path as necessary
import { IntegrationContext } from '@botpress/sdk';

import { cards } from '/workspaces/stripe/stripe-integration/src/definitions/cards.ts'; // Import the cards definition


const logger = console;
logger.info('starting integration');

class NotImplementedError extends Error {
  constructor() {
    super('Not Implemented');
  }
}

export default new botpress.Integration({
  register: async () => {
    /**
     * This is called when a bot installs the integration.
     * Use this handler to instantiate resources in the external service and ensure that the configuration is valid.
     */
    logger.info('Registering the integration - Complete');
    // Add your implementation here
  },
  unregister: async () => {
    /**
     * This is called when a bot uninstalls the integration.
     * Use this handler to clean up resources in the external service.
     */
    logger.info('Unregistering the integration - Complete');
    // Add your implementation here
  },
  handler: async (ctx: IntegrationContext) => {
    // Handler for processing cards
    const cardName = ctx.event.metadata.cardName;
    if (cardName && cards[cardName]) {
      try {
        return await cards[cardName].handler(ctx, ctx.event.payload);
      } catch (error) {
        logger.error(`Error handling card '${cardName}':`, error);
        throw error;
      }
    } else {
      throw new NotImplementedError('Card not implemented');
    }
  },
  actions: {
    stripe: async (payload: any) => {
      /**
       * Define the logic for the createTask action here.
       * The payload parameter contains the data passed to this action.
       */
      logger.info('Creating a task with payload:', payload);
      // Add your implementation here
      throw new NotImplementedError();
    },
  },
  channels: {
    comment: {
      messages: {
        text: async () => {
          throw new NotImplementedError();
        },
      },
    },
  },
});
