// api/profile/readByEmail/route.ts
import db from "@/shared/providers/dbProvider"; // Using your existing provider
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const urlParams = new URL(request.url).searchParams;
    const email = urlParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Missing email", status: 400 },
        { status: 400 }
      );
    }

    const user = await db.collection("users").findOne(
      { email }, // Filter by email
      { projection: { userName: 1, email: 1, role: 1 } } // Select only necessary fields
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", status: 500 },
      { status: 500 }
    );
  }
}
