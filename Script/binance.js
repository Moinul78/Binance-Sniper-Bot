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


/*
<div class="css-yiwb9a">
    <div class="css-15331ag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-99eyv0">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-4.934-4.483L10.2 13.383l-2.716-2.716-1.768 1.767 4.484 4.484 7.634-7.634-1.768-1.767z"
                fill="currentColor"></path>
        </svg>
        <div data-bn-type="text" class="css-1v046vv">COMPLETED</div>
    </div><img alt="DOGS" src="https://bin.bnbstatic.com/static/images/coin/dogs.svg" class="css-19mam6y">
    <div class="css-13to1co"><img alt="DOGS" src="https://bin.bnbstatic.com/static/images/coin/dogs.svg"
            class="css-n0oash">DOGS</div>
    <div class="css-4kql6v">
        <div data-bn-type="text" class="css-c6ohgu">A Ton memecoin born within Telegram community</div>
        <div class="css-leoum0">
            <div class="css-13f9r66">
                <div data-bn-type="text" class="css-vurnku">Total Airdrop</div>
                <div data-bn-type="text" class="css-153t1uw">22,000,000,000.00</div>
            </div>
            <div class="css-95ejfk">
                <div data-bn-type="text" class="css-vurnku">Project Duration</div>
                <div data-bn-type="text" class="css-153t1uw">3 day/s</div>
            </div>
        </div>
        <div class="css-lx2ylz">
            <div data-bn-type="text" class="css-vurnku">Project end date</div>
            <div data-bn-type="text" class="css-153t1uw">2024-08-26</div>
        </div>
    </div>
</div>







<div name="lp-single-project" class="css-1168vab">
    <div class="css-yiwb9a">
        <div class="css-15331ag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                class="css-99eyv0">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-4.934-4.483L10.2 13.383l-2.716-2.716-1.768 1.767 4.484 4.484 7.634-7.634-1.768-1.767z"
                    fill="currentColor"></path>
            </svg>
            <div data-bn-type="text" class="css-1v046vv">COMPLETED</div>
        </div><img alt="DOGS" src="https://bin.bnbstatic.com/static/images/coin/dogs.svg" class="css-19mam6y">
        <div class="css-13to1co"><img alt="DOGS" src="https://bin.bnbstatic.com/static/images/coin/dogs.svg"
                class="css-n0oash">DOGS</div>
        <div class="css-4kql6v">
            <div data-bn-type="text" class="css-c6ohgu">A Ton memecoin born within Telegram community</div>
            <div class="css-leoum0">
                <div class="css-13f9r66">
                    <div data-bn-type="text" class="css-vurnku">Total Airdrop</div>
                    <div data-bn-type="text" class="css-153t1uw">22,000,000,000.00</div>
                </div>
                <div class="css-95ejfk">
                    <div data-bn-type="text" class="css-vurnku">Project Duration</div>
                    <div data-bn-type="text" class="css-153t1uw">3 day/s</div>
                </div>
            </div>
            <div class="css-lx2ylz">
                <div data-bn-type="text" class="css-vurnku">Project end date</div>
                <div data-bn-type="text" class="css-153t1uw">2024-08-26</div>
            </div>
        </div>
    </div><a class="css-hb9u37">
        <div class="css-1jpwbl6">
            <div class="css-25yy42">
                <div data-bn-type="text" class="css-1rcyeof"><img
                        src="https://bin.bnbstatic.com/static/images/coin/fdusd.svg" class="css-1s34hyo">
                    <div class="css-10nf7hq">
                        <div data-bn-type="text" class="css-vurnku">FDUSD Pool</div>
                    </div>
                </div>
                <div data-bn-type="text" class="css-1x5xp1g">Lock FDUSD, Get DOGS Airdrop</div>
            </div>
            <div class="css-1u9gr0w"><img src="https://bin.bnbstatic.com/static/images/coin/fdusd.svg"
                    class="css-19vntk1"><img src="https://bin.bnbstatic.com/static/images/coin/dogs.svg"
                    class="css-1udgty4">
                <div class="css-19lpqhe"><canvas width="276" height="276"
                        style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></canvas></div>
            </div>
        </div>
        <div class="css-1799mri">
            <div class="css-1n0lc61">
                <div data-bn-type="text" class="css-15u79n8">Participants:</div>
                <div data-bn-type="text" class="css-1q7imhr">110,481</div>
            </div>
            <div class="css-1n0lc61">
                <div data-bn-type="text" class="css-15u79n8">Total Locked</div>
                <div data-bn-type="text" class="css-1q7imhr">1B+ FDUSD</div>
            </div>
        </div>
    </a><a class="css-hb9u37">
        <div class="css-1jpwbl6">
            <div class="css-25yy42">
                <div data-bn-type="text" class="css-1rcyeof"><img
                        src="https://bin.bnbstatic.com/static/images/coin/bnb.svg" class="css-1s34hyo">
                    <div class="css-10nf7hq">
                        <div data-bn-type="text" class="css-vurnku">BNB Pool</div>
                    </div>
                    <div class="css-1f9551p"><svg fill="iconNormal"
                            class="bn-svg CircledInfoF text-t-third hover:text-t-primary ml-[4px] cursor-pointer text-[16px]"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 21a9 9 0 100-18 9 9 0 000 18zM10.75 8.5V6h2.5v2.5h-2.5zm0 9.5v-7h2.5v7h-2.5z"
                                fill="currentColor"></path>
                        </svg></div>
                </div>
                <div data-bn-type="text" class="css-1x5xp1g">Lock BNB, Get DOGS Airdrop</div>
            </div>
            <div class="css-1u9gr0w"><img src="https://bin.bnbstatic.com/static/images/coin/bnb.svg"
                    class="css-19vntk1"><img src="https://bin.bnbstatic.com/static/images/coin/dogs.svg"
                    class="css-1udgty4">
                <div class="css-19lpqhe"><canvas width="276" height="276"
                        style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></canvas></div>
            </div>
        </div>
        <div class="css-1799mri">
            <div class="css-1n0lc61">
                <div data-bn-type="text" class="css-15u79n8">Participants:</div>
                <div data-bn-type="text" class="css-1q7imhr">1,605,764</div>
            </div>
            <div class="css-1n0lc61">
                <div data-bn-type="text" class="css-15u79n8">Total Locked</div>
                <div data-bn-type="text" class="css-1q7imhr">11M+ BNB</div>
            </div>
        </div>
    </a>
</div>

*/