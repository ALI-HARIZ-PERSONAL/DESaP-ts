import { NextResponse } from "next/server";
import { larvaeRecords } from "../globalStorage";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { location, date, larvaeCount, notes } = body; // Include `notes`

        if (!location || !date || !larvaeCount) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        // Add new record to global in-memory storage
        const newRecord = {
            id: Date.now(),
            location,
            date,
            larvaeCount: Number(larvaeCount),
            notes: notes || "", // Default to an empty string if `notes` is missing
        };

        larvaeRecords.push(newRecord);

        return NextResponse.json({ message: "Larvae record created successfully!", record: newRecord }, { status: 200 });
    } catch (error) {
        console.error("Error creating larvae record:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
