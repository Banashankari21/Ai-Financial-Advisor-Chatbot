// src/components/AddExpense.js

import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ token }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/expenses',
        { title, amount, category },
        {
          headers: {
             'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // ✅ Correct header format
          }
        }
      );

      alert('Expense added successfully');
      console.log(res.data);

      // Clear form
      setTitle('');
      setAmount('');
      setCategory('');
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert('Failed to add expense');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
