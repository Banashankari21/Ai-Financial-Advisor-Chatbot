const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { getSurplus } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new expense (POST)
router.post('/add', authMiddleware, addExpense);

// Get all expenses for a user (GET)
router.get('/all', authMiddleware, getExpenses);

// ✅ New route for monthly surplus
router.get('/surplus', authMiddleware, getSurplus);



router.get('/test', (req, res) => {
  res.send("Router working!");
});
                                            
module.exports = router;
