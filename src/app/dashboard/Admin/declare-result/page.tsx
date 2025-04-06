"use client";

import { useForm } from "react-hook-form";

type TeamPosition = {
  teamName: string;
  teamLeader: string;
};

type EventResultFormData = {
  eventName: string;
  winner: TeamPosition;
  runnerUp: TeamPosition;
  secondRunnerUp: TeamPosition;
};

export default function DeclareResult() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventResultFormData>();
  const onSubmit = async (data: EventResultFormData) => {
    console.log("Form data submitted:", data);

   try {
     const res = await fetch("/api/event-result", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
 
     const result = await res.json();
     console.log("Server response:", result);
     alert("successfully declared the result")
     reset()
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      
      <fieldset className="border p-2 space-x-3">
        <legend>Event Name</legend>
        <input className="p-1.5 " placeholder="Event Name" {...register("eventName", { required: true })} />
      </fieldset>
      <fieldset className="border p-2 space-x-3">
        <legend>Winner</legend>
        <input className="p-1.5 " placeholder="Team Name" {...register("winner.teamName", { required: true })} />
        <input className="p-1.5 " placeholder="Team Leader" {...register("winner.teamLeader", { required: true })} />
      </fieldset>

      <fieldset className="border p-2 space-x-3">
        <legend>Runner Up</legend>
        <input className="p-1.5 " placeholder="Team Name" {...register("runnerUp.teamName", { required: true })} />
        <input className="p-1.5 " placeholder="Team Leader" {...register("runnerUp.teamLeader", { required: true })} />
      </fieldset>

      <fieldset className="border p-2 space-x-3">
        <legend>Second Runner Up</legend>
        <input className="p-1.5 " placeholder="Team Name" {...register("secondRunnerUp.teamName", { required: true })} />
        <input className="p-1.5 " placeholder="Team Leader" {...register("secondRunnerUp.teamLeader", { required: true })} />
      </fieldset>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
