// src/components/ExpenseList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList({ token }) {
  const [expenses, setExpenses] = useState([]); // ✅ initialize as empty array

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { 'x-auth-token': token },
        });
        console.log("Fetched expenses:", res.data);
        setExpenses(res.data); // ✅ ensure backend returns an array
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, [token]);

  return (
    <div>
      <h3>Your Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
