import { name as integrationName } from '././package.json';
const INTEGRATION_NAME = integrationName;
import { IntegrationDefinition } from '@botpress/sdk';
import z from 'zod';
 
export default new IntegrationDefinition({
  // Other integration properties...
  secrets: ['api_key', 'token', 'password'],
})