const puppeteer = require('puppeteer');
const { insertInternshipData, checkInternshipExists } = require('./databasei');

async function scrapeInternships(retries = 2) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-features=IsolateOrigins,site-per-process'
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    const url = 'https://cse.noticebard.com/internships/';
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('.elementor-column', { timeout: 20000 });

    // Optional: delay to allow all JS content to render
    await new Promise(res => setTimeout(res, 3000));

      const internships = await page.evaluate(() => {
  const data = [];
  const items = document.querySelectorAll('.elementor-column');

  items.forEach(item => {
    const titleElement = item.querySelector('.elementor-heading-title a');
    const title = titleElement?.innerText.trim() || 'No Title';
    const url = titleElement?.href || 'No URL';


    const authorElement = item.querySelector('.elementor-post-info__item--type-author');
    const author = authorElement?.innerText.replace('By ', '').trim() || 'Unknown';

    const dateElement = item.querySelector('.elementor-post-info__item--type-date time');
    const datePublished = dateElement?.innerText.trim() || 'Unknown';

    if (title && title !== 'No Title') {
      data.push({ title, url, imageUrl, author, datePublished });
    }
  });

  return data;
});

    if (internships.length === 0) {
      console.warn('⚠️ No internships found. Selector might have changed.');
    }

    for (const internship of internships) {
      const exists = await checkInternshipExists(internship.url);
      if (!exists) {
        await insertInternshipData(internship);
        console.log(`✅ Inserted: ${internship.title}`);
      } else {
        console.log(`⚠️ Skipped: ${internship.title}`);
      }
    }

  } catch (err) {
    console.error('❌ Scraping error:', err.message);

    if (retries > 0 && err.message.includes('frame was detached')) {
      console.log(`🔁 Retrying... (${3 - retries} attempt failed)`);
      await new Promise(res => setTimeout(res, 3000));
      return scrapeInternships(retries - 1);
    }
  } finally {
    if (browser) await browser.close();
  }
}

scrapeInternships();
