import { chromium } from "playwright";
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto("http://localhost:3000",{waitUntil:"networkidle"});await p.waitForTimeout(500);
// fully draw by scrolling to bottom of wrapper1
const w=await p.evaluate(()=>{const x=document.querySelector(".wrapper").getBoundingClientRect();return{top:x.top+scrollY,height:x.height,vh:innerHeight};});
await p.evaluate(yy=>scrollTo(0,yy),w.top+w.height);await p.waitForTimeout(500);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
// page-Y of each straight stroke center + section-4 top
const r=await p.evaluate(()=>{
 const s=document.querySelector(".ilustration svg");
 const items=[...s.querySelectorAll("path")].map((e,i)=>{let l=0;try{l=e.getTotalLength();}catch{}const bb=e.getBoundingClientRect();return{i,l:Math.round(l),pageY:Math.round(bb.top+scrollY+bb.height/2)};});
 const sec=name=>{const e=document.querySelector(name);return e?Math.round(e.getBoundingClientRect().top+scrollY):null;};
 return{items,s3:sec(".section-3"),s4:sec(".section-4"),s5:sec(".section-5"),s7:sec(".section-7")};
});
console.log("section-3",r.s3,"section-4",r.s4,"section-5",r.s5,"section-7",r.s7);
console.log("straight strokes (len<5000) pageY:");
r.items.filter(x=>x.l<5000).forEach(x=>console.log(" i"+x.i,"len"+x.l,"pageY"+x.pageY));
await b.close();
