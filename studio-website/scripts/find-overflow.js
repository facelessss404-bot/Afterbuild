const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function checkOverflowElements(pagePath) {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`http://localhost:3000/${pagePath}`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const culprits = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const all = Array.from(document.querySelectorAll('*'));
    const overflowing = [];

    all.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docW + 1 || rect.width > docW + 1) {
        overflowing.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          text: (el.innerText || '').slice(0, 40).replace(/\n/g, ' '),
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) }
        });
      }
    });

    return overflowing;
  });

  console.log(`=== Overflow culprits on /${pagePath} ===`);
  console.log(JSON.stringify(culprits.slice(0, 10), null, 2));
  await browser.close();
}

async function run() {
  await checkOverflowElements('studio');
  await checkOverflowElements('recognition');
}

run().catch(console.error);
