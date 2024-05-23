import z from 'zod';

export const actions = {
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
    handler: async (ctx, { listId, name, description }) => {
      // Implement task creation logic
      throw new Error('Not Implemented');
    },
  },
  addReaction: async (ctx, conversationId, messageId, reaction) => {
    const token = ctx.config.botToken;
    const channelId = ctx.mapping[conversationId];

    const result = await ctx.client.reactions.add({
      token,
      channel: channelId,
      name: reaction,
      timestamp: messageId,
    });

    if (!result.ok) {
      // Handle the error
      throw new Error('Failed to add reaction');
    }
  },
};
