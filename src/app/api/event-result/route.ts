// one get req for the so that user can see the event results
// one post req for admin to post the event result


import  {dbconnect} from "@/dbConfig/dfConfig";
import Result from "@/models/resultModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: Request){
    try {
        const data = await request.json();
        console.log("Received data:", data);

        const newEventResult = await Result.create(data);
        
        return NextResponse.json({ success: true, data: newEventResult });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }
}
export async function GET(){
    try {
        const allData = await Result.find({}).select("-createdAt -updatedAt -_id");; 
        console.log("Fetched data:", allData);
        return NextResponse.json({ success: true, data: allData },{status: 200});
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}
