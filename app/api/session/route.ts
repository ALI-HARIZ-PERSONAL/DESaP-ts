import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/api/auth/[...nextauth]/route"; // Path to your NextAuth configuration

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No active session found." }, { status: 401 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ error: "An error occurred while fetching session." }, { status: 500 });
  }
}
