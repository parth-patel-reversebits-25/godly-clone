import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 760 } });
await p.goto("https://onepagelove.com/preserved/2021-12-08-walter-sophia.html", { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
// scroll to section-2 region slowly
for (const y of [0, 300, 600, 900, 1200, 1500]) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(200); }
await p.screenshot({ path: "docs/research/REFVP-375.png" });
await b.close();
