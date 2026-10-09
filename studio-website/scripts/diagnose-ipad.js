const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '../../brain/screenshots/ipad-diagnosis');
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

const ipadViewports = [
  { name: 'ipad-portrait-768', width: 768, height: 1024 },
  { name: 'ipad-air-820', width: 820, height: 1180 },
  { name: 'ipad-pro11-834', width: 834, height: 1194 },
  { name: 'ipad-landscape-1024', width: 1024, height: 768 },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
    console.log(`Checking ${route}...`);

    for (const vp of ipadViewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 600));

      const diag = await page.evaluate(() => {
        // Check navbar layout
        const header = document.querySelector('#main-header');
        let headerIssue = null;
        if (header) {
          const rect = header.getBoundingClientRect();
          const children = Array.from(header.children);
          headerIssue = {
            width: rect.width,
            childrenCount: children.length,
            childRects: children.map(c => {
              const cr = c.getBoundingClientRect();
              return { tag: c.tagName, cls: c.className, left: cr.left, right: cr.right, width: cr.width };
            })
          };
        }

        // Check overlapping elements or squeezed containers
        const gridOrFlex = Array.from(document.querySelectorAll('.grid, [style*="grid"], [style*="display: grid"], [style*="display: flex"]'));
        const squished = [];
        gridOrFlex.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            // Check if items inside overflow or wrap weirdly
            const kids = Array.from(el.children);
            if (kids.length > 1) {
              const k0 = kids[0].getBoundingClientRect();
              const k1 = kids[1].getBoundingClientRect();
              // Check collision / overlap
              if (k0.right > k1.left + 5 && k0.top === k1.top) {
                squished.push({
                  parentCls: el.className,
                  k0Text: (kids[0].innerText || '').slice(0, 30),
                  k1Text: (kids[1].innerText || '').slice(0, 30),
                });
              }
            }
          }
        });

        return { headerIssue, squishedCount: squished.length, squished: squished.slice(0, 5) };
      });

      console.log(`  [${vp.name}] header:`, JSON.stringify(diag.headerIssue?.childRects));
      if (diag.squishedCount > 0) {
        console.log(`  [${vp.name}] squished:`, JSON.stringify(diag.squished));
      }

      await page.screenshot({ path: path.join(outDir, `${slug}_${vp.name}.png`), fullPage: false });
    }
  }

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
