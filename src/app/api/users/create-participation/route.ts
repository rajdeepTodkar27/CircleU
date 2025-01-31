import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Participant from "@/models/PartcipantsModel";

export async function POST(req: Request) {
  try {
    await dbconnect();
    const { name, email, phone, linkedin, event } = await req.json();

    if (!name || !email || !phone || !event) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Check if the participant is already registered for the event
    const existingParticipant = await Participant.findOne({ email, event });

    if (existingParticipant) {
      return NextResponse.json({ success: false, message: "You have already registered for this event." }, { status: 400 });
    }

    // Save new registration
    const newParticipant = new Participant({ name, email, phone, linkedin, event });
    await newParticipant.save();

    return NextResponse.json({ success: true, message: "Registration successful!" }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
