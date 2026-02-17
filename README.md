asciimathml
===========

A new home for asciimathml

ASCIIMathML.js is a compact JavaScript program that translates
simple calculator-style math expressions on a webpage to MathML.

The resulting page can be displayed with any browser that can render MathML.

---

## TypeScript build (new)

- Run `npm install` then `npm run build` to produce `dist/asciimathml.js`. This is an alternate implementation of
  ASCIIMathML.js, and doesn't auto-convert the page.
- The bundle exposes the runtime on `window.asciimath` (use `asciimath.parseMath(...)` or `asciimath.AMprocessNode(...)`).


