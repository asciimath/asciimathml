/*
ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
to Presentation MathML. The conversion is done while the XHTML page 
loads, and should work with Internet Explorer 6 + MathPlayer 
(http://www.dessci.com/en/products/mathplayer/) and Mozilla/Netscape 7+.
This is a convenient and inexpensive solution for authoring MathML.

Version 1.4 June 28, 2004, (c) Peter Jipsen http://www.chapman.edu/~jipsen
Latest version at http://www.chapman.edu/~jipsen/mathml/ASCIIMathML.js
If you use it on a webpage, please send the URL to jipsen@chapman.edu

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License (at http://www.gnu.org/copyleft/gpl.html) 
for more details.
*/

var checkForMathML = true; // put up alert box if no MathML capability
var mathcolor = "Red"; // change it to Black or any other preferred color
var displaystyle = true; // puts limits above and below large operators
var separatetokens = false;//if true, letter tokens must be separated by nonletters
var doubleblankmathdelimiter = false; // if true,  x+1  is equal to `x+1`
                                      // for IE this works only in <!--   -->
if (document.getElementById==null) 
  alert("This webpage requires a recent browser such as\
\nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer")

function isMathMLavailable() {
  var nd = myCreateElementXHTML("center");
  nd.appendChild(document.createTextNode("To view the "));
  var an = myCreateElementXHTML("a");
  an.appendChild(document.createTextNode("ASCIIMathML"));
  an.setAttribute("href","http://www.chapman.edu/~jipsen/asciimath.html");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" notation use Internet Explorer 6+"));  
  an = myCreateElementXHTML("a");
  an.appendChild(document.createTextNode("MathPlayer"));
  an.setAttribute("href","http://www.dessci.com/en/products/mathplayer/download.htm");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  if (navigator.appName.slice(0,8)=="Netscape") 
    if (navigator.appVersion.slice(0,1)>="5") return null;
    else return nd;
  else if (navigator.appName.slice(0,9)=="Microsoft")
    try {
        var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        return null;
    } catch (e) {
        return nd;
    }
  else return nd;
}

var isIE = document.createElementNS==null;

// character lists for Mozilla/Netscape fonts
var cal = [0xEF35,0x212C,0xEF36,0xEF37,0x2130,0x2131,0xEF38,0x210B,0x2110,0xEF39,0xEF3A,0x2112,0x2133,0xEF3B,0xEF3C,0xEF3D,0xEF3E,0x211B,0xEF3F,0xEF40,0xEF41,0xEF42,0xEF43,0xEF44,0xEF45,0xEF46];
var frk = [0xEF5D,0xEF5E,0x212D,0xEF5F,0xEF60,0xEF61,0xEF62,0x210C,0x2111,0xEF63,0xEF64,0xEF65,0xEF66,0xEF67,0xEF68,0xEF69,0xEF6A,0x211C,0xEF6B,0xEF6C,0xEF6D,0xEF6E,0xEF6F,0xEF70,0xEF71,0x2128];
var bbb = [0xEF8C,0xEF8D,0x2102,0xEF8E,0xEF8F,0xEF90,0xEF91,0x210D,0xEF92,0xEF93,0xEF94,0xEF95,0xEF96,0x2115,0xEF97,0x2119,0x211A,0x211D,0xEF98,0xEF99,0xEF9A,0xEF9B,0xEF9C,0xEF9D,0xEF9E,0x2124];

var CONST = 0, UNARY = 1, BINARY = 2, INFIX = 3, LEFTBRACKET = 4, 
    RIGHTBRACKET = 5, SPACE = 6, UNDEROVER = 7, DEFINITION = 8; // token types

var sqrt  = {input:"sqrt", tag:"msqrt", output:"sqrt", tex:null, ttype:UNARY};
var root  = {input:"root", tag:"mroot", output:"root", tex:null, ttype:BINARY};
var frac  = {input:"frac", tag:"mfrac", output:"/",    tex:null, ttype:BINARY};
var div   = {input:"/",    tag:"mfrac", output:"/",    tex:null, ttype:INFIX};
var sub   = {input:"_",    tag:"msub",  output:"_",    tex:null, ttype:INFIX};
var sup   = {input:"^",    tag:"msup",  output:"^",    tex:null, ttype:INFIX};
var mtext = {input:"text", tag:"mtext", output:"text", tex:null, ttype:UNARY};
var mbox  = {input:"mbox", tag:"mtext", output:"mbox", tex:null, ttype:UNARY};
var quote = {input:"\"",   tag:"mtext", output:"mbox", tex:null, ttype:UNARY};

