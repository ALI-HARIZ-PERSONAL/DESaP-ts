

import { NextResponse } from "next/server";
import { larvaeRecords } from "../../globalStorage";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const index = larvaeRecords.findIndex((record) => record.id === Number(id));
        if (index === -1) {
            return NextResponse.json({ message: "Record not found." }, { status: 404 });
        }

        larvaeRecords.splice(index, 1);
        return NextResponse.json({ message: "Record deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting record:", error);
        return NextResponse.json({ message: "Failed to delete record." }, { status: 500 });
    }
}

