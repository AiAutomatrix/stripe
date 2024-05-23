cards: {
    'stripe-button': {
      displayName: 'Stripe Button',
      description: 'Displays a Stripe button for payments',
      fields: [
        {
          name: 'stripeButtonCode',
          type: 'string',
          description: 'Paste your Stripe button code here',
          required: true,
          multiline: true,
        },
      ],
      handler: async (ctx, { stripeButtonCode }) => {
        // Store the Stripe button code for rendering
        return {
          code: stripeButtonCode,
        };