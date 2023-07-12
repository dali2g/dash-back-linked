import express from 'express';
import userRouter from './src/routes/userRouter.js';
import { connect } from './db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to the database
connect();

app.use(express.static(join(__dirname, 'dist')));

// Serve the index.html file for all routes
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Use the userRouter for user-related routes
app.use('/users', userRouter);

// Start the server
const port = 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
