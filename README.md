asciimathml
===========

A new home for asciimathml

ASCIIMathML.js is a compact JavaScript program that translates
simple calculator-style math expressions on a webpage to MathML.

The resulting page can be displayed with any browser that can render MathML.
Currently that includes any recent version of Firefox (3+).


NodeJS/CommonJS/Webpack Usage
-----------------------------

```js
// You can convert ASCIIMath to LaTeX using NodeJS/CommonJS/Webpack!
const am = require("asciimath")
am.parse("a / b")  // Returns equivalent latex '\\frac{{a}}{{b}}'

// Changing decimal sign
// (only relevant property from config, everything else relates to DOM)
am.parse("1,2/3") // Parsed as two numbers '{1},\\frac{{2}}{{3}}', i.e. 1, 2/3
am.config.decimalsign = ","
am.parse("1,2/3") // Parsed as one number '\\frac{{1,2}}{{3}}', i.e. 1.2 / 3 or 1,2 / 3
```
