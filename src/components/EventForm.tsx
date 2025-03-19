'use client'

import React, { useState } from 'react';

const EventForm = ({ onSubmit, initialData }: { onSubmit: (data: any) => void, initialData?: any }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [importance, setImportance] = useState(initialData?.importance || 'normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, date, description, importance });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event name" required />
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event description" required />
      <select value={importance} onChange={(e) => setImportance(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="critical">Critical</option>
      </select>
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
