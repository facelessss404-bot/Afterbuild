const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots');

async function testPages() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const pages = ['studio', 'recognition'];
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '834', width: 834, height: 1112 },
    { name: '375', width: 375, height: 812 },
  ];

  for (const p of pages) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:3000/${p}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1200));

      const metrics = await page.evaluate(() => {
        return {
          bodyScrollW: document.body.scrollWidth,
          docClientW: document.documentElement.clientWidth,
          docScrollW: document.documentElement.scrollWidth,
          hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      console.log(`[${p} @ ${vp.name}]`, metrics);
      await page.screenshot({ path: path.join(outDir, `${p}_${vp.name}.png`), fullPage: false });
    }
  }

  await browser.close();
  console.log('Studio & Recognition test complete!');
}

testPages().catch(console.error);
