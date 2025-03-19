'use client'

import React from 'react';
import EventForm from '@/components/EventForm';
import EventList from '@/components/EventList';
import { useEvents } from '@/hooks/useEvents';


const App = () => {
  const {
    events,
    loading,
    error,
    handleAddEvent,
    handleDeleteEvent,
    handleUpdateEvent,
  } = useEvents();

  const [editingEvent, setEditingEvent] = React.useState<any>(null);

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
  };

  const handleFormSubmit = (data: any) => {
    if (editingEvent) {
      handleUpdateEvent(editingEvent._id, data);
    } else {
      handleAddEvent(data);
    }
    setEditingEvent(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <EventForm onSubmit={handleFormSubmit} initialData={editingEvent} />
      <EventList events={events} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />
    </div>
  );
};

export default App;
