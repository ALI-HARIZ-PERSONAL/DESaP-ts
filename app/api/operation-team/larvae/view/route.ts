import { NextResponse } from "next/server";

// Mock database for larvae records
const larvaeRecords = [
    { id: 1, location: "Community A", larvaeCount: 150, notes: "High density", date: "2025-01-10" },
    { id: 2, location: "Community B", larvaeCount: 50, notes: "Low density", date: "2025-01-11" },
    { id: 3, location: "Community C", larvaeCount: 100, notes: "Medium density", date: "2025-01-12" },
];

export async function GET() {
    try {
        // Simulating fetching from a database
        return NextResponse.json({ records: larvaeRecords }, { status: 200 });
    } catch (error) {
        console.error("Error fetching records:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
