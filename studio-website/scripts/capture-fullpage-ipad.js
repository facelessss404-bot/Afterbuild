const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots/ipad-fullpage');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  '/',
  '/work',
  '/services',
  '/studio',
  '/recognition',
  '/contact'
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1024 });

  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
    console.log(`Full screenshot: ${route}`);
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
    // Scroll down gradually to let lazy items/animations settle
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, `${slug}_768_full.png`), fullPage: true });
  }

  await browser.close();
  console.log('Fullpage screenshots captured!');
}

run().catch(console.error);
