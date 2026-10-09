const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function inspectDecorLabs() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  console.log('Navigating to https://www.decorlabs.co.in/ ...');
  await page.goto('https://www.decorlabs.co.in/?utm_source=chatgpt.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for preloader to finish or animations
  await new Promise(r => setTimeout(r, 3500));

  // Capture screenshot on Desktop (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  const outDir = path.join(__dirname, '..', '..', 'brain', 'decorlabs_ref');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.screenshot({ path: path.join(outDir, 'decorlabs_desktop.jpg'), type: 'jpeg', quality: 85 });
  console.log('Captured desktop screenshot');

  // Capture iPad (768x1024)
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'decorlabs_ipad_768.jpg'), type: 'jpeg', quality: 85 });
  console.log('Captured iPad 768 screenshot');

  // Inspect Navbar styling and layout at desktop & ipad
  const navDetails = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('.nav-header');
    const logo = document.querySelector('.nav-logo') || document.querySelector('[class*="logo"]');
    const nav = document.querySelector('nav') || document.querySelector('.nav-menu');
    
    function getStyles(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className,
        rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) },
        position: s.position,
        top: s.top,
        left: s.left,
        display: s.display,
        borderRadius: s.borderRadius,
        background: s.background,
        backdropFilter: s.backdropFilter,
        padding: s.padding,
        gap: s.gap
      };
    }

    return {
      header: getStyles(header),
      logo: getStyles(logo),
      nav: getStyles(nav),
      bodyScrollWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    };
  });

  console.log('DecorLabs nav details at 768px:', JSON.stringify(navDetails, null, 2));

  await browser.close();
}

inspectDecorLabs().catch(console.error);
