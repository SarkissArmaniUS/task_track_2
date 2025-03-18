'use client'

import { useEffect, useState } from "react";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "@/api/eventApi";

interface Event {
  _id: string;
  name: string;
  date: string;
  importance: string;
  description: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((error) => console.error(error));
  }, []);

  const handleAddEvent = async () => {
    const newEvent = {
      name: "New Event",
      date: new Date().toISOString(),
      description: "Description",
      importance: "Medium",
    };

    try {
      const addedEvent = await addEvent(newEvent);
      setEvents([...events, addedEvent]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEvent = async (id: string) => {
    const updatedData = {
      name: "Updated Event",
      date: new Date().toISOString(),
      description: "Updated Description",
      importance: "High",
    };

    try {
      const updatedEvent = await updateEvent(id, updatedData);
      setEvents(events.map((event) => (event._id === id ? updatedEvent : event)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>Date: {new Date(event.date).toLocaleString()}</p>
            <p>Importance: {event.importance}</p>
            <p>{event.description}</p>
            <button className="text-green-500" onClick={() => handleUpdateEvent(event._id)}>Update</button>
            <button className="text-red-500" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>

      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default EventList;
