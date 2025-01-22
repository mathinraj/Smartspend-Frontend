import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar CSS
import api from '../services/api';
import SideMenu from '../components/SideMenu';

const CalendarPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to fetch expenses. Please try again later.');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Function to calculate daily income and expense
  const getDailySummary = (date) => {
    const dailyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date).toDateString();
      return expenseDate === date.toDateString();
    });

    const totalIncome = dailyExpenses
      .filter((expense) => expense.amount >= 0)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const totalExpense = dailyExpenses
      .filter((expense) => expense.amount < 0)
      .reduce((sum, expense) => sum + Math.abs(expense.amount), 0);

    return { totalIncome, totalExpense };
  };

  // Custom tile content for the calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const { totalIncome, totalExpense } = getDailySummary(date);
      return (
        <div>
          {totalIncome > 0 && <div style={{ color: 'green' }}>₹{totalIncome.toFixed(2)}</div>}
          {totalExpense > 0 && <div style={{ color: 'red' }}>₹{totalExpense.toFixed(2)}</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4 d-flex flex-column">
          <h1>Money Map <i class="fa-solid fa-map-location-dot"></i></h1>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="flex-grow-1 d-flex flex-column">
              <Calendar
                tileContent={tileContent}
                className="react-calendar w-100 h-100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <div className="d-flex flex-grow-1">
//         <SideMenu />
//         <div className="flex-grow-1 p-4 d-flex flex-column">
//           <h1>Calendar</h1>
//           {loading ? (
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="alert alert-danger">{error}</div>
//           ) : (
//             <div className="flex-grow-1 d-flex flex-column">
//               <Calendar
//                 tileContent={tileContent}
//                 className="react-calendar w-100 h-100"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

};

export default CalendarPage;