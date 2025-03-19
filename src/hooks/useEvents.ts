import { useState, useEffect } from 'react';
import { getEvents, addEvent, deleteEvent, updateEvent } from '../services/eventService';

interface Event {
    _id: string;
    name: string;
    date: string;
    importance: string;
    description: string;
  }

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (eventData: any) => {
    try {
      const newEvent = await addEvent(eventData);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      setError('Error adding event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event: any) => event._id !== id));
    } catch (error) {
      setError('Error deleting event');
    }
  };

  const handleUpdateEvent = async (id: string, eventData: any) => {
    try {
      const updatedEvent = await updateEvent(id, eventData);
      setEvents((prevEvents) =>
        prevEvents.map((event: any) => (event._id === updatedEvent._id ? updatedEvent : event))
      );
    } catch (error) {
      setError('Error updating event');
    }
  };

  return {
    events,
    loading,
    error,
    handleAddEvent,
    handleDeleteEvent,
    handleUpdateEvent,
  };
};
