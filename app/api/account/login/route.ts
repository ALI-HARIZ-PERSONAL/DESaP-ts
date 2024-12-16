import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
          return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      // Check if the user exists
      const user = await db.collection("users").findOne({ email });

      if (!user) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      // Respond with user information
      return NextResponse.json({
          message: 'Login successful',
          userId: user._id,
          username: user.username,
          role: user.role,
      });
  } catch (error: unknown) {
      console.error("Error during login:", error);
      return NextResponse.json({
          error: 'Internal Server Error',
          details: error instanceof Error ? error.message : 'Unknown error',
          status: 500,
      });
  }
}

