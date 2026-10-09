const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routes = [
  '/',
  '/work',
  '/work/sbr-horizon',
  '/services',
  '/studio',
  '/recognition',
  '/contact'
];

const testViewports = [
  { name: 'Mobile (375)', width: 375, height: 812 },
  { name: 'Mobile L (430)', width: 430, height: 932 },
  { name: 'iPad Portrait (768)', width: 768, height: 1024 },
  { name: 'iPad 10.2 (810)', width: 810, height: 1080 },
  { name: 'iPad Air (820)', width: 820, height: 1180 },
  { name: 'iPad Pro 11 (834)', width: 834, height: 1194 },
  { name: 'iPad Landscape (1024)', width: 1024, height: 768 },
  { name: 'Laptop (1280)', width: 1280, height: 800 },
  { name: 'Desktop (1440)', width: 1440, height: 900 },
  { name: '4K/TV (2560)', width: 2560, height: 1440 },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  for (const route of routes) {
    console.log(`\n========================================\nAUDITING ROUTE: ${route}\n========================================`);

    for (const vp of testViewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 400));

      const issues = await page.evaluate((vpWidth) => {
        const docW = document.documentElement.clientWidth;
        const bodyScrollW = document.body.scrollWidth;
        const docScrollW = document.documentElement.scrollWidth;
        const found = [];

        // 1. Horizontal overflow check
        if (docScrollW > docW + 2 || bodyScrollW > docW + 2) {
          found.push({
            type: 'HORIZONTAL_OVERFLOW',
            docW,
            docScrollW,
            bodyScrollW,
            overflowAmount: Math.max(docScrollW, bodyScrollW) - docW
          });
        }

        // 2. Find any elements overflowing right boundary
        const all = Array.from(document.querySelectorAll('*'));
        const rightOverflows = [];
        all.forEach(el => {
          // ignore scripts, styles, etc.
          if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK'].includes(el.tagName)) return;
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            if (r.right > docW + 2) {
              rightOverflows.push({
                tag: el.tagName,
                cls: (el.className || '').toString().slice(0, 50),
                id: el.id,
                right: Math.round(r.right),
                width: Math.round(r.width),
                text: (el.innerText || '').slice(0, 30).replace(/\n/g, ' ')
              });
            }
          }
        });

        // 3. Check Navbar layout specifically
        const header = document.querySelector('#main-header');
        let headerData = null;
        if (header) {
          const hr = header.getBoundingClientRect();
          const desktopNav = header.querySelector('.hidden.md\\:flex, [class*="hidden md:flex"]');
          const mobileBtn = header.querySelector('.md\\:hidden, [class*="md:hidden"]');
          const logo = header.querySelector('.afterbuild-brand');
          headerData = {
            headerW: Math.round(hr.width),
            desktopNavVisible: desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false,
            desktopNavWidth: desktopNav ? Math.round(desktopNav.getBoundingClientRect().width) : 0,
            mobileBtnVisible: mobileBtn ? window.getComputedStyle(mobileBtn).display !== 'none' : false,
            logoWidth: logo ? Math.round(logo.getBoundingClientRect().width) : 0,
          };
          // Check collision
          if (headerData.desktopNavVisible && logo && desktopNav) {
            const logoR = logo.getBoundingClientRect().right;
            const navL = desktopNav.getBoundingClientRect().left;
            headerData.collisionGap = Math.round(navL - logoR);
          }
        }

        return {
          overflow: found,
          header: headerData,
          rightOverflowCount: rightOverflows.length,
          topRightOverflows: rightOverflows.slice(0, 4)
        };
      }, vp.width);

      const navReport = issues.header ? 
        `Logo: ${issues.header.logoWidth}px | DesktopNav: ${issues.header.desktopNavVisible ? issues.header.desktopNavWidth + 'px' : 'HIDDEN'} | Hamburger: ${issues.header.mobileBtnVisible ? 'SHOWN' : 'HIDDEN'} | Gap: ${issues.header.collisionGap !== undefined ? issues.header.collisionGap + 'px' : 'N/A'}` : 'NO HEADER';

      console.log(`[${vp.name}] ${issues.overflow.length > 0 ? '❌ OVERFLOW ' + issues.overflow[0].overflowAmount + 'px' : '✅ No overflow'} | ${navReport}`);
      if (issues.rightOverflowCount > 0) {
        console.log(`   Overflow culprits (${issues.rightOverflowCount}):`, issues.topRightOverflows);
      }
    }
  }

  await browser.close();
}

run().catch(console.error);
