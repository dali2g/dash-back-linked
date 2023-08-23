import express from 'express';
import userRouter from './src/routes/userRouter.js';
import employerRouter from './src/routes/employerRouter.js';
import { connect } from './db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import { readFileSync } from 'fs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(join(__dirname, 'dist')));
app.use(cors());

// Use the userRouter for user-related routes
app.use('/users', userRouter);

app.use('/employers', employerRouter);

// Serve the index.html file for all other routes
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});
// Add this line to serve the 'public' directory
app.use(express.static('public'));


// Serve the CSV file
app.get('/data/data.csv', (req, res) => {
  try {
    // Read the CSV file synchronously
    const csvData = readFileSync(join(__dirname, 'public', 'data', 'data.csv'), 'utf-8');

    // Set the appropriate headers for CSV
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

    // Send the CSV data as a response
    res.send(csvData);
  } catch (error) {
    console.error('Error serving CSV file:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Connect to the database
connect();

// Start the server
const port = 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
