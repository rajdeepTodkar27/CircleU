'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface Event {
  _id: string;
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
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/upcoming')
        setEvents(response.data)
      } catch (error) {
        console.error("Error fetching events:", error)
        toast.error("Failed to load events.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

  return (
    <div className="flex flex-col  items-center mt-12 min-h-screen  px-10 p-4">
      <h1 className='font-bold text-4xl mb-4 text-blue-600'>All Upcoming Events</h1>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-8 p-10 text-center bg-blue-200  ">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="relative bg-white px-16 h-56 py-2 rounded-lg shadow-lg">
                <h2 className="font-bold text-2xl">{event.event_name}</h2>
                <p className="text-gray-600">Date: {new Date(event.event_date).toDateString()}</p>
                <p className="text-gray-600">Venue: {event.event_venue}</p>
                <p className="text-gray-800 mt-2">{event.event_description}</p>
                <Link
                  href={`/events/${event._id}`}
                  className="bg-blue-600 absolute bottom-10 ml-[-45px] text-white mt-4  p-2 text-center rounded-xl text-sm inline-block"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default EventsPage
