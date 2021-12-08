// WEB SCRAPING EXAMPLE
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require('mongoose');

const keys = require('../../config/keys.js');
require('../../models/mymodel.js');

// daily  job
async function dailyJob(){
    const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
    try {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);

        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);

        // Select all the list items in plainlist class
        const listItems = $(".plainlist ul li");

        // Stores data for all countries
        const countries = [];

        // Use .each method to loop through the li we selected
        listItems.each((idx, el) => {
          // Object holding data for each country/jurisdiction
          const country = { name: "", iso3: "" };
          // Select the text content of a and span elements
          // Store the textcontent in the above object
          country.name = $(el).children("a").text();
          country.iso3 = $(el).children("span").text();
          // Populate countries array with country data
          countries.push(country);
        });

        // Logs countries array to the console
        console.dir(countries);

        // Write countries array in database

      } catch (err) {
        console.error(err);
      }
};



// CODE TO LOAD JS from a react website

// var options = {
//     url: user.instagram_url,
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
//     }
//   };

//   request(options, function(error, response, html) {
//     if (!error) {

//       console.log('Scraper running on Instagram user page.');

//       // Use Cheerio to load the page.
//       var $ = cheerio.load(html);

//       // Code to parse the DOM here

//     }
// }

module.exports = {
    dailyJob
}