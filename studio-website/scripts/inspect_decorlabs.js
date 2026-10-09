const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.decorlabs.co.in/', { waitUntil: 'networkidle2', timeout: 30000 });

  const viewports = [
    { name: 'desktop', w: 1440, h: 900 },
    { name: 'ipad', w: 768, h: 1024 },
    { name: 'mobile', w: 375, h: 812 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await new Promise(r => setTimeout(r, 600));

    const styles = await page.evaluate(() => {
      const header = document.querySelector('header, .nav-header');
      const logo = document.querySelector('.nav-logo, img[alt*="Logo"], .nav-logo-img');
      const menu = document.querySelector('.nav-menu, nav');
      const csH = header ? window.getComputedStyle(header) : null;
      const csL = logo ? window.getComputedStyle(logo) : null;
      const csM = menu ? window.getComputedStyle(menu) : null;

      return {
        header: csH ? {
          position: csH.position,
          display: csH.display,
          justifyContent: csH.justifyContent,
          alignItems: csH.alignItems,
          padding: csH.padding,
          width: header.getBoundingClientRect().width,
          height: header.getBoundingClientRect().height
        } : null,
        logo: csL ? {
          width: logo.getBoundingClientRect().width,
          height: logo.getBoundingClientRect().height,
          objectFit: csL.objectFit,
          display: csL.display
        } : null,
        menu: csM ? {
          display: csM.display,
          width: menu ? menu.getBoundingClientRect().width : 0
        } : null
      };
    });

    console.log(`[${vp.name}]`, JSON.stringify(styles, null, 2));
  }

  await browser.close();
}

run().catch(console.error);
