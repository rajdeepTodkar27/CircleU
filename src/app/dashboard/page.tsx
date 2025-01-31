'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from "axios";
interface Event {
  _id: string;
  event_name: string;
  event_date: string;
  organization_name: string;
}

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
const dashboard = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  
 const handleClick1 = () => {
    router.push("/dashboard/Groups")
  }
 const handleClick2 = () => {
    router.push("/dashboard/groupmate")
  }
 const handleClick3 = () => {
    router.push("/dashboard/event")
  }
 
  const handleClick4 = () => {
    router.push("/dashboard/participate")
  }
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/upcoming");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  
  return (
    <div className="overflow-auto scrollbar-hide p-5 h-full ">
      <div className="hero  bg-blue-200 p-10 py-14 rounded-xl ">
      <h1 className="text-center mt-5 font-bold text-4xl text-blue-600">Welcome to CircleU </h1>
        <p className="text-center text-xl pt-4">Connect with your college community, join groups, and participate in events !</p>
      <div className="upcoming-events flex flex-col ">
        <h1 className="pl-10 mt-5 mb-9  font-bold text-3xl text-blue-500 ">Upcoming Events.......</h1>
        <div className="card-container h-44 relative flex flex-wrap justify-center px-5 pl-10  gap-5">
          
          {events.length > 0 ? (
             events
             .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
             .slice(0, 4).map((event) => (
              <div key={event._id} className="card p-5 border-2 w-[20vw] text-center bg-white rounded-lg shadow-md">
                <h1 className="font-bold text-xl ">{event.event_name}</h1>
                <p className="text-sm pt-3">{event.organization_name}</p>
                <p className="text-xs text-gray-600">Date: {new Date(event.event_date).toDateString()}</p>
                <div className="btncont absolute flex text-center bottom-4 ml-20 justify-center items-center">

                <button className="mt-2  p-2 px-3   bg-blue-500 text-white rounded-lg" onClick={handleClick4}>Join</button>
                </div>
             
              </div>
            ))
          ) : (
            <p className="text-gray-600">No upcoming events found.</p>
          )}
         

          </div>
      </div>
      </div>
        <h1 className="text-center mt-5 font-bold text-4xl text-blue-500"> Hello section</h1>
      <div className="cards flex  flex-wrap gap-20 justify-center mt-10 ">
        <Card className="sm:w-64 sm:h-56 h-32 w-44 flex  flex-col items-center ">
          <CardHeader>
            <CardTitle className="text-xl" >Create You Group</CardTitle>
            <CardDescription>Create your own group</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create your own group</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick1} className="bg-blue-500">Create</Button>
          </CardFooter>
        </Card>
        <Card className="sm:w-64 sm:h-56 h-44 w-44 flex  flex-col  items-center ">

          <CardHeader>
            <CardTitle className="text-xl">Find groupmates !!!</CardTitle>
            <CardDescription>Find your groupmates</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Find your groupmates</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick2} className="bg-blue-500">Find 🔍</Button>
          </CardFooter>
        </Card>
       
        <Card className="sm:w-64 sm:h-56 h-44 w-44 flex  flex-col text-center  items-center ">

          <CardHeader>
            <CardTitle className="text-xl">Create Events !!!</CardTitle>
            <CardDescription>Find a perfect event for you</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Find a perfect event</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick3} className="bg-blue-500">Create</Button>
          </CardFooter>
        </Card>
       
      </div>
    </div >
  )
}

export default dashboard
