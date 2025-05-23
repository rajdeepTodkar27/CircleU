import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Participant from "@/models/PartcipantsModel";
import { log } from "console";

export async function POST(req: Request) {
  try {
    await dbconnect();
    const { form,data } = await req.json();
    console.log(form);
    console.log(data);
    
    
    const name=form.name
    const teamname=form.teamname
    const email=form.email
    const phone=form.phone
    const event=form.event
    const linkedin=form.linkedin
    const paymentid=data.orderId
    if (!name || !email || !phone || !event || !teamname) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Check if the participant is already registered for the event
    const existingParticipant = await Participant.findOne({ email, event });

    if (existingParticipant) {
      return NextResponse.json({ success: false, message: "You have already registered for this event." }, { status: 400 });
    }

    // Save new registration
    const newParticipant = new Participant({ name,teamname, email, phone, linkedin, event,paymentid });
    await newParticipant.save();

    return NextResponse.json({ success: true, message: "Registration successful!" }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
