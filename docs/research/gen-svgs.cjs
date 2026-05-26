const fs = require("fs");
const path = require("path");
const dir = __dirname;
const ids = ["trigger1","first-img","second-img","third-img","fourth-img","fifth-img","sixth-img","seventh-img","eighth-img","nineth-img","tenth-img","eleventh-img","first-waypoint","second-waypoint","third-waypoint","fourth-waypoint","fifth-waypoint","sixth-waypoint"];
const out = {};
ids.forEach(id => {
  let svg = fs.readFileSync(path.join(dir, "svg-" + id + ".svg"), "utf8");
  // strip outer <svg ...> wrapper attrs we keep, but we want INNER markup + keep viewBox/width/height for the component
  out[id] = svg.trim();
});
const dest = path.join(dir, "../../src/data/svgs.ts");
fs.mkdirSync(path.dirname(dest), { recursive: true });
let ts = "// Auto-generated raw SVG markup extracted from waltersophia.com archive.\n";
ts += "export const SVGS: Record<string, string> = " + JSON.stringify(out, null, 0) + ";\n";
fs.writeFileSync(dest, ts);
console.log("wrote", dest, Object.keys(out).length, "svgs", Math.round(ts.length/1024)+"KB");
