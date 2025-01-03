import db from "@/shared/providers/dbProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json(
            { error: "Query parameter is required" },
            { status: 400 }
        );
    }

    try {
        const collection = db.collection("users");

        const members = await collection
            .find({
                $or: [
                    { username: { $regex: `.*${query}.*`, $options: "i" } },
                    { email: { $regex: `.*${query}.*`, $options: "i" } },
                ],
            })
            .project({ password: 0 }) 
            .toArray();

        return NextResponse.json({ members });
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
