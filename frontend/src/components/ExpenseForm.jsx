import React, { useState } from "react";
import axios from "axios";

function ExpenseForm({ onAdd }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const expenseData = {
      ...formData,
      date: new Date().toISOString(), // 👈 auto-set today's date
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses/add",
        expenseData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      onAdd(res.data); // Update UI
      setFormData({ amount: "", category: "", description: "" });
    } catch (err) {
      console.error("Error adding expense:", err.response?.data || err.message);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category (e.g., Food, Transport)"
        value={formData.category}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <button type="submit" className="btn btn-primary w-100">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
