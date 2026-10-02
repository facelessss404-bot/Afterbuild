const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function testServices() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const viewports = [
    { name: 'services_1440', width: 1440, height: 900 },
    { name: 'services_1024', width: 1024, height: 800 },
    { name: 'services_834', width: 834, height: 1112 },
    { name: 'services_768', width: 768, height: 1024 },
    { name: 'services_375', width: 375, height: 812 },
    { name: 'services_360', width: 360, height: 740 },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    const metrics = await page.evaluate(() => {
      return {
        bodyScrollW: document.body.scrollWidth,
        docClientW: document.documentElement.clientWidth,
        docScrollW: document.documentElement.scrollWidth,
        hasHScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });

    console.log(`[${vp.name}]`, metrics);
    await page.screenshot({ path: path.join(outDir, `${vp.name}.png`), fullPage: false });
  }

  await browser.close();
  console.log('Services test completed!');
}

testServices().catch(console.error);
