/*
LaTeXMathML.js
==============

This file, in this form, is due to Douglas Woodall, June 2006.
It contains JavaScript functions to convert (most simple) LaTeX
math notation to Presentation MathML.  It was obtained by
downloading the file ASCIIMathML.js from
	http://www1.chapman.edu/~jipsen/mathml/asciimathdownload/
and modifying it so that it carries out ONLY those conversions
that would be carried out in LaTeX.  A description of the original
file, with examples, can be found at
	www1.chapman.edu/~jipsen/mathml/asciimath.html
	ASCIIMathML: Math on the web for everyone

Here is the header notice from the original file:

ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
to Presentation MathML. The conversion is done while the (X)HTML page
loads, and should work with Firefox/Mozilla/Netscape 7+ and Internet
Explorer 6+MathPlayer (http://www.dessci.com/en/products/mathplayer/).
Just add the next line to your (X)HTML page with this file in the same folder:
<script type="text/javascript" src="ASCIIMathML.js"></script>
This is a convenient and inexpensive solution for authoring MathML.

Version 1.4.7 Dec 15, 2005, (c) Peter Jipsen http://www.chapman.edu/~jipsen
Latest version at http://www.chapman.edu/~jipsen/mathml/ASCIIMathML.js
For changes see http://www.chapman.edu/~jipsen/mathml/asciimathchanges.txt
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html)
for more details.

LaTeXMathML.js (ctd)
==============

The instructions for use are the same as for the original
ASCIIMathML.js, except that of course the line you add to your
file should be
<script type="text/javascript" src="LaTeXMathML.js"></script>
Or use absolute path names if the file is not in the same folder
as your (X)HTML page.
*/

(function () {
var translateOnLoad = true;    //true to autotranslate
var checkForMathML = true;   // check if browser can display MathML
var notifyIfNoMathML = true; // display note if no MathML capability
var alertIfNoMathML = false;  // show alert box if no MathML capability
// was "red":
var mathcolor = "";	     // change it to "" (to inherit) or any other color
// was "serif":
var mathfontfamily = "";      // change to "" to inherit (works in IE)
                              // or another family (e.g. "arial")
var showasciiformulaonhover = true; // helps students learn ASCIIMath
/*
// Commented out by DRW -- not now used -- see DELIMITERS (twice) near the end
var displaystyle = false;     // puts limits above and below large operators
var decimalsign = ".";        // change to "," if you like, beware of `(1,2)`!
var LMdelimiter1 = "`", LMescape1 = "\\\\`"; // can use other characters
var LMdelimiter2 = "$", LMescape2 = "\\\\\\$", LMdelimiter2regexp = "\\$";
var doubleblankmathdelimiter = false; // if true,  x+1  is equal to `x+1`
                                      // for IE this works only in <!--   -->
//var separatetokens;// has been removed (email me if this is a problem)
*/
var isIE = document.createElementNS==null;

if (document.getElementById==null)
  alert("This webpage requires a recent browser such as\
\nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer")

// all further global variables start with "LM"

function LMcreateElementXHTML(t) {
  if (isIE) return document.createElement(t);
  else return document.createElementNS("http://www.w3.org/1999/xhtml",t);
}

function LMnoMathMLNote() {
  var nd = LMcreateElementXHTML("h3");
  nd.setAttribute("align","center")
  nd.appendChild(LMcreateElementXHTML("p"));
  nd.appendChild(document.createTextNode("To view the "));
  var an = LMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("LaTeXMathML"));
  an.setAttribute("href","http://www.maths.nott.ac.uk/personal/drw/lm.html");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" notation use Internet Explorer 6+")); 
  an = LMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("MathPlayer"));
  an.setAttribute("href","http://www.dessci.com/en/products/mathplayer/download.htm");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  nd.appendChild(LMcreateElementXHTML("p"));
  return nd;
}

function LMisMathMLavailable() {
  if (navigator.appName.slice(0,8)=="Netscape")
    if (navigator.appVersion.slice(0,1)>="5") return null;
    else return LMnoMathMLNote();
  else if (navigator.appName.slice(0,9)=="Microsoft")
    try {
        var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        return null;
    } catch (e) {
        return LMnoMathMLNote();
    }
  else return LMnoMathMLNote();
}

// character lists for Mozilla/Netscape fonts
    var LMcal = ["\uD835\uDC9C","\u212C","\uD835\uDC9E","\uD835\uDC9F","\u2130","\u2131","\uD835\uDCA2","\u210B","\u2110","\uD835\uDCA5","\uD835\uDCA6","\u2112","\u2133","\uD835\uDCA9","\uD835\uDCAA","\uD835\uDCAB","\uD835\uDCAC","\u211B","\uD835\uDCAE","\uD835\uDCAF","\uD835\uDCB0","\uD835\uDCB1","\uD835\uDCB2","\uD835\uDCB3","\uD835\uDCB4","\uD835\uDCB5","\uD835\uDCB6","\uD835\uDCB7","\uD835\uDCB8","\uD835\uDCB9","\u212F","\uD835\uDCBB","\u210A","\uD835\uDCBD","\uD835\uDCBE","\uD835\uDCBF","\uD835\uDCC0","\uD835\uDCC1","\uD835\uDCC2","\uD835\uDCC3","\u2134","\uD835\uDCC5","\uD835\uDCC6","\uD835\uDCC7","\uD835\uDCC8","\uD835\uDCC9","\uD835\uDCCA","\uD835\uDCCB","\uD835\uDCCC","\uD835\uDCCD","\uD835\uDCCE","\uD835\uDCCF"]; 

    var LMfrk = ["\uD835\uDD04","\uD835\uDD05","\u212D","\uD835\uDD07","\uD835\uDD08","\uD835\uDD09","\uD835\uDD0A","\u210C","\u2111","\uD835\uDD0D","\uD835\uDD0E","\uD835\uDD0F","\uD835\uDD10","\uD835\uDD11","\uD835\uDD12","\uD835\uDD13","\uD835\uDD14","\u211C","\uD835\uDD16","\uD835\uDD17","\uD835\uDD18","\uD835\uDD19","\uD835\uDD1A","\uD835\uDD1B","\uD835\uDD1C","\u2128","\uD835\uDD1E","\uD835\uDD1F","\uD835\uDD20","\uD835\uDD21","\uD835\uDD22","\uD835\uDD23","\uD835\uDD24","\uD835\uDD25","\uD835\uDD26","\uD835\uDD27","\uD835\uDD28","\uD835\uDD29","\uD835\uDD2A","\uD835\uDD2B","\uD835\uDD2C","\uD835\uDD2D","\uD835\uDD2E","\uD835\uDD2F","\uD835\uDD30","\uD835\uDD31","\uD835\uDD32","\uD835\uDD33","\uD835\uDD34","\uD835\uDD35","\uD835\uDD36","\uD835\uDD37"];

    var LMbbb = ["\uD835\uDD38","\uD835\uDD39","\u2102","\uD835\uDD3B","\uD835\uDD3C","\uD835\uDD3D","\uD835\uDD3E","\u210D","\uD835\uDD40","\uD835\uDD41","\uD835\uDD42","\uD835\uDD43","\uD835\uDD44","\u2115","\uD835\uDD46","\u2119","\u211A","\u211D","\uD835\uDD4A","\uD835\uDD4B","\uD835\uDD4C","\uD835\uDD4D","\uD835\uDD4E","\uD835\uDD4F","\uD835\uDD50","\u2124","\uD835\uDD52","\uD835\uDD53","\uD835\uDD54","\uD835\uDD55","\uD835\uDD56","\uD835\uDD57","\uD835\uDD58","\uD835\uDD59","\uD835\uDD5A","\uD835\uDD5B","\uD835\uDD5C","\uD835\uDD5D","\uD835\uDD5E","\uD835\uDD5F","\uD835\uDD60","\uD835\uDD61","\uD835\uDD62","\uD835\uDD63","\uD835\uDD64","\uD835\uDD65","\uD835\uDD66","\uD835\uDD67","\uD835\uDD68","\uD835\uDD69","\uD835\uDD6A","\uD835\uDD6B"];

var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4,
    RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8,
    TEXT = 9, BIG = 10, LONG = 11, STRETCHY = 12, MATRIX = 13; // token types

