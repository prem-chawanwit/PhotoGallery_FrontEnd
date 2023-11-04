const express = require('express');
const app = express();
const port = 3000; // Set the port you want your server to listen on

// Create a route for serving static files
app.use(express.static('public'));

// Define other routes and server logic here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
