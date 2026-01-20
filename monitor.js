const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log("Opening site...");
    await page.goto('https://www.assignments4u.com', { timeout: 60000 });

    console.log("Filling form...");
    await page.fill('input[type="email"]', 'monitor@example.com');
    await page.fill('input[type="text"]', 'Monitoring Test');

    const textareas = await page.$$('textarea');
    if (textareas.length > 0) {
      await textareas[0].fill('Automated monitoring submission');
    }

    const inputs = await page.$$('input');
    if (inputs.length > 4) {
      await inputs[inputs.length - 1].fill('5'); // captcha
    }

    console.log("Submitting...");
    await page.click('text=Get A Free Quote');

    console.log("Waiting for success...");
    await page.waitForSelector('text=Thank You For Your Request', { timeout: 15000 });

    console.log("SUCCESS");
    await browser.close();
    process.exit(0);

  } catch (err) {
    console.error("FAILED:", err.message);
    process.exit(1);
  }
})();
