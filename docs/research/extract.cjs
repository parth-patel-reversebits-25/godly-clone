const fs = require("fs");
const h = fs.readFileSync(__dirname + "/source.html", "utf8");
let log = [];
const svgs = h.match(/<svg[\s\S]*?<\/svg>/g) || [];
svgs.forEach((s, i) => {
  const id = (s.match(/id=([^\s>]+)/) || [])[1] || ("inline" + i);
  fs.writeFileSync(__dirname + "/svg-" + id + ".svg", s);
  log.push("svg id=" + id + " " + s.length + "b");
});
const logos = [...new Set([...h.matchAll(/data:image\/svg\+xml;base64,([A-Za-z0-9+/=]{500,})/g)].map(m => m[1]))];
logos.forEach((b, i) => {
  const svg = Buffer.from(b, "base64").toString("utf8");
  fs.writeFileSync(__dirname + "/../../public/images/logo-" + i + ".svg", svg);
  log.push("logo-" + i + ".svg " + svg.length + "b :: " + svg.slice(0, 50).replace(/\s+/g, " "));
});
console.log(log.join("\n"));
