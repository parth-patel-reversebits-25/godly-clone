import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1920,height:1000}});
await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const tb=document.querySelector('.section-2 .text-block.block-1');
  const h5=tb.querySelector('h5'); const h2=tb.querySelector('h2');
  const g=e=>{const c=getComputedStyle(e);const rc=e.getBoundingClientRect();return{h:Math.round(rc.height),disp:c.display,float:c.float,pos:c.position,fs:c.fontSize,lh:c.lineHeight,m:c.margin,txt:e.textContent};};
  return {tbDisplay:getComputedStyle(tb).display, tbOverflow:getComputedStyle(tb).overflow, h5:g(h5), h2:g(h2), childCount:tb.children.length, kids:[...tb.children].map(k=>k.tagName)};
});
console.log(JSON.stringify(r,null,1));
await b.close();
