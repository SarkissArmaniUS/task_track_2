'use client';

import { useState } from 'react';

interface Event {
  title: string;
  date: string;
  description: string;
  importance: 'normal' | 'important' | 'critical';
}

const AddEvent = ({ onEventAdded }: { onEventAdded: () => void }) => {
  const [formData, setFormData] = useState<Event>({
    title: '',
    date: '',
    description: '',
    importance: 'normal',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Event added:', data);
        // Очистити форму після успішного додавання
        setFormData({
          title: '',
          date: '',
          description: '',
          importance: 'normal',
        });
        // Викликаємо callback для оновлення списку подій
        onEventAdded();
      } else {
        console.error('Error adding event:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Importance:</label>
          <select
            name="importance"
            value={formData.importance}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
