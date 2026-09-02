import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'https://www.xvelopers.org';
const ARTIFACT_DIR = 'C:\\Users\\rhernandez\\.gemini\\antigravity\\brain\\42477b81-6c02-454e-b2d3-3eca7b9d95e5';

const VIEWPORTS = [
  { name: 'Mobile-Small (320px)', width: 320, height: 600, isMobile: true, hasTouch: true },
  { name: 'Mobile-Standard (375px - iPhone)', width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: 'Mobile-Large (414px - iPhone Plus)', width: 414, height: 896, isMobile: true, hasTouch: true },
  { name: 'Tablet (768px - iPad)', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'Laptop (1024px)', width: 1024, height: 768, isMobile: false, hasTouch: false },
  { name: 'Desktop (1440px)', width: 1440, height: 900, isMobile: false, hasTouch: false },
];

async function runResponsiveAudit() {
  console.log('🔍 Launching Google Chrome DevTools to audit responsive design...');
  console.log(`🌐 Target URL: ${TARGET_URL}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Capture console logs & errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', request => {
    // Exclude analytics failures from test network errors
    if (!request.url().includes('google-analytics')) {
      failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
    }
  });

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Testing Viewport: ${vp.name} [${vp.width}x${vp.height}]...`);
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: 2
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#luix, main .grid', { timeout: 10000 });

    // Scroll to bottom and back up to ensure full layout pass
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 200));
      window.scrollTo(0, 0);
    });

    // Check for horizontal overflow and metrics
    const metrics = await page.evaluate((vpWidth) => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      const hasHorizontalScroll = docWidth > vpWidth || bodyWidth > vpWidth;

      const overflowingElements = [];
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > vpWidth + 1) {
          overflowingElements.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: (el.className || '').toString().slice(0, 50),
            right: Math.round(rect.right),
            excess: Math.round(rect.right - vpWidth)
          });
        }
      }

      // Check card grid columns
      const grid = document.querySelector('main .grid');
      const gridColumns = grid ? window.getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;

      // Check avatar dimensions and circularity
      const avatars = Array.from(document.querySelectorAll('img[alt]'));
      const distortedAvatars = avatars.filter(img => {
        const rect = img.getBoundingClientRect();
        return rect.width > 0 && Math.abs(rect.width - rect.height) > 2;
      }).map(img => ({ alt: img.alt, w: img.getBoundingClientRect().width, h: img.getBoundingClientRect().height }));

      // Check tap targets smaller than 32px
      const buttonsAndLinks = Array.from(document.querySelectorAll('button, a'));
      const smallTapTargets = buttonsAndLinks
        .filter(el => {
          const rect = el.getBoundingClientRect();
          return (rect.width > 0 && rect.height > 0) && (rect.width < 32 || rect.height < 32);
        })
        .map(el => ({
          text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30),
          w: Math.round(el.getBoundingClientRect().width),
          h: Math.round(el.getBoundingClientRect().height)
        }));

      return {
        docWidth,
        bodyWidth,
        hasHorizontalScroll,
        overflowingElements: overflowingElements.slice(0, 5),
        gridColumns,
        distortedAvatarsCount: distortedAvatars.length,
        smallTapTargetsCount: smallTapTargets.length,
        smallTapTargets: smallTapTargets.slice(0, 5)
      };
    }, vp.width);

    // Capture screenshot
    let screenshotPath = null;
    if (vp.width === 375 || vp.width === 768 || vp.width === 1440) {
      screenshotPath = path.join(ARTIFACT_DIR, `screenshot_${vp.width}px.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  📸 Screenshot saved: screenshot_${vp.width}px.png`);
    }

    results.push({
      viewport: vp.name,
      width: vp.width,
      overflow: metrics.hasHorizontalScroll,
      scrollWidth: metrics.docWidth,
      overflowingElements: metrics.overflowingElements,
      gridColumns: metrics.gridColumns,
      distortedAvatars: metrics.distortedAvatarsCount,
      smallTapTargetsCount: metrics.smallTapTargetsCount,
      smallTapTargets: metrics.smallTapTargets,
      screenshot: screenshotPath
    });

    console.log(`  - Horizontal Scroll: ${metrics.hasHorizontalScroll ? '⚠️ DETECTED' : '✅ NONE'}`);
    console.log(`  - Grid Columns: ${metrics.gridColumns}`);
    console.log(`  - Distorted Avatars: ${metrics.distortedAvatarsCount === 0 ? '✅ 0' : '⚠️ ' + metrics.distortedAvatarsCount}`);
    console.log(`  - Sub-32px Tap Targets: ${metrics.smallTapTargetsCount}`);
  }

  await browser.close();

  console.log('\n--- AUDIT SUMMARY ---');
  console.log(`Console errors: ${consoleErrors.length}`);
  console.log(`Failed asset/network requests: ${failedRequests.length}`);

  const reportPath = path.join(ARTIFACT_DIR, 'responsive_audit_results.json');
  fs.writeFileSync(reportPath, JSON.stringify({ results, consoleErrors, failedRequests }, null, 2));
  console.log(`\nDetailed report written to: ${reportPath}`);
}

runResponsiveAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
