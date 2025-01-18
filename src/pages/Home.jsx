import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to Expense Tracker !!</h1>
      <button type="button" class="btn btn-success" data-mdb-ripple-init onClick={() => navigate('/login')}>Login →</button>

    </>
    

  )
}

export default Home