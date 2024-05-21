// integration.definition.ts
import * as sdk from "@botpress/sdk";
import { z } from "zod";
 
export default new sdk.IntegrationDefinition({
  name: "myintegration",
  version: "0.1.0",
  public: true,
  configuration: {
    schema: z.object({
      appId: z.string(),
      appSecret: z.string(),
    }),
  },
  channels: {
    channel: {
      messages: {
        text: sdk.messages.defaults.text,
        image: sdk.messages.defaults.image,
      },
      tags: {
        messages: ["id"],
        conversations: ["id"],
      },
    },
  },
  tags: {
    users: ["id"],
  },
  actions: {
    fetchInventory: {
      input: {
        schema: z.object({
          itemId: z.string(),
        }),
      },
      output: {
        schema: z.object({
          name: z.string(),
          price: z.number(),
        }),
      },
    },
  },
  events: {},
  states: {},
});