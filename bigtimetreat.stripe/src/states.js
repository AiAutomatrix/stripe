states = {
    configuration: {
      type: 'integration',
      schema: z.object({
        webhookSecret: z.string().optional(),
        webhookId: z.number().optional(),
        botUserId: z.number().optional(),
      }),
    },
  }