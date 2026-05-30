import { chromium } from "playwright";
const REF = "https://onepagelove.com/preserved/2021-12-08-walter-sophia.html";
const LOC = "http://localhost:3000";
const widths = [768, 820, 834, 1024];
const target = process.argv[2] || "both";
const b = await chromium.launch();
async function cap(url, prefix, w) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `docs/research/${prefix}-${w}.png`, fullPage: true });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${prefix} ${w}: overflowX=${ov} height=${await p.evaluate(()=>document.body.scrollHeight)}`);
  await p.close();
}
for (const w of widths) {
  if (target === "ref" || target === "both") await cap(REF, "TREF", w);
  if (target === "loc" || target === "both") await cap(LOC, "TLOC", w);
}
await b.close();
