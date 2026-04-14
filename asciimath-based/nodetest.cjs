const am = require("./ASCIIMathTeXImg.js")

// Changing decimal sign
// (only relevant property from config, everything else relates to DOM)
console.log(am.parse("1,2/3")); // Parsed as two numbers '{1},\\frac{{2}}{{3}}', i.e. 1, 2/3
am.config.decimalsign = ",";
console.log(am.parse("1,2/3")); // Parsed as one number '\\frac{{1,2}}{{3}}', i.e. 1.2 / 3 or 1,2 / 3