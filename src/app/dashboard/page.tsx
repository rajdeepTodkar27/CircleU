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

import { useRouter } from "next/navigation"
const dashboard = () => {
  const router = useRouter();
  
 const handleClick = () => {
    router.push("/dashboard/booking-page")
  }
  return (
    <div className="h-full bg-gradient-to-br ">
      <h1 className="text-center mt-5 font-bold text-3xl">Welcome to CircleU </h1>
        <p className="text-center text-xl pt-4">Connect with your college community, join groups, and participate in events</p>
      <div className="upcoming-events flex flex-col ">
        <h1 className="pl-10 mt-5 mb-9 font-bold text-3xl">Upcoming Events.......</h1>
        <div className="card-container flex flex-wrap px-5 pl-10  gap-5">
          
          <div className="card p-5 border-2 w-[14vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>
          <div className="card p-5 border-2 w-[14vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>
          <div className="card p-5 border-2 w-[14vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>
          <div className="card p-5 border-2 w-[14vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>
          <div className="card p-5 border-2 w-[15vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>
          <div className="card p-5 border-2 w-[14vw] ">
            <h1>Event Name</h1>
            <p>Event Description</p>
            <button>Join</button>
          </div>

          </div>
      </div>
      <div className="cards flex flex-wrap gap-2 justify-center mt-10 ">
        <Card className="sm:w-64 sm:h-64 h-44 w-44 flex  flex-col items-center bg-gradient-to-tr from-purple-500 to-purple-100 ">
          <CardHeader>
            <CardTitle>Create You Group</CardTitle>
            <CardDescription>Create your own group</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create your own group</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick}>Create</Button>
          </CardFooter>
        </Card>
        <Card className="sm:w-64 sm:h-64 h-44 w-44 flex  flex-col  items-center bg-gradient-to-tr from-purple-500 to-purple-100">

          <CardHeader>
            <CardTitle>Find groupmates !!!</CardTitle>
            <CardDescription>Find your groupmates</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Find your groupmates</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick}>Find</Button>
          </CardFooter>
        </Card>
       
      </div>
    </div >
  )
}

export default dashboard
