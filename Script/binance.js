require('dotenv').config();
const Binance = require('binance-api-node').default;

// Initialize Binance Client
const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
    testnet: true,
});


async function getCurrentPrices() {
    try {
        const prices = await client.prices();
        console.log('Current Prices:', prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

getCurrentPrices();


// // Fetch Order Book Depth
// async function getOrderBook(symbol, limit = 5) {
//     try {
//         const orderBook = await client.book({ symbol, limit });
//         console.log(`Order Book for ${symbol}:`, orderBook);
//     } catch (error) {
//         console.error(`Error fetching order book for ${symbol}:`, error);
//     }
// }

// // getOrderBook('BTCUSDT');


// // Fetch Recent Trades
// async function getRecentTrades(symbol, limit = 10) {
//     try {
//         const trades = await client.trades({ symbol, limit });
//         console.log(`Recent Trades for ${symbol}:`, trades);
//     } catch (error) {
//         console.error(`Error fetching recent trades for ${symbol}:`, error);
//     }
// }

// // getRecentTrades('ETHUSDT');

// //  Place a Market Buy Order

// async function placeMarketBuyOrder(symbol, quantity) {
//     try {
//         const order = await client.order({
//             symbol,
//             side: 'BUY',
//             type: 'MARKET',
//             quantity,
//         });
//         console.log('Market Buy Order Result:', order);
//     } catch (error) {
//         console.error('Error placing market buy order:', error);
//     }
// }

// // placeMarketBuyOrder('BTCUSDT', 0.001);

// // Place a Limit Sell Order
// async function placeLimitSellOrder(symbol, quantity, price) {
//     try {
//         const order = await client.order({
//             symbol,
//             side: 'SELL',
//             type: 'LIMIT',
//             quantity,
//             price,
//             timeInForce: 'GTC', // Good Till Canceled
//         });
//         console.log('Limit Sell Order Result:', order);
//     } catch (error) {
//         console.error('Error placing limit sell order:', error);
//     }
// }

// // placeLimitSellOrder('ETHUSDT', 0.05, 4000);

// // Cancel an Order
// async function cancelOrder(symbol, orderId) {
//     try {
//         const result = await client.cancelOrder({
//             symbol,
//             orderId,
//         });
//         console.log('Cancel Order Result:', result);
//     } catch (error) {
//         console.error('Error canceling order:', error);
//     }
// }

// // Replace with your actual order ID
// // cancelOrder('BTCUSDT', 123456789);


// // Fetch Account Balances
// async function getAccountBalances() {
//     try {
//         const accountInfo = await client.accountInfo();
//         console.log('Account Balances:', accountInfo.balances);
//     } catch (error) {
//         console.error('Error fetching account balances:', error);
//     }
// }

// getAccountBalances();

// //  Fetch Open Orders
// async function getOpenOrders(symbol) {
//     try {
//         const openOrders = await client.openOrders({ symbol });
//         console.log(`Open Orders for ${symbol}:`, openOrders);
//     } catch (error) {
//         console.error(`Error fetching open orders for ${symbol}:`, error);
//     }
// }

// // getOpenOrders('ETHUSDT');

// // Fetch Trade History
// async function getTradeHistory(symbol, limit = 10) {
//     try {
//         const trades = await client.myTrades({ symbol, limit });
//         console.log(`Trade History for ${symbol}:`, trades);
//     } catch (error) {
//         console.error(`Error fetching trade history for ${symbol}:`, error);
//     }
// }

// // getTradeHistory('BNBUSDT');


