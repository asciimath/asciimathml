AsciiMath Based
===============

This directory contains tools using the AsciiMath syntax for mathematical
expressions.

ASCIIMathTeXImg.js
------------------
This script will convert expressions in AsciiMath notation into LaTeX
expressions.  By default, it can be used as a drop-in-replacement for 
ASCIIMathML, in which case all AsciiMath areas will be rendered as images
using a LaTeX renderer like [MimeTeX](http://www.forkosh.com/mimetex.html) 
or [MathTeX](http://www.forkosh.com/mathtex.html). The address to such a 
renderer must be added to the script before images will render properly.

This script can also be used without autotranslate for the utility functions
AMTparseAMtoTeX, AMparseMath, or AMprocessNode.

Use of this script as an image fallback for ASCIIMathML is no longer 
recommended, as [MathJax](http://docs.mathjax.org/en/latest/asciimath.html) 
will provide far better results.  This script may still be useful for general
conversion tasks, or in rich text editors.

This can be imported into Node using import or require, which will only provide 
a function for translating from AsciiMath to TeX. A function `parse` and 
object `config` are exposed. If you've run `npm install asciimathml`, here's an example:
```
import asciimath from 'asciimathml/asciimath-based/ASCIIMathTeXImg.js';
asciimath.config.decimalsign = ',';
console.log(asciimath.parse('2/3'));
```

ASCIIMath2TeX.php
-----------------
This is a PHP port of ASCIIMathTeXImg.js, and provides a function for converting
AsciiMath to LaTeX server-side, as a preprocessing option.

