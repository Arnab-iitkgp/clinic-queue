const express = require('express');
const cors = require('cors');
require('dotenv').config(); // load env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON request bodies

// Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
