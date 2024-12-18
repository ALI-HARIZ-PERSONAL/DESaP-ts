import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required to fetch profile", status: 400 });
        }

        // Fetch the user profile from the database
        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404 });
        }

        // Return user data (exclude sensitive fields like password)
        const { password, ...userData } = user;

        return NextResponse.json(userData);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : "Unknown error",
            status: 500,
        });
    }
}
