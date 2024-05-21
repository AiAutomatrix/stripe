import * as sdk from '@botpress/sdk'
import * as bp from '.botpress'

// Dynamically import actions and channels from the implementation directory
const actions = require('/workspaces/stripe/stripe-integration/.botpress/implementation/actions');
const channels = require('/workspaces/stripe/stripe-integration/.botpress/implementation/channels');


export default new bp.Integration({
  register: async () => {
    /**
     * This is called when a bot installs the integration.
     * You should use this handler to instanciate ressources in the external service and ensure that the configuration is valid.
     */
    throw new sdk.RuntimeError('Invalid configuration') // replace this with your own validation logic
  },
  unregister: async () => {
    /**
     * This is called when a bot removes the integration.
     * You should use this handler to instanciate ressources in the external service and ensure that the configuration is valid.
     */
    throw new sdk.RuntimeError('Invalid configuration') // replace this with your own validation logic
  },
  actions: actions.default || {}, // Ensure a default value if no actions are exported
  channels: channels.default || {}, // Ensure a default value if no channels are exported
  handler: async () => {
    // Your handler logic here
  },
})