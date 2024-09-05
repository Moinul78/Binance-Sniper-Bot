const axios = require('axios');
const fs = require('fs');

async function fetchNewListings() {
    try {
        // Fetch the list of coins from CoinGecko
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const coins = response.data;

        // Optionally filter or process the data to find new tokens
        // For example, you could fetch the latest market data and compare it with your list

        // Save data to data.json
        fs.writeFileSync('data1.json', JSON.stringify(coins, null, 2));
        console.log('Coin list saved successfully!');
    } catch (error) {
        console.error('Error fetching coin list:', error);
    }
}

fetchNewListings();
