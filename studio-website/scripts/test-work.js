const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots');

async function testWorkPages() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const routes = ['work', 'work/sbr-horizon'];
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '834', width: 834, height: 1112 },
    { name: '768', width: 768, height: 1024 },
    { name: '375', width: 375, height: 812 },
    { name: '360', width: 360, height: 740 },
  ];

  for (const r of routes) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:3000/${r}`, { waitUntil: 'networkidle2' });
      await new Promise(res => setTimeout(res, 800));

      const metrics = await page.evaluate(() => {
        return {
          bodyScrollW: document.body.scrollWidth,
          docClientW: document.documentElement.clientWidth,
          docScrollW: document.documentElement.scrollWidth,
          hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        };
      });

      console.log(`[/${r} @ ${vp.name}]`, metrics);
      const safeName = r.replace(/\//g, '_');
      await page.screenshot({ path: path.join(outDir, `${safeName}_${vp.name}.png`), fullPage: false });
    }
  }

  await browser.close();
  console.log('Work and Project Detail test completed!');
}

testWorkPages().catch(console.error);
