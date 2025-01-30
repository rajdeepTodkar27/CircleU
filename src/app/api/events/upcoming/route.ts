import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Event from "@/models/eventModel"; // Ensure this points to your Event model

dbconnect();

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    const upcomingEvents = await Event.find({ event_date: { $gte: today } })
      .sort("event_date")
      .select("-__v -createdAt -updatedAt"); // Exclude unnecessary fields

    return NextResponse.json(upcomingEvents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
