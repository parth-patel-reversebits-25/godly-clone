import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(600);
const w=await p.evaluate(()=>{const x=document.querySelector(".wrapper").getBoundingClientRect();return{top:x.top+scrollY,height:x.height,vh:innerHeight};});
for(const pct of [30,50,70,85,100]){
 const y=w.top+(w.height-w.vh)*pct/100;
 await p.evaluate(yy=>scrollTo(0,yy),y);await p.waitForTimeout(400);
 const d=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");const ps=[...s.querySelectorAll("path")];let sd=0,st=0,cd=0,ct=0;ps.forEach(e=>{let l=0;try{l=e.getTotalLength();}catch{}const da=parseFloat(e.style.strokeDasharray)||0,of=parseFloat(e.style.strokeDashoffset);const f=da?1-(isNaN(of)?da:of)/da:0;if(l>5000){ct++;if(f>0.99)cd++;}else{st++;if(f>0.99)sd++;}});return{straight:sd+"/"+st,complex:cd+"/"+ct};});
 console.log("scroll "+pct+"%  straight "+d.straight+"  complex "+d.complex);
}
await b.close();