var LMsqrt = {input:"\\sqrt",	tag:"msqrt", output:"sqrt",	ttype:UNARY},
  LMroot = {input:"\\root",	tag:"mroot", output:"root",	ttype:BINARY},
  LMfrac = {input:"\\frac",	tag:"mfrac", output:"/",	ttype:BINARY},
  LMover = {input:"\\stackrel", tag:"mover", output:"stackrel", ttype:BINARY},
  LMatop = {input:"\\atop",	tag:"mfrac", output:"",		ttype:INFIX},
  LMchoose = {input:"\\choose", tag:"mfrac", output:"",		ttype:INFIX},
  LMsub  = {input:"_",		tag:"msub",  output:"_",	ttype:INFIX},
  LMsup  = {input:"^",		tag:"msup",  output:"^",	ttype:INFIX},
  LMtext = {input:"\\mathrm",	tag:"mtext", output:"text",	ttype:TEXT},
  LMmbox = {input:"\\mbox",	tag:"mtext", output:"mbox",	ttype:TEXT};

// Commented out by DRW to prevent 1/2 turning into a 2-line fraction
// LMdiv   = {input:"/",	 tag:"mfrac", output:"/",    ttype:INFIX},
// Commented out by DRW so that " prints literally in equations
// LMquote = {input:"\"",	 tag:"mtext", output:"mbox", ttype:TEXT};

