import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});
await p.waitForTimeout(600);
const wrap = await p.evaluate(()=>{const w=document.querySelector(".wrapper");const r=w.getBoundingClientRect();return{top:r.top+scrollY,height:r.height,vh:innerHeight};});
for(const pct of [20,40,60,80]){
  const y=wrap.top+(wrap.height-wrap.vh)*pct/100;
  await p.evaluate(yy=>scrollTo(0,yy),y);
  await p.waitForTimeout(400);
  const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");const ps=[...s.querySelectorAll("path")];let drawn=0;ps.forEach(e=>{const da=parseFloat(e.style.strokeDasharray)||0,of=parseFloat(e.style.strokeDashoffset);if(da&&1-(isNaN(of)?da:of)/da>0.99)drawn++;});return drawn+"/"+ps.length;});
  console.log("scroll "+pct+"% drawn "+d);
  await p.screenshot({path:`docs/research/feel-${pct}.png`});
}
await b.close();
