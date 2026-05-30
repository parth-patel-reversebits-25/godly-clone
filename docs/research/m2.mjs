import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1920,height:1000}});
await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const s=document.querySelector('.section-2');
  const cs=getComputedStyle(s);
  const rows=[...s.querySelectorAll('.row')].map(rw=>{
    const tb=rw.querySelector('.text-block');
    return {rowH:Math.round(rw.getBoundingClientRect().height), tbClass:tb.className, tbPadBottom:getComputedStyle(tb).paddingBottom, tbH:Math.round(tb.getBoundingClientRect().height)};
  });
  return {secPad:[cs.paddingTop,cs.paddingBottom], rows};
});
console.log(JSON.stringify(r,null,1));
await b.close();
