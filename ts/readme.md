## TypeScript build

### For the browser

- Use in a project by adding the npm `asciimathml` package.
- To build your own, run `npm install` then `npm run build` to produce `dist/asciimathml.js`. 
  This is an alternate implementation of ASCIIMathML.js, but doesn't auto-convert the page.
- Run `npm run compile` to build the `.ts` files to `dist/*.js`
- The bundle exposes the runtime on `window.asciimath` (use `asciimath.parseMath(...)` or `asciimath.AMprocessNode(...)`).
- Alternatively you can use imports:
```
import { AsciiMath } from 'asciimathml/dist/asciimathml.js';
const am = new AsciiMath();
am.parseMath('a^b+c'); // produces a node you can append somewhere
```

### For node

- Use in a project by adding the npm `asciimathml` package.
- To build your own, run `npm install` then `npm run buildserver` to produce `dist/asciimathml-server.js`. 
- Example use:  This produces a string of the MathML:

```
import { AsciiMath } from 'asciimathml/dist/asciimathml-server.js';
const am = new AsciiMath();
console.log(am.parseMath('a^b+c'));
```

### Design notes

- The NodeAdapter interface was used to allow multiple DOM implementations. 
- Parse.ts uses a browser DOM implementation to do AsciiMath-to-MathML in the browser
- ParseToString.ts uses a lite DOM for AsciiMath-to-MathML string in node
- Alternate implementation of the NodeAdapter can be used for node.js. This was done 
  so that MathJax could use the same parser with their internal typescript DOM system.