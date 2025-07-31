const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  
  /*category: {
    type: String,
    enum: ['necessary', 'unnecessary', 'uncategorized', 'food', 'rent', 'other'], // include your categories
    default: 'uncategorized'
  },*/
  category: {
    type: String,
    required: true
  },

    type: {
    type: String,
    enum: ['necessary', 'unnecessary'],
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Expense', ExpenseSchema);
