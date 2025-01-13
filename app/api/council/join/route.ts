import { ObjectId } from "mongodb";
import db from "@/shared/providers/dbProvider"; // Ensure correct path to your DB provider
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Path to your NextAuth options

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { councilId } = body;

    if (!councilId) {
      return NextResponse.json({ error: "Council ID is required." }, { status: 400 });
    }

    const userId = session.user.id;

    // Validate council ID
    const council = await db.collection("councils").findOne({ councilId });
    if (!council) {
      return NextResponse.json({ error: "Invalid council ID." }, { status: 404 });
    }

    // Check if the user is already in a council
    const userObjectId = new ObjectId(userId);
    const user = await db.collection("users").findOne({ _id: userObjectId });

    if (user && user.councilId === council.councilId) {
      return NextResponse.json({ message: "You are already a member of this council!" }, { status: 200 });
    }

    // Update user's councilId
    const updatedUser = await db.collection("users").updateOne(
      { _id: userObjectId },
      { $set: { councilId: council.councilId } }
    );

    if (updatedUser.matchedCount === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Joined council successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error joining council:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
