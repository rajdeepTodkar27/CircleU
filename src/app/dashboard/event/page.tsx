'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface EventForm {
  event_name: string;
  event_date: string;
  event_venue: string;
  organization_name: string;
  event_description: string;
  event_type: string;
  deadline_date: string;
  registration_fee: string;
  max_participants: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<EventForm>({
    event_name: "",
    event_date: "",
    event_venue: "",
    organization_name: "",
    event_description: "",
    event_type: "",
    deadline_date: "",
    registration_fee: "",
    max_participants: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_phone: "",
    email: "",
    subject: "",
    message: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const onSend = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      await axios.post("/api/users/create-event", user)
      toast.success("Event information submitted successfully!")
      router.push('/dashboard')
      setUser({
        event_name: "",
        event_date: "",
        event_venue: "",
        organization_name: "",
        event_description: "",
        event_type: "",
        deadline_date: "",
        registration_fee: "",
        max_participants: "",
        contact_person_name: "",
        contact_person_email: "",
        contact_person_phone: "",
        email: "",
        subject: "",
        message: ""
      })
    } catch (error: any) {
      console.error("Message failed", error)
      toast.error(error.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const isFormFilled = Object.values(user).every((value) => value.trim() !== "")
    setButtonDisabled(!isFormFilled)
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-[450px] sm:mt-[430px]">
      <h1 className='font-bold text-4xl mb-4'>Fill Information for Event</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <form className="flex flex-col space-y-4">
          {(Object.keys(user) as Array<keyof EventForm>).map((key) => (
            <div key={key}>
              <label className="font-bold text-blue-600" htmlFor={key}>{key.replace(/_/g, ' ')}</label>
              <input
                id={key}
                type={key.includes("date") ? "date" : key.includes("email") ? "email" : "text"}
                className="p-2 border rounded-lg focus:outline-none focus:border-gray-600 w-full"
                placeholder={key.replace(/_/g, ' ')}
                value={user[key]}
                onChange={(e) => setUser({ ...user, [key]: e.target.value })}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={onSend}
            disabled={buttonDisabled}
            className={`p-3 rounded-lg text-white ${
              buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
