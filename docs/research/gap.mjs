import { chromium } from "playwright";
const REF = "https://onepagelove.com/preserved/2021-12-08-walter-sophia.html";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 1000 } });
await p.goto(REF, { waitUntil: "networkidle" });
await p.waitForTimeout(1000);
const info = await p.evaluate(() => {
  const s9 = document.querySelector(".section-9");
  const s10 = document.querySelector(".section-10");
  // siblings between s9 and s10
  let out = [];
  let n = s9;
  while (n && n !== s10) {
    out.push({ tag: n.tagName, cls: n.className, h: Math.round(n.getBoundingClientRect().height) });
    n = n.nextElementSibling;
  }
  // also dump section-9 inner structure (second col children)
  const cols = document.querySelectorAll(".section-9 .col-lg-6");
  const colInfo = [...cols].map((c,i) => {
    const cs = getComputedStyle(c);
    const blocks = [...c.querySelectorAll(".column-block")].map(b => {
      const bs = getComputedStyle(b);
      return { id: b.id, mt: bs.marginTop, mb: bs.marginBottom, h: Math.round(b.getBoundingClientRect().height) };
    });
    return { col: i, h: Math.round(c.getBoundingClientRect().height), mt: cs.marginTop, mb: cs.marginBottom, blocks };
  });
  return { between: out, cols: colInfo, s9parent: document.querySelector(".section-9").parentElement.className };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
