import { NextResponse } from "next/server";
import { getDatabase } from "../../globalStorage";
import { ObjectId } from "mongodb";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  console.log("Params received in DELETE:", params); // Debug log

  try {
    const { id } = params;

    // Validate the ID
    if (!id || !ObjectId.isValid(id)) {
      console.error("Invalid ID:", id);
      return NextResponse.json({ message: "Invalid Record ID." }, { status: 400 });
    }

    const db = await getDatabase();

    // Convert the string ID into an ObjectId
    const objectId = new ObjectId(id);

    // Attempt to delete the record from MongoDB
    const result = await db.collection("larvaeRecords").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      console.error("Record not found for ID:", objectId);
      return NextResponse.json({ message: "Record not found." }, { status: 404 });
    }

    console.log("Record deleted successfully:", objectId);
    return NextResponse.json({ message: "Record deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json({ message: "Failed to delete record." }, { status: 500 });
  }
}
