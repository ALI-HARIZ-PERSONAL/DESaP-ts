import { NextResponse } from "next/server";

// Mock database or logic for handling data
const larvaeRecords = [];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { location, date, larvaeCount } = body;

        if (!location || !date || !larvaeCount) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        // Simulate saving the data (replace with actual database logic)
        larvaeRecords.push({ location, date, larvaeCount, id: Date.now() });

        return NextResponse.json({ message: "Larvae record created successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error creating larvae record:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
