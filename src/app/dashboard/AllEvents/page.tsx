'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

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

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  return (
    <div className="flex flex-col items-center mt-12 min-h-screen px-10 p-4">
      <h1 className='font-bold text-4xl mb-4 text-blue-600'>All Upcoming Events</h1>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-8 p-10 text-center bg-blue-200">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="relative bg-white px-16 h-56 py-2 rounded-lg shadow-lg">
                <h2 className="font-bold text-2xl">{event.event_name}</h2>
                <p className="text-gray-600">Date: {new Date(event.event_date).toDateString()}</p>
                <p className="text-gray-600">Venue: {event.event_venue}</p>
                <p className="text-gray-800 mt-2 line-clamp-2">{event.event_description}</p>
                <button
                  onClick={() => handleViewDetails(event)}
                  className="bg-blue-600 absolute bottom-10 ml-[-45px] text-white mt-4 p-2 rounded-xl text-sm"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{selectedEvent.event_name}</h2>
            <p><strong>Date:</strong> {new Date(selectedEvent.event_date).toDateString()}</p>
            <p><strong>Venue:</strong> {selectedEvent.event_venue}</p>
            <p><strong>Organized by:</strong> {selectedEvent.organization_name}</p>
            <p><strong>Type:</strong> {selectedEvent.event_type}</p>
            <p><strong>Description:</strong> {selectedEvent.event_description}</p>
            <p><strong>Deadline:</strong> {new Date(selectedEvent.deadline_date).toDateString()}</p>
            <p><strong>Fee:</strong> ₹{selectedEvent.registration_fee}</p>
            <p><strong>Max Participants:</strong> {selectedEvent.max_participants}</p>
            <hr className="my-4" />
            <p className="font-semibold text-gray-700">📞 Contact Person:</p>
            <p><strong>Name:</strong> {selectedEvent.contact_person_name}</p>
            <p><strong>Email:</strong> {selectedEvent.contact_person_email}</p>
            <p><strong>Phone:</strong> {selectedEvent.contact_person_phone}</p>
            <div className="text-right mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage
