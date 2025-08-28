/*const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getSurplus } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new expense
router.post('/add', authMiddleware, addExpense);

// Get all expenses
router.get('/all', authMiddleware, getExpenses);

// Monthly surplus
router.get('/surplus', authMiddleware, getSurplus);

// Test route
router.get('/test', (req, res) => res.send("Router working!"));

module.exports = router;*/

import express from "express";
import { addExpense,getExpenses } from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect this route with authMiddleware

router.get("/", authMiddleware, getExpenses);
router.post("/add", authMiddleware, addExpense);

export default router;
