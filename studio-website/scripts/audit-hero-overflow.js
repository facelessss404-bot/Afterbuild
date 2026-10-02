const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\lmgou\\.gemini\\antigravity-ide\\brain\\2cf63266-1922-4740-b4ca-2d1656d6d708\\screenshots';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const sizes = [
    { name: 'desktop_1440', w: 1440, h: 900 },
    { name: 'tablet_768', w: 768, h: 1024 },
    { name: 'mobile_375', w: 375, h: 812 }
  ];

  for (const s of sizes) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2200));

    // capture top
    await page.screenshot({ path: path.join(outDir, `${s.name}_hero.png`) });

    // check overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const elements = Array.from(document.querySelectorAll('*'));
      const overflowing = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.right > docW + 2 || rect.left < -2;
      }).map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className,
        rect: { left: el.getBoundingClientRect().left, right: el.getBoundingClientRect().right, width: el.getBoundingClientRect().width }
      }));
      return { docW, scrollW, hasOverflow: scrollW > docW, overflowingCount: overflowing.length, samples: overflowing.slice(0, 5) };
    });

    console.log(`[${s.name}] Overflow:`, JSON.stringify(overflow));
    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
