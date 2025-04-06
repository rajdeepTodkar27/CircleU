import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Participant from "@/models/PartcipantsModel";
import Event from "@/models/eventModel";
import { log } from "console";
export async function GET(req: Request) {
  try {
    await dbconnect();

    // Get the event query parameter from the URL for participation count
    const url = new URL(req.url);
    const event = url.searchParams.get("event");

    if (event) {
      // Fetch participants for the specified event
      const participants = await Participant.find({ event });
      return NextResponse.json({ success: true, participants }, { status: 200 });
    } else {
      // Fetch total count of participants for all events
      const eventCounts = await Participant.aggregate([
        { $group: { _id: "$event", count: { $sum: 1 } } }
      ]);
      const eventlist= await Event.find({}).select("event_name -_id")
      console.log(eventlist);
      
      return NextResponse.json({ success: true, eventCounts,eventlist }, { status: 200 });
    }

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
