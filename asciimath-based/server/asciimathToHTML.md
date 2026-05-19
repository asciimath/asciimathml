asciimathml-ts
===========

A port of ASCIIMathML.js that converts AsciiMath equations into HTML strings, suitable for server-side.

ASCIIMathML compiles equations into MathML.  The original [ASCIIMathML](https://github.com/asciimath/asciimathml) used DOM nodes to process the hierarchial structure. This is convenient, since the output was a MathML node-tree, and ASCIIMathML provides MathJax-like rendering daemons.  It's a terrific package.

But it is slow; compiling a moderate equation requires processing and discarding hundreds of DOM nodes.  And it can only run in the browser.  I needed a server version that compiled equations into HTML strings.


This version is based on the April 2026 version of ASCIIMathML, which added bold() and expands the special characters.



## Usage
```
import { AMserver } from './asciimath.js';
let am = new AMserver()
html += am.parseMath('a^b +c')

let d = document.getElementById('test')
d.innerHTML =  html


```







