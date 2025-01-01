import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const role = url.searchParams.get("role");

        if (!role) {
            return NextResponse.json({ error: "Role is required to filter members", status: 400 });
        }

        const members = await db.collection("users").find({role}, { projection: { password: 0 } }).toArray();

        return NextResponse.json({ members });
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
