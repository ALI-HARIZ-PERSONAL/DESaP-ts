import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const councils = await db.collection("councils").find().toArray();

    console.log("Fetched Councils:", councils); // Debug log
    if (!councils || councils.length === 0) {
      return NextResponse.json({
        data: [],
        message: "No councils found",
        status: 200,
      });
    }

    return NextResponse.json({
      data: councils,
      message: "Councils retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching councils:", error); // Debug log
    return NextResponse.json({ error: "Failed to fetch councils" }, { status: 500 });
  }
}
