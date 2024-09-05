const Binance = require('binance-api-node').default;

const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
    httpBase: 'https://api.binance.com',
    httpFuturesBase: 'https://fapi.binance.com',
    recvWindow: 5000,
    timeout: 15000,
});

let knownSymbols = new Set();  // Set to track known symbols

// Fetch existing symbols from Binance
async function fetchExistingSymbols() {
    try {
        const exchangeInfo = await client.exchangeInfo();
        knownSymbols = new Set(exchangeInfo.symbols.map(symbol => symbol.symbol));
        console.log('Fetched existing symbols:', knownSymbols);
    } catch (error) {
        console.error('Error fetching existing symbols:', error);
    }
}

// Listen for ticker updates and detect new symbols
function listenForNewListings() {
    client.ws.allTickers(tickers => {
        tickers.forEach(ticker => {
            const symbol = ticker.symbol;
            if (!knownSymbols.has(symbol)) {
                // New token detected
                console.log(`New Token Listed: ${symbol}`);

                // Add the new symbol to the known symbols set
                knownSymbols.add(symbol);
            }
        });
    });
}

// Initialize the process
async function init() {
    await fetchExistingSymbols();  // Fetch the current symbols
    listenForNewListings();  // Start listening for new listings
}

init();
