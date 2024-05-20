// integration.definition.ts
import { IntegrationDefinition } from '@botpress/sdk'; // This imports the IntegrationDefinition class from Botpress SDK.
import { z } from 'zod'; // This imports zod, a library used for building schemas.
import { integrationName } from './package.json';

export default new IntegrationDefinition({
  name: integrationName,
  version: '0.1.0',
  configuration: {
    schema: z.object({
      stripeApiKey: z.string().nonempty({ message: "Stripe API Key is required" }),
      stripeEndpointSecret: z.string().nonempty({ message: "Stripe Endpoint Secret is required" }),
    })
  },
  actions: {
    fetchStripeData: {
      input: {
        schema: z.object({
          dataId: z.string(),
        }),
      },
      output: {
        schema: z.object({
          result: z.any(),
        }),
      },
    },
  },
  events: {
    stripeEvent: {
      schema: z.object({
        type: z.string(),
        data: z.any(),
      })
    },
  },
  icon: 'icon.svg',
});
