import { chromium } from "playwright";

const TARGET = process.argv[2];
const PREFIX = process.argv[3] || "ref";
const widths = [320, 375, 768, 834, 1023];

const browser = await chromium.launch();
for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(TARGET, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `docs/research/${PREFIX}-${w}.png`, fullPage: true });
    await page.close();
}
await browser.close();
console.log("done");
