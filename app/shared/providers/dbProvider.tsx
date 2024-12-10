import { MongoClient } from "mongodb";

// MongoDB URI from environment variable
const uri = process.env.MONGODB_URI || "your-mongo-uri-here";

// MongoDB client instance
let client: MongoClient;
let db: any;

// Specify your database name
const dbName = "DESaPDB"; // Change "DESaPDB" to your desired database name

// Create a MongoDB client and connect to the database
if (process.env.NODE_ENV === "production") {
  client = new MongoClient(uri);
  db = client.db(dbName); // Explicitly set the database name
} else {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
  db = client.db(dbName); // Explicitly set the database name
}

export default db;
