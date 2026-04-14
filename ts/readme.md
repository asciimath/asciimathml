## TypeScript build

- Use in a project by adding the npm `asciimathml` package.
- To build your own, run `npm install` then `npm run build` to produce `dist/asciimathml.js`. 
  This is an alternate implementation of ASCIIMathML.js, but doesn't auto-convert the page.
- Run `tsc` to build the `.ts` files to `dist/*.js`
- The bundle exposes the runtime on `window.asciimath` (use `asciimath.parseMath(...)` or `asciimath.AMprocessNode(...)`).

### Design notes

- The NodeAdapter interface was used to allow multiple DOM implementations. 
- Parse.ts uses a browser DOM implementation to do AsciiMath-to-MathML in the browser
- Alternate implementation of the NodeAdapter can be used for node.js. This was done 
  so that MathJax could use the same parser with their internal typescript DOM system.