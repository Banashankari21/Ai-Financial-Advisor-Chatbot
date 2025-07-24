// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!storedToken || !userData) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: {user.email}</p>

          <button className="btn btn-danger mb-4" onClick={handleLogout}>Logout</button>

          {/* ✅ AddExpense Component */}
          <AddExpense token={token} />

          {/* ✅ ExpenseList Component */}
          <ExpenseList token={token} />

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
