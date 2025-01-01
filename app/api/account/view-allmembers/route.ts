import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch all users from the database
        const members = await db.collection("users").find({}, { projection: { password: 0 } }).toArray();

        return NextResponse.json({ members });
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
