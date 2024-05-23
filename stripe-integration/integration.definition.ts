import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { name as integrationName } from './package.json';
import { sentry as sentryHelpers } from '@botpress/sdk-addons'
 
import { INTEGRATION_NAME } from './src/const'
import { actions, events, configuration, channels, states, user, sercrets } from './src/definitions'
 
const INTEGRATION_NAME = integrationName;

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  title: 'Stripe',
  version: '0.1.1',
  readme: 'README.md',
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
});
