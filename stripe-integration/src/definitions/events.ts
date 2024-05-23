const integration = {
    // ...
   
    events: {
      'issue.created': async (ctx, event) => {
        // An event handler for when a new issue is created in Linear
        // The event parameter contains information about the event
        // Use this to update your bot's state, trigger flows, etc.
      },
   
      'chat.opened': async (ctx, event) => {
        // An event handler for when a chat is opened in WhatsApp
        // The event parameter contains information about the event
        // Use this to update your bot's state, trigger flows, etc.
      },
   
      // Add more event handlers as needed
    },
   
    // ...
  }