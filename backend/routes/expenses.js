const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth'); // middleware to protect routes

/**
 * @route   POST /api/expenses
 * @desc    Add a new expense for the logged-in user
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  const { title, amount, category } = req.body;

  try {
    // Create new expense linked to the user
    const expense = new Expense({
      user: req.user.id, // set by auth middleware
      title,
      amount,
      category,
    });

    await expense.save();

    res.status(201).json({
      message: '✅ Expense added successfully',
      expense,
    });
  } catch (err) {
    console.error('❌ Error adding expense:', err.message);
    res.status(500).json({ error: 'Server error while adding expense' });
  }
});

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses for the logged-in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses); // return only the array directly
  } catch (err) {
    console.error('❌ Error fetching expenses:', err.message);
    res.status(500).json({ error: 'Server error while fetching expenses' });
  }
});


module.exports = router;
