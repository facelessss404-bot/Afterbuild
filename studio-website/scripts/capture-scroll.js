const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\lmgou\\.gemini\\antigravity-ide\\brain\\2cf63266-1922-4740-b4ca-2d1656d6d708\\screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));

  // Scroll to featured section
  await page.evaluate(() => {
    const el = document.getElementById('section-featured');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop_featured_start.png') });

  // Scroll 1000px down inside featured
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop_featured_mid.png') });

  // Scroll another 1000px down inside featured
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop_featured_slide3.png') });

  // Scroll 800px more — into project index or below
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop_below_featured.png') });

  // Check mobile 375px
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(outDir, 'mobile_hero.png') });

  await page.evaluate(() => {
    const el = document.getElementById('section-featured');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'mobile_featured.png') });

  await page.evaluate(() => window.scrollBy(0, 700));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'mobile_below_featured.png') });

  console.log('Screenshots captured to:', outDir);
  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
