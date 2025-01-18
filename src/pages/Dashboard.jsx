import PieChart from '../components/PieChart';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const data = [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Entertainment', value: 200 },
    { name: 'Utilities', value: 100 },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <PieChart data={data} />
      <button onClick={() => navigate('/add-expense')}>+</button>
    </div>
  );
}

export default Dashboard;