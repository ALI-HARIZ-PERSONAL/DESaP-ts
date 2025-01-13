import { NextResponse } from "next/server";
import { getDatabase } from "../globalStorage";

export async function GET() {
  try {
    const db = await getDatabase();
    const records = await db.collection("larvaeRecords").find().toArray();

    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
