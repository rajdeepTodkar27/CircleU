import { NextRequest, NextResponse } from "next/server";
import { dbconnect } from "@/dbConfig/dfConfig";
import Razorpay from "razorpay";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  export async function POST(req: NextRequest) {
    try {
      await dbconnect();
      const { name,teamname,phone,email,linkedin, event,fee } = await req.json();
     
      const order = await razorpay.orders.create({
        amount: fee * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          studentname: name,
          teamname: teamname,
          eventname: event,
        },
      });
  
     
      return NextResponse.json({
        orderId: order.id, amount: order.amount},
        {status:200});
    } catch (error) {
      console.error("Error creating order:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }
  }