var LMsymbols = [
//Greek letters
{input:"\\alpha",	tag:"mi", output:"\u03B1", ttype:CONST},
{input:"\\beta",	tag:"mi", output:"\u03B2", ttype:CONST},
{input:"\\gamma",	tag:"mi", output:"\u03B3", ttype:CONST},
{input:"\\delta",	tag:"mi", output:"\u03B4", ttype:CONST},
{input:"\\epsilon",	tag:"mi", output:"\u03B5", ttype:CONST},
{input:"\\varepsilon",  tag:"mi", output:"\u025B", ttype:CONST},
{input:"\\zeta",	tag:"mi", output:"\u03B6", ttype:CONST},
{input:"\\eta",		tag:"mi", output:"\u03B7", ttype:CONST},
{input:"\\theta",	tag:"mi", output:"\u03B8", ttype:CONST},
{input:"\\vartheta",	tag:"mi", output:"\u03D1", ttype:CONST},
{input:"\\iota",	tag:"mi", output:"\u03B9", ttype:CONST},
{input:"\\kappa",	tag:"mi", output:"\u03BA", ttype:CONST},
{input:"\\lambda",	tag:"mi", output:"\u03BB", ttype:CONST},
{input:"\\mu",		tag:"mi", output:"\u03BC", ttype:CONST},
{input:"\\nu",		tag:"mi", output:"\u03BD", ttype:CONST},
{input:"\\xi",		tag:"mi", output:"\u03BE", ttype:CONST},
{input:"\\pi",		tag:"mi", output:"\u03C0", ttype:CONST},
{input:"\\varpi",	tag:"mi", output:"\u03D6", ttype:CONST},
{input:"\\rho",		tag:"mi", output:"\u03C1", ttype:CONST},
{input:"\\varrho",	tag:"mi", output:"\u03F1", ttype:CONST},
{input:"\\varsigma",	tag:"mi", output:"\u03C2", ttype:CONST},
{input:"\\sigma",	tag:"mi", output:"\u03C3", ttype:CONST},
{input:"\\tau",		tag:"mi", output:"\u03C4", ttype:CONST},
{input:"\\upsilon",	tag:"mi", output:"\u03C5", ttype:CONST},
{input:"\\phi",		tag:"mi", output:"\u03C6", ttype:CONST},
{input:"\\varphi",	tag:"mi", output:"\u03D5", ttype:CONST},
{input:"\\chi",		tag:"mi", output:"\u03C7", ttype:CONST},
{input:"\\psi",		tag:"mi", output:"\u03C8", ttype:CONST},
{input:"\\omega",	tag:"mi", output:"\u03C9", ttype:CONST},
{input:"\\Gamma",	tag:"mo", output:"\u0393", ttype:CONST},
{input:"\\Delta",	tag:"mo", output:"\u0394", ttype:CONST},
{input:"\\Theta",	tag:"mo", output:"\u0398", ttype:CONST},
{input:"\\Lambda",	tag:"mo", output:"\u039B", ttype:CONST},
{input:"\\Xi",		tag:"mo", output:"\u039E", ttype:CONST},
{input:"\\Pi",		tag:"mo", output:"\u03A0", ttype:CONST},
{input:"\\Sigma",	tag:"mo", output:"\u03A3", ttype:CONST},
{input:"\\Upsilon",	tag:"mo", output:"\u03A5", ttype:CONST},
{input:"\\Phi",		tag:"mo", output:"\u03A6", ttype:CONST},
{input:"\\Psi",		tag:"mo", output:"\u03A8", ttype:CONST},
{input:"\\Omega",	tag:"mo", output:"\u03A9", ttype:CONST},

//fractions
{input:"\\frac12",	tag:"mo", output:"\u00BD", ttype:CONST},
{input:"\\frac14",	tag:"mo", output:"\u00BC", ttype:CONST},
{input:"\\frac34",	tag:"mo", output:"\u00BE", ttype:CONST},
{input:"\\frac13",	tag:"mo", output:"\u2153", ttype:CONST},
{input:"\\frac23",	tag:"mo", output:"\u2154", ttype:CONST},
{input:"\\frac15",	tag:"mo", output:"\u2155", ttype:CONST},
{input:"\\frac25",	tag:"mo", output:"\u2156", ttype:CONST},
{input:"\\frac35",	tag:"mo", output:"\u2157", ttype:CONST},
{input:"\\frac45",	tag:"mo", output:"\u2158", ttype:CONST},
{input:"\\frac16",	tag:"mo", output:"\u2159", ttype:CONST},
{input:"\\frac56",	tag:"mo", output:"\u215A", ttype:CONST},
{input:"\\frac18",	tag:"mo", output:"\u215B", ttype:CONST},
{input:"\\frac38",	tag:"mo", output:"\u215C", ttype:CONST},
{input:"\\frac58",	tag:"mo", output:"\u215D", ttype:CONST},
{input:"\\frac78",	tag:"mo", output:"\u215E", ttype:CONST},

//binary operation symbols
{input:"\\pm",		tag:"mo", output:"\u00B1", ttype:CONST},
{input:"\\mp",		tag:"mo", output:"\u2213", ttype:CONST},
{input:"\\triangleleft",tag:"mo", output:"\u22B2", ttype:CONST},
{input:"\\triangleright",tag:"mo",output:"\u22B3", ttype:CONST},
{input:"\\cdot",	tag:"mo", output:"\u22C5", ttype:CONST},
{input:"\\star",	tag:"mo", output:"\u22C6", ttype:CONST},
{input:"\\ast",		tag:"mo", output:"\u002A", ttype:CONST},
{input:"\\times",	tag:"mo", output:"\u00D7", ttype:CONST},
{input:"\\div",		tag:"mo", output:"\u00F7", ttype:CONST},
{input:"\\circ",	tag:"mo", output:"\u2218", ttype:CONST},
//{input:"\\bullet",	  tag:"mo", output:"\u2219", ttype:CONST},
{input:"\\bullet",	tag:"mo", output:"\u2022", ttype:CONST},
{input:"\\oplus",	tag:"mo", output:"\u2295", ttype:CONST},
{input:"\\ominus",	tag:"mo", output:"\u2296", ttype:CONST},
{input:"\\otimes",	tag:"mo", output:"\u2297", ttype:CONST},
{input:"\\bigcirc",	tag:"mo", output:"\u25CB", ttype:CONST},
{input:"\\oslash",	tag:"mo", output:"\u2298", ttype:CONST},
{input:"\\odot",	tag:"mo", output:"\u2299", ttype:CONST},
{input:"\\land",	tag:"mo", output:"\u2227", ttype:CONST},
{input:"\\wedge",	tag:"mo", output:"\u2227", ttype:CONST},
{input:"\\lor",		tag:"mo", output:"\u2228", ttype:CONST},
{input:"\\vee",		tag:"mo", output:"\u2228", ttype:CONST},
{input:"\\cap",		tag:"mo", output:"\u2229", ttype:CONST},
{input:"\\cup",		tag:"mo", output:"\u222A", ttype:CONST},
{input:"\\sqcap",	tag:"mo", output:"\u2293", ttype:CONST},
{input:"\\sqcup",	tag:"mo", output:"\u2294", ttype:CONST},
{input:"\\uplus",	tag:"mo", output:"\u228E", ttype:CONST},
{input:"\\amalg",	tag:"mo", output:"\u2210", ttype:CONST},
{input:"\\bigtriangleup",tag:"mo",output:"\u25B3", ttype:CONST},
{input:"\\bigtriangledown",tag:"mo",output:"\u25BD", ttype:CONST},
{input:"\\dag",		tag:"mo", output:"\u2020", ttype:CONST},
{input:"\\dagger",	tag:"mo", output:"\u2020", ttype:CONST},
{input:"\\ddag",	tag:"mo", output:"\u2021", ttype:CONST},
{input:"\\ddagger",	tag:"mo", output:"\u2021", ttype:CONST},
{input:"\\lhd",		tag:"mo", output:"\u22B2", ttype:CONST},
{input:"\\rhd",		tag:"mo", output:"\u22B3", ttype:CONST},
{input:"\\unlhd",	tag:"mo", output:"\u22B4", ttype:CONST},
{input:"\\unrhd",	tag:"mo", output:"\u22B5", ttype:CONST},


//BIG Operators
{input:"\\sum",		tag:"mo", output:"\u2211", ttype:UNDEROVER},
{input:"\\prod",	tag:"mo", output:"\u220F", ttype:UNDEROVER},
{input:"\\bigcap",	tag:"mo", output:"\u22C2", ttype:UNDEROVER},
{input:"\\bigcup",	tag:"mo", output:"\u22C3", ttype:UNDEROVER},
{input:"\\bigwedge",	tag:"mo", output:"\u22C0", ttype:UNDEROVER},
{input:"\\bigvee",	tag:"mo", output:"\u22C1", ttype:UNDEROVER},
{input:"\\bigsqcap",	tag:"mo", output:"\u2A05", ttype:UNDEROVER},
{input:"\\bigsqcup",	tag:"mo", output:"\u2A06", ttype:UNDEROVER},
{input:"\\coprod",	tag:"mo", output:"\u2210", ttype:UNDEROVER},
{input:"\\bigoplus",	tag:"mo", output:"\u2A01", ttype:UNDEROVER},
{input:"\\bigotimes",	tag:"mo", output:"\u2A02", ttype:UNDEROVER},
{input:"\\bigodot",	tag:"mo", output:"\u2A00", ttype:UNDEROVER},
{input:"\\biguplus",	tag:"mo", output:"\u2A04", ttype:UNDEROVER},
{input:"\\int",		tag:"mo", output:"\u222B", ttype:CONST},
{input:"\\oint",	tag:"mo", output:"\u222E", ttype:CONST},

//binary relation symbols
{input:":=",		tag:"mo", output:":=",	   ttype:CONST},
{input:"\\lt",		tag:"mo", output:"<",	   ttype:CONST},
{input:"\\gt",		tag:"mo", output:">",	   ttype:CONST},
{input:"\\ne",		tag:"mo", output:"\u2260", ttype:CONST},
{input:"\\neq",		tag:"mo", output:"\u2260", ttype:CONST},
{input:"\\le",		tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\leq",		tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\leqslant",	tag:"mo", output:"\u2264", ttype:CONST},
{input:"\\ge",		tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\geq",		tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\geqslant",	tag:"mo", output:"\u2265", ttype:CONST},
{input:"\\equiv",	tag:"mo", output:"\u2261", ttype:CONST},
{input:"\\ll",		tag:"mo", output:"\u226A", ttype:CONST},
{input:"\\gg",		tag:"mo", output:"\u226B", ttype:CONST},
{input:"\\doteq",	tag:"mo", output:"\u2250", ttype:CONST},
{input:"\\prec",	tag:"mo", output:"\u227A", ttype:CONST},
{input:"\\succ",	tag:"mo", output:"\u227B", ttype:CONST},
{input:"\\preceq",	tag:"mo", output:"\u227C", ttype:CONST},
{input:"\\succeq",	tag:"mo", output:"\u227D", ttype:CONST},
{input:"\\subset",	tag:"mo", output:"\u2282", ttype:CONST},
{input:"\\supset",	tag:"mo", output:"\u2283", ttype:CONST},
{input:"\\subseteq",	tag:"mo", output:"\u2286", ttype:CONST},
{input:"\\supseteq",	tag:"mo", output:"\u2287", ttype:CONST},
{input:"\\sqsubset",	tag:"mo", output:"\u228F", ttype:CONST},
{input:"\\sqsupset",	tag:"mo", output:"\u2290", ttype:CONST},
{input:"\\sqsubseteq",  tag:"mo", output:"\u2291", ttype:CONST},
{input:"\\sqsupseteq",  tag:"mo", output:"\u2292", ttype:CONST},
{input:"\\sim",		tag:"mo", output:"\u223C", ttype:CONST},
{input:"\\simeq",	tag:"mo", output:"\u2243", ttype:CONST},
{input:"\\approx",	tag:"mo", output:"\u2248", ttype:CONST},
{input:"\\cong",	tag:"mo", output:"\u2245", ttype:CONST},
{input:"\\Join",	tag:"mo", output:"\u22C8", ttype:CONST},
{input:"\\bowtie",	tag:"mo", output:"\u22C8", ttype:CONST},
{input:"\\in",		tag:"mo", output:"\u2208", ttype:CONST},
{input:"\\ni",		tag:"mo", output:"\u220B", ttype:CONST},
{input:"\\owns",	tag:"mo", output:"\u220B", ttype:CONST},
{input:"\\propto",	tag:"mo", output:"\u221D", ttype:CONST},
{input:"\\vdash",	tag:"mo", output:"\u22A2", ttype:CONST},
{input:"\\dashv",	tag:"mo", output:"\u22A3", ttype:CONST},
{input:"\\models",	tag:"mo", output:"\u22A8", ttype:CONST},
{input:"\\perp",	tag:"mo", output:"\u22A5", ttype:CONST},
{input:"\\smile",	tag:"mo", output:"\u2323", ttype:CONST},
{input:"\\frown",	tag:"mo", output:"\u2322", ttype:CONST},
{input:"\\asymp",	tag:"mo", output:"\u224D", ttype:CONST},
{input:"\\notin",	tag:"mo", output:"\u2209", ttype:CONST},

//matrices
{input:"\\begin{eqnarray}",	output:"X",	ttype:MATRIX, invisible:true},
{input:"\\begin{array}",	output:"X",	ttype:MATRIX, invisible:true},
{input:"\\\\",			output:"}&{",	ttype:DEFINITION},
{input:"\\end{eqnarray}",	output:"}}",	ttype:DEFINITION},
{input:"\\end{array}",		output:"}}",	ttype:DEFINITION},

//grouping and literal brackets -- ieval is for IE
{input:"\\big",	   tag:"mo", output:"X", atval:"1.2", ieval:"2.2", ttype:BIG},
{input:"\\Big",	   tag:"mo", output:"X", atval:"1.6", ieval:"2.6", ttype:BIG},
{input:"\\bigg",   tag:"mo", output:"X", atval:"2.2", ieval:"3.2", ttype:BIG},
{input:"\\Bigg",   tag:"mo", output:"X", atval:"2.9", ieval:"3.9", ttype:BIG},
{input:"\\left",   tag:"mo", output:"X", ttype:LEFTBRACKET},
{input:"\\right",  tag:"mo", output:"X", ttype:RIGHTBRACKET},
{input:"{",	   output:"{", ttype:LEFTBRACKET,  invisible:true},
{input:"}",	   output:"}", ttype:RIGHTBRACKET, invisible:true},

{input:"(",	   tag:"mo", output:"(",      atval:"1", ttype:STRETCHY},
{input:"[",	   tag:"mo", output:"[",      atval:"1", ttype:STRETCHY},
{input:"\\lbrack", tag:"mo", output:"[",      atval:"1", ttype:STRETCHY},
{input:"\\{",	   tag:"mo", output:"{",      atval:"1", ttype:STRETCHY},
{input:"\\lbrace", tag:"mo", output:"{",      atval:"1", ttype:STRETCHY},
{input:"\\langle", tag:"mo", output:"\u2329", atval:"1", ttype:STRETCHY},
{input:"\\lfloor", tag:"mo", output:"\u230A", atval:"1", ttype:STRETCHY},
{input:"\\lceil",  tag:"mo", output:"\u2308", atval:"1", ttype:STRETCHY},

// rtag:"mi" causes space to be inserted before a following sin, cos, etc.
// (see function LMparseExpr() )
{input:")",	  tag:"mo",output:")",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"]",	  tag:"mo",output:"]",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rbrack",tag:"mo",output:"]",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\}",	  tag:"mo",output:"}",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rbrace",tag:"mo",output:"}",	    rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rangle",tag:"mo",output:"\u232A", rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rfloor",tag:"mo",output:"\u230B", rtag:"mi",atval:"1",ttype:STRETCHY},
{input:"\\rceil", tag:"mo",output:"\u2309", rtag:"mi",atval:"1",ttype:STRETCHY},

