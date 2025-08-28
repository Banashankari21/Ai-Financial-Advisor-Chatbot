// controllers/expenseController.js
import Expense from "../models/Expense.js";
import { classifyExpense } from "../utils/classifyExpenseGPT.js";

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;

    if (!amount || !description || !category) {
      return res
        .status(400)
        .json({ error: "All fields are required: amount, description, category." });
    }

    // GPT-4 classifies the expense type
    const type = await classifyExpense(description);

    const expense = new Expense({
      userId,
      amount,
      description,
      category,
      type,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("❌ Error in addExpense:", err.message);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

// Get all expenses for a user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get monthly surplus
export const getSurplus = async (req, res) => {
  try {
    const { year, month, income } = req.query;
    const userId = req.user.id;

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const expenses = await Expense.find({
      userId,
      createdAt: { $gte: startDate, $lt: endDate },
    });

    let totalSpent = 0;
    let necessary = 0;
    let unnecessary = 0;

    expenses.forEach((exp) => {
      totalSpent += exp.amount;
      if (exp.type === "necessary") necessary += exp.amount;
      else unnecessary += exp.amount;
    });

    const surplus = income - totalSpent;

    res.json({ totalSpent, necessary, unnecessary, surplus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



