import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddExpense = (expense) => {
    setTransactions([...transactions, expense]);
    setShowForm(false);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <button onClick={() => setShowForm(true)}>+</button>
      {showForm && <ExpenseForm onSubmit={handleAddExpense} />}
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>{transaction.description} - {transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;