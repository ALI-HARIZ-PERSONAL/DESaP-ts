// app/api/operation-team/mosquito-eggs/calculate/route.ts
import { NextResponse } from "next/server";

// Handle POST request
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { location, eggCount } = body;

        // Validate request data
        if (!location || !eggCount) {
            return NextResponse.json(
                { message: "Location and Egg Count are required." },
                { status: 400 }
            );
        }

        // Example processing (log or save to DB)
        console.log(`Location: ${location}, Egg Count: ${eggCount}`);

        return NextResponse.json({ message: "Calculation submitted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
