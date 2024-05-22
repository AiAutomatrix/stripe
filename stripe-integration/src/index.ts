import { IntegrationDefinition } from '@botpress/sdk';
import * as sdk from '@botpress/sdk';
import z from 'zod';


const INTEGRATION_NAME = 'stripe-integration';

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  version: '0.0.4',
  configuration: {
    schema: z.object({
      Publishablekey: z.string(),
      Secretkey: z.string(),
    }),
  },
  events: {
    taskCreated: {
      schema: z.object({ id: z.string() }),
    },
  },
  actions: {
    createTask: {
      input: {
        schema: z.object({
          listId: z.string(),
          name: z.string(),
          description: z.string().optional(),
        }),
      },
      output: {
        schema: z.object({ id: z.string() }),
      },
    },
  },
  icon: 'icon.svg',
  documentation: '/workspaces/stripe/stripe-integration/readme.md',
  channels: {
    comment: {
      messages: {
        text: {
          schema: z.object({ text: z.string() }),
        },
      },
      message: {
        tags: {
          id: {
            title: 'Message ID',
            description: 'Message ID from Stripe',
          },
        },
      },
      conversation: {
        tags: {
          taskId: {
            title: 'Task ID',
            description: 'Task ID from Stripe',
          },
        },
      },
    },
  },
  user: {
    tags: {
      id: {
        title: 'User ID',
        description: 'User ID from Stripe',
      },
    },
  },
  register: async () => {
    // This is called when a bot installs the integration.
    // You should use this handler to instanciate resources in the external service and ensure that the configuration is valid.
    throw new sdk.RuntimeError('Invalid configuration'); // Replace this with your own validation logic
  },
  unregister: async () => {
    // This is called when a bot removes the integration.
    // You should use this handler to instanciate resources in the external service and ensure that the configuration is valid.
    throw new sdk.RuntimeError('Invalid configuration'); // Replace this with your own validation logic
  },
  handler: async () => {
    // This is where you can define the main handler logic for your integration.
    // This function will be executed when the integration receives events or actions.
    // You can implement the necessary logic here to handle events and actions from Botpress.
  },
});
