import { NextResponse } from "next/server";
import { getDatabase } from "../globalStorage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { location, date, larvaeCount, notes } = body;

    if (!location || !date || !larvaeCount) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const db = await getDatabase();
    const newRecord = {
      location,
      date,
      larvaeCount: Number(larvaeCount),
      notes: notes || "",
    };

    const result = await db.collection("larvaeRecords").insertOne(newRecord);

    return NextResponse.json(
      { 
        message: "Larvae record created successfully!", 
        record: { ...newRecord, id: result.insertedId } // Return the inserted record with ID
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating larvae record:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
