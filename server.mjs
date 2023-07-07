import express from 'express';
const app = express();
import { connect } from './db.mjs';


// Connect to the database  
connect();

// Define your API routes here
app.get('/api/data', (req, res) => {
  // Perform backend operations here
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
