import React from 'react';

interface Event {
  _id: string;
  name: string;
  date: string;
  importance: string;
  description: string;
}

const EventItem = ({ event, onDelete, onEdit }: { event: Event, onDelete: (id: string) => void, onEdit: (event: Event) => void }) => {
  return (
    <li>
      <h3>{event.name}</h3>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Importance: {event.importance}</p>
      <p>{event.description}</p>
      <button onClick={() => onDelete(event._id)}>Delete</button>
      <button onClick={() => onEdit(event)}>Edit</button>
    </li>
  );
};

export default EventItem;
