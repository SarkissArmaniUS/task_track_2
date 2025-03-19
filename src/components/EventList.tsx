// src/components/EventList.tsx

import React from 'react';
import EventItem from './EventItem';

interface Event {
  _id: string;
  name: string;
  date: string;
  importance: string;
  description: string;
}

const EventList = ({ events, onDelete, onEdit }: { events: Event[], onDelete: (id: string) => void, onEdit: (event: Event) => void }) => {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event._id} event={event} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default EventList;
