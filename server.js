// server.js
const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'YOUR_API_KEY';
const PORT = 3000;

app.get('/crypto', async (req, res) => {
  const symbol = req.query.symbol || 'BTC';

  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
      params: { symbol },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'API request failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