// "|", "\\|", "\\vert" and "\\Vert" modified later: lspace = rspace = 0em
{input:"|",		tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\|",		tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"\\vert",	tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\Vert",	tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"\\mid",		tag:"mo", output:"\u2223", atval:"1", ttype:STRETCHY},
{input:"\\parallel",	tag:"mo", output:"\u2225", atval:"1", ttype:STRETCHY},
{input:"/",		tag:"mo", output:"/",	atval:"1.01", ttype:STRETCHY},
{input:"\\backslash",	tag:"mo", output:"\u2216", atval:"1", ttype:STRETCHY},
{input:"\\setminus",	tag:"mo", output:"\\",	   ttype:CONST},

//miscellaneous symbols
{input:"\\!",	  tag:"mspace", atname:"width", atval:"-0.167em", ttype:SPACE},
{input:"\\,",	  tag:"mspace", atname:"width", atval:"0.167em", ttype:SPACE},
{input:"\\>",	  tag:"mspace", atname:"width", atval:"0.222em", ttype:SPACE},
{input:"\\:",	  tag:"mspace", atname:"width", atval:"0.222em", ttype:SPACE},
{input:"\\;",	  tag:"mspace", atname:"width", atval:"0.278em", ttype:SPACE},
{input:"~",	  tag:"mspace", atname:"width", atval:"0.333em", ttype:SPACE},
{input:"\\quad",  tag:"mspace", atname:"width", atval:"1em", ttype:SPACE},
{input:"\\qquad", tag:"mspace", atname:"width", atval:"2em", ttype:SPACE},
//{input:"{}",		  tag:"mo", output:"\u200B", ttype:CONST}, // zero-width
{input:"\\prime",	tag:"mo", output:"\u2032", ttype:CONST},
{input:"'",		tag:"mo", output:"\u02B9", ttype:CONST},
{input:"''",		tag:"mo", output:"\u02BA", ttype:CONST},
{input:"'''",		tag:"mo", output:"\u2034", ttype:CONST},
{input:"''''",		tag:"mo", output:"\u2057", ttype:CONST},
{input:"\\ldots",	tag:"mo", output:"\u2026", ttype:CONST},
{input:"\\cdots",	tag:"mo", output:"\u22EF", ttype:CONST},
{input:"\\vdots",	tag:"mo", output:"\u22EE", ttype:CONST},
{input:"\\ddots",	tag:"mo", output:"\u22F1", ttype:CONST},
{input:"\\forall",	tag:"mo", output:"\u2200", ttype:CONST},
{input:"\\exists",	tag:"mo", output:"\u2203", ttype:CONST},
{input:"\\Re",		tag:"mo", output:"\u211C", ttype:CONST},
{input:"\\Im",		tag:"mo", output:"\u2111", ttype:CONST},
{input:"\\aleph",	tag:"mo", output:"\u2135", ttype:CONST},
{input:"\\hbar",	tag:"mo", output:"\u210F", ttype:CONST},
{input:"\\ell",		tag:"mo", output:"\u2113", ttype:CONST},
{input:"\\wp",		tag:"mo", output:"\u2118", ttype:CONST},
{input:"\\emptyset",	tag:"mo", output:"\u2205", ttype:CONST},
{input:"\\infty",	tag:"mo", output:"\u221E", ttype:CONST},
{input:"\\surd",	tag:"mo", output:"\\sqrt{}", ttype:DEFINITION},
{input:"\\partial",	tag:"mo", output:"\u2202", ttype:CONST},
{input:"\\nabla",	tag:"mo", output:"\u2207", ttype:CONST},
{input:"\\triangle",	tag:"mo", output:"\u25B3", ttype:CONST},
{input:"\\therefore",	tag:"mo", output:"\u2234", ttype:CONST},
{input:"\\angle",	tag:"mo", output:"\u2220", ttype:CONST},
//{input:"\\\\ ",	  tag:"mo", output:"\u00A0", ttype:CONST},
{input:"\\diamond",	tag:"mo", output:"\u22C4", ttype:CONST},
//{input:"\\Diamond",	  tag:"mo", output:"\u25CA", ttype:CONST},
{input:"\\Diamond",	tag:"mo", output:"\u25C7", ttype:CONST},
{input:"\\neg",		tag:"mo", output:"\u00AC", ttype:CONST},
{input:"\\lnot",	tag:"mo", output:"\u00AC", ttype:CONST},
{input:"\\bot",		tag:"mo", output:"\u22A5", ttype:CONST},
{input:"\\top",		tag:"mo", output:"\u22A4", ttype:CONST},
{input:"\\square",	tag:"mo", output:"\u25AB", ttype:CONST},
{input:"\\Box",		tag:"mo", output:"\u25A1", ttype:CONST},
{input:"\\wr",		tag:"mo", output:"\u2240", ttype:CONST},

//standard functions
//Note UNDEROVER *must* have tag:"mo" to work properly
{input:"\\arccos", tag:"mi", output:"arccos", ttype:UNARY, func:true},
{input:"\\arcsin", tag:"mi", output:"arcsin", ttype:UNARY, func:true},
{input:"\\arctan", tag:"mi", output:"arctan", ttype:UNARY, func:true},
{input:"\\arg",	   tag:"mi", output:"arg",    ttype:UNARY, func:true},
{input:"\\cos",	   tag:"mi", output:"cos",    ttype:UNARY, func:true},
{input:"\\cosh",   tag:"mi", output:"cosh",   ttype:UNARY, func:true},
{input:"\\cot",	   tag:"mi", output:"cot",    ttype:UNARY, func:true},
{input:"\\coth",   tag:"mi", output:"coth",   ttype:UNARY, func:true},
{input:"\\csc",	   tag:"mi", output:"csc",    ttype:UNARY, func:true},
{input:"\\deg",	   tag:"mi", output:"deg",    ttype:UNARY, func:true},
{input:"\\det",	   tag:"mi", output:"det",    ttype:UNARY, func:true},
{input:"\\dim",	   tag:"mi", output:"dim",    ttype:UNARY, func:true}, //CONST?
{input:"\\exp",	   tag:"mi", output:"exp",    ttype:UNARY, func:true},
{input:"\\gcd",	   tag:"mi", output:"gcd",    ttype:UNARY, func:true}, //CONST?
{input:"\\hom",	   tag:"mi", output:"hom",    ttype:UNARY, func:true},
{input:"\\inf",	      tag:"mo", output:"inf",	 ttype:UNDEROVER},
{input:"\\ker",	   tag:"mi", output:"ker",    ttype:UNARY, func:true},
{input:"\\lg",	   tag:"mi", output:"lg",     ttype:UNARY, func:true},
{input:"\\lim",	      tag:"mo", output:"lim",	 ttype:UNDEROVER},
{input:"\\liminf",    tag:"mo", output:"liminf", ttype:UNDEROVER},
{input:"\\limsup",    tag:"mo", output:"limsup", ttype:UNDEROVER},
{input:"\\ln",	   tag:"mi", output:"ln",     ttype:UNARY, func:true},
{input:"\\log",	   tag:"mi", output:"log",    ttype:UNARY, func:true},
{input:"\\max",	      tag:"mo", output:"max",	 ttype:UNDEROVER},
{input:"\\min",	      tag:"mo", output:"min",	 ttype:UNDEROVER},
{input:"\\Pr",	   tag:"mi", output:"Pr",     ttype:UNARY, func:true},
{input:"\\sec",	   tag:"mi", output:"sec",    ttype:UNARY, func:true},
{input:"\\sin",	   tag:"mi", output:"sin",    ttype:UNARY, func:true},
{input:"\\sinh",   tag:"mi", output:"sinh",   ttype:UNARY, func:true},
{input:"\\sup",	      tag:"mo", output:"sup",	 ttype:UNDEROVER},
{input:"\\tan",	   tag:"mi", output:"tan",    ttype:UNARY, func:true},
{input:"\\tanh",   tag:"mi", output:"tanh",   ttype:UNARY, func:true},

