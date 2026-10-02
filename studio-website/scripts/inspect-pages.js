const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Wait 3 seconds for preloader
  await new Promise(r => setTimeout(r, 3000));

  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className,
      rect: {
        top: s.getBoundingClientRect().top + window.scrollY,
        height: s.offsetHeight,
        width: s.offsetWidth
      },
      bg: window.getComputedStyle(s).backgroundColor
    }));
  });

  console.log('Sections on Desktop (1440px):', JSON.stringify(sections, null, 2));

  // Check mobile 375px
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));

  const mobileInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      sections: Array.from(document.querySelectorAll('section')).map(s => ({
        id: s.id,
        className: s.className,
        rect: {
          top: s.getBoundingClientRect().top + window.scrollY,
          height: s.offsetHeight,
          width: s.offsetWidth
        },
        bg: window.getComputedStyle(s).backgroundColor
      }))
    };
  });

  console.log('Mobile 375px info:', JSON.stringify(mobileInfo, null, 2));

  await browser.close();
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
