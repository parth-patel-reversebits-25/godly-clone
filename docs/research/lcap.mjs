import { chromium } from "playwright";
const widths = [320, 375, 768, 834, 1023];
const b = await chromium.launch();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  await p.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `docs/research/LOC-${w}.png`, fullPage: true });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`LOC ${w}: overflowX=${ov}`);
  await p.close();
}
await b.close();
