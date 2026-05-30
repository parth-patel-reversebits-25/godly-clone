import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1920,height:1000}});
await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const row=document.querySelectorAll('.section-2 .row')[0];
  const col=row.querySelector('[class*="col-lg-4"]');
  const tb=row.querySelector('.text-block');
  const h2=tb.querySelector('h2');
  const R=e=>{const c=e.getBoundingClientRect();return{top:Math.round(c.top),bottom:Math.round(c.bottom),h:Math.round(c.height)};};
  return {row:R(row),col:R(col),tb:R(tb),h2:R(h2), rowCS:{ai:getComputedStyle(row).alignItems, h:getComputedStyle(row).height}, colCS:{h:getComputedStyle(col).height, pos:getComputedStyle(col).position}};
});
console.log(JSON.stringify(r,null,1));
await b.close();
