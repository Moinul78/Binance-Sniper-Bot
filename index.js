require('dotenv').config();
const Binance = require('binance-api-node').default;
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');

let tokensData = [];

const client = Binance({
    apiKey: process.env.BINANCE_API_KEY_TESTNET,
    apiSecret: process.env.BINANCE_API_SECRET_TESTNET,
    httpBase: process.env.BINANCE_URL_TESTNET,
    testnet: true,
});

// Function to fetch symbol trading rules
async function getTradingRules(symbol) {
    try {
        const response = await fetch(`${process.env.BINANCE_URL}/exchangeInfo?symbol=${symbol.toUpperCase()}`);
        const data = await response.json();
        if (!data.symbols || data.symbols.length === 0) {
            console.log(`No trading rules found for symbol "${symbol}"`);
            return null;
        }

        return data.symbols[0];
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to fetch the current price of a symbol
async function getCurrentPrice(symbol) {
    try {
        const ticker = await client.prices({ symbol: symbol });
        return parseFloat(ticker[symbol]);
    } catch (error) {
        console.error('Error fetching current price:', error);
        return 0;
    }
}

// Function to place a spot trade with appropriate quantity
async function placeTestnetSpotTrade(symbol, side, quantity) {
    try {
        // Fetch trading rules for the symbol
        const tradingRules = await getTradingRules(symbol);

        if (tradingRules) {
            console.log(tradingRules);
            const lotSizeFilter = tradingRules.filters.find(filter => filter.filterType === 'LOT_SIZE');
            const minQty = parseFloat(lotSizeFilter?.minQty || 0);
            const maxQty = parseFloat(lotSizeFilter?.maxQty || 0);
            const stepSize = parseFloat(lotSizeFilter?.stepSize || 0);

            const notionalFilter = tradingRules.filters.find(filter => filter.filterType === 'NOTIONAL');
            const minNotional = parseFloat(notionalFilter?.minNotional || 0);

            const currentPrice = await getCurrentPrice(symbol);
            console.log('Current Price of token', + symbol + ': ' + currentPrice);

            const notionalValue = quantity * currentPrice;
            if (quantity < minQty) {
                console.error(`Quantity ${quantity} is below the minimum allowed quantity ${minQty}`);
                return;
            }
            if (quantity > maxQty) {
                console.error(`Quantity ${quantity} exceeds the maximum allowed quantity ${maxQty}`);
                return;
            }
            if (minNotional > 0 && notionalValue < minNotional) {
                console.error(`Notional value ${notionalValue} is below the minimum allowed notional value ${minNotional}`);
                return;
            }

            // Round down quantity to the nearest step size
            quantity = Math.floor(quantity / stepSize) * stepSize;

            const order = await client.order({ symbol: symbol, side: side, quantity: quantity, type: 'MARKET' });

            console.log('Order placed successfully:', order);
        }
    } catch (error) {
        console.error('Error placing order:', error);
    }
}

// Function to fetch details for a specific symbol
async function getSymbolDetails(symbol) {
    try {
        const response = await fetch(`${process.env.BINANCE_URL}/exchangeInfo?symbol=${symbol.toUpperCase()}`);
        const data = await response.json();

        if (!data.symbols || data.symbols.length === 0) {
            console.log(`No details found for symbol "${symbol}"`);
            return null;
        }

        return data.symbols[0];
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to scrape token data from Binance Launchpad
async function scrapeAllTokenData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://launchpad.binance.com/en');

    await page.waitForSelector('div[name="lp-single-project"]');
    const tokensData = await page.evaluate(() => {
        const projects = [];
        const projectElements = document.querySelectorAll('div[name="lp-single-project"]');

        projectElements.forEach(projectElement => {
            const status = projectElement.querySelector('.css-1v046vv')?.innerText || 'N/A';
            const tokenName = projectElement.querySelector('.css-13to1co')?.innerText || 'N/A';
            const description = projectElement.querySelector('.css-c6ohgu')?.innerText || 'N/A';
            const totalAirdrop = projectElement.querySelector('.css-leoum0 .css-153t1uw')?.innerText || 'N/A';
            const projectDuration = projectElement.querySelector('.css-95ejfk .css-153t1uw')?.innerText || 'N/A';
            const projectEndDate = projectElement.querySelector('.css-lx2ylz .css-153t1uw')?.innerText || 'N/A';

            const pools = [];
            const poolElements = projectElement.querySelectorAll('a.css-hb9u37');

            poolElements.forEach(poolElement => {
                const poolName = poolElement.querySelector('.css-10nf7hq')?.innerText || 'N/A';
                const poolDescription = poolElement.querySelector('.css-1x5xp1g')?.innerText || 'N/A';
                const participants = poolElement.querySelector('.css-1n0lc61 .css-1q7imhr')?.innerText || 'N/A';
                const totalLocked = poolElement.querySelector('.css-1n0lc61 .css-1q7imhr')?.innerText || 'N/A';

                pools.push({ poolName, poolDescription, participants, totalLocked });
            });

            projects.push({ status, tokenName, description, totalAirdrop, projectDuration, projectEndDate, pools });
        });
        return projects;
    });

    await browser.close();
    return tokensData;
}

// Main function to scrape data, fetch token details, and place a trade
async function scrapeAndFetchTokenDetails() {
    try {
        tokensData = await scrapeAllTokenData();
        console.log('Scraped Tokens Data:', tokensData);

        for (const token of tokensData) {
            const symbol = token.tokenName.replace(/\s/g, '').toUpperCase() + 'USDT';
            console.log(`Fetching details for ${symbol}...`);
            const tokenDetails = await getSymbolDetails(symbol);

            if (tokenDetails) {
                token.tokenDetails = tokenDetails;
            }
        }
        fs.writeFileSync('AllTokenDetails.json', JSON.stringify(tokensData, null, 2));
        console.log('All token data saved to AllTokenDetails.json');

        await trade();
    } catch (error) {
        console.error('Error during scraping and fetching token details:', error);
    }
}

async function getWalletBalances() {
    try {
        const account = await client.accountInfo();
        const balances = account.balances;

        const balanceMap = {};
        balances.forEach(balance => {
            balanceMap[balance.asset] = {
                free: parseFloat(balance.free),
                locked: parseFloat(balance.locked),
                total: parseFloat(balance.free) + parseFloat(balance.locked)
            };
        });

        console.log(balanceMap);
        // return balanceMap;
    } catch (error) {
        console.error('Error fetching wallet balances:', error);
    }
}


// Function to place a trade with the first token from the scraped data
async function trade() {
    if (tokensData.length > 0) {
        const firstTokenName = tokensData[0].tokenName.replace(/\s/g, '').toUpperCase() + 'USDT';
        console.log(`Placing testnet spot trade for ${firstTokenName}...`);
        await getWalletBalances();
        await placeTestnetSpotTrade(firstTokenName, 'BUY', 1000);
        // await placeTestnetSpotTrade(firstTokenName, 'SELL', 1000); // For sell test
        await getWalletBalances();
    } else {
        console.error('No tokens data available for trading.');
    }
}

scrapeAndFetchTokenDetails();
