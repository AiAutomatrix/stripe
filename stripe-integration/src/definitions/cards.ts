import { IntegrationContext } from '@botpress/sdk';
import { name as integrationName } from '/workspaces/stripe/stripe-integration/package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';

export const cards = {
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
    handler: async (_ctx: IntegrationContext, { stripeButtonCode }: { stripeButtonCode: string }) => {
      // Store the Stripe button code for rendering
      return {
        code: stripeButtonCode,
      };
    },
  },
};

