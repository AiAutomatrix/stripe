import z from 'zod';

export const configuration = {
  schema: z.object({
    Publishablekey: z.string(),
    Secretkey: z.string(),
  }),
  fields: [
    {
      name: 'api_key',
      type: 'string',
      description: 'API key for the platform',
      secret: true,
      required: true,
    },
    {
      name: 'token',
      type: 'string',
      description: 'Token for interacting with the platform API',
      secret: true,
      required: true,
    },
  ],
};
