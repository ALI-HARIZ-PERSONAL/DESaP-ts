// app/api/council/join/route.ts
import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { councilId, userId } = body; // Ensure `userId` is passed in the request body or retrieved from session.

        if (!councilId || !userId) {
            return NextResponse.json({ error: "Council ID and User ID are required." }, { status: 400 });
        }

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { councilId: parseInt(councilId) },
        });

        return NextResponse.json({ message: "Joined council successfully!", data: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error joining council:", error);
        return NextResponse.json({ error: "Failed to join council." }, { status: 500 });
    }
}
