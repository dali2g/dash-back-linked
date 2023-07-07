import { MongoClient } from 'mongodb';

// Connection URL and database name
const url = 'mongodb+srv://autoroute:autoroute@cluster0.ahkbe46.mongodb.net/';
const dbName = 'Autoroute';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
async function connect() {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db(dbName);
    // You can perform database operations here
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

// Export the connect function
export { connect };
