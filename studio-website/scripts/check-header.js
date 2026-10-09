const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function checkHeader() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const data = await page.evaluate(() => {
    const header = document.querySelector('#main-header');
    const logo = header ? header.querySelector('.afterbuild-brand') : null;
    const button = header ? header.querySelector('button[aria-label="Open menu"]') : null;
    const nav = header ? header.querySelector('nav') : null;

    function info(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        zIndex: s.zIndex
      };
    }

    return {
      header: info(header),
      logo: info(logo),
      button: info(button),
      navParent: nav ? info(nav.parentElement) : null
    };
  });

  console.log('iPad 768 Header check:', JSON.stringify(data, null, 2));

  // Take a focused header screenshot
  await page.screenshot({
    path: 'scripts/header_768_crop.png',
    clip: { x: 0, y: 0, width: 768, height: 120 }
  });

  await browser.close();
}

checkHeader().catch(console.error);
