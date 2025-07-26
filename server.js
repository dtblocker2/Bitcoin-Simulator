//declaration of modules
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()

//declaration of important constants
const apikey = process.env['api_key'];
const symbol = 'BTC';
const currency = 'INR';

//declaration of some functions
async function fetch_btc_price() {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${currency}`, {
      headers: {
        'X-CMC_PRO_API_KEY': apikey,
      },
    });
    const price = response.data.data.BTC.quote[currency].price;
    //console.log(price);
    return price;
  } catch (error) {
    console.error('Error fetching price:', error.message);
    return null;
  }
}

// server.js setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // allow requests from browser
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const BTC_curr_price = await fetch_btc_price(); // used await to remove error or fetch_btc_price function return object and nit string
  try {
    // Serve static files from the 'public' directory
      app.use(express.static(path.join(__dirname, '/public')));
      //above will be executed only after getting value of BTC to avoid blank response
      let exported_value = (typeof BTC_curr_price === 'number' && !isNaN(BTC_curr_price)) ? BTC_curr_price.toFixed(3) : 'fetching...' ;
      // res.render('index', { exported_value, currency });
      res.render('index');
    } catch (error) {
      console.error('Error fetching BTC price:', error.message);
      // res.render('index', { BTC_curr_price: 'Error fetching price' });
      res.render('index');
    }
});

//live update code in script.js document
app.get('/api/btc-price', async (req,res) => {
  const price = await fetch_btc_price();
  res.json({price})
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
