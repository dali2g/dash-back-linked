import express from 'express';
import userRouter from './src/routes/userRouter.js';
import employerRouter from './src/routes/employerRouter.js'
import { connect } from './db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(join(__dirname, 'dist')));
app.use(cors());

// Use the userRouter for user-related routes
app.use('/users', userRouter); 

app.use('/employers',employerRouter);

// Serve the index.html file for all other routes
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Connect to the database
connect();

// Start the server
const port = 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
