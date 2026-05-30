import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:730}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(600);
// find section-3
const s3=await p.evaluate(()=>{const e=document.querySelector(".section-3");const r=e.getBoundingClientRect();return r.top+scrollY;});
const w=await p.evaluate(()=>{const x=document.querySelector(".wrapper").getBoundingClientRect();return{top:x.top+scrollY,height:x.height,vh:innerHeight};});
// scroll so section-3 centered
const positions={"sec3-enter":s3-w.vh*0.9,"sec3-center":s3-w.vh*0.4,"sec3-exit":s3+200};
for(const [lbl,y] of Object.entries(positions)){
 await p.evaluate(yy=>scrollTo(0,Math.max(0,yy)),y);await p.waitForTimeout(400);
 const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");const ps=[...s.querySelectorAll("path")];const comp=ps.map(e=>{let l=0;try{l=e.getTotalLength();}catch{}return{l,e};}).filter(x=>x.l>5000).map(x=>{const da=parseFloat(x.e.style.strokeDasharray)||0,of=parseFloat(x.e.style.strokeDashoffset);return +(da?(1-(isNaN(of)?da:of)/da):0).toFixed(3);});return comp;});
 console.log(lbl.padEnd(12),"complex frac",JSON.stringify(d));
 await p.screenshot({path:`docs/research/${lbl}.png`});
}
await b.close();
