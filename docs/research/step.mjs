import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:480}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(600);
const s4=await p.evaluate(()=>document.querySelector(".section-4").getBoundingClientRect().top+scrollY);
const s5=await p.evaluate(()=>document.querySelector(".section-5").getBoundingClientRect().top+scrollY);
const pos={"step1":s4-100,"step12":(s4+s5)/2-200,"step2":s5-100};
for(const [lbl,y] of Object.entries(pos)){
 await p.evaluate(yy=>scrollTo(0,Math.max(0,yy)),y);await p.waitForTimeout(400);
 const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");const ps=[...s.querySelectorAll("path")];return ps.map(e=>{let l=0;try{l=e.getTotalLength();}catch{}return{l,e};}).filter(x=>x.l>5000).map(x=>{const da=parseFloat(x.e.style.strokeDasharray)||0,of=parseFloat(x.e.style.strokeDashoffset);return +(da?(1-(isNaN(of)?da:of)/da):0).toFixed(3);});});
 console.log(lbl.padEnd(8),JSON.stringify(d));
 await p.screenshot({path:`docs/research/${lbl}.png`});
}
await b.close();
