import { chromium } from "playwright";
const widths = [320, 375, 425, 768, 834, 1023];
const browser = await chromium.launch();
for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const res = await page.evaluate((vw) => {
        const docW = document.documentElement.scrollWidth;
        const offenders = [];
        document.querySelectorAll("*").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1 && r.width > 0) {
                offenders.push({
                    tag: el.tagName,
                    cls: (el.className || "").toString().slice(0, 60),
                    right: Math.round(r.right),
                    w: Math.round(r.width),
                });
            }
        });
        // dedupe by cls
        const seen = new Set();
        const uniq = offenders.filter((o) => {
            const k = o.tag + o.cls;
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
        });
        return { docW, hScroll: docW > vw, offenders: uniq.slice(0, 15) };
    }, w);
    console.log(`\n=== ${w}px === docW=${res.docW} hScroll=${res.hScroll}`);
    res.offenders.forEach((o) => console.log(`  ${o.tag} r=${o.right} w=${o.w} .${o.cls}`));
    await page.close();
}
await browser.close();
