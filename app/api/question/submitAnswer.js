import { MongoClient } from "mongodb";

const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { responses } = req.body;

            // connect to MongoDB
            await client.connect();
            const database = client.db("desap");
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
        } finally {
            await client.close();
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
