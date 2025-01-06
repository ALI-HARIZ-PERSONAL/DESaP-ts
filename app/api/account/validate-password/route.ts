import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
      const body = await request.json();
      const { userId, password } = body;

      if (!userId || !password) {
          return NextResponse.json({ error: 'User ID and Passowrd are required' }, { status: 400 });
      }

      const objectId = new ObjectId(userId)

      // Fetch the user by ID
      const user = await db.collection("users").findOne({ _id: objectId });

      if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Validate the PIN
      const isPinValid = await bcrypt.compare(password, user.password);

      if (!isPinValid) {
          return NextResponse.json({ error: 'Invalid Password' }, { status: 401 });
      }

      // If valid, respond with success
      return NextResponse.json({
          message: 'Password validation successful',
          userId: user._id,
          username: user.username,
          role: user.role,
      });
  } catch (error: unknown) {
      console.error("Error during Password validation:", error);
      return NextResponse.json({
          error: 'Internal Server Error',
          details: error instanceof Error ? error.message : 'Unknown error',
          status: 500,
      });
  }
}
