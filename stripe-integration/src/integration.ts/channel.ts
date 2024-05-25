import { name as integrationName } from '/workspaces/stripe/stripe-integration/package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';

export const channels = {
  comment: {
    messages: {
      text: {
        schema: z.object({ text: z.string() }),
      },
      sendMessage: async (ctx, conversationId, message) => {
        // Implement logic to send message to the external platform
      },
      processIncomingMessage: async (ctx, incomingMessage) => {
        // Implement logic to convert incoming message from external platform
      },
      processOutgoingMessage: async (ctx, outgoingMessage) => {
        // Implement logic to convert outgoing message from Botpress
      },
    },
    message: {
      tags: {
        id: {
          title: 'Message ID',
          description: 'Message ID from Botpress',
        },
      },
    },
    conversation: {
      tags: {
        taskId: {
          title: 'Task ID',
          description: 'Task ID from Botpress',
        },
      },
    },
  },
};
