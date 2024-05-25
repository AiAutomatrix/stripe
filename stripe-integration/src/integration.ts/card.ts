import fs from 'fs';
import path from 'path';
import { IntegrationContext } from '@botpress/sdk';
import z from 'zod';

import * as sdk from '@botpress/sdk';
import axios from 'axios';
import Stripe from 'stripe';

import { IntegrationProps, IntegrationAction, IntegrationChannel, IntegrationEventHandler } from '@botpress/sdk';
import { StripeClient } from './client';

export const card = z.object({
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
    handler: async (ctx: IntegrationContext, payload: any) => {
      const stripeButtonCode = payload.stripeButtonCode; // Ensure stripeButtonCode is properly defined
      if (!stripeButtonCode) {
        throw new Error('Stripe button code is missing in payload');
      }
      const cardHtmlPath = path.resolve(__dirname, `/workspaces/stripe/stripe-integration/src/html/stripe-button-${ctx.botId}.html`);
      fs.writeFileSync(cardHtmlPath, stripeButtonCode);
      return {
        code: stripeButtonCode,
        htmlPath: cardHtmlPath,
      };
    },
  },
};
