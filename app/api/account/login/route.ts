import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    // Validate request payload
    const { email, password } = body;

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json({ error: "Missing email or password", status: 400 });
    }

    // Check if the user exists
    const user = await db.collection("users").findOne({ email });
    console.log("Checking if user exists:", user);

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "Invalid email or password", status: 401 });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid email or password", status: 401 });
    }

    // Return success response
    return NextResponse.json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error: unknown) {
    console.error("Error during login:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
