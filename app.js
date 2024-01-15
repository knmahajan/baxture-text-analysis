const express = require('express');
const app = express(); // Createing an express app
const prisma = require('./db'); // Importing the Prisma client
const apiRoutes = require('./routes/apiRoutes');
const port = process.env.PORT || 3000; // Port at which server will be started and running

// Middleware for parsing request json body
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Baxture!');
});

// Use API routes
app.use('/api', apiRoutes);

// Close the Prisma client when the server is closed
app.on('close', () => {
  prisma.$disconnect();
});

try {
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1); // Exit the process with a non-zero code to indicate an error
  }
