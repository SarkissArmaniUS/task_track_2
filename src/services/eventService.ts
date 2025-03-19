export const getEvents = async () => {
    const response = await fetch('http://localhost:5000/api/home');
    if (!response.ok) {
      throw new Error('Error fetching events');
    }
    return await response.json();
  };
  
  export const addEvent = async (eventData: any) => {
    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Error adding event');
    }
    return await response.json();
  };
  
  export const deleteEvent = async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting event');
    }
  };
  
  export const updateEvent = async (id: string, eventData: any) => {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Error updating event');
    }
    return await response.json();
  };
  