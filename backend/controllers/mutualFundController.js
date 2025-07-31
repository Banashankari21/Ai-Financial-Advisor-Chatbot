// controllers/mutualFundController.js
const axios = require('axios');

const fetchNAVData = async (req, res) => {
  try {
    const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt');
    const navData = response.data;

    const lines = navData.split('\n').filter(line => line.trim() !== '');
    const parsed = [];

    for (let line of lines) {
      const parts = line.split(';');
      if (parts.length > 5 && !isNaN(parseFloat(parts[4]))) {
        parsed.push({
          schemeCode: parts[0],
          schemeName: parts[1],
          type: parts[2],
          date: parts[3],
          nav: parseFloat(parts[4]),
        });
      }
    }

    // Return top 10 funds for now
    res.status(200).json(parsed.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mutual fund data' });
  }
};


const suggestFundsByRisk = async (req, res) => {
  const { risk } = req.query;
  const selectedKeywords = riskKeywords[risk?.toLowerCase()] || [];}

  try {
    const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt');
    const lines = response.data.split('\n').filter(line => line.trim() !== '');
    
    const parsed = [];

    for (let line of lines) {
      const parts = line.split(';');
      if (parts.length > 4 && !isNaN(parseFloat(parts[4]))) {
        const scheme = {
          schemeCode: parts[0],
          schemeName: parts[2],
          type: parts[1],
          date: parts[3],
          nav: parseFloat(parts[4]),
        };
    }
}
 res.status(200).json(results.slice(0, 10)); // return top 10 matching risk
  } catch (error) {
    res.status(500).json({ error: 'Failed to suggest mutual funds' });
  }
  

module.exports = { fetchNAVData };
