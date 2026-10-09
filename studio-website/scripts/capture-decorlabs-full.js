const puppeteer = require('puppeteer-core');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function captureFullDecorLabs() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://www.decorlabs.co.in/?utm_source=chatgpt.com', { waitUntil: 'networkidle2', timeout: 35000 });
  await new Promise(r => setTimeout(r, 4000));

  const outDir = path.join(__dirname, '..', '..', 'brain', 'decorlabs_ref');
  
  // Scroll down progressively to load images
  for (let y = 0; y < 10000; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 200));
  }

  await page.screenshot({ path: path.join(outDir, 'decorlabs_full_desktop.jpg'), type: 'jpeg', quality: 75, fullPage: true });
  console.log('DecorLabs full desktop screenshot captured');

  // Now iPad
  await page.setViewport({ width: 768, height: 1024 });
  for (let y = 0; y < 10000; y += 800) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 200));
  }
  await page.screenshot({ path: path.join(outDir, 'decorlabs_full_ipad.jpg'), type: 'jpeg', quality: 75, fullPage: true });
  console.log('DecorLabs full iPad screenshot captured');

  await browser.close();
}

captureFullDecorLabs().catch(console.error);
