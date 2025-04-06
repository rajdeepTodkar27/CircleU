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
    router.push("/dashboard/event-results")
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
    <div className="overflow-auto scrollbar-hide p-5 min-h-screen">
  <div className="hero bg-blue-200 px-5 py-12 rounded-2xl">
    <h1 className="text-center font-bold text-3xl md:text-4xl text-blue-600">
      Welcome to CircleU
    </h1>
    <p className="text-center text-base md:text-xl pt-3">
      Connect with your college community, join groups, and participate in events!
    </p>

    <div className="upcoming-events mt-8">
      <h2 className="pl-5 text-2xl md:text-3xl font-bold text-blue-500 mb-6">
        Upcoming Events
      </h2>
      <div className="card-container flex flex-wrap justify-center gap-6 px-2">
        {events.length > 0 ? (
          events
            .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
            .slice(0, 4)
            .map((event) => (
              <div
                key={event._id}
                className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[22%] bg-white p-5 rounded-2xl shadow-md border border-gray-200 text-center transition-transform hover:scale-105 duration-300"
              >
                <h3 className="font-bold text-lg md:text-xl text-gray-800">
                  {event.event_name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{event.organization_name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {new Date(event.event_date).toDateString()}
                </p>
                <div className="mt-5">
                  <button
                    onClick={handleClick4}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-600 text-center w-full">No upcoming events found.</p>
        )}
      </div>
    </div>
  </div>

  <h2 className="text-center mt-10 font-bold text-3xl md:text-4xl text-blue-500">
    Hello Section
  </h2>

  <div className="cards flex flex-wrap gap-8 justify-center mt-10">
    <Card className="w-40 sm:w-60 md:w-64 h-auto flex flex-col items-center p-3 text-center">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create Your Group</CardTitle>
        <CardDescription>Create your own group</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Create your own group</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick1} className="bg-blue-500">
          Create
        </Button>
      </CardFooter>
    </Card>

    <Card className="w-40 sm:w-60 md:w-64 h-auto flex flex-col items-center p-3 text-center">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Find Groupmates</CardTitle>
        <CardDescription>Find your groupmates</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Find your groupmates</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick2} className="bg-blue-500">
          Find 🔍
        </Button>
      </CardFooter>
    </Card>

    <Card className="w-40 sm:w-60 md:w-64 h-auto flex flex-col items-center p-3 text-center">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create Events</CardTitle>
        <CardDescription>Find a perfect event for you</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Find a perfect event</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick3} className="bg-blue-500">
          Create
        </Button>
      </CardFooter>
    </Card>
    <Card className="w-40 sm:w-60 md:w-64 h-auto flex flex-col items-center p-3 text-center">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Event Results</CardTitle>
        <CardDescription>Check outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <p>latest event results </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick4} className="bg-blue-500">
        View Results
        </Button>
      </CardFooter>
    </Card>
  </div>
</div>

  )
}

export default dashboard
