const integration = {
    // ...
    conversations: {
      getOrCreateConversation: async (ctx, telegramConversationId) => {
        // Check if the conversation exists in the Botpress system
        let conversation = await ctx.bp.conversations.getById(telegramConversationId)
        if (!conversation) {
          // If not, create a new conversation
          conversation = await integration.conversations.createConversation(ctx, telegramConversationId)
        }
        return conversation
      },
      createConversation: async (ctx, telegramConversationId) => {
        // Define conversation fields
        const conversationFields = {
          id: telegramConversationId,
          platform: 'telegram',
          // Other fields like 'userId' can be added as per the platform's conversation object
        }
        // Create conversation in the Botpress system
        const conversation = await ctx.bp.conversations.create(conversationFields)
        return conversation
      },
    },
    // ...
  }