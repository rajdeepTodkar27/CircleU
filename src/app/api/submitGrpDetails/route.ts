import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import { ObjectId } from "mongodb";
import  Groupmate  from "@/models/groupModel";

dbconnect();

interface TeamData {
    _id?: ObjectId;
    id?: string;
    [key: string]: any; // Allow other fields
}

export async function POST(request: Request) {
    try {
        const data: TeamData = await request.json();
        console.log("Received data:", data);

        const newGroupmate = await Groupmate.create(data); // ✅ FIXED: Using Mongoose's `create()`
        
        return NextResponse.json({ success: true, data: newGroupmate });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }
}
export async function GET() {
    try {
        const allData = await Groupmate.find({}); // ✅ FIXED: Removed `.toArray()`
        console.log("Fetched data:", allData);
        return NextResponse.json({ success: true, data: allData });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id }: { id?: string } = await request.json();

        if (!id) {
            return NextResponse.json(
                { success: false, error: "ID is required" },
                { status: 400 }
            );
        }

        const result = await Groupmate.deleteOne({ id });

        return NextResponse.json({ success: true, message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error in deleting data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete data" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data: TeamData = await request.json();
        console.log(data);

        if (!data._id) {
            return NextResponse.json(
                { success: false, error: "ID is required to update the document" },
                { status: 400 }
            );
        }

        const objectId = new ObjectId(data._id);
        const { _id, ...updatedData } = data;

        const result = await Groupmate.updateOne(
            { _id: objectId },
            { $set: updatedData } // set updated entries
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, error: "No document found with the specified ID" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Team updated successfully", result });
    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update data" },
            { status: 500 }
        );
    }
}