
# Stripe Integration

This integration allows you to connect your Botpress bot with Stripe for processing payments, handling webhooks, and managing customer data.

## Configuration

- **Publishable Key:** Your Stripe publishable key.
- **Secret Key:** Your Stripe secret key.

## Actions

- **stripeButton:** Creates a Stripe card in a users workflow that they can copy their stripe event button or card code into this custom execute code card that will render the stripe button for chatbot payment interaction.


## Events

- **webhook:** Triggered when a new webhook event is created in botpress from Stripe.
