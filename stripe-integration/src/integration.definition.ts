import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { integrationName } from '../package.json';

const INTEGRATION_NAME = integrationName;

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  version: '0.0.2',
  configuration: {
    schema: z.object({
      apiKey: z.string(),
      teamId: z.string(),
    })
  },
  events: {
    taskCreated: {
      schema: z.object({ id: z.string() })
    },
  },
  actions: {
    createTask: {
      input: {
        schema: z.object({
          listId: z.string(),
          name: z.string(),
          description: z.string().optional()
        })
      },
      output: {
        schema: z.object({ id: z.string() })
      }
    }
  },
  icon: 'icon.svg',
  channels: {
    comment: {
      messages: {
        text: {
          schema: z.object({ text: z.string() })
        }
      },
      message: {
        tags: {
          id: {
            title: "Message ID",
            description: "Message ID from Stripe"
          }
        }
      },
      conversation: {
        tags: {
          taskId: {
            title: "Task ID",
            description: "Task ID from Stripe"
          }
        }
      }
    }
  },
  user: {
    tags: {
      id: {
        title: "User ID",
        description: "User ID from Stripe"
      }
    }
  }
});
