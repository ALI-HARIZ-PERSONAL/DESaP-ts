import { ObjectId } from "mongodb"; // Import ObjectId for MongoDB
import db from "@/shared/providers/dbProvider"; // Ensure correct path to your database provider
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { councilId, userId } = body;

    if (!councilId || !userId) {
      return NextResponse.json({ error: "Council ID and User ID are required." }, { status: 400 });
    }

    // Validate the council ID
    const council = await db.collection("councils").findOne({ councilId });
    if (!council) {
      return NextResponse.json({ error: "Invalid council ID." }, { status: 404 });
    }

    // Update the user's councilId, or ensure it's already set
    const userObjectId = new ObjectId(userId);
    const updatedUser = await db.collection("users").updateOne(
      { _id: userObjectId },
      { $set: { councilId: council.councilId } }
    );

    console.log("Update Result:", updatedUser);

    if (updatedUser.matchedCount === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // If no modification was made, check if the councilId is already set
    if (updatedUser.modifiedCount === 0) {
      const user = await db.collection("users").findOne({ _id: userObjectId });
      if (user && user.councilId === council.councilId) {
        return NextResponse.json({ message: "You are already a member of this council!" }, { status: 200 });
      }
      return NextResponse.json({ error: "Failed to join council. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Joined council successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error joining council:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
