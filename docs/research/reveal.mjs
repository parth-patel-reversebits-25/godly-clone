import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [375, 768]) {
  const p = await b.newPage({ viewport: { width: w, height: 800 } });
  await p.goto("https://onepagelove.com/preserved/2021-12-08-walter-sophia.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  // slow scroll, small steps, dwell
  await p.evaluate(async () => {
    const step = 200;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
  });
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll(".the-image")];
    const shown = imgs.filter(e => !e.classList.contains("sf-hidden") && e.getBoundingClientRect().height > 0).length;
    return { count: imgs.length, shown, total: document.body.scrollHeight, anyClasses: imgs[0] ? imgs[0].className : "" };
  });
  console.log(`w=${w}`, JSON.stringify(r));
  await p.close();
}
await b.close();
