const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });
  await page.goto('http://localhost:3000');

  // Wait for network idle or a specific element
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'current_app.png', fullPage: true });

  await browser.close();
})();
