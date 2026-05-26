import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace the placeholder with your Atlas connection string
const uri = 'mongodb+srv://admin:lordTejashvi7@cluster0.6sd2h.mongodb.net/?appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // available even outside function scope

export async function ConnectDB() {
  if (!db) {
    await client.connect();
    db = client.db('RAG_Project');
    console.log('Connected to MongoDB!');
  }
  return db;
}

