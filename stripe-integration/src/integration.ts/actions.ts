import { name as integrationName } from '././package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';

import * as sdk from '@botpress/sdk';
import axios from 'axios';
import Stripe from 'stripe';

import { IntegrationProps, IntegrationAction, IntegrationChannel, IntegrationEventHandler } from '@botpress/sdk';
import { StripeClient } from './client';

// This gets the stripe client information.
export const actions: Record<string, IntegrationAction> = {
  createTask: async ({ ctx, params }) => {
    const { stripeClient } = ctx;
    const { listId, name, description } = params;
    const task = await stripeClient.createTask(listId, name, description);
    return { id: task.id };
  }
},

// This returns stripe data for payment.
export const actions: Record<string, IntegrationAction> =  {
  fetchStripeData: async (props: any) => { // Use any type for now until ActionProps is resolved
    const { stripeApiKey } = props.ctx.configuration;
    const client = new Stripe(stripeApiKey!, { apiVersion: '2023-08-16' }); // Use the non-null assertion operator (!) or handle undefined values
    const data = await client.customers.retrieve(props.input.dataId); // Adjust the method as per your needs
    return {
      result: data,
    };
  },
},