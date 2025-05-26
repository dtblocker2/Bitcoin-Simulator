//another problem is that i can't use node js module in browser so I do need to learn backend node js to make thia project more usable

const fs = require('fs');

function get_api_key(callback) {
    fs.readFile('apikeys.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            callback(null);
            return;
        }
        callback(data.trim());
    });
}

get_api_key((apiKey) => {
    if (apiKey) {
        console.log("API Key:", apiKey);
    }
});


//problem is client side fetching of crypto data is not allowed so I need to make a proxy server using express and node js
async function fetchCryptoData() {
    const symbol = 'BTC';
    var output = '';

    const api_key = get_api_key();
    console.log(api_key);

    if (!symbol) {
        alert('Please enter a cryptocurrency symbol (e.g., BTC)');
        return;
    }

    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(symbol)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        output = JSON.stringify(data, null, 2);
        console.log(output);
    } catch (error) {
            output = 'Error fetching data: ' + error.message;
            console.log(output)
            console.error('Fetch error:', error);
    }
}

fetchCryptoData();