//arrows
{input:"\\gets",		tag:"mo", output:"\u2190", ttype:CONST},
{input:"\\leftarrow",		tag:"mo", output:"\u2190", ttype:CONST},
{input:"\\to",			tag:"mo", output:"\u2192", ttype:CONST},
{input:"\\rightarrow",		tag:"mo", output:"\u2192", ttype:CONST},
{input:"\\leftrightarrow",	tag:"mo", output:"\u2194", ttype:CONST},
{input:"\\uparrow",		tag:"mo", output:"\u2191", ttype:CONST},
{input:"\\downarrow",		tag:"mo", output:"\u2193", ttype:CONST},
{input:"\\updownarrow",		tag:"mo", output:"\u2195", ttype:CONST},
{input:"\\Leftarrow",		tag:"mo", output:"\u21D0", ttype:CONST},
{input:"\\Rightarrow",		tag:"mo", output:"\u21D2", ttype:CONST},
{input:"\\Leftrightarrow",	tag:"mo", output:"\u21D4", ttype:CONST},
{input:"\\iff", tag:"mo", output:"~\\Longleftrightarrow~", ttype:DEFINITION},
{input:"\\Uparrow",		tag:"mo", output:"\u21D1", ttype:CONST},
{input:"\\Downarrow",		tag:"mo", output:"\u21D3", ttype:CONST},
{input:"\\Updownarrow",		tag:"mo", output:"\u21D5", ttype:CONST},
{input:"\\mapsto",		tag:"mo", output:"\u21A6", ttype:CONST},
{input:"\\longleftarrow",	tag:"mo", output:"\u2190", ttype:LONG},
{input:"\\longrightarrow",	tag:"mo", output:"\u2192", ttype:LONG},
{input:"\\longleftrightarrow",	tag:"mo", output:"\u2194", ttype:LONG},
{input:"\\Longleftarrow",	tag:"mo", output:"\u21D0", ttype:LONG},
{input:"\\Longrightarrow",	tag:"mo", output:"\u21D2", ttype:LONG},
{input:"\\Longleftrightarrow",  tag:"mo", output:"\u21D4", ttype:LONG},
{input:"\\longmapsto",		tag:"mo", output:"\u21A6", ttype:CONST},
							// disaster if LONG

//commands with argument
LMsqrt, LMroot, LMfrac, LMover, LMsub, LMsup, LMtext, LMmbox, LMatop, LMchoose,
//LMdiv, LMquote,

//diacritical marks
{input:"\\acute",	tag:"mover",  output:"\u00B4", ttype:UNARY, acc:true},
//{input:"\\acute",	  tag:"mover",  output:"\u0317", ttype:UNARY, acc:true},
//{input:"\\acute",	  tag:"mover",  output:"\u0301", ttype:UNARY, acc:true},
//{input:"\\grave",	  tag:"mover",  output:"\u0300", ttype:UNARY, acc:true},
//{input:"\\grave",	  tag:"mover",  output:"\u0316", ttype:UNARY, acc:true},
{input:"\\grave",	tag:"mover",  output:"\u0060", ttype:UNARY, acc:true},
{input:"\\breve",	tag:"mover",  output:"\u02D8", ttype:UNARY, acc:true},
{input:"\\check",	tag:"mover",  output:"\u02C7", ttype:UNARY, acc:true},
{input:"\\dot",		tag:"mover",  output:".",      ttype:UNARY, acc:true},
{input:"\\ddot",	tag:"mover",  output:"..",     ttype:UNARY, acc:true},
//{input:"\\ddot",	  tag:"mover",  output:"\u00A8", ttype:UNARY, acc:true},
{input:"\\mathring",	tag:"mover",  output:"\u00B0", ttype:UNARY, acc:true},
{input:"\\vec",		tag:"mover",  output:"\u20D7", ttype:UNARY, acc:true},
{input:"\\overrightarrow",tag:"mover",output:"\u20D7", ttype:UNARY, acc:true},
{input:"\\overleftarrow",tag:"mover", output:"\u20D6", ttype:UNARY, acc:true},
{input:"\\hat",		tag:"mover",  output:"\u005E", ttype:UNARY, acc:true},
{input:"\\widehat",	tag:"mover",  output:"\u0302", ttype:UNARY, acc:true},
{input:"\\tilde",	tag:"mover",  output:"~",      ttype:UNARY, acc:true},
//{input:"\\tilde",	  tag:"mover",  output:"\u0303", ttype:UNARY, acc:true},
{input:"\\widetilde",	tag:"mover",  output:"\u02DC", ttype:UNARY, acc:true},
{input:"\\bar",		tag:"mover",  output:"\u203E", ttype:UNARY, acc:true},
{input:"\\overbrace",	tag:"mover",  output:"\u23B4", ttype:UNARY, acc:true},
{input:"\\overline",	tag:"mover",  output:"\u00AF", ttype:UNARY, acc:true},
{input:"\\underbrace",  tag:"munder", output:"\u23B5", ttype:UNARY, acc:true},
{input:"\\underline",	tag:"munder", output:"\u00AF", ttype:UNARY, acc:true},
//{input:"underline",	tag:"munder", output:"\u0332", ttype:UNARY, acc:true},

//typestyles and fonts
{input:"\\displaystyle",tag:"mstyle",atname:"displaystyle",atval:"true", ttype:UNARY},
{input:"\\textstyle",tag:"mstyle",atname:"displaystyle",atval:"false", ttype:UNARY},
{input:"\\scriptstyle",tag:"mstyle",atname:"scriptlevel",atval:"1", ttype:UNARY},
{input:"\\scriptscriptstyle",tag:"mstyle",atname:"scriptlevel",atval:"2", ttype:UNARY},
{input:"\\textrm", tag:"mstyle", output:"\\mathrm", ttype: DEFINITION},
{input:"\\mathbf", tag:"mstyle", atname:"mathvariant", atval:"bold", ttype:UNARY},
{input:"\\textbf", tag:"mstyle", atname:"mathvariant", atval:"bold", ttype:UNARY},
{input:"\\mathit", tag:"mstyle", atname:"mathvariant", atval:"italic", ttype:UNARY},
{input:"\\textit", tag:"mstyle", atname:"mathvariant", atval:"italic", ttype:UNARY},
{input:"\\mathtt", tag:"mstyle", atname:"mathvariant", atval:"monospace", ttype:UNARY},
{input:"\\texttt", tag:"mstyle", atname:"mathvariant", atval:"monospace", ttype:UNARY},
{input:"\\mathsf", tag:"mstyle", atname:"mathvariant", atval:"sans-serif", ttype:UNARY},
{input:"\\mathbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", ttype:UNARY, codes:LMbbb},
{input:"\\mathcal",tag:"mstyle", atname:"mathvariant", atval:"script", ttype:UNARY, codes:LMcal},
{input:"\\mathfrak",tag:"mstyle",atname:"mathvariant", atval:"fraktur",ttype:UNARY, codes:LMfrk}
];

function compareNames(s1,s2) {
  if (s1.input > s2.input) return 1
  else return -1;
}

var LMnames = []; //list of input symbols

function LMinitSymbols() {
  LMsymbols.sort(compareNames);
  for (i=0; i<LMsymbols.length; i++) LMnames[i] = LMsymbols[i].input;
}

var LMmathml = "http://www.w3.org/1998/Math/MathML";

function LMcreateElementMathML(t) {
  if (isIE) return document.createElement("m:"+t);
  else return document.createElementNS(LMmathml,t);
}

