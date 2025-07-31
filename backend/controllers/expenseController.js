const Expense = require('../models/Expense');
const classifyExpense = require("../utils/classifyExpense");



const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.user.id;

    if (!amount || !description || !category) {
      return res.status(400).json({ error: 'All fields are required: amount, description, category.' });
    }

    // ✅ Classify type from category
    const type = classifyExpense(category);

    // ✅ Save without date
    const expense = new Expense({
      userId,
      amount,
      description,
      category,
      type // ✅ add type explicitly
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    console.error("❌ Error in addExpense:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ Get All Expenses Controller
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Surplus Controller

// Surplus route controller
const getSurplus = async (req, res) => {
  try {
    const { year, month, income } = req.query;
    const userId = req.user.id;

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Use createdAt instead of date
    const expenses = await Expense.find({
      userId: userId,
      createdAt: {
        $gte: startDate,
        $lt: endDate
      }
    });

    let totalSpent = 0;
    let necessary = 0;
    let unnecessary = 0;

    expenses.forEach((exp) => {
      totalSpent += exp.amount;
      if (exp.type === 'necessary') {
        necessary += exp.amount;
      } else {
        unnecessary += exp.amount;
      }
    });

    const surplus = income - totalSpent;

    res.json({
      totalSpent,
      necessary,
      unnecessary,
      surplus
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getSurplus
};