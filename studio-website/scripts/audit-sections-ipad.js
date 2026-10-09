const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routes = ['/', '/work', '/work/sbr-horizon', '/services', '/studio', '/recognition', '/contact'];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1024 });

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`SECTION AUDIT FOR: ${route} @ 768px (iPad)`);
    console.log(`========================================`);

    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 600));

    const sectionData = await page.evaluate(() => {
      const results = [];
      const sections = Array.from(document.querySelectorAll('section, main > div, [data-section]'));
      
      sections.forEach((sec, idx) => {
        const sr = sec.getBoundingClientRect();
        const secName = sec.id || sec.getAttribute('data-section') || sec.className || `Section ${idx}`;
        
        // Check cards / grid items inside
        const grids = Array.from(sec.querySelectorAll('.grid, [style*="grid"], .editorial-grid, [class*="grid-cols"]'));
        const gridIssues = [];
        grids.forEach(g => {
          const gr = g.getBoundingClientRect();
          const items = Array.from(g.children);
          items.forEach((item, itemIdx) => {
            const ir = item.getBoundingClientRect();
            // Check if item is squashed (< 100px width on desktop columns)
            if (ir.width < 140 && ir.width > 0) {
              gridIssues.push({
                itemIdx,
                width: Math.round(ir.width),
                text: (item.innerText || '').slice(0, 30)
              });
            }
          });
        });

        // Check flex wraps
        const flexContainers = Array.from(sec.querySelectorAll('.flex, [style*="display: flex"], [style*="display:flex"]'));
        const flexCollisions = [];
        flexContainers.forEach(fc => {
          const children = Array.from(fc.children);
          for (let i = 0; i < children.length - 1; i++) {
            const r1 = children[i].getBoundingClientRect();
            const r2 = children[i + 1].getBoundingClientRect();
            if (r1.width > 0 && r2.width > 0 && Math.abs(r1.top - r2.top) < 10) {
              if (r1.right > r2.left + 5) {
                flexCollisions.push({
                  item1: (children[i].innerText || '').slice(0, 20),
                  item2: (children[i+1].innerText || '').slice(0, 20),
                  overlap: Math.round(r1.right - r2.left)
                });
              }
            }
          }
        });

        // Check text clipped or hidden overflow issues
        const textElements = Array.from(sec.querySelectorAll('h1, h2, h3, h4, p, span'));
        const textIssues = [];
        textElements.forEach(t => {
          const tr = t.getBoundingClientRect();
          if (t.scrollWidth > tr.width + 10 && tr.width > 0) {
            textIssues.push({
              tag: t.tagName,
              text: (t.innerText || '').slice(0, 30),
              width: Math.round(tr.width),
              scrollW: Math.round(t.scrollWidth)
            });
          }
        });

        results.push({
          secName: secName.slice(0, 40),
          width: Math.round(sr.width),
          height: Math.round(sr.height),
          gridIssuesCount: gridIssues.length,
          gridIssues,
          flexCollisionsCount: flexCollisions.length,
          flexCollisions,
          textIssuesCount: textIssues.length,
          textIssues: textIssues.slice(0, 3)
        });
      });

      return results;
    });

    sectionData.forEach(s => {
      const issues = [];
      if (s.gridIssuesCount > 0) issues.push(`Squished Grid Items: ${s.gridIssuesCount} (${JSON.stringify(s.gridIssues)})`);
      if (s.flexCollisionsCount > 0) issues.push(`Flex Overlaps: ${s.flexCollisionsCount} (${JSON.stringify(s.flexCollisions)})`);
      if (s.textIssuesCount > 0) issues.push(`Clipped Text: ${s.textIssuesCount} (${JSON.stringify(s.textIssues)})`);
      if (issues.length > 0) {
        console.log(`⚠️ ${s.secName} (w: ${s.width}px, h: ${s.height}px):`);
        issues.forEach(i => console.log(`   - ${i}`));
      } else {
        console.log(`✅ ${s.secName} (w: ${s.width}px, h: ${s.height}px) OK`);
      }
    });
  }

  await browser.close();
}

run().catch(console.error);
