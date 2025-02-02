import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import { GOOGLE_MAPS_API_KEY } from "@/api/googlemap/route";

require('dotenv').config();

const fetch = require('node-fetch');

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            console.error("Google Maps API Key is missing.");
            throw new Error("Missing API Key");
        }
        const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBpovSAJgK2XK__0HgBg6IETG3V4MN2r1w`;
        console.log("API Request URL:", apiURL);

        const response = await fetch(apiURL);
        const data = await response.json();
        console.log("API Response:", data);
        if (data.status === "REQUEST_DENIED") {
            return NextResponse.json(
                { error: "Google Maps API request denied", details: data.error_message },
                { status: 403 }
            );
        }        

        if (data.status === "OK" && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return NextResponse.json({ lat: location.lat, lng: location.lng });
        } else {
            return NextResponse.json({ error: "Failed to get location" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const councils = await db.collection("councils").find().toArray();

        // Destructure the request payload
        const { userId, reportedDate, responses, totalScore, location } = body;

        // Validate required fields
        if (!userId || !reportedDate || !responses || typeof totalScore !== "number") {
            console.log("Invalid request data");
            return NextResponse.json({ error: "Missing or invalid data", status: 400 });
        }
        if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
            return NextResponse.json({ error: "Invalid location data", status: 400 });
        }

        // Prepare data for insertion
        const report = {
            userId,
            reportedDate: new Date(reportedDate),
            responses, // Expected: Array of { questionIndex, selectedAnswers, score }
            totalScore,
            location,
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