function LMcreateMmlNode(t,frag) {
//  var node = LMcreateElementMathML(name);
  if (isIE) var node = document.createElement("m:"+t);
  else var node = document.createElementNS(LMmathml,t);
  node.appendChild(frag);
  return node;
}

function newcommand(oldstr,newstr) {
  LMsymbols = LMsymbols.concat([{input:oldstr, tag:"mo", output:newstr,
                                 ttype:DEFINITION}]);
}

function LMremoveCharsAndBlanks(str,n) {
//remove n characters and any following blanks
  var st;
  st = str.slice(n);
  for (var i=0; i<st.length && st.charCodeAt(i)<=32; i=i+1);
  return st.slice(i);
}

function LMposition(arr, str, n) {
// return position >=n where str appears or would be inserted
// assumes arr is sorted
  if (n==0) {
    var h,m;
    n = -1;
    h = arr.length;
    while (n+1<h) {
      m = (n+h) >> 1;
      if (arr[m]<str) n = m; else h = m;
    }
    return h;
  } else
    for (var i=n; i<arr.length && arr[i]<str; i++);
  return i; // i=arr.length || arr[i]>=str
}

function LMgetSymbol(str) {
//return maximal initial substring of str that appears in names
//return null if there is none
  var k = 0; //new pos
  var j = 0; //old pos
  var mk; //match pos
  var st;
  var tagst;
  var match = "";
  var more = true;
  for (var i=1; i<=str.length && more; i++) {
    st = str.slice(0,i); //initial substring of length i
    j = k;
    k = LMposition(LMnames, st, j);
    if (k<LMnames.length && str.slice(0,LMnames[k].length)==LMnames[k]){
      match = LMnames[k];
      mk = k;
      i = match.length;
    }
    more = k<LMnames.length && str.slice(0,LMnames[k].length)>=LMnames[k];
  }
  LMpreviousSymbol=LMcurrentSymbol;
  if (match!=""){
    LMcurrentSymbol=LMsymbols[mk].ttype;
    return LMsymbols[mk];
  }
  LMcurrentSymbol=CONST;
  k = 1;
  st = str.slice(0,1); //take 1 character
  if ("0"<=st && st<="9") tagst = "mn";
  else tagst = (("A">st || st>"Z") && ("a">st || st>"z")?"mo":"mi");
/*
// Commented out by DRW (not fully understood, but probably to do with
// use of "/" as an INFIX version of "\\frac", which we don't want):
//}
//if (st=="-" && LMpreviousSymbol==INFIX) {
//  LMcurrentSymbol = INFIX;  //trick "/" into recognizing "-" on second parse
//  return {input:st, tag:tagst, output:st, ttype:UNARY, func:true};
//}
*/
  return {input:st, tag:tagst, output:st, ttype:CONST};
}


/*Parsing ASCII math expressions with the following grammar
v ::= [A-Za-z] | greek letters | numbers | other constant symbols
u ::= sqrt | text | bb | other unary symbols for font commands
b ::= frac | root | stackrel	binary symbols
l ::= { | \left			left brackets
r ::= } | \right		right brackets
S ::= v | lEr | uS | bSS	Simple expression
I ::= S_S | S^S | S_S^S | S	Intermediate expression
E ::= IE | I/I			Expression
Each terminal symbol is translated into a corresponding mathml node.*/

var LMpreviousSymbol,LMcurrentSymbol;

