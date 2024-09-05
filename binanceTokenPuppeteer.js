const puppeteer = require('puppeteer');

async function scrapeAllTokenData() {
    const browser = await puppeteer.launch({ headless: false });
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

scrapeAllTokenData().then(tokensData => {
    console.log('All Scraped Token Data:', JSON.stringify(tokensData, null, 2));
}).catch(err => console.error(err));