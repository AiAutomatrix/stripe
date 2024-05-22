import * as sdk from '@botpress/sdk'
import { Integration, IntegrationProps } from '@botpress/sdk'
import integrationDefinition from './integration.definition'
import * as bp from '.botpress'

const integration = new Integration({
  // This method is called when a bot installs the integration.
  register: async (props: IntegrationProps) => {
    const { client, configuration } = props

    // Validate the configuration (e.g., make sure the API keys are correct)
    if (!configuration.Publishablekey || !configuration.Secretkey) {
      throw new sdk.RuntimeError('Invalid configuration: Missing API keys')
    }

    try {
      // Example: Initialize Stripe with the provided keys (pseudo-code)
      const stripe = require('stripe')(configuration.Secretkey)

      // Validate the keys by making a test request
      await stripe.balance.retrieve()

      console.log('Stripe integration registered successfully')
    } catch (error) {
      throw new sdk.RuntimeError('Invalid Stripe API keys')
    }
  },

  // This method is called when a bot removes the integration.
  unregister: async (props: IntegrationProps) => {
    const { client, configuration } = props

    try {
      // Example: Cleanup resources if needed (pseudo-code)
      console.log('Stripe integration unregistered successfully')
    } catch (error) {
      console.error('Error during unregistration:', error)
    }
  },

  // Define actions based on the integration.definition.ts
  actions: {
    createTask: async (props: sdk.ActionProps) => {
      const { client, configuration, event, action, ctx } = props

      try {
        const stripe = require('stripe')(configuration.Secretkey)
        const { listId, name, description } = action.input

        // Example: Create a task (pseudo-code)
        const task = await stripe.tasks.create({
          list: listId,
          name,
          description,
        })

        return { id: task.id }
      } catch (error) {
        throw new sdk.RuntimeError('Error creating task: ' + error.message)
      }
    },
  },

  channels: {
    comment: {
      messages: {
        text: async (props: sdk.MessageProps) => {
          const { client, configuration, event, message, ctx } = props
          const { text } = message

          try {
            const stripe = require('stripe')(configuration.Secretkey)

            // Example: Process message (pseudo-code)
            const response = await stripe.processMessage(text)

            return response
          } catch (error) {
            throw new sdk.RuntimeError('Error processing message: ' + error.message)
          }
        },
      },
    },
  },

  // Handler for any additional logic
  handler: async (props: sdk.HandlerProps) => {
    const { client, configuration, event, ctx } = props

    // Implement any additional handler logic if needed
  },
})

export default integration
