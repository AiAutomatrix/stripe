import axios from 'axios';
import * as sdk from '@botpress/sdk';
import Stripe from 'stripe';

export class StripeClient {
  private apiKey: string;
  private teamId: string;

  constructor(apiKey: string, teamId: string) {
    this.apiKey = apiKey;
    this.teamId = teamId;
  }

  async getUser() {
    const response = await axios.get('https://api.stripe.com/v1/users', {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async createTask(input: any) {
    const response = await axios.post('https://api.stripe.com/v1/tasks', input, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async createComment(comment: { text: string; taskId: string }) {
    const response = await axios.post(`https://api.stripe.com/v1/tasks/${comment.taskId}/comments`, {
      text: comment.text
    }, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async listWebhooks() {
    const response = await axios.get('https://api.stripe.com/v1/webhooks', {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async createWebhook(webhook: { endpoint: string; events: string[] }) {
    const response = await axios.post('https://api.stripe.com/v1/webhooks', webhook, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async updateWebhook(webhook: { endpoint: string; status: string; webhookId: string; events: string[] }) {
    const response = await axios.put(`https://api.stripe.com/v1/webhooks/${webhook.webhookId}`, webhook, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.data;
  }
}
