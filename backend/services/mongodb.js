import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// let db; // available even outside function scope

export async function ConnectDB() {
  let db ;
  if (!db) {
    await client.connect();
    db = client.db('RAG_Project');
    console.log('Connected to MongoDB!');
  }
  return db;
}

