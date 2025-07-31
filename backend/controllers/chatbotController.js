// controllers/chatbotController.js
const Expense = require('../models/Expense');
const axios = require('axios');

// Intent detection logic
function detectIntent(message) {
  const lower = message.toLowerCase();

  if (lower.includes('surplus') || lower.includes('savings')) return 'surplus';
  if (lower.includes('invest')) return 'investment';
  if (lower.includes('spend') || lower.includes('most on') || lower.includes('category')) return 'analysis';

  return 'unknown';
}

// Main chatbot handler
exports.handleChatQuery = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId required' });
  }

  const intent = detectIntent(message);

  try {
    if (intent === 'surplus') {
      const expenses = await Expense.find({ user: userId });
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      const necessary = expenses.filter(e => e.category === 'necessary').reduce((a, e) => a + e.amount, 0);
      const unnecessary = total - necessary;
      const surplus = Math.max(0, 10000 - total); // Assuming fixed income

      return res.json({
        reply: `📊 This month, you spent ₹${total}.\n\n🔹 Necessary: ₹${necessary}\n🔹 Unnecessary: ₹${unnecessary}\n💰 Surplus: ₹${surplus}`
      });
    }

    if (intent === 'investment') {
      const risk = message.toLowerCase().includes('low')
        ? 'low'
        : message.toLowerCase().includes('high')
        ? 'high'
        : 'medium';

      const expenses = await Expense.find({ user: userId });
      const unnecessary = expenses.filter(e => e.type === 'unnecessary').reduce((a, e) => a + e.amount, 0);

      const [stocks, crypto] = await Promise.all([
        axios.get('https://query1.finance.yahoo.com/v7/finance/quote?symbols=INFY.NS,HDFCBANK.NS'),
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=inr')
      ]);

      // Sample mutual fund suggestions by risk
      const mutualFundSuggestions = {
        low: [
          '🔹 Axis Bluechip Fund – Direct Plan – Growth',
          '🔹 HDFC Index Fund – Sensex Plan',
          '🔹 SBI Magnum Ultra Short Duration Fund'
        ],
        medium: [
          '🔸 ICICI Prudential Balanced Advantage Fund',
          '🔸 UTI Hybrid Equity Fund',
          '🔸 Kotak Equity Opportunities Fund'
        ],
        high: [
          '🔥 Nippon India Small Cap Fund',
          '🔥 Quant Active Fund',
          '🔥 Tata Digital India Fund'
        ]
      };

      const mfList = mutualFundSuggestions[risk].join('\n');

      let marketSuggestions = '';
      if (risk === 'low') {
        marketSuggestions = `📉 Low Risk:\n- FD & Index Funds\n- ${mfList}`;
      } else if (risk === 'medium') {
        marketSuggestions =
          `📊 Medium Risk:\n- Infosys: ₹${stocks.data.quoteResponse.result[0].regularMarketPrice}\n` +
          `- HDFC Bank: ₹${stocks.data.quoteResponse.result[1].regularMarketPrice}\n\n` +
          `${mfList}`;
      } else {
        marketSuggestions =
          `🚀 High Risk:\n- Bitcoin: ₹${crypto.data.bitcoin.inr}\n- Ethereum: ₹${crypto.data.ethereum.inr}\n\n` +
          `${mfList}`;
      }

      return res.json({
        reply:
          `💸 You spent ₹${unnecessary} unnecessarily this month.\n\n` +
          `💡 Based on *${risk.toUpperCase()} RISK*, here are suggestions:\n\n` +
          `${marketSuggestions}\n\n` +
          `📈 Consider investing this amount instead!`
      });
    }

    if (intent === 'analysis') {
      const expenses = await Expense.find({ user: userId });
      const categoryTotals = {};

      for (let e of expenses) {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
      }

      const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

      return res.json({
        reply: `📊 You spent the most on *${topCategory[0]}* this month: ₹${topCategory[1]}.`
      });
    }

    return res.json({
      reply: "🤖 I didn't catch that. Ask about your surplus, investment ideas, or top spending category."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
