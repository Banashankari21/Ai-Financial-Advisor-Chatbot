const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  riskProfile: { type: String, default: "moderate" },
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
