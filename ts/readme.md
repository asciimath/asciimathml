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

### Config options

You can add configuration by using `const am = new AsciiMath(config)` to initialize the parser with a configuration object.  Supported keys are:

- decimalsign: default `"."`
- listseparator: default `","`
- displaystyle: default `true`
- useCSS: default `true`. Whether to use CSS for `bold()` or character mappings.
- addmathvariant: default `false`. Whether to add deprecated `mathvariant` on elements after font character mappings.
- additionalSymbols: optional, an array of additional symbols to register with the parser. Each symbol would be an object, in the same format found in `AsciiMathSymbols.ts`, except using a string like `CONST` for the ttype.  `input, tag, output, and ttype` are required.

### Browser CSS

If using the these scripts or their output in the browser, note that note all browsers support all MathML used by these.  In particular, the `cancel` function isn't supported by Chromium-based browsers. You can approximate the effect by adding to your page CSS:
```
menclose[notation=updiagonalstrike] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 100'%3E%3Cline x1='0' y1='100' x2='100' y2='0' stroke='"+stroke+"' stroke-width='1' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E");
}
```