function LMparseSexpr(str) { //parses str and returns [node,tailstr,(node)tag]
  var symbol, node, result, result2, i, st,// rightvert = false,
    newFrag = document.createDocumentFragment();
  str = LMremoveCharsAndBlanks(str,0);
  symbol = LMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET)
    return [null,str,null];
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+LMremoveCharsAndBlanks(str,symbol.input.length);
    symbol = LMgetSymbol(str);
    if (symbol == null || symbol.ttype == RIGHTBRACKET)
      return [null,str,null];
  }
  str = LMremoveCharsAndBlanks(str,symbol.input.length);
  switch (symbol.ttype) {
  case SPACE:
    node = LMcreateElementMathML(symbol.tag);
    node.setAttribute(symbol.atname,symbol.atval);
    return [node,str,symbol.tag];
  case UNDEROVER:
    if (isIE) {
      if (symbol.input.substr(0,4) == "\\big") {   // botch for missing symbols
	str = "\\"+symbol.input.substr(4)+str;	   // make \bigcup = \cup etc.
	symbol = LMgetSymbol(str);
	symbol.ttype = UNDEROVER;
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    return [LMcreateMmlNode(symbol.tag,
			document.createTextNode(symbol.output)),str,symbol.tag];
  case CONST:
    var output = symbol.output;
    if (isIE) {
      if (symbol.input == "'")
	output = "\u2032";
      else if (symbol.input == "''")
	output = "\u2033";
      else if (symbol.input == "'''")
	output = "\u2033\u2032";
      else if (symbol.input == "''''")
	output = "\u2033\u2033";
      else if (symbol.input == "\\square")
	output = "\u25A1";	// same as \Box
      else if (symbol.input.substr(0,5) == "\\frac") {
						// botch for missing fractions
	var denom = symbol.input.substr(6,1);
	if (denom == "5" || denom == "6") {
	  str = symbol.input.replace(/\\frac/,"\\frac ")+str;
	  return [node,str,symbol.tag];
	}
      }
    }
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(output));
    return [node,str,symbol.tag];
  case LONG:  // added by DRW
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    node.setAttribute("minsize","1.5");
    node.setAttribute("maxsize","1.5");
    node = LMcreateMmlNode("mover",node);
    node.appendChild(LMcreateElementMathML("mspace"));
    return [node,str,symbol.tag];
  case STRETCHY:  // added by DRW
    if (isIE && symbol.input == "\\backslash")
	symbol.output = "\\";	// doesn't expand, but then nor does "\u2216"
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (symbol.input == "|" || symbol.input == "\\vert" ||
	symbol.input == "\\|" || symbol.input == "\\Vert") {
	  node.setAttribute("lspace","0em");
	  node.setAttribute("rspace","0em");
    }
    node.setAttribute("maxsize",symbol.atval);  // don't allow to stretch here
    if (symbol.rtag != null)
      return [node,str,symbol.rtag];
    else
      return [node,str,symbol.tag];
  case BIG:  // added by DRW
    var atval = symbol.atval;
    if (isIE)
      atval = symbol.ieval;
    symbol = LMgetSymbol(str);
    if (symbol == null)
	return [null,str,null];
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (isIE) {		// to get brackets to expand
      var space = LMcreateElementMathML("mspace");
      space.setAttribute("height",atval+"ex");
      node = LMcreateMmlNode("mrow",node);
      node.appendChild(space);
    } else {		// ignored in IE
      node.setAttribute("minsize",atval);
      node.setAttribute("maxsize",atval);
    }
    return [node,str,symbol.tag];
  case LEFTBRACKET:   //read (expr+)
    if (symbol.input == "\\left") { // left what?
      symbol = LMgetSymbol(str);
      if (symbol != null) {
	if (symbol.input == ".")
	  symbol.invisible = true;
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    result = LMparseExpr(str,true,false);
    if (symbol==null ||
	(typeof symbol.invisible == "boolean" && symbol.invisible))
      node = LMcreateMmlNode("mrow",result[0]);
    else {
      node = LMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = LMcreateMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1],result[2]];
  case MATRIX:	 //read (expr+)
    if (symbol.input == "\\begin{array}") {
      var mask = "";
      symbol = LMgetSymbol(str);
      str = LMremoveCharsAndBlanks(str,0);
      if (symbol == null)
	mask = "l";
      else {
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
	if (symbol.input != "{")
	  mask = "l";
	else do {
	  symbol = LMgetSymbol(str);
	  if (symbol != null) {
	    str = LMremoveCharsAndBlanks(str,symbol.input.length);
	    if (symbol.input != "}")
	      mask = mask+symbol.input;
	  }
	} while (symbol != null && symbol.input != "" && symbol.input != "}");
      }
      result = LMparseExpr("{"+str,true,true);
//    if (result[0]==null) return [LMcreateMmlNode("mo",
//			   document.createTextNode(symbol.input)),str];
      node = LMcreateMmlNode("mtable",result[0]);
      mask = mask.replace(/l/g,"left ");
      mask = mask.replace(/r/g,"right ");
      mask = mask.replace(/c/g,"center ");
      node.setAttribute("columnalign",mask);
      node.setAttribute("displaystyle","false");
      if (isIE)
	return [node,result[1],null];
// trying to get a *little* bit of space around the array
// (IE already includes it)
      var lspace = LMcreateElementMathML("mspace");
      lspace.setAttribute("width","0.167em");
      var rspace = LMcreateElementMathML("mspace");
      rspace.setAttribute("width","0.167em");
      var node1 = LMcreateMmlNode("mrow",lspace);
      node1.appendChild(node);
      node1.appendChild(rspace);
      return [node1,result[1],null];
    } else {	// eqnarray
      result = LMparseExpr("{"+str,true,true);
      node = LMcreateMmlNode("mtable",result[0]);
      if (isIE)
	node.setAttribute("columnspacing","0.25em"); // best in practice?
      else
	node.setAttribute("columnspacing","0.167em"); // correct (but ignored?)
      node.setAttribute("columnalign","right center left");
      node.setAttribute("displaystyle","true");
      node = LMcreateMmlNode("mrow",node);
      return [node,result[1],null];
    }
  case TEXT:
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else i = 0;
      if (i==-1)
		 i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
	node = LMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      newFrag.appendChild(
        LMcreateMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
	node = LMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      str = LMremoveCharsAndBlanks(str,i+1);
      return [LMcreateMmlNode("mrow",newFrag),str,null];
  case UNARY:
      result = LMparseSexpr(str);
      if (result[0]==null) return [LMcreateMmlNode(symbol.tag,
                             document.createTextNode(symbol.output)),str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
	st = str.charAt(0);
//	if (st=="^" || st=="_" || st=="/" || st=="|" || st==",") {
	if (st=="^" || st=="_" || st==",") {
	  return [LMcreateMmlNode(symbol.tag,
		    document.createTextNode(symbol.output)),str,symbol.tag];
        } else {
	  node = LMcreateMmlNode("mrow",
	   LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)));
	  if (isIE) {
	    var space = LMcreateElementMathML("mspace");
	    space.setAttribute("width","0.167em");
	    node.appendChild(space);
	  }
	  node.appendChild(result[0]);
	  return [node,result[1],symbol.tag];
        }
      }
      if (symbol.input == "\\sqrt") {		// sqrt
	if (isIE) {	// set minsize, for \surd
	  var space = LMcreateElementMathML("mspace");
	  space.setAttribute("height","1.2ex");
	  space.setAttribute("width","0em");	// probably no effect
	  node = LMcreateMmlNode(symbol.tag,result[0])
//	  node.setAttribute("minsize","1");	// ignored
//	  node = LMcreateMmlNode("mrow",node);  // hopefully unnecessary
	  node.appendChild(space);
	  return [node,result[1],symbol.tag];
	} else
	  return [LMcreateMmlNode(symbol.tag,result[0]),result[1],symbol.tag];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
        node = LMcreateMmlNode(symbol.tag,result[0]);
	var output = symbol.output;
	if (isIE) {
		if (symbol.input == "\\hat")
			output = "\u0302";
		else if (symbol.input == "\\widehat")
			output = "\u005E";
		else if (symbol.input == "\\bar")
			output = "\u00AF";
		else if (symbol.input == "\\grave")
			output = "\u0300";
		else if (symbol.input == "\\tilde")
			output = "\u0303";
	}
	var node1 = LMcreateMmlNode("mo",document.createTextNode(output));
	if (symbol.input == "\\vec" || symbol.input == "\\check")
						// don't allow to stretch
	    node1.setAttribute("maxsize","1.2");
		 // why doesn't "1" work?  \vec nearly disappears in firefox
	if (isIE && symbol.input == "\\bar")
	    node1.setAttribute("maxsize","0.5");
	if (symbol.input == "\\underbrace" || symbol.input == "\\underline")
	  node1.setAttribute("accentunder","true");
	else
	  node1.setAttribute("accent","true");
	node.appendChild(node1);
	if (symbol.input == "\\overbrace" || symbol.input == "\\underbrace")
	  node.ttype = UNDEROVER;
	return [node,result[1],symbol.tag];
      } else {			      // font change or displaystyle command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
		if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91) newst
= newst +
                    symbol.codes[st.charCodeAt(j)-65];
                else if (st.charCodeAt(j)>96 && st.charCodeAt(j)<123)
newst = newst +
                    symbol.codes[st.charCodeAt(j)-71];
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=LMcreateElementMathML("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(LMcreateElementMathML("mo").
          appendChild(document.createTextNode(newst)),result[0].childNodes[i]);
            }
        }
        node = LMcreateMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
	if (symbol.input == "\\scriptstyle" ||
	    symbol.input == "\\scriptscriptstyle")
		node.setAttribute("displaystyle","false");
	return [node,result[1],symbol.tag];
      }
  case BINARY:
    result = LMparseSexpr(str);
    if (result[0]==null) return [LMcreateMmlNode("mo",
			   document.createTextNode(symbol.input)),str,null];
    result2 = LMparseSexpr(result[1]);
    if (result2[0]==null) return [LMcreateMmlNode("mo",
			   document.createTextNode(symbol.input)),str,null];
    if (symbol.input=="\\root" || symbol.input=="\\stackrel")
      newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol.input=="\\frac") newFrag.appendChild(result2[0]);
    return [LMcreateMmlNode(symbol.tag,newFrag),result2[1],symbol.tag];
  case INFIX:
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    return [LMcreateMmlNode("mo",document.createTextNode(symbol.output)),
	str,symbol.tag];
  default:
    return [LMcreateMmlNode(symbol.tag,        //its a constant
	document.createTextNode(symbol.output)),str,symbol.tag];
  }
}

function LMparseIexpr(str) {
  var symbol, sym1, sym2, node, result, tag, underover;
  str = LMremoveCharsAndBlanks(str,0);
  sym1 = LMgetSymbol(str);
  result = LMparseSexpr(str);
  node = result[0];
  str = result[1];
  tag = result[2];
  symbol = LMgetSymbol(str);
  if (symbol.ttype == INFIX) {
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    result = LMparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
      result[0] = LMcreateMmlNode("mo",document.createTextNode("\u25A1"));
    str = result[1];
    tag = result[2];
    if (symbol.input == "_" || symbol.input == "^") {
      sym2 = LMgetSymbol(str);
      tag = null;	// no space between x^2 and a following sin, cos, etc.
// This is for \underbrace and \overbrace
      underover = ((sym1.ttype == UNDEROVER) || (node.ttype == UNDEROVER));
//    underover = (sym1.ttype == UNDEROVER);
      if (symbol.input == "_" && sym2.input == "^") {
        str = LMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = LMparseSexpr(str);
	str = res2[1];
	tag = res2[2];  // leave space between x_1^2 and a following sin etc.
        node = LMcreateMmlNode((underover?"munderover":"msubsup"),node);
        node.appendChild(result[0]);
        node.appendChild(res2[0]);
      } else if (symbol.input == "_") {
	node = LMcreateMmlNode((underover?"munder":"msub"),node);
        node.appendChild(result[0]);
      } else {
	node = LMcreateMmlNode((underover?"mover":"msup"),node);
        node.appendChild(result[0]);
      }
      node = LMcreateMmlNode("mrow",node); // so sum does not stretch
    } else {
      node = LMcreateMmlNode(symbol.tag,node);
      if (symbol.input == "\\atop" || symbol.input == "\\choose")
	node.setAttribute("linethickness","0ex");
      node.appendChild(result[0]);
      if (symbol.input == "\\choose")
	node = LMcreateMmlNode("mfenced",node);
    }
  }
  return [node,str,tag];
}

