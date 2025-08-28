

import React from "react";

export default function ExpenseTable({ expenses }) {
  return (
    <div className="expense-table">
      <h3>Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category (AI)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.description}</td>
              <td>₹{exp.amount}</td>
              <td>{exp.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
