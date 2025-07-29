import puppeteer from 'puppeteer';

const url = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const data = await page.evaluate(() => {
    return {
      title: document.querySelector('#productTitle')?.innerText.trim() || '',
      price: document.querySelector('.a-price .a-offscreen')?.innerText.trim() || '',
    };
  });

  console.log(JSON.stringify(data, null, 2));

  await browser.close();
})();
