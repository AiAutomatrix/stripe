import * as sdk from '@botpress/sdk';
import axios from 'axios';
import Stripe from 'stripe';
import { IntegrationProps, IntegrationAction, IntegrationChannel, IntegrationEventHandler } from '@botpress/sdk';
import { StripeClient } from './client';
// integration.definition.ts file dependencies.
import { name as integrationName } from '/workspaces/stripe/stripe-integration/package.json';
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
import { cards } from '/workspaces/stripe/stripe-integration/src/integration/cards'; // Import the cards definition


export const register = async ({ ctx, logger, webhookUrl }: IntegrationProps) => {
  logger.forBot().info('Stripe integration enabled');
  const Stripe = new StripeClient(ctx.configuration.Publishablekey, ctx.configuration.Secretkey);
  await Stripe.getUser();
  await setWebhook(Stripe, webhookUrl);
};

export const unregister = async () => {};



