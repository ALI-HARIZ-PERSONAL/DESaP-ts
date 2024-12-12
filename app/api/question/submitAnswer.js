import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // get URI
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

let client;
let clientPromise;

// create MongoDB cliant
if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { responses } = req.body;
            if (!responses || typeof responses !== "object") {
                return res.status(400).json({ error: "Invalid responses data" });
            }

            // connect to MongoDB
            const client = await clientPromise;
            const database = client.db("DESaPDB");
            const collection = database.collection("responses");

            // save data
            const result = await collection.insertOne({
                responses,
                submittedAt: new Date(),
            });

            res.status(200).json({ message: "Responses saved successfully", id: result.insertedId });
        } catch (error) {
            console.error("Error saving responses:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}