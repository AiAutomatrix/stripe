const integration = {
    // ...
    actions: {
      addReaction: async (ctx, conversationId, messageId, reaction) => {
        // Retrieve the bot token and channel ID from the conversation context
        const token = ctx.config.botToken
        const channelId = ctx.mapping[conversationId]
   
        // Use the `reactions.add` method of the Slack API to add the reaction
        const result = await ctx.client.reactions.add({
          token,
          channel: channelId,
          name: reaction,
          timestamp: messageId,
        })
   
        if (!result.ok) {
          // Handle the error
        }
      },
    },
    // ...
  }