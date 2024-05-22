import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { name as integrationName } from './package.json';

const INTEGRATION_NAME = integrationName;

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
  documentation: './readme.md',
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
  register: async ({ config, secrets }) => {
    // Initialize the Stripe client with the provided secret key
    const stripeClient = new StripeClient(secrets.Secretkey);

    // Store the Stripe client instance in the integration's context
    return {
      stripeClient,
    };
  },
  unregister: async () => {
    // Cleanup logic when the integration is uninstalled
  },
  handler: async (event, ctx) => {
    // Handle incoming events/actions here using the Stripe client
  },
});