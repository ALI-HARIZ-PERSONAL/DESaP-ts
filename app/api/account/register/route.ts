import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    // Validate request payload
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      mobileNumber,
      birthDate,
      profilePicture,
      termsAccepted,
    } = body;

    // Ensure all required fields are present
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !termsAccepted
    ) {
      console.log("Missing required fields");
      return NextResponse.json({ error: "Missing required fields", status: 400 });
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return NextResponse.json({
        error: "Passwords do not match",
        status: 400,
      });
    }

    // Check if the email already exists
    const existingUser = await db.collection("users").findOne({ email });
    console.log("Checking if user exists:", existingUser);

    if (existingUser) {
      console.log("Email already exists");
      return NextResponse.json({ error: "Email already exists", status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Default profile picture if none provided
    const defaultProfilePicture = "https://example.com/default-profile.jpg";

    // Prepare the new user object
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role,
      mobileNumber: mobileNumber || null,
      birthDate: birthDate || null,
      profilePicture: profilePicture || defaultProfilePicture,
      createdAt: new Date(),
    };

    // Insert the user into the database
    const result = await db.collection("users").insertOne(newUser);
    console.log("Inserted user:", result.insertedId);

    // Return success response
    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error: unknown) {
    console.error("Error during registration:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
