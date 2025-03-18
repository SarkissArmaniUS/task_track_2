import { useEffect, useState } from 'react';

interface Plan {
  _id: string;
  date: string;
  title: string;
  description: string;
}

const Calendar = ({ token }: { token: string }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [newPlan, setNewPlan] = useState({ title: '', description: '' });

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/plans', {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setPlans);
  }, [token]);

  const addPlan = async () => {
    const response = await fetch('http://localhost:5000/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ date: selectedDate, ...newPlan }),
    });

    if (response.ok) {
      const addedPlan = await response.json();
      setPlans([...plans, addedPlan]);
      setNewPlan({ title: '', description: '' });
    }
  };

  return (
    <div>
      <h2>Календар</h2>
      <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
      <input type="text" placeholder="Назва плану" onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })} />
      <textarea placeholder="Опис" onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })} />
      <button onClick={addPlan}>Додати план</button>
      <ul>
        {plans
          .filter((plan) => plan.date === selectedDate)
          .map((plan) => (
            <li key={plan._id}>{plan.title}</li>
          ))}
      </ul>
    </div>
  );
};

export default Calendar;
