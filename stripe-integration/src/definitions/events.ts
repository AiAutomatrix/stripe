import z from 'zod';

export const events = {
  taskCreated: {
    schema: z.object({ id: z.string() }),
    handler: async (ctx, event) => {
      // Implement the logic for the taskCreated event
    },
  },
  'issue.created': async (ctx, event) => {
    // Implement the logic for the issue.created event
  },
  'chat.opened': async (ctx, event) => {
    // Implement the logic for the chat.opened event
  },
};
