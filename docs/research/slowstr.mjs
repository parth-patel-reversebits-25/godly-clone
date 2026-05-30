import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(600);
const w=await p.evaluate(()=>{const x=document.querySelector(".wrapper").getBoundingClientRect();return{top:x.top+scrollY,height:x.height,vh:innerHeight};});
for(const pct of [55,65,75,85,95]){
 await p.evaluate(yy=>scrollTo(0,yy),w.top+(w.height-w.vh)*pct/100);await p.waitForTimeout(350);
 const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");const ps=[...s.querySelectorAll("path")];const low=[];ps.forEach((e,i)=>{let l=0;try{l=e.getTotalLength();}catch{}let y=0;try{y=e.getBBox().y;}catch{}if(l<5000&&y>=1300){const da=parseFloat(e.style.strokeDasharray)||0,of=parseFloat(e.style.strokeDashoffset);low.push(+(da?(1-(isNaN(of)?da:of)/da):0).toFixed(2));}});return low;});
 console.log("scroll "+pct+"% lower-straight",JSON.stringify(d));
}
await b.close();
