const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Baxture!');
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
