import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required to delete a member" }, { status: 400 });
        }

        const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error("Error deleting member:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
