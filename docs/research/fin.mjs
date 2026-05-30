import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1720,height:760}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(600);
const w=await p.evaluate(()=>{const x=document.querySelector(".wrapper").getBoundingClientRect();return{top:x.top+scrollY,height:x.height,vh:innerHeight};});
const s5=await p.evaluate(()=>document.querySelector(".section-5").getBoundingClientRect().top+scrollY);
for(const [lbl,y] of [["step2",s5-100],["90%",w.top+(w.height-w.vh)*0.9],["100%",w.top+(w.height-w.vh)]]){
 await p.evaluate(yy=>scrollTo(0,Math.max(0,yy)),y);await p.waitForTimeout(400);
 const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");return [...s.querySelectorAll("path")].map(e=>{let l=0;try{l=e.getTotalLength();}catch{}return{l,e};}).filter(x=>x.l>5000).map(x=>{const da=parseFloat(x.e.style.strokeDasharray)||0,of=parseFloat(x.e.style.strokeDashoffset);return +(da?(1-(isNaN(of)?da:of)/da):0).toFixed(3);});});
 console.log(lbl,JSON.stringify(d));
 await p.screenshot({path:`docs/research/fin-${lbl}.png`});
}
await b.close();
