const { chromium, devices } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ...devices['iPhone 13'] });
    const page = await context.newPage();
    const url = process.argv[2] || 'http://localhost:3000';
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Find and click the hamburger menu button (first button in mobile view)
    const buttons = await page.locator('button').all();
    if (buttons.length > 0) {
        await buttons[0].click();
        console.log('Clicked hamburger menu');
    }

    // Wait for the menu drawer to appear (look for the fixed menu container or close button)
    await page.waitForSelector('[role="presentation"]', { timeout: 5000 });
    await page.waitForTimeout(300); // Brief animation pause

    const out = 'screenshot-mobile-menu.png';
    await page.screenshot({ path: out, fullPage: false });
    console.log('Saved screenshot:', out);

    await browser.close();
})();
