const integration = {
    // ...
    messages: {
      sendMessage: async (ctx, conversationId, message) => {
        // Implement logic to send message to the external platform
        // using its API
      },
      processIncomingMessage: async (ctx, incomingMessage) => {
        // Implement logic to convert incoming message from external platform
        // into Botpress understandable format
      },
      processOutgoingMessage: async (ctx, outgoingMessage) => {
        // Implement logic to convert outgoing message from Botpress
        // into the format understood by the external platform
      },
    },
    // ...
  }