var symbols = [
//some greek symbols
{input:"alpha",  tag:"mi", output:"\u03B1", tex:null, ttype:CONST},
{input:"beta",   tag:"mi", output:"\u03B2", tex:null, ttype:CONST},
{input:"chi",    tag:"mi", output:"\u03C7", tex:null, ttype:CONST},
{input:"delta",  tag:"mi", output:"\u03B4", tex:null, ttype:CONST},
{input:"Delta",  tag:"mo", output:"\u0394", tex:null, ttype:CONST},
{input:"epsi",   tag:"mi", output:"\u03B5", tex:"epsilon", ttype:CONST},
{input:"varepsilon", tag:"mi", output:"\u025B", tex:null, ttype:CONST},
{input:"eta",    tag:"mi", output:"\u03B7", tex:null, ttype:CONST},
{input:"gamma",  tag:"mi", output:"\u03B3", tex:null, ttype:CONST},
{input:"Gamma",  tag:"mo", output:"\u0393", tex:null, ttype:CONST},
{input:"iota",   tag:"mi", output:"\u03B9", tex:null, ttype:CONST},
{input:"kappa",  tag:"mi", output:"\u03BA", tex:null, ttype:CONST},
{input:"lambda", tag:"mi", output:"\u03BB", tex:null, ttype:CONST},
{input:"Lambda", tag:"mo", output:"\u039B", tex:null, ttype:CONST},
{input:"mu",     tag:"mi", output:"\u03BC", tex:null, ttype:CONST},
{input:"nu",     tag:"mi", output:"\u03BD", tex:null, ttype:CONST},
{input:"omega",  tag:"mi", output:"\u03C9", tex:null, ttype:CONST},
{input:"Omega",  tag:"mo", output:"\u03A9", tex:null, ttype:CONST},
{input:"phi",    tag:"mi", output:"\u03C6", tex:null, ttype:CONST},
{input:"varphi", tag:"mi", output:"\u03D5", tex:null, ttype:CONST},
{input:"Phi",    tag:"mo", output:"\u03A6", tex:null, ttype:CONST},
{input:"pi",     tag:"mi", output:"\u03C0", tex:null, ttype:CONST},
{input:"Pi",     tag:"mo", output:"\u03A0", tex:null, ttype:CONST},
{input:"psi",    tag:"mi", output:"\u03C8", tex:null, ttype:CONST},
{input:"rho",    tag:"mi", output:"\u03C1", tex:null, ttype:CONST},
{input:"sigma",  tag:"mi", output:"\u03C3", tex:null, ttype:CONST},
{input:"Sigma",  tag:"mo", output:"\u03A3", tex:null, ttype:CONST},
{input:"tau",    tag:"mi", output:"\u03C4", tex:null, ttype:CONST},
{input:"theta",  tag:"mi", output:"\u03B8", tex:null, ttype:CONST},
{input:"vartheta", tag:"mi", output:"\u03D1", tex:null, ttype:CONST},
{input:"Theta",  tag:"mo", output:"\u0398", tex:null, ttype:CONST},
{input:"upsilon", tag:"mi", output:"\u03C5", tex:null, ttype:CONST},
{input:"xi",     tag:"mi", output:"\u03BE", tex:null, ttype:CONST},
{input:"Xi",     tag:"mo", output:"\u039E", tex:null, ttype:CONST},
{input:"zeta",   tag:"mi", output:"\u03B6", tex:null, ttype:CONST},

//binary operation symbols
{input:"*",  tag:"mo", output:"\u22C5", tex:"cdot", ttype:CONST},
{input:"**", tag:"mo", output:"\u22C6", tex:"star", ttype:CONST},
{input:"//", tag:"mo", output:"/",      tex:null, ttype:CONST},
{input:"\\\\", tag:"mo", output:"\\",   tex:"backslash", ttype:CONST},
{input:"xx", tag:"mo", output:"\u00D7", tex:"times", ttype:CONST},
{input:"-:", tag:"mo", output:"\u00F7", tex:"divide", ttype:CONST},
{input:"@",  tag:"mo", output:"\u2218", tex:"circ", ttype:CONST},
{input:"o+", tag:"mo", output:"\u2295", tex:"oplus", ttype:CONST},
{input:"ox", tag:"mo", output:"\u2297", tex:"otimes", ttype:CONST},
{input:"o.", tag:"mo", output:"\u2299", tex:"odot", ttype:CONST},
{input:"sum", tag:"mo", output:"\u2211", tex:null, ttype:UNDEROVER},
{input:"prod", tag:"mo", output:"\u220F", tex:null, ttype:UNDEROVER},
{input:"^^",  tag:"mo", output:"\u2227", tex:"wedge", ttype:CONST},
{input:"^^^", tag:"mo", output:"\u22C0", tex:"bigwedge", ttype:UNDEROVER},
{input:"vv",  tag:"mo", output:"\u2228", tex:"vee", ttype:CONST},
{input:"vvv", tag:"mo", output:"\u22C1", tex:"bigvee", ttype:UNDEROVER},
{input:"nn",  tag:"mo", output:"\u2229", tex:"cap", ttype:CONST},
{input:"nnn", tag:"mo", output:"\u22C2", tex:"bigcap", ttype:UNDEROVER},
{input:"uu",  tag:"mo", output:"\u222A", tex:"cup", ttype:CONST},
{input:"uuu", tag:"mo", output:"\u22C3", tex:"bigcup", ttype:UNDEROVER},

//binary relation symbols
{input:"!=",  tag:"mo", output:"\u2260", tex:"ne", ttype:CONST},
{input:"lt",  tag:"mo", output:"<",      tex:null, ttype:CONST},
{input:"<=",  tag:"mo", output:"\u2264", tex:"le", ttype:CONST},
{input:"lt=", tag:"mo", output:"\u2264", tex:"leq", ttype:CONST},
{input:">=",  tag:"mo", output:"\u2265", tex:"ge", ttype:CONST},
{input:"geq", tag:"mo", output:"\u2265", tex:null, ttype:CONST},
{input:"-<",  tag:"mo", output:"\u227A", tex:"prec", ttype:CONST},
{input:"-lt", tag:"mo", output:"\u227A", tex:null, ttype:CONST},
{input:">-",  tag:"mo", output:"\u227B", tex:"succ", ttype:CONST},
{input:"in",  tag:"mo", output:"\u2208", tex:null, ttype:CONST},
{input:"!in", tag:"mo", output:"\u2209", tex:"notin", ttype:CONST},
{input:"sub", tag:"mo", output:"\u2282", tex:"subset", ttype:CONST},
{input:"sup", tag:"mo", output:"\u2283", tex:"supset", ttype:CONST},
{input:"sube", tag:"mo", output:"\u2286", tex:"subseteq", ttype:CONST},
{input:"supe", tag:"mo", output:"\u2287", tex:"supseteq", ttype:CONST},
{input:"-=",  tag:"mo", output:"\u2261", tex:"equiv", ttype:CONST},
{input:"~=",  tag:"mo", output:"\u2245", tex:"cong", ttype:CONST},
{input:"~~",  tag:"mo", output:"\u2248", tex:"approx", ttype:CONST},
{input:"prop", tag:"mo", output:"\u221D", tex:"propto", ttype:CONST},

//logical symbols
{input:"and", tag:"mtext", output:"and", tex:null, ttype:SPACE},
{input:"or",  tag:"mtext", output:"or",  tex:null, ttype:SPACE},
{input:"not", tag:"mo", output:"\u00AC", tex:"neg", ttype:CONST},
{input:"=>",  tag:"mo", output:"\u21D2", tex:"implies", ttype:CONST},
{input:"if",  tag:"mo", output:"if",     tex:null, ttype:SPACE},
{input:"<=>", tag:"mo", output:"\u21D4", tex:"iff", ttype:CONST},
{input:"AA",  tag:"mo", output:"\u2200", tex:"forall", ttype:CONST},
{input:"EE",  tag:"mo", output:"\u2203", tex:"exists", ttype:CONST},
{input:"_|_", tag:"mo", output:"\u22A5", tex:"bot", ttype:CONST},
{input:"TT",  tag:"mo", output:"\u22A4", tex:"top", ttype:CONST},
{input:"|-",  tag:"mo", output:"\u22A2", tex:"vdash", ttype:CONST},
{input:"|=",  tag:"mo", output:"\u22A8", tex:"models", ttype:CONST},

//grouping brackets
{input:"(", tag:"mo", output:"(", tex:null, ttype:LEFTBRACKET},
{input:")", tag:"mo", output:")", tex:null, ttype:RIGHTBRACKET},
{input:"[", tag:"mo", output:"[", tex:null, ttype:LEFTBRACKET},
{input:"]", tag:"mo", output:"]", tex:null, ttype:RIGHTBRACKET},
{input:"{", tag:"mo", output:"{", tex:null, ttype:LEFTBRACKET},
{input:"}", tag:"mo", output:"}", tex:null, ttype:RIGHTBRACKET},
{input:"(:", tag:"mo", output:"\u2329", tex:"langle", ttype:LEFTBRACKET},
{input:":)", tag:"mo", output:"\u232A", tex:"rangle", ttype:RIGHTBRACKET},
{input:"<<", tag:"mo", output:"\u2329", tex:null, ttype:LEFTBRACKET},
{input:">>", tag:"mo", output:"\u232A", tex:null, ttype:RIGHTBRACKET},
{input:"{:", tag:"mo", output:"{:", tex:null, ttype:LEFTBRACKET, invisible:true},
{input:":}", tag:"mo", output:":}", tex:null, ttype:RIGHTBRACKET, invisible:true},

//miscellaneous symbols
{input:"int",  tag:"mo", output:"\u222B", tex:null, ttype:CONST},
{input:"dx",   tag:"mi", output:"{:d x:}", tex:null, ttype:DEFINITION},
{input:"dy",   tag:"mi", output:"{:d y:}", tex:null, ttype:DEFINITION},
{input:"dz",   tag:"mi", output:"{:d z:}", tex:null, ttype:DEFINITION},
{input:"dt",   tag:"mi", output:"{:d t:}", tex:null, ttype:DEFINITION},
{input:"oint", tag:"mo", output:"\u222E", tex:null, ttype:CONST},
{input:"del",  tag:"mo", output:"\u2202", tex:"partial", ttype:CONST},
{input:"grad", tag:"mo", output:"\u2207", tex:"nabla", ttype:CONST},
{input:"+-",   tag:"mo", output:"\u00B1", tex:"pm", ttype:CONST},
{input:"O/",   tag:"mo", output:"\u2205", tex:"emptyset", ttype:CONST},
{input:"oo",   tag:"mo", output:"\u221E", tex:"infty", ttype:CONST},
{input:"aleph", tag:"mo", output:"\u2135", tex:null, ttype:CONST},
{input:"...",  tag:"mo", output:"...",    tex:"ldots", ttype:CONST},
{input:"\\ ",  tag:"mo", output:"\u00A0", tex:null, ttype:CONST},
{input:"quad", tag:"mo", output:"\u00A0\u00A0", tex:null, ttype:CONST},
{input:"qquad", tag:"mo", output:"\u00A0\u00A0\u00A0\u00A0", tex:null, ttype:CONST},
{input:"cdots", tag:"mo", output:"\u22EF", tex:null, ttype:CONST},
{input:"diamond", tag:"mo", output:"\u22C4", tex:null, ttype:CONST},
{input:"square", tag:"mo", output:"\u25A1", tex:null, ttype:CONST},
{input:"|_", tag:"mo", output:"\u230A",  tex:"lfloor", ttype:CONST},
{input:"_|", tag:"mo", output:"\u230B",  tex:"rfloor", ttype:CONST},
{input:"|~", tag:"mo", output:"\u2308",  tex:"lceiling", ttype:CONST},
{input:"~|", tag:"mo", output:"\u2309",  tex:"rceiling", ttype:CONST},
{input:"CC",  tag:"mo", output:"\u2102", tex:null, ttype:CONST},
{input:"NN",  tag:"mo", output:"\u2115", tex:null, ttype:CONST},
{input:"QQ",  tag:"mo", output:"\u211A", tex:null, ttype:CONST},
{input:"RR",  tag:"mo", output:"\u211D", tex:null, ttype:CONST},
{input:"ZZ",  tag:"mo", output:"\u2124", tex:null, ttype:CONST},

//standard functions
{input:"lim",  tag:"mo", output:"lim", tex:null, ttype:UNDEROVER},
{input:"sin",  tag:"mo", output:"sin", tex:null, ttype:CONST},
{input:"cos",  tag:"mo", output:"cos", tex:null, ttype:CONST},
{input:"tan",  tag:"mo", output:"tan", tex:null, ttype:CONST},
{input:"sinh", tag:"mo", output:"sinh", tex:null, ttype:CONST},
{input:"cosh", tag:"mo", output:"cosh", tex:null, ttype:CONST},
{input:"tanh", tag:"mo", output:"tanh", tex:null, ttype:CONST},
{input:"cot",  tag:"mo", output:"cot", tex:null, ttype:CONST},
{input:"sec",  tag:"mo", output:"sec", tex:null, ttype:CONST},
{input:"csc",  tag:"mo", output:"csc", tex:null, ttype:CONST},
{input:"log",  tag:"mo", output:"log", tex:null, ttype:CONST},
{input:"ln",   tag:"mo", output:"ln",  tex:null, ttype:CONST},
{input:"det",  tag:"mo", output:"det", tex:null, ttype:CONST},
{input:"dim",  tag:"mo", output:"dim", tex:null, ttype:CONST},
{input:"mod",  tag:"mo", output:"mod", tex:null, ttype:CONST},
{input:"gcd",  tag:"mo", output:"gcd", tex:null, ttype:CONST},
{input:"lcm",  tag:"mo", output:"lcm", tex:null, ttype:CONST},
{input:"min",  tag:"mo", output:"min", tex:null, ttype:UNDEROVER},
{input:"max",  tag:"mo", output:"max", tex:null, ttype:UNDEROVER},

//arrows
{input:"uarr", tag:"mo", output:"\u2191", tex:"uparrow", ttype:CONST},
{input:"darr", tag:"mo", output:"\u2193", tex:"downarrow", ttype:CONST},
{input:"rarr", tag:"mo", output:"\u2192", tex:"rightarrow", ttype:CONST},
{input:"->",   tag:"mo", output:"\u2192", tex:"to", ttype:CONST},
{input:"larr", tag:"mo", output:"\u2190", tex:"leftarrow", ttype:CONST},
{input:"harr", tag:"mo", output:"\u2194", tex:"leftrightarrow", ttype:CONST},
{input:"rArr", tag:"mo", output:"\u21D2", tex:"Rightarrow", ttype:CONST},
{input:"lArr", tag:"mo", output:"\u21D0", tex:"Leftarrow", ttype:CONST},
{input:"hArr", tag:"mo", output:"\u21D4", tex:"Leftrightarrow", ttype:CONST},

//commands with argument
sqrt, root, frac, div, sub, sup,
{input:"hat", tag:"mover", output:"\u005E", tex:null, ttype:UNARY, acc:true},
{input:"bar", tag:"mover", output:"\u00AF", tex:"overline", ttype:UNARY, acc:true},
{input:"vec", tag:"mover", output:"\u2192", tex:null, ttype:UNARY, acc:true},
{input:"dot", tag:"mover", output:".",      tex:null, ttype:UNARY, acc:true},
{input:"ddot", tag:"mover", output:"..",    tex:null, ttype:UNARY, acc:true},
{input:"ul", tag:"munder", output:"\u0332", tex:"underline", ttype:UNARY, acc:true},
mtext, mbox, quote,
{input:"bb", tag:"mstyle", atname:"fontweight", atval:"bold", output:"bb", tex:null, ttype:UNARY},
{input:"mathbf", tag:"mstyle", atname:"fontweight", atval:"bold", output:"mathbf", tex:null, ttype:UNARY},
{input:"sf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"sf", tex:null, ttype:UNARY},
{input:"mathsf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"mathsf", tex:null, ttype:UNARY},
{input:"bbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"bbb", tex:null, ttype:UNARY, codes:bbb},
{input:"mathbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"mathbb", tex:null, ttype:UNARY, codes:bbb},
{input:"cc",  tag:"mstyle", atname:"mathvariant", atval:"script", output:"cc", tex:null, ttype:UNARY, codes:cal},
{input:"mathcal", tag:"mstyle", atname:"mathvariant", atval:"script", output:"mathcal", tex:null, ttype:UNARY, codes:cal},
{input:"tt",  tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"tt", tex:null, ttype:UNARY},
{input:"mathtt", tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"mathtt", tex:null, ttype:UNARY},
{input:"fr",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"fr", tex:null, ttype:UNARY, codes:frk},
{input:"mathfrak",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"mathfrak", tex:null, ttype:UNARY, codes:frk}
];

function compareNames(s1,s2) {
  if (s1.input > s2.input) return 1
  else return -1;
}

var names = []; //list of input symbols

function initSymbols() {
  var texsymbols = [], i;
  for (i=0; i<symbols.length; i++)
    if (symbols[i].tex) 
      texsymbols[texsymbols.length] = {input:symbols[i].tex, 
        tag:symbols[i].tag, output:symbols[i].output, ttype:symbols[i].ttype};
  symbols = symbols.concat(texsymbols);
  symbols.sort(compareNames);
  for (i=0; i<symbols.length; i++) names[i] = symbols[i].input;
}

function myCreateElementXHTML(t) {
  if (isIE) return document.createElement(t);
  else return document.createElementNS("http://www.w3.org/1999/xhtml",t);
}

var mathml = "http://www.w3.org/1998/Math/MathML";

function myCreateElementMathML(t) {
  if (isIE) return document.createElement("mml:"+t);
  else return document.createElementNS(mathml,t);
}

function createMmlNode(name,frag) {
  var node = myCreateElementMathML(name);
  node.appendChild(frag);
  return node;
}

function removeCharsAndBlanks(str,n) {
//remove n characters and any following blanks
  var st;
  if (str.charAt(n)=="\\" && str.charAt(n+1)!="\\" && str.charAt(n+1)!=" ") 
    st = str.slice(n+1);
  else st = str.slice(n);
  for (var i=0; i<st.length && st.charCodeAt(i)<=32; i=i+1);
  return st.slice(i);
}

function position(arr, str, n) { 
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

var separated = true;

function getSymbol(str) {
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
    k = position(names, st, j);
    if (k<names.length && str.slice(0,names[k].length)==names[k]){
      match = names[k];
      mk = k;
      i = match.length;
    }
    more = k<names.length && str.slice(0,names[k].length)>=names[k];
  }
  if (match!="")
    if (separatetokens) {
      i = match.length;
      if ("a">str.charAt(0) || str.charAt(0)>"z" || 
        "a">str.charAt(i-1) || str.charAt(i-1)>"z") {
        separated = true;
        return symbols[mk];
      }
      st = str.charAt(i);
      separated = separated && ("a">st || st>"z");
      if (separated) return symbols[mk];
    } else return symbols[mk]; 
// if str[0] is a digit or - return maxsubstring of digits.digits
  k = 1;
  st = str.slice(0,1);
  var pos = true;
  var integ = true;
  if (st == "-") {
    pos = false;
    st = str.slice(k,k+1);
    k++;
  }
  while ("0"<=st && st<="9" && k<=str.length) {
    st = str.slice(k,k+1);
    k++;
  }
  if (st == ".") {
    integ = false;
    st = str.slice(k,k+1);
    k++;
    while ("0"<=st && st<="9" && k<=str.length) {
      st = str.slice(k,k+1);
      k++;
    }
  }
  if ((pos && integ && k>1) || ((pos || integ) && k>2) || k>3) {
    st = str.slice(0,k-1);
    tagst = "mn";
    separated = true;
  } else {
    k = 2;
    st = str.slice(0,1); //take 1 character
    separated = ("A">st || st>"Z") && ("a">st || st>"z");
    tagst = (separated?"mo":"mi");
    separated = separated || str.charAt(1)<"a" || str.charAt(1)>"z";
  }
  return {input:str.slice(0,k-1), tag:tagst, output:st, ttype:CONST};
}

function removeBrackets(node) {
  var st;
  if (node.nodeName=="mrow") {
    st = node.firstChild.firstChild.nodeValue;
    if (st=="(" || st=="[" || st=="{") node.removeChild(node.firstChild);
  }
  if (node.nodeName=="mrow") {
    st = node.lastChild.firstChild.nodeValue;
    if (st==")" || st=="]" || st=="}") node.removeChild(node.lastChild);
  }
}

/*Parsing ASCII math expressions with the following grammar
V ::= [A-Za-z] | greek letters | numbers | other constant symbols
U ::= sqrt | text | bb | other unary symbols for font commands
B ::= frac | root                    binary symbols
L ::= ( | [ | { | (: | {:            left brackets
R ::= ) | ] | } | :) | :}            right brackets
S ::= V | LER | US | BSS             simple expression
E ::= SE | S/S | S_S | S^S | S_S^S   expression
Each terminal symbol is translated into a corresponding mathml node.*/

function parseSexpr(str) { //parses str and returns [node,tailstr]
  var symbol, node, result, i, st, newFrag = document.createDocumentFragment();
  str = removeCharsAndBlanks(str,0);
  symbol = getSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET)
    return [null,str];
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+removeCharsAndBlanks(str,symbol.input.length); 
    symbol = getSymbol(str);
  }
  switch (symbol.ttype) {
  case UNDEROVER:
  case CONST:
    str = removeCharsAndBlanks(str,symbol.input.length); 
    return [createMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  case LEFTBRACKET:   //read (expr+)
    str = removeCharsAndBlanks(str,symbol.input.length); 
    result = parseExpr(str);
    if (typeof symbol.invisible == "boolean" && symbol.invisible) 
      node = createMmlNode("mrow",result[0]);
    else {
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      node = createMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1]];
  case UNARY:
    if (symbol == mtext || symbol == mbox || symbol == quote) {
      if (symbol!=quote) str = removeCharsAndBlanks(str,symbol.input.length);
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else if (str.charAt(0)=="(") i=str.indexOf(")");
      else if (str.charAt(0)=="[") i=str.indexOf("]");
      else if (symbol==quote) i=str.slice(1).indexOf("\"")+1;
      else i = 0;
      if (i==-1) i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
        node = myCreateElementMathML("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      newFrag.appendChild(
        createMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
        node = myCreateElementMathML("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      str = removeCharsAndBlanks(str,i+1);
      return [createMmlNode("mrow",newFrag),str];
    } else {
      str = removeCharsAndBlanks(str,symbol.input.length); 
      result = parseSexpr(str);
      if (result[0]==null) return [createMmlNode("mo",
                             document.createTextNode(symbol.input)),str];
      removeBrackets(result[0]);
      if (symbol == sqrt) {           // sqrt
        return [createMmlNode(symbol.tag,result[0]),result[1]];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
        node = createMmlNode(symbol.tag,result[0]);
        node.appendChild(createMmlNode("mo",document.createTextNode(symbol.output)));
        return [node,result[1]];
      } else {                        // font change command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
                if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91) newst = newst +
                  String.fromCharCode(symbol.codes[st.charCodeAt(j)-65]);
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=myCreateElementMathML("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(myCreateElementMathML("mo").
          appendChild(document.createTextNode(newst)),result[0].childNodes[i]);
            }
        }
        node = createMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
        return [node,result[1]];
      }
    }
  case BINARY:
    str = removeCharsAndBlanks(str,symbol.input.length); 
    result = parseSexpr(str);
    if (result[0]==null) return [createMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    removeBrackets(result[0]);
    var result2 = parseSexpr(result[1]);
    if (result2[0]==null) return [createMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    removeBrackets(result2[0]);
    if (symbol==root) newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol==frac) newFrag.appendChild(result2[0]);
    return [createMmlNode(symbol.tag,newFrag),result2[1]];
  case INFIX:
    str = removeCharsAndBlanks(str,symbol.input.length); 
    return [createMmlNode("mo",document.createTextNode(symbol.output)),str];
  case SPACE:
    str = removeCharsAndBlanks(str,symbol.input.length); 
    node = myCreateElementMathML("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    newFrag.appendChild(
      createMmlNode(symbol.tag,document.createTextNode(symbol.output)));
    node = myCreateElementMathML("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    return [createMmlNode("mrow",newFrag),str];
  default:
alert(symbol.input);
    str = removeCharsAndBlanks(str,symbol.input.length); 
    return [createMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  }
}

function parseExpr(str) {
  var symbol, sym1, sym2, node, result, i, underover, nodeList = [],
  newFrag = document.createDocumentFragment();
  do {
    str = removeCharsAndBlanks(str,0);
    sym1 = getSymbol(str);
    result = parseSexpr(str);
    node = result[0];
    str = result[1];
    symbol = getSymbol(str);
    if (symbol.ttype == INFIX) {
      str = removeCharsAndBlanks(str,symbol.input.length);
      result = parseSexpr(str);
      removeBrackets(result[0]);
      str = result[1];
      if (symbol == div) removeBrackets(node);
      if (symbol == sub) {
        sym2 = getSymbol(str);
        underover = (sym1.ttype == UNDEROVER);
        if (sym2 == sup) {
          str = removeCharsAndBlanks(str,sym2.input.length);
          var res2 = parseSexpr(str);
          removeBrackets(res2[0]);
          str = res2[1];
          node = createMmlNode((underover?"munderover":"msubsup"),node);
          node.appendChild(result[0]);
          node.appendChild(res2[0]);
          node = createMmlNode("mrow",node);          
        } else {
          node = createMmlNode((underover?"munder":"msub"),node);
          node.appendChild(result[0]);
        }
      } else {
        node = createMmlNode(symbol.tag,node);
        node.appendChild(result[0]);
      }
      newFrag.appendChild(node);
    } 
    else if (node!=undefined) newFrag.appendChild(node);
  } while (symbol.ttype != RIGHTBRACKET && symbol!=null && symbol.output!="");
  if (symbol.ttype == RIGHTBRACKET) {
    var len = newFrag.childNodes.length;
    if (len>0 && newFrag.childNodes[len-1].nodeName == "mrow" && len>1 &&
      newFrag.childNodes[len-2].nodeName == "mo" &&
      newFrag.childNodes[len-2].firstChild.nodeValue == ",") { //matrix
      var right = newFrag.childNodes[len-1].lastChild.firstChild.nodeValue;
      if (right==")" || right=="]") {
        var left = newFrag.childNodes[len-1].firstChild.firstChild.nodeValue;
        if (left=="(" && right==")" && symbol.output != "}" || 
            left=="[" && right=="]") {
        var pos = []; // positions of commas
        var matrix = true;
        var m = newFrag.childNodes.length;
        for (i=0; matrix && i<m; i=i+2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
          if (matrix) matrix = node.nodeName=="mrow" && 
            (i==m-1 || node.nextSibling.nodeName=="mo" && 
            node.nextSibling.firstChild.nodeValue==",")&&
            node.firstChild.firstChild.nodeValue==left &&
            node.lastChild.firstChild.nodeValue==right;
          if (matrix) 
            for (var j=0; j<node.childNodes.length; j++)
              if (node.childNodes[j].firstChild.nodeValue==",")
                pos[i][pos[i].length]=j;
          if (matrix && i>1) matrix = pos[i].length == pos[i-2].length;
        }
        if (matrix) {
          var row, frag, n, k, table = document.createDocumentFragment();
          for (i=0; i<m; i=i+2) {
            row = document.createDocumentFragment();
            frag = document.createDocumentFragment();
            node = newFrag.firstChild; // <mrow>(-,-,...,-,-)</mrow>
            n = node.childNodes.length;
            k = 0;
            node.removeChild(node.firstChild); //remove (
            for (j=1; j<n-1; j++) {
              if (typeof pos[i][k] != "undefined" && j==pos[i][k]){
                node.removeChild(node.firstChild); //remove ,
                row.appendChild(createMmlNode("mtd",frag));
                k++;
              } else frag.appendChild(node.firstChild);
            }
            row.appendChild(createMmlNode("mtd",frag));
            if (newFrag.childNodes.length>2) {
              newFrag.removeChild(newFrag.firstChild); //remove <mrow>)</mrow>
              newFrag.removeChild(newFrag.firstChild); //remove <mo>,</mo>
            }
            table.appendChild(createMmlNode("mtr",row));
          }
          node = createMmlNode("mtable",table);
          if (typeof symbol.invisible == "boolean" && symbol.invisible) node.setAttribute("columnalign","left");
          newFrag.replaceChild(node,newFrag.firstChild);
        }
      }}
    }
    str = removeCharsAndBlanks(str,symbol.input.length);
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      newFrag.appendChild(node);
    }
  }
  return [newFrag,str];
}

function parseMath(str) {
  var result, node = myCreateElementMathML("mstyle");
  node.setAttribute("mathcolor",mathcolor);
  if (displaystyle) node.setAttribute("displaystyle","true");
  while (str!="") {
    result = parseExpr(str);
    node.appendChild(result[0]);
    str = result[1];
  }
  return createMmlNode("math",node);
}

function strarr2docFrag(arr, linebreaks) {
  var newFrag=document.createDocumentFragment();
  var expr = false;
  for (var i=0; i<arr.length; i++) {
    if (expr) newFrag.appendChild(parseMath(arr[i]));
    else {
      var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
      newFrag.appendChild(myCreateElementXHTML("span").
      appendChild(document.createTextNode(arri[0].
        replace(/\\dollar/g,"$").replace(/\\lq/g,"`"))));
      for (var j=1; j<arri.length; j++) {
        newFrag.appendChild(myCreateElementXHTML("p"));
        newFrag.appendChild(myCreateElementXHTML("span").
        appendChild(document.createTextNode(arri[j].
          replace(/\\dollar/g,"$").replace(/\\lq/g,"`"))));
      }
    }
    expr = !expr;
  }
  return newFrag;
}

function processNode(n, linebreaks) {
  var mtch, str, arr;
  if (n.childNodes.length == 0 && (n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      if (doubleblankmathdelimiter) {
        str = str.replace(/\x20\x20\./g," `.");
        str = str.replace(/\x20\x20,/g," `,");
        str = str.replace(/\x20\x20/g," ` ");
      }
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
      mtch = false;
      str = str.replace(/\\\$/g,function(st){mtch=true;return "\\dollar"});
      str = str.replace(/\\`/g,function(st){mtch=true;return "\\lq"});
      str = str.replace(/\$/g,"`");
      arr = str.split("`");
      if (arr.length>1 || mtch) {
        if (checkForMathML) {
          checkForMathML = false;
          var nd = isMathMLavailable();
          noMathML = nd != null
          if (noMathML) body.insertBefore(nd,body.childNodes[0]);
        }
        if (!noMathML)
          n.parentNode.replaceChild(strarr2docFrag(arr,n.nodeType==8),n);
      }
    }
  } else if (n.nodeName!="math") for (var i=0; i<n.childNodes.length; i++)
      processNode(n.childNodes[i], linebreaks);
}

var body;
var noMathML = false;

function translate() {
  initSymbols();
  body = document.getElementsByTagName("body")[0];
  processNode(body, false);
}
