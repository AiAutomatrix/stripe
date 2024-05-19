import { IntegrationDefinition, z } from '@botpress/sdk'
import { integrationName } from './package.json'

const configSchema = z.object({
  apiKey: z.string().nonempty(),
  webhookSecret: z.string().nonempty()
}).strict()

export default new IntegrationDefinition({
  name: integrationName,
  version: '0.0.1',
  readme: 'hub.md',
  icon: 'icon.svg',
  configuration: {
    schema: configSchema
  }
})
