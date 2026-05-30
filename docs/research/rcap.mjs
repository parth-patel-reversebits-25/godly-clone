import { chromium } from "playwright";
const REF = "https://onepagelove.com/preserved/2021-12-08-walter-sophia.html";
const widths = [320, 375, 768, 834, 1023];
const b = await chromium.launch();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(REF, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  // scroll through to trigger lazy/anim, then top
  await p.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `docs/research/REF-${w}.png`, fullPage: true });
  // horizontal overflow check
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`REF ${w}: overflowX=${ov}`);
  await p.close();
}
await b.close();
