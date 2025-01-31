'use client'
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Upload, MenuIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

function Navbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between top-0 sticky">
      <div className="flex flex-1 justify-between  items-center bg-gradient-to-bl from-blue-700 to-blue-100 p-3 text-lg  ">
        <Link href="/dashboard" ><h1 className="text-2xl font-bold "> Circle <span className="text-yellow-50">U</span></h1></Link>
        <MenuIcon className="sm:hidden cursor-pointer" />
        <h2 className="sm:flex  hidden  items-center gap-5">
          < SignedIn >
            <button title="Contact us" className="text-white"  onClick={() => router.push("/dashboard/Groups")}> Create Groups</button>
            <button title="About " className="text-white" onClick={() => router.push("/dashboard/About")}>About</button>
            <button title="About " className="text-white" onClick={() => router.push("/dashboard/AllEvents")}>Events</button>
            <button title="About " className="text-white" onClick={() => router.push("/dashboard/Admin")}>Admin</button>
            {/* <Upload className="cursor-pointer text-purple-100 border rounded-sm h-7 w-7 p-1" /> */}
            {/* <span className="text-lg cursor-pointer text-purple-200" onClick={() => router.push("/dashboard/contact-us")}>Contact Us</span> */}
            <span className="text-lg cursor-pointer text-purple-200" onClick={() => router.push("/dashboard/profile")}>Profile</span>
            <UserButton />
          </>
        </h2>

      </div>


    </div>
  )
}

export default Navbar
