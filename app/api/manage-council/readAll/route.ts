// app/api/manage-council/readAll/route.ts
import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all councils from the database
    const councils = await db.collection("councils").find({}).toArray();

    if (!councils || councils.length === 0) {
      return NextResponse.json({
        data: null,
        message: "No councils found",
        status: 200,
      });
    }

    return NextResponse.json({
      data: councils,
      message: "Councils fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching councils:", error);
    return NextResponse.json({
      error: "Failed to fetch councils",
      status: 500,
    });
  }
}
