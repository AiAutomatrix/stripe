import * as sdk from '@botpress/sdk';
import { Integration } from '@botpress/sdk';
import integrationDefinition from './integration.definition'; // Import the IntegrationDefinition from your file

const integration = new Integration({
  definition: integrationDefinition, // Use the imported integrationDefinition
  register: async (props) => {
    const { client, configuration } = props;

    if (!configuration.Publishablekey || !configuration.Secretkey) {
      throw new sdk.RuntimeError('Invalid configuration: Missing API keys');
    }

    try {
      const stripe = require('stripe')(configuration.Secretkey);

      await stripe.balance.retrieve();

      console.log('Stripe integration registered successfully');
    } catch (error) {
      console.error('Stripe registration error:', error);
      throw new sdk.RuntimeError('Invalid Stripe API keys');
    }
  },

  unregister: async (props) => {
    const { client, configuration } = props;

    try {
      console.log('Stripe integration unregistered successfully');
    } catch (error) {
      console.error('Unregistration error:', error);
    }
  },

  actions: {
    createTask: async (props) => {
      const { client, configuration, event, action, ctx } = props;

      try {
        const stripe = require('stripe')(configuration.Secretkey);
        const { listId, name, description } = action.input;

        const task = await stripe.tasks.create({
          list: listId,
          name,
          description,
        });

        return { id: task.id };
      } catch (error) {
        console.error('Error creating task:', error);
        throw new sdk.RuntimeError('Error creating task: ' + error.message);
      }
    },
  },

  channels: {
    comment: {
      messages: {
        text: async (props) => {
          const { client, configuration, event, message, ctx } = props;
          const { text } = message;

          try {
            const stripe = require('stripe')(configuration.Secretkey);

            const response = await stripe.processMessage(text);

            return response;
          } catch (error) {
            console.error('Error processing message:', error);
            throw new sdk.RuntimeError('Error processing message: ' + error.message);
          }
        },
      },
    },
  },

  handler: async (props) => {
    const { client, configuration, event, ctx } = props;
  },
});

export default integration;
