// integration.ts
import * as sdk from "@botpress/sdk";
import { ExternalService } from "@externalservice/client";
 
export default new sdk.Integration({
  register: async () => {},
  unregister: async () => {},
  actions: {
    fetchInventory: async (props) => {
      const { appId; appSecret } = props.ctx.configuration;
      const client = new ExternalService(appId, appSecret);
      const inventory = await client.fetchInventory(props.input.itemId);
      return {
        name: inventory.name,
        price: inventory.price,
      };
    },
  },
  channels: {
    channel: {
      messages: {
        text: async (props) => {
          const { appId; appSecret } = props.ctx.configuration;
          const client = new ExternalService(appId, appSecret);
          const convId = props.conversation.tags["myintegration:id"]
          await client.sendMessage(convId, { text: props.payload.text });
        },
        image: async (props) => {
          const { appId; appSecret } = props.ctx.configuration;
          const client = new ExternalService(appId, appSecret);
          const convId = props.conversation.tags["myintegration:id"]
          await client.sendImage(convId, { imageUrl: props.payload.imageUrl });
        },
      },
    },
  },
  handler: async ({ req, client }) => {
    if (!req.body) {
      log.warn("Handler received an empty body");
      return;
    }
 
    const activity: Activity = JSON.parse(req.body);
    log.info(`Handler received event of type ${activity.type}`);
 
    if (!activity.id) {
      return;
    }
 
    const convRef: Partial<ConversationReference> =
      TurnContext.getConversationReference(activity);
 
    switch (activity.type) {
      case "message":
        const { conversation } = await client.getOrCreateConversation({
          channel: "channel",
          tags: {
            [`${name}:id`]: activity.conversation.id,
          },
        });
 
        const { user } = await client.getOrCreateUser({
          tags: {
            [`${name}:id`]: activity.from.id,
          },
        });
 
        await client.createMessage({
          tags: { [`${name}:id`]: activity.id },
          type: "text",
          userId: user.id,
          conversationId: conversation.id,
          payload: { text: activity.text },
        });
        break;
      default:
        return;
    }
  },
});