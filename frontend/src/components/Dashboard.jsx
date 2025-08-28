import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import Chatbot from "./Chatbot";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const { logout, token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err.response?.data || err.message);
      }
    };
    fetchExpenses();
  }, [token]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>S to E - Finance Tracker</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-left">
          <ExpenseForm onAdd={(newExpense) => setExpenses((prev) => [...prev, newExpense])} />

          <ExpenseTable expenses={expenses} />
        </div>
        <div className="dashboard-right">
          <Chatbot />
        </div>
      </main>
    </div>
  );
}
