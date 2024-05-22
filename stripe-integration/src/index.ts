import * as botpress from '.botpress' // Correct the import path as necessary

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
     * This is called when a bot installs the integration,
     * You should use this handler to instantiate resources in the external service and ensure that the configuration is valid,
     */
  },
  unregister: async () => {
    /**
     * This is called when a bot uninstalls the integration,
     * You should use this handler to clean up resources in the external service,
     */
  },
  handler: async () => {
    throw new NotImplementedError();
  },
  actions: {
    createTask: async () => {
      // Implement your createTask action here
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
      
    },
  },
});
