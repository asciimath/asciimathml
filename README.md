asciimathml
===========

ASCIIMathML.js is a compact JavaScript program that translates
simple calculator-style math expressions on a webpage to MathML.

The resulting page can be displayed with any browser that can render MathML.

You can learn more about the syntax on [AsciiMath.org](https://asciimath.org/).

What's in the Repo
------------------

### ASCIIMathML.js
This is the original javascript script to convert asciimath 
expressions to MathML for native browser rendering.
Most modern browsers can now display MathML.  Just load the 
script in the `head` or `body` of your website like this:

`<script src="ASCIIMathML.js"></script>`

You can adjust the configuration in the script itself. By 
default it will convert automatically on page load, grabbing
any expressions between backticks, like ``Solve `x/2+3=5```

#### API
`asciimath.translate()`: converts all asciimath on the page.

`asciimath.AMprocessNode(node)`: convert any asciimath delimiters 
inside the given HTML node.

`asciimath.parseMath(string)`: takes an AsciiMath string and
returns a MathML node.

### LaTeXMathML.js
Similar to ASCIIMathML, but it only converts expressions that
latex would convert.

### ts/* and dist/asciimathml.js
A typescript implementation AsciiMathML, which builds 
`dist/asciimathmljs`.  See the readme in the
directory for more details. This an alternate implementation 
of the core AsciiMath parsing from ASCIIMathML.js, but does not
implement the autotranslation and autodetecting features. It 
includes equivalent `asciimath.AMprocessNode` and `asciimath.parseMath`
functions as ASCIIMathML.js.

### asciimath-based/*
See the README in the directory for more details.  This directly includes
alternate implementations of AsciiMath parsers

- ASCIIMath2TeX.js: A javascript script with functions to convert AsciiMath 
  notation to TeX.  This can be used to 
- ASCIIMath2TeX.php: A PHP port of the above, to convert AsciiMath notation
  to TeX

There are also a number of implementation of AsciiMath parsers done
by others. Here are a few (these have not been evaluated by this repo for 
compatibility, accuracy, or anything else):
- [christianp/asciimath2tex](https://github.com/christianp/asciimath2tex): Another 
  javascript library that converts AsciiMath to TeX. This one has an npm
  package and ES6 module support.
- [asciidoctor/asciimath](https://github.com/asciidoctor/asciimath): A Ruby 
  AsciiMath parser and MathML/TeX generator.
- [andrewlock/AsciiMath](https://github.com/andrewlock/AsciiMath): A .NET
  AsciiMath converter.
- [tom-berend/asciimathml-ts](https://github.com/tom-berend/asciimathml-ts):
  An alternate typescript implementation of an AsciiMath parser.
- [widcardw/asciimath-parser](https://github.com/widcardw/asciimath-parser): 
  An alternate typescript implementation of an AsciiMath parser.
