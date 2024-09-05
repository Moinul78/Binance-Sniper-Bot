const fetch = require('node-fetch');
const fs = require('fs');

// Function to fetch details for a specific symbol
async function getSymbolDetails(symbol) {
    try {
        // Fetch the specific symbol's details using the query parameter
        const response = await fetch(`https://api.binance.com/api/v3/exchangeInfo?symbol=${symbol.toUpperCase()}`);
        const data = await response.json();

        if (!data.symbols || data.symbols.length === 0) {
            console.log(`No details found for symbol "${symbol}"`);
            return null;
        }

        return data.symbols[0]; // Return the details of the first (and only) matching symbol
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Example usage: Fetch details for the symbol "DOGSUSDT"
getSymbolDetails('DOGSUSDT').then(symbolDetails => {
    if (symbolDetails) {
        console.log('Symbol Details:', symbolDetails);
        fs.writeFileSync('NewTokenDetails.json', JSON.stringify(symbolDetails, null, 2));
    }
});
