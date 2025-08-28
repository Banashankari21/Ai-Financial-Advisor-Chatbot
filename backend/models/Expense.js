/*const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ['necessary', 'unnecessary'], required: true },
    gptReason: { type: String }, // GPT-4 justification
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);*/

// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ["necessary", "unnecessary"], required: true },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

