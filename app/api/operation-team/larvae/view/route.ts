import { NextResponse } from "next/server";
import { larvaeRecords } from "../globalStorage";

export async function GET() {
    try {
        // Return all records from global in-memory storage
        return NextResponse.json({ records: larvaeRecords }, { status: 200 });
    } catch (error) {
        console.error("Error fetching records:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
