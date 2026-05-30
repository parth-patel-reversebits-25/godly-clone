import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage();
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const s=document.querySelector(".ilustration svg");return [...s.querySelectorAll("path,line,polyline,circle,rect,ellipse")].map((e,i)=>{let l=0;try{l=e.getTotalLength();}catch{}const bb=e.getBBox();return {i,len:Math.round(l),y0:Math.round(bb.y),h:Math.round(bb.height)};});});
console.log(JSON.stringify(r));
await b.close();
