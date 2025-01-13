// app/api/council/join/route.ts
import db from "@/shared/providers/dbProvider";
import { getServerSession } from "next-auth"; // Adjust based on your auth setup
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(); // Ensure session middleware is setup
        const userId = session?.user?.id; // Get the userId from the session
        const body = await request.json();
        const { councilId } = body;

        // Validate inputs
        if (!councilId || !userId) {
            return NextResponse.json(
                { error: "Council ID and User ID are required." },
                { status: 400 }
            );
        }

        // Update user with the new councilId
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { councilId }, // Handle councilId as a string
        });

        return NextResponse.json(
            { message: "Joined council successfully!", data: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error joining council:", error);
        return NextResponse.json(
            { error: "Failed to join council." },
            { status: 500 }
        );
    }
}
