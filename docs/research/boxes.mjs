import { chromium } from "playwright";
const REF = "https://onepagelove.com/preserved/2021-12-08-walter-sophia.html";
const LOC = "http://localhost:3000";
const w = Number(process.argv[2] || 768);
const sels = ["header","section.hero-section",".section-1",".section-2",".section-3",".section-4",".section-5",".section-6",".section-7",".section-8",".section-9",".section-10","footer"];
const b = await chromium.launch();
async function measure(url) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  const r = await p.evaluate((sels) => {
    return sels.map(s => {
      const el = document.querySelector(s);
      if (!el) return [s, null];
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return [s, { top: Math.round(b.top + scrollY), h: Math.round(b.height), pt: cs.paddingTop, pb: cs.paddingBottom }];
    });
  }, sels);
  await p.close();
  return r;
}
const ref = await measure(REF);
const loc = await measure(LOC);
console.log(`width=${w}`);
console.log("section".padEnd(20), "REF top/h/gap".padEnd(26), "LOC top/h/gap".padEnd(26), "Δh / Δgap");
let rprev = 0, lprev = 0;
for (let i = 0; i < sels.length; i++) {
  const r = ref[i][1], l = loc[i][1];
  const rgap = r ? r.top - rprev : 0, lgap = l ? l.top - lprev : 0;
  const rs = r ? `${r.top}/${r.h}/${rgap}` : "—";
  const ls = l ? `${l.top}/${l.h}/${lgap}` : "—";
  const dh = r && l ? (l.h - r.h) : "";
  const dg = r && l ? (lgap - rgap) : "";
  console.log(sels[i].padEnd(20), rs.padEnd(26), ls.padEnd(26), `Δh=${dh} Δgap=${dg}`);
  if (r) rprev = r.top + r.h;
  if (l) lprev = l.top + l.h;
}
await b.close();