function LMparseExpr(str,rightbracket,matrix) {
  var symbol, node, result, i, tag,
  newFrag = document.createDocumentFragment();
  do {
    str = LMremoveCharsAndBlanks(str,0);
    result = LMparseIexpr(str);
    node = result[0];
    str = result[1];
    tag = result[2];
    symbol = LMgetSymbol(str);
    if (node!=undefined) {
      if ((tag == "mn" || tag == "mi") && symbol!=null &&
	typeof symbol.func == "boolean" && symbol.func) {
			// Add space before \sin in 2\sin x or x\sin x
	  var space = LMcreateElementMathML("mspace");
	  space.setAttribute("width","0.167em");
	  node = LMcreateMmlNode("mrow",node);
	  node.appendChild(space);
      }
      newFrag.appendChild(node);
    }
  } while ((symbol.ttype != RIGHTBRACKET)
        && symbol!=null && symbol.output!="");
  tag = null;
  if (symbol.ttype == RIGHTBRACKET) {
    if (symbol.input == "\\right") { // right what?
      str = LMremoveCharsAndBlanks(str,symbol.input.length);
      symbol = LMgetSymbol(str);
      if (symbol != null && symbol.input == ".")
	symbol.invisible = true;
      if (symbol != null)
	tag = symbol.rtag;
    }
    if (symbol!=null)
      str = LMremoveCharsAndBlanks(str,symbol.input.length); // ready to return
    var len = newFrag.childNodes.length;
    if (matrix &&
      len>0 && newFrag.childNodes[len-1].nodeName == "mrow" && len>1 &&
      newFrag.childNodes[len-2].nodeName == "mo" &&
      newFrag.childNodes[len-2].firstChild.nodeValue == "&") { //matrix
	var pos = []; // positions of ampersands
        var m = newFrag.childNodes.length;
        for (i=0; matrix && i<m; i=i+2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
	  for (var j=0; j<node.childNodes.length; j++)
	    if (node.childNodes[j].firstChild.nodeValue=="&")
	      pos[i][pos[i].length]=j;
        }
	var row, frag, n, k, table = document.createDocumentFragment();
	for (i=0; i<m; i=i+2) {
	  row = document.createDocumentFragment();
	  frag = document.createDocumentFragment();
	  node = newFrag.firstChild; // <mrow> -&-&...&-&- </mrow>
	  n = node.childNodes.length;
	  k = 0;
	  for (j=0; j<n; j++) {
	    if (typeof pos[i][k] != "undefined" && j==pos[i][k]){
	      node.removeChild(node.firstChild); //remove &
	      row.appendChild(LMcreateMmlNode("mtd",frag));
	      k++;
	    } else frag.appendChild(node.firstChild);
	  }
	  row.appendChild(LMcreateMmlNode("mtd",frag));
	  if (newFrag.childNodes.length>2) {
	    newFrag.removeChild(newFrag.firstChild); //remove <mrow> </mrow>
	    newFrag.removeChild(newFrag.firstChild); //remove <mo>&</mo>
	  }
	  table.appendChild(LMcreateMmlNode("mtr",row));
	}
	return [table,str];
    }
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = LMcreateMmlNode("mo",document.createTextNode(symbol.output));
      newFrag.appendChild(node);
    }
  }
  return [newFrag,str,tag];
}

function LMparseMath(str) {
  var result, node = LMcreateElementMathML("mstyle");
  if (mathcolor != "") node.setAttribute("mathcolor",mathcolor);
  if (mathfontfamily != "") node.setAttribute("fontfamily",mathfontfamily);
  node.appendChild(LMparseExpr(str.replace(/^\s+/g,""),false,false)[0]);
  node = LMcreateMmlNode("math",node);
  if (showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko
  if (mathfontfamily != "" && (isIE || mathfontfamily != "serif")) {
    var fnode = LMcreateElementXHTML("font");
    fnode.setAttribute("face",mathfontfamily);
    fnode.appendChild(node);
    return fnode;
  }
  return node;
}

function LMstrarr2docFrag(arr, linebreaks) {
  var newFrag=document.createDocumentFragment();
  var expr = false;
  for (var i=0; i<arr.length; i++) {
    if (expr) newFrag.appendChild(LMparseMath(arr[i]));
    else {
      var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
      newFrag.appendChild(LMcreateElementXHTML("span").
      appendChild(document.createTextNode(arri[0])));
      for (var j=1; j<arri.length; j++) {
        newFrag.appendChild(LMcreateElementXHTML("p"));
        newFrag.appendChild(LMcreateElementXHTML("span").
        appendChild(document.createTextNode(arri[j])));
      }
    }
    expr = !expr;
  }
  return newFrag;
}

function LMprocessNodeR(n, linebreaks) {
  var mtch, str, arr, frg, i;
  if (n.childNodes.length == 0) {
   if ((n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
// DELIMITERS:
      mtch = (str.indexOf("\$")==-1 ? false : true);
      str = str.replace(/([^\\])\$/g,"$1 \$");
      str = str.replace(/^\$/," \$");	// in case \$ at start of string
      arr = str.split(" \$");
      for (i=0; i<arr.length; i++)
	arr[i]=arr[i].replace(/\\\$/g,"\$");
      if (arr.length>1 || mtch) {
        if (checkForMathML) {
          checkForMathML = false;
          var nd = LMisMathMLavailable();
          LMnoMathML = nd != null;
          if (LMnoMathML && notifyIfNoMathML)
            if (alertIfNoMathML)
              alert("To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\n\
                or Firefox/Mozilla/Netscape");
            else LMbody.insertBefore(nd,LMbody.childNodes[0]);
        }
        if (!LMnoMathML) {
          frg = LMstrarr2docFrag(arr,n.nodeType==8);
          var len = frg.childNodes.length;
          n.parentNode.replaceChild(frg,n);
          return len-1;
        } else return 0;
      }
    }
   } else return 0;
  } else if (n.nodeName!="math") {
    for (i=0; i<n.childNodes.length; i++)
      i += LMprocessNodeR(n.childNodes[i], linebreaks);
  }
  return 0;
}

function LMprocessNode(n, linebreaks, spanclassLM) {
  var frag,st;
  if (spanclassLM!=null) {
    frag = document.getElementsByTagName("span")
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "LM")
        LMprocessNodeR(frag[i],linebreaks);
  } else {
    try {
      st = n.innerHTML;
    } catch(err) {}
// DELIMITERS:
    if (st==null || st.indexOf("\$")!=-1)
      LMprocessNodeR(n,linebreaks);
  }
  if (isIE) { //needed to match size and font of formula to surrounding text
    frag = document.getElementsByTagName('math');
    for (var i=0;i<frag.length;i++) frag[i].update()
  }
}

var LMbody;
var LMnoMathML = false, LMtranslated = false;

function translate(spanclassLM) {
  if (!LMtranslated) { // run this only once
    LMtranslated = true;
    LMinitSymbols();
    LMbody = document.getElementsByTagName("body")[0];
    LMprocessNode(LMbody, false, spanclassLM);
  }
}

function LatexToMathML(LatexStr) {
    //process Symbols if not processed before
    if (!LMtranslated) {
        LMinitSymbols();
    }
    //create element to contain the latex & process it
    var span = document.createElement("span");
    span.innerText = "$" + LatexStr.replace(/\\/g, "\\") + "$";
    LMprocessNode(span, false);

    return span.innerHTML;
}

if (isIE) { // avoid adding MathPlayer info explicitly to each webpage
  document.write("<object id=\"mathplayer\"\
  classid=\"clsid:32F66A20-7614-11D4-BD11-00104BD3F987\"></object>");
  document.write("<?import namespace=\"m\" implementation=\"#mathplayer\"?>");
}

// GO1.1 Generic onload by Brothercake
// http://www.brothercake.com/
//onload function (replaces the onload="translate()" in the <body> tag)
function generic()
{
    if (translateOnLoad)
        translate();
};
//setup onload function
if(typeof window.addEventListener != 'undefined')
{
  //.. gecko, safari, konqueror and standard
  window.addEventListener('load', generic, false);
}
else if(typeof document.addEventListener != 'undefined')
{
  //.. opera 7
  document.addEventListener('load', generic, false);
}
else if(typeof window.attachEvent != 'undefined')
{
  //.. win/ie
  window.attachEvent('onload', generic);
}
//** remove this condition to degrade older browsers
else
{
  //.. mac/ie5 and anything else that gets this far
  //if there's an existing onload function
  if(typeof window.onload == 'function')
  {
    //store it
    var existing = onload;
    //add new onload handler
    window.onload = function()
    {
      //call existing onload function
      existing();
      //call generic onload function
      generic();
    };
  }
  else
  {
    //setup onload function
    window.onload = generic;
  }
}

//expose LatexToMathML function
window.LatexToMathML = LatexToMathML;

})();