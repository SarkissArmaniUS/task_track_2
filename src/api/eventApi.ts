const API_URL = "http://localhost:5000/api/home";

export const fetchEvents = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};

export const addEvent = async (event: any) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to add event");
  return response.json();
};

export const updateEvent = async (id: string, updatedData: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return response.json();
};

export const deleteEvent = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete event");
};
