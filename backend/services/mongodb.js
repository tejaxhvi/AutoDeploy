import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Error: MONGODB_URI is not defined in environment variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function ConnectDB() {
  try {
    if (!client || !client.topology || !client.topology.isConnected) {
      await client.connect();
      console.log("Connected to MongoDB!");
    }
    const db = client.db("AutoDeploy");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
