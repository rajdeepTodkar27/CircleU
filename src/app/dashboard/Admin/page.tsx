"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [events, setEvents] = useState(["Hackathon", "Workshop", "Tech Talk"]); // List of events
  const [eventCounts, setEventCounts] = useState<any[]>([]); // Store event participation counts
  const [selectedEvent, setSelectedEvent] = useState<string>(""); // Selected event to fetch participants
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    // Fetch event participation counts on component load
    const fetchEventCounts = async () => {
      const res = await fetch("/api/admin");
      const data = await res.json();
      if (data.success) {
        setEventCounts(data.eventCounts); // Populate event counts
        setEvents(data.eventlist)

      } else {
        setEventCounts([]);
      }
    };

    fetchEventCounts();
  }, []);

  useEffect(() => {
    // Fetch participants when an event is selected
    const fetchParticipants = async () => {
      if (selectedEvent) {
        const res = await fetch(`/api/admin/?event=${selectedEvent}`);
        const data = await res.json();
        if (data.success) {
          setParticipants(data.participants); // Set participants for the selected event
        } else {
          setParticipants([]);
        }
      }
    };
    fetchParticipants();
  }, [selectedEvent]);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(e.target.value);
  };

  return (
    <div className="p-10 px-44 h-full bg-white shadow-lg rounded-lg flex flex-col ">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-500">Host Panel</h2>

      {/* Display the total participants count for all events */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Total Participants per Event</h3>
        {eventCounts.length === 0 ? (
          <p>No event data available.</p>
        ) : (
            
            <div className="flex flex-wrap gap-6 mt-4 justify-center">
            {eventCounts.map((event: any) => (
              <div key={event._id} className="w-[27vw] p-4 border-2 border-blue-600 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center mb-2">{event._id}</h3>
                <p className="text-lg text-center">
                  Total Participants: <span className="font-bold">{event.count}</span>
                </p>
              </div>
            ))}
          </div>
          
        )}
      </div>

      {/* Event selection dropdown to see participants for the selected event */}
      <div className="mb-4 mt-6">
        <label htmlFor="event" className="block text-gray-700">Select Event</label>
        <select
          name="event"
          id="event"
          className="w-full p-2 border rounded"
          value={selectedEvent}
          onChange={handleEventChange}
        >
          <option value="">Select an Event</option>
          {events.map((event, index) => (
            <option key={index} value={event.event_name}>{event.event_name}</option>
          ))}
        </select>
      </div>

      {/* Display participants for the selected event */}
      {selectedEvent && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Participants for {selectedEvent}</h3>
          {participants.length === 0 ? (
            <p>No participants found for this event.</p>
          ) : (
            <table className="min-w-full mt-4 border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">LinkedIn</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant._id}>
                    <td className="border p-2">{participant.name}</td>
                    <td className="border p-2">{participant.email}</td>
                    <td className="border p-2">{participant.phone}</td>
                    <td className="border p-2">{participant.linkedin || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
