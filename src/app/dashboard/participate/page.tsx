"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import axios from "axios";
declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormData = {
  name: string;
  teamname: string;
  email: string;
  phone: string;
  linkedin?: string;
  event: string;
  fee: number;
};

export default function RegisterPage() {
  const router = useRouter();
  const [eventlist, seteventlist] = useState([])
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset,setValue, watch } = useForm<FormData>({
    defaultValues: {
      name: "",
      teamname: "",
      email: "",
      phone: "",
      linkedin: "",
      event: "",
      fee:0,
    },
  });
  const form = watch();
  const selecteevent=watch("event")
  useEffect(() => { 
    axios.get("/api/events/upcoming")
    .then(res=>{
      seteventlist(res.data)
      
    }).catch(err=>{
      setMessage(err)
    })
}, [])

useEffect(() => {
  if (selecteevent  && eventlist[selecteevent].registration_fee) {
    console.log(selecteevent);
    setValue("fee", eventlist[selecteevent].registration_fee)
    // setValue("fee", eventFees[selectedEvent]);
  } else {
    setValue("fee", 0);
  }
  
}, [selecteevent])



  const onSubmit = async (data: FormData) => {
    setMessage("Submitting...");
    console.log("Form Data:", data);
    data.event=eventlist[data.event].event_name
    console.log("Form Data:", data);

    try {
      const checkParticipant = await fetch("/api/users/create-participation/check-participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({form:data}),
      });

      const checkresult =await checkParticipant.json()

      if(checkresult.participated){
        setMessage("You have already registered for this event.")
        return ;
      }

      const payres = await fetch("/api/payRfees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await payres.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: responseData.amount,
        currency: "INR",
        name: "CircleU",
        description: "Complete your registration for the event",
        order_id: responseData.orderId,

        handler: async function (response: any) {
          console.log("Payment Success!", response);
          alert("Payment Successful!");
          setMessage("");

          try {
            const saveparticipant = await fetch("/api/users/create-participation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ form: data, data: responseData }),
            });

            const result = await saveparticipant.json();

            if (result.success) {
              alert(result.message);
              reset();
            } 
          } catch (error) {
            console.error("API Error:", error);
            setMessage("Failed to save participation details in the server.");
          }
        },

        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },

        theme: {
          color: "#0f172a",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment error", err);
      setMessage("Payment initiation failed. Try again.");
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />

      <div className="max-w-md mt-10 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Event Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <label className="block">
            <span className="text-gray-700">Full Name</span>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Team Name</span>
            <input
              type="text"
              placeholder="Team Name"
              {...register("teamname", { required: true })}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">LinkedIn (Optional)</span>
            <input
              type="text"
              placeholder="LinkedIn (Optional)"
              {...register("linkedin")}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Select Event</span>
            <select
              {...register("event", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an Event</option>
              {eventlist.map((event,index)=>(

              <option key={index} value={index}>{event.event_name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Fee (in Rs)</span>
            <input
              type="number"
              readOnly
              {...register("fee")}
              className="w-full p-2 border rounded"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Pay & Register
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </>
  );
}
