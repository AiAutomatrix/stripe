import * as botpress from '@botpress/sdk';

const logger = console;
logger.info('Starting integration');

class NotImplementedError extends Error {
  constructor() {
    super('Not Implemented');
  }
}

export default new botpress.Integration({
  register: async () => {
    /**
     * This is called when a bot installs the integration.
     * Use this handler to instantiate resources in the external service
     * and ensure that the configuration is valid.
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
  handler: async () => {
    /**
     * This is the main handler for incoming messages or events from external services.
     * Implement your logic here to handle these messages.
     */
    // Add your implementation here
  },
  actions: {
    // Define custom actions here
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
