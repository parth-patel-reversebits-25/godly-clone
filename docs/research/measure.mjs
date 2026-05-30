import { chromium } from "playwright";
const targets = {
  REF: "https://onepagelove.com/preserved/2021-12-08-walter-sophia.html",
  LOC: "http://localhost:3000",
};
const b = await chromium.launch();
for (const [name, url] of Object.entries(targets)) {
  const p = await b.newPage({ viewport: { width: 375, height: 900 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
    scrollTo(0, 0);
  });
  await p.waitForTimeout(500);
  const data = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll(".the-image")].map((e, i) => {
      const r = e.getBoundingClientRect();
      const svg = e.querySelector("svg");
      const sr = svg ? svg.getBoundingClientRect() : null;
      return { i, w: Math.round(r.width), h: Math.round(r.height), svgW: sr ? Math.round(sr.width) : 0, svgH: sr ? Math.round(sr.height) : 0, vb: svg ? svg.getAttribute("viewBox") : null };
    });
    const secH = {};
    document.querySelectorAll("section").forEach((s) => {
      const cls = [...s.classList].find(c => c.startsWith("section-")) || s.className;
      secH[cls] = Math.round(s.getBoundingClientRect().height);
    });
    return { imgs, secH, total: document.body.scrollHeight };
  });
  console.log(`\n=== ${name} total=${data.total} ===`);
  console.log("sections:", JSON.stringify(data.secH));
  data.imgs.forEach(x => console.log(`img${x.i} box=${x.w}x${x.h} svg=${x.svgW}x${x.svgH} vb=${x.vb}`));
  await p.close();
}
await b.close();
