require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

// Replace 'YOUR_API_KEY' with your actual CoinMarketCap API key
const API_KEY = process.env.COINMARKET_API_KEY;
const URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

async function fetchTokenData() {
    try {
        const response = await axios.get(URL, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
                'Accept': 'application/json'
            },
            params: {
                'start': '1',
                'limit': '5',  // Number of tokens you want to fetch
                'convert': 'USD'
            }
        });

        const data = response.data;

        // Save the data to data.json
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log('Data has been saved to data.json');
    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}

fetchTokenData();
