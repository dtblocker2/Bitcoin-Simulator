const api_key = '0cdfb6ef-cc38-4a44-8c5f-68c5fd4c096c';

const axios = require('axios');

const symbol = 'BTC'; 

new Promise(async (resolve, reject) => {
    let response = null;
    try {
        response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`, {
            params: {
                symbol: symbol
            },
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            },
        });
    } catch (ex) {
        console.error('API call error:', ex.message);
        reject(ex);
        return;
    }

    if (response) {
        const json_data = response.data;
        console.log(json_data);
        resolve(json_data);
    }
});
