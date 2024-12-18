import db from "@/shared/providers/dbProvider"; // Ensure this matches your `db` connection
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received body:", body);

        // Destructure the request payload
        const { userId, reportedDate, responses, totalScore } = body;

        // Validate required fields
        if (!userId || !reportedDate || !responses || typeof totalScore !== "number") {
            console.log("Invalid request data");
            return NextResponse.json({ error: "Missing or invalid data", status: 400 });
        }

        // Prepare data for insertion
        const report = {
            userId,
            reportedDate: new Date(reportedDate),
            responses, // Expected: Array of { questionIndex, selectedAnswers, score }
            totalScore,
            createdAt: new Date(), // Log the submission time
        };

        // Insert the data into the database
        const result = await db.collection("responses").insertOne(report);
        console.log("Report saved:", result.insertedId);

        // Return a success response
        return NextResponse.json({
            message: "Responses saved successfully",
            reportId: result.insertedId,
        });
    } catch (error: unknown) {
        console.error("Error saving responses:", error);

        // Return an error response
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error",
            status: 500,
        });
    }
}
