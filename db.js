import { MongoClient } from 'mongodb';

// Connection URL and database name
const url = 'mongodb+srv://autoroute:autoroute@cluster0.ahkbe46.mongodb.net/';
const dbName = 'Autoroute';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB server
export async function connect() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

// Access the MongoDB database
export function getDB() {
  return client.db(dbName);
}
