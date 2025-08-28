/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const chatbotRoutes = require('./routes/chatbot');
const mutualFundRoutes = require('./routes/mutualFundroutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/mutualfunds', mutualFundRoutes); // Route will be /api/mutual-funds



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));


app.get("/", (req, res) => res.send("API Running"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const Test = mongoose.model("Test", new mongoose.Schema({ name: String }));

app.post("/test", async (req, res) => {
  try {
    const doc = new Test({ name: "Hello Mongo" });
    await doc.save();
    res.send("✅ Test document saved to MongoDB!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});*/



// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import routes
import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";

 // optional, if you have auth

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes); // optional, comment out if not using auth

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

