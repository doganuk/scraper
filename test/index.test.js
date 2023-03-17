import assert from 'assert';
import puppeteer from 'puppeteer';

describe('getSubscriptions', function() {
  it('should return an array of package details', async function() {
    const browser = await puppeteer.launch({
      headless: true, 
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('https://wltest.dns-systems.net//', {
      waitUntil: 'domcontentloaded',
    });
    const subscriptions = await page.evaluate(() => {
      const packageList = document.querySelectorAll('.package-features');
      const packageHeaderList = Array.from(document.querySelectorAll('.header.dark-bg'));
      return Array.from(packageList).map((quote, index) => {
        const packageName = quote.querySelector('.package-name').innerText;
        const packageDescription = quote.querySelector('.package-description').innerText;
        const packagePrice = quote.querySelector('.package-price').innerText;
        const packageData = quote.querySelector('.package-data').innerText;
        const packageHeader = packageHeaderList[index].innerText;
        return { packageHeader, packageName, packageDescription, packagePrice, packageData };
      });
    });
    await browser.close();
    assert.strictEqual(Array.isArray(subscriptions), true);
    assert.strictEqual(subscriptions.length > 0, true);
    assert.strictEqual(typeof subscriptions[0].packageName, 'string');
    assert.strictEqual(typeof subscriptions[0].packageDescription, 'string');
    assert.strictEqual(typeof subscriptions[0].packagePrice, 'string');
    assert.strictEqual(typeof subscriptions[0].packageData, 'string');
    assert.strictEqual(typeof subscriptions[0].packageHeader, 'string');
  }).timeout(15000);
});
