import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://admin:lordTejashvi7@cluster0.6sd2h.mongodb.net/?appName=Cluster0";

console.log("mongo db UrI", uri)

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function ConnectDB() {
  let db;
  if (!db) {
    await client.connect();
    db = client.db('AutoDeploy');
    console.log('Connected to MongoDB!');
  }
  return db;
}

