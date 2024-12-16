import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { questions } from "/(desap)/community-member/report-dengue/questions"; // Assuming `questions` is available here

const uri: string | undefined = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function POST(request: Request) {
    try {
        const { responses } = await request.json();

        // Validate the responses data
        if (!responses || typeof responses !== "object") {
            return NextResponse.json({ error: "Invalid responses data", status: 400 });
        }

        // Calculate the score
        let totalScore = 0;
        const responseDetails = Object.entries(responses).map(([questionIndex, answer]) => {
            const index = parseInt(questionIndex, 10);
            const question = questions[index];

            if (!question) {
                throw new Error(`Invalid question index: ${index}`);
            }

            let questionScore = 0;
            if (Array.isArray(answer)) {
                // Multiple choice question (e.g., question 8)
                questionScore = answer.reduce((acc, optionIndex) => acc + question.points[optionIndex], 0);
            } else if (typeof answer === "number") {
                // Single choice question
                questionScore = question.points[answer];
            }

            totalScore += questionScore;

            return {
                question: question.question,
                selectedOptions: Array.isArray(answer)
                    ? answer.map((idx) => question.options[idx])
                    : question.options[answer],
                score: questionScore,
            };
        });

        // Connect to the database
        const client = await clientPromise;
        const database = client.db("DESaPDB");
        const collection = database.collection("responses");

        // Insert the data into the collection
        const result = await collection.insertOne({
            responses: responseDetails,
            totalScore,
            submittedAt: new Date(),
        });

        // Return the response
        return NextResponse.json({
            message: "Responses saved successfully",
            id: result.insertedId,
            totalScore,
        });
    } catch (error: unknown) {
        console.error("Error saving responses:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error",
            status: 500,
        });
    }
}

// Add global declaration for Node.js serverless environments
declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}
