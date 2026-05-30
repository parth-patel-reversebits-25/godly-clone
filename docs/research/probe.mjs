import { chromium } from "playwright";

const url = "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// locate wrapper 1 (first .wrapper) bounds in page coords
const wrap = await page.evaluate(() => {
  const w = document.querySelector(".wrapper");
  const r = w.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height, vh: innerHeight,
           docH: document.documentElement.scrollHeight };
});
console.log("wrapper1", wrap);

const sample = async (label) => {
  const data = await page.evaluate(() => {
    const svg = document.querySelector(".ilustration svg");
    if (!svg) return null;
    const paths = [...svg.querySelectorAll("path,line,polyline,circle,rect,ellipse")];
    let drawn = 0, partial = 0, undrawn = 0;
    const per = paths.map((el) => {
      const da = parseFloat(el.style.strokeDasharray) || 0;
      const dof = parseFloat(el.style.strokeDashoffset);
      if (!da) return -1;
      const frac = 1 - (isNaN(dof) ? da : dof) / da;
      if (frac > 0.99) drawn++; else if (frac < 0.01) undrawn++; else partial++;
      return +frac.toFixed(2);
    });
    return { drawn, partial, undrawn, total: paths.length, per };
  });
  console.log(label, JSON.stringify(data));
};

const steps = 10;
for (let i = 0; i <= steps; i++) {
  const y = wrap.top + (wrap.height - wrap.vh) * (i / steps);
  await page.evaluate((yy) => window.scrollTo(0, yy), Math.max(0, y));
  await page.waitForTimeout(400);
  await sample(`scroll ${(i / steps * 100).toFixed(0)}%`);
  await page.screenshot({ path: `docs/research/probe-${i}.png` });
}

await browser.close();
