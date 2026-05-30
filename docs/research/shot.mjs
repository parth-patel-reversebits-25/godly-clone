import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});
await p.waitForTimeout(800);
await p.screenshot({ path:"docs/research/hero.png" });
await b.close();
