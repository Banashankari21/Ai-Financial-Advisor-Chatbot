// src/components/ExpenseTable.jsx
import React from "react";

function ExpenseTable({ expenses }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th> 
        </tr>
      </thead>
       <tbody>
  {expenses.map((expense) => (
    <tr key={expense._id}>
      <td>{expense.category}</td>  {/* ✅ Moved to first */}
      <td>{expense.amount}</td>
      <td>{expense.description}</td>
      <td>Date: {new Date(expense.createdAt).toLocaleDateString()}</td> {/* ✅ Fixes the date */}
      <td>{expense.type}</td> 
    </tr>
  ))}
</tbody>

    </table>
  );
}


export default ExpenseTable;
