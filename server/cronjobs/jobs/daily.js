// WEB SCRAPING EXAMPLE
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const keys = require('../../config/keys.js');

require('../../models/mymodel.js');
//we scraping example found here
// https://github.com/puppeteer/puppeteer/blob/main/examples/cross-browser.js


const firefoxOptions = {
    product: 'firefox',
    extraPrefsFirefox: {
        // Enable additional Firefox logging from its protocol implementation
        // 'remote.log.level': 'Trace',
    },
    // Make browser logs visible
    dumpio: true,
};

// daily  job
async function dailyJob(){
    const browser = await puppeteer.launch(firefoxOptions);

    const page = await browser.newPage();
    console.log(await browser.version());
  
    await page.goto('https://news.ycombinator.com/');
  
    // Extract articles from the page.
    const resultsSelector = '.storylink';
    const links = await page.evaluate((resultsSelector) => {
      const anchors = Array.from(document.querySelectorAll(resultsSelector));
      return anchors.map((anchor) => {
        const title = anchor.textContent.trim();
        return `${title} - ${anchor.href}`;
      });
    }, resultsSelector);
    console.log(links.join('\n'));
  
    await browser.close();
    
}

module.exports = {
    dailyJob
}