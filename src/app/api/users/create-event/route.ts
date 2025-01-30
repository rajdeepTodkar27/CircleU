
import  {dbconnect} from "@/dbConfig/dfConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      event_name,
      event_date,
      event_venue,
      organization_name,
      event_description,
      event_type,
      deadline_date,
      registration_fee,
      max_participants,
      contact_person_name,
      contact_person_email,
      contact_person_phone,
      email,
      subject,
      message,
    } = reqBody;

    // Check if required fields are present
    if (!event_name || !event_date || !event_venue || !organization_name || !contact_person_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if event already exists
    const existingEvent = await Event.findOne({ event_name, event_date, organization_name });
    if (existingEvent) {
      return NextResponse.json({ error: "Event already exists" }, { status: 400 });
    }

    // Create new event
    const newEvent = new Event({
      event_name,
      event_date,
      event_venue,
      organization_name,
      event_description,
      event_type,
      deadline_date,
      registration_fee,
      max_participants,
      contact_person_name,
      contact_person_email,
      contact_person_phone,
      email,
      subject,
      message,
    });

    const savedEvent = await newEvent.save();
    console.log("Event registered successfully", savedEvent);

    return NextResponse.json({
      message: "Event registered successfully",
      success: true,
      savedEvent,
    });
  } catch (error: any) {
    console.error("Error saving event: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
