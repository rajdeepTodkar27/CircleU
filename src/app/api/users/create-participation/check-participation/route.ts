import { NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Participant from "@/models/PartcipantsModel";

export async function POST(req: Request) {
  try {
    await dbconnect();
    const { form } = await req.json();
    console.log(form);
    
    
    const name=form.name
    const email=form.email
    const phone=form.phone
    const event=form.event
    if (!name || !email || !phone || !event) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const existingParticipant = await Participant.findOne({ email, event });

    if (existingParticipant) {
      return NextResponse.json({ success: false,participated: true, message: "You have already registered for this event." }, { status: 200 });
    }
    return NextResponse.json(
        { success: true, participated: false, message: "Not registered yet" },
        { status: 200 }
      );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
