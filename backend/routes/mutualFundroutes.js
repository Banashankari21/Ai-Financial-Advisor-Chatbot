// routes/mutualFundRoutes.js
const express = require('express');
const router = express.Router();
const { fetchNAVData } = require('../controllers/mutualFundController');

router.get('/mutual-funds', fetchNAVData);
router.get('/suggest-funds', suggestFundsByRisk);

module.exports = router;
