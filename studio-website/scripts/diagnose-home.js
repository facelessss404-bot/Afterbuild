const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));

  const diag = await page.evaluate(async () => {
    const feat = document.getElementById('section-featured');
    const pi = document.getElementById('section-project-index');
    const featRect = feat ? feat.getBoundingClientRect() : null;
    const piRect = pi ? pi.getBoundingClientRect() : null;
    
    // Check all sections
    const sections = Array.from(document.querySelectorAll('section')).map(s => {
      const r = s.getBoundingClientRect();
      const style = window.getComputedStyle(s);
      return {
        id: s.id,
        top: r.top + window.scrollY,
        height: r.height,
        bg: style.backgroundColor,
        display: style.display,
        position: style.position
      };
    });

    return { featRect, piRect, sections };
  });

  console.log('Diagnostic Desktop (1440):', JSON.stringify(diag, null, 2));

  // Now let's scroll through section-featured on desktop
  const featTop = diag.sections.find(s => s.id === 'section-featured')?.top || 0;
  console.log('Scrolling to featured at:', featTop);
  
  await page.evaluate((y) => window.scrollTo(0, y), featTop);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'desk_featured_0.png') });

  await page.evaluate((y) => window.scrollTo(0, y + 900), featTop);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'desk_featured_1.png') });

  await page.evaluate((y) => window.scrollTo(0, y + 1800), featTop);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'desk_featured_2.png') });

  // Scroll to bottom of featured
  await page.evaluate((y) => window.scrollTo(0, y + 2500), featTop);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'desk_featured_end.png') });

  // Now check mobile (375px)
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));

  const mobileDiag = await page.evaluate(() => {
    const feat = document.getElementById('section-featured');
    const r = feat ? feat.getBoundingClientRect() : null;
    const pi = document.getElementById('section-project-index');
    const pir = pi ? pi.getBoundingClientRect() : null;
    return {
      feat: r,
      pi: pir,
      bodyScrollW: document.body.scrollWidth,
      docClientW: document.documentElement.clientWidth,
      docScrollW: document.documentElement.scrollWidth,
    };
  });
  console.log('Mobile diag (375):', JSON.stringify(mobileDiag, null, 2));

  await page.evaluate(() => {
    const el = document.getElementById('section-featured');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'mob_featured.png') });

  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'mob_below_featured.png') });

  await browser.close();
  console.log('Done screenshots to:', outDir);
}

run().catch(console.error);
