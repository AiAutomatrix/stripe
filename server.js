import express from 'express';

const app = express();
const port = 4242;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle incoming webhook events from Botpress
app.post('/botpress-webhook', (req, res) => {
  // Extract the event data from the request body
  const eventData = req.body;

  // Log the event data to the console (you can customize this)
  console.log('Received Botpress event:', eventData);

  // Update the HTML content dynamically based on the event data
  // For example, you can send the event data to the client-side JavaScript
  // and use it to update the DOM or perform other actions

  // Respond to the webhook request
  res.sendStatus(200);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
