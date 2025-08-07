const puppeteer = require('puppeteer');
const { insertHackathonData, checkHackathonExists } = require('./database');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'https://devpost.com/hackathons?challenge_type[]=online&open_to[]=public&status[]=upcoming&status[]=open';
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  await page.waitForSelector('.hackathon-tile');
  await new Promise(resolve => setTimeout(resolve, 5000));
// ensure all content loads

  const hackathons = await page.evaluate(() => {
    const data = [];
    const tiles = document.querySelectorAll('.hackathon-tile');

    tiles.forEach(tile => {
      const title = tile.querySelector('h3')?.innerText || 'No title';
      const host = tile.querySelector('.side-info .host-label')?.innerText || 'Unknown';
      const submissionPeriod = tile.querySelector('.side-info .submission-period')?.innerText || 'Unknown';
      const url = tile.querySelector('a')?.href || 'No URL';
      const timeLeft = tile.querySelector('.status-label.open')?.innerText || 'N/A';
      const location = tile.querySelector('.info-with-icon .info span')?.innerText || 'Online';
      const themeElements = tile.querySelectorAll('.theme-label');
      const themes = Array.from(themeElements).map(el => el.innerText);

      data.push({ title, host, submissionPeriod, url, timeLeft, location, themes });
    });

    return data;
  });

  for (const hackathon of hackathons) {
    const exists = await checkHackathonExists(hackathon.url);
    if (!exists) {
      await insertHackathonData(hackathon);
    } else {
      console.log(`⚠️ Skipped (already exists): ${hackathon.title}`);
    }
  }

  await browser.close();
})();
