import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function ExpenseForm({ onAdd }) {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });
  const [category, setCategory] = useState(""); // AI category
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch AI category whenever description changes
  useEffect(() => {
    const fetchCategory = async () => {
      if (!formData.description) {
        setCategory("");
        return;
      }
      setAiLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/expenses/categorize",
          { description: formData.description },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(res.data.category || "");
      } catch (err) {
        console.error("AI categorization error:", err.response?.data || err.message);
        setCategory("");
      } finally {
        setAiLoading(false);
      }
    };

    fetchCategory();
  }, [formData.description, token]);

  // Submit expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!token) {
      alert("You must be logged in to add an expense");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/expenses/add",
        { ...formData, category },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onAdd && res.data) onAdd(res.data); // update Dashboard state instantly
      setFormData({ amount: "", description: "" });
      setCategory("");
    } catch (err) {
      console.error("Error adding expense:", err.response?.data || err.message);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
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
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="category"
        placeholder={aiLoading ? "Categorizing..." : "Category (AI)"}
        value={category}
        className="form-control mb-2"
        readOnly
        required
      />

      <button type="submit" className="btn btn-primary w-100" disabled={loading || aiLoading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
}

export default ExpenseForm;

