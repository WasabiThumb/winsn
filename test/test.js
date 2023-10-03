const winsn = require("../lib/index.js");

let available = winsn.isAvailable();
console.log("available: " + available);
if (!available) return;

console.log(winsn("C:\\Program Files"));

console.log(winsn.elseNull("C:\\Program Files (x86)"));

console.log(winsn.elseLong("bad path was not accepted (good)!"));

console.log(winsn.else("bad path pls reject", "ok!"));
