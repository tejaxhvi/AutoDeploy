import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function ConnectDB() {
  let db ;
  if (!db) {
    await client.connect();
    db = client.db('AutoDeploy');
    console.log('Connected to MongoDB!');
  }
  return db;
}

