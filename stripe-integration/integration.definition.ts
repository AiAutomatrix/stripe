// integration.definition.ts file
import { name as integrationName } from '/workspaces/stripe/stripe-integration/package.json';
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { cards } from '/workspaces/stripe/stripe-integration/src/definitions/cards'; // Import the cards definition

const INTEGRATION_NAME = integrationName;

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  title: 'Stripe',
  version: '0.1.3',
  readme: 'README.md',
  configuration: {
    schema: z.object({
      Publishablekey: z.string(),
      Secretkey: z.string(),
    }),
  },
  events: {
    webhook: {
      schema: z.object({ id: z.string() }),
    },
  },
  actions: {
    stripeButton: {
      input: {
        schema: z.object({
          stripeButtonCode: z.string(),
        }),
      },
      output: {
        schema: z.object({ code: z.string(), htmlPath: z.string() }),
      },
    },
  },
  icon: 'icon.svg',
  documentation: '/workspaces/stripe/stripe-integration/README.md',
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
});
