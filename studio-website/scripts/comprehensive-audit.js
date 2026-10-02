const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots/comprehensive');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  '/',
  '/work',
  '/work/sbr-horizon',
  '/services',
  '/studio',
  '/recognition',
  '/contact'
];

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1366', width: 1366, height: 768 },
  { name: '1280', width: 1280, height: 800 },
  { name: '1024', width: 1024, height: 768 },
  { name: '834',  width: 834,  height: 1112 },
  { name: '768',  width: 768,  height: 1024 },
  { name: '430',  width: 430,  height: 932 },
  { name: '412',  width: 412,  height: 915 },
  { name: '390',  width: 390,  height: 844 },
  { name: '375',  width: 375,  height: 812 },
  { name: '360',  width: 360,  height: 740 },
];

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const failures = [];
  let totalTests = 0;

  for (const route of routes) {
    const routeSlug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
    console.log(`\n=== Auditing Route: ${route} ===`);

    const page = await browser.newPage();

    for (const vp of viewports) {
      totalTests++;
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'load', timeout: 30000 });
      await new Promise(r => setTimeout(r, 600));

      const result = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        const docScrollW = document.documentElement.scrollWidth;
        const bodyScrollW = document.body.scrollWidth;

        let hasHScroll = docScrollW > docW || bodyScrollW > docW;
        let culprit = null;

        if (hasHScroll) {
          const all = Array.from(document.querySelectorAll('*'));
          for (const el of all) {
            const r = el.getBoundingClientRect();
            if (r.right > docW + 1 || r.width > docW + 1) {
              culprit = {
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 40),
                width: Math.round(r.width),
                right: Math.round(r.right),
                text: (el.innerText || '').slice(0, 30).replace(/\n/g, ' ')
              };
              break;
            }
          }
        }

        return { docW, docScrollW, bodyScrollW, hasHScroll, culprit };
      });

      if (result.hasHScroll) {
        console.error(`FAIL: [${routeSlug} @ ${vp.name}px] docW: ${result.docW}, docScrollW: ${result.docScrollW}, bodyScrollW: ${result.bodyScrollW}`, result.culprit);
        failures.push({ route, viewport: vp.name, ...result });
      } else {
        console.log(`PASS: [${routeSlug} @ ${vp.name}px] (w: ${result.docW})`);
      }

      if (['1440', '834', '375'].includes(vp.name)) {
        await page.screenshot({ path: path.join(outDir, `${routeSlug}_${vp.name}.png`), fullPage: false });
      }
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`COMPREHENSIVE AUDIT SUMMARY`);
  console.log(`Total Viewport Tests: ${totalTests}`);
  console.log(`Passes: ${totalTests - failures.length}`);
  console.log(`Failures: ${failures.length}`);
  if (failures.length > 0) {
    console.log(`Failed Cases:`, JSON.stringify(failures, null, 2));
  } else {
    console.log(`ALL PAGES AND ALL VIEWPORTS PASSED WITH ZERO OVERFLOW!`);
  }
  console.log(`========================================\n`);
}

runAudit().catch(console.error);
