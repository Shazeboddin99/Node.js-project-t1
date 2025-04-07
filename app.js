// Import the express module
const express = require('express');

// Create an instance of express app
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set the app to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
