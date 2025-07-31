const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // or your actual model
const { handleChatQuery } = require('../controllers/chatbotController');

// Simple intent recognition
function detectIntent(message) {
  const text = message.toLowerCase().replace(/[^\w\s]/gi, ''); // normalize text

  if (text.includes("surplus") || text.includes("savings")) return "surplus";
  if (text.includes("invest") || text.includes("investment")) return "investment";
  if (text.includes("expense") || text.includes("spend")) return "expenses";

  return "unknown";
}

// Chatbot logic
router.post('/query', handleChatQuery);
router.post('/query', async (req, res) => {
  const { message, userId } = req.body;
  const intent = detectIntent(message);

  try {
    switch (intent) {
      case "surplus":
        const expenses = await Expense.find({ userId });
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        const budget = 10000; // example fixed income
        const surplus = budget - total;
        return res.json({ reply: `Your current surplus is ₹${surplus}.` });

      case "investment":
        return res.json({
          reply: `Based on current trends, consider:\n- Nifty Index Fund (9.5%)\n- Mutual Funds (11.2%)\n- Bitcoin (13.1%).`
        });

      case "overspending":
        return res.json({ reply: `You seem to spend more on food and shopping. Try setting monthly limits.` });

      default:
        return res.json({ reply: "Sorry, I couldn't understand that. Try asking about your surplus or investments." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ reply: 'Internal error.' });
  }
});

module.exports = router;
