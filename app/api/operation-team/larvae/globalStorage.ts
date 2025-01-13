import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

// Maintain a connected state
let isConnected = false;

export async function getDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db("DESaPDB"); // Replace with your database name
}
