import axios from 'axios';

export class StripeClient {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createTask(listId: string, name: string, description?: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.stripe.com/v1/tasks',
        { listId, name, description },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.id;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }
}

export class BotpressClient {
  private readonly baseUrl: string;
  private readonly botId: string;

  constructor(baseUrl: string, botId: string) {
    this.baseUrl = baseUrl;
    this.botId = botId;
  }

  async setUserProperty(userId: string, key: string, value: any): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/api/v1/bots/${this.botId}/users/${userId}/properties`, {
        key,
        value,
      });
    } catch (error) {
      console.error('Error setting user property:', error);
      throw new Error('Failed to set user property');
    }
  }
}
