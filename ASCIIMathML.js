/*
ASCIIMathML.js
==============
This file contains JavaScript functions to convert ASCII math notation
to Presentation MathML. The conversion is done while the XHTML page 
loads, and should work with Internet Explorer 6 + MathPlayer 
(http://www.dessci.com/en/products/mathplayer/) and Mozilla/Netscape 7+.
This is a convenient and inexpensive solution for authoring MathML.

Version 1.4 May 30 2004, (c) Peter Jipsen http://www.chapman.edu/~jipsen
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

var mathcolor = "Red"; // change it to Black or any other preferred color
var displaystyle = true; // puts limits above and below large operators
var separatetokens = false;//if true, letter tokens must be separated by nonletters
var doubleblankmathdelimiter = false; // if true,  x+1  is equal to `x+1`
                                      // for IE this works only in <!--   -->
if (document.getElementById==null) 
  alert("This webpage requires a recent browser such as\
\nMozilla/Netscape 7+ or Internet Explorer 6+MathPlayer")

var isIE = document.createElementNS==null;

// character lists for Mozilla/Netscape fonts
var cal = [0xEF35,0x212C,0xEF36,0xEF37,0x2130,0x2131,0xEF38,0x210B,0x2110,0xEF39,0xEF3A,0x2112,0x2133,0xEF3B,0xEF3C,0xEF3D,0xEF3E,0x211B,0xEF3F,0xEF40,0xEF41,0xEF42,0xEF43,0xEF44,0xEF45,0xEF46];
var frk = [0xEF5D,0xEF5E,0x212D,0xEF5F,0xEF60,0xEF61,0xEF62,0x210C,0x2111,0xEF63,0xEF64,0xEF65,0xEF66,0xEF67,0xEF68,0xEF69,0xEF6A,0x211C,0xEF6B,0xEF6C,0xEF6D,0xEF6E,0xEF6F,0xEF70,0xEF71,0x2128];
var bbb = [0xEF8C,0xEF8D,0x2102,0xEF8E,0xEF8F,0xEF90,0xEF91,0x210D,0xEF92,0xEF93,0xEF94,0xEF95,0xEF96,0x2115,0xEF97,0x2119,0x211A,0x211D,0xEF98,0xEF99,0xEF9A,0xEF9B,0xEF9C,0xEF9D,0xEF9E,0x2124];

var sqrt = {input:"sqrt", tag:"msqrt", output:"sqrt", unary:true};
var root = {input:"root", tag:"mroot", output:"root", binary:true};
var frac = {input:"frac", tag:"mfrac", output:"/", binary:true};
var div = {input:"/", tag:"mfrac", output:"/", infix:true};
var sub = {input:"_", tag:"msub",  output:"_", infix:true};
var sup = {input:"^", tag:"msup",  output:"^", infix:true};
var mtext = {input:"text", tag:"mtext", output:"text", unary:true};
var mbox = {input:"mbox", tag:"mtext", output:"mbox", unary:true};
var quote = {input:"\"", tag:"mtext", output:"mbox", unary:true};

var symbols = [
//some greek symbols
{input:"alpha",  tag:"mi", output:"\u03B1", tex:null},
{input:"beta",   tag:"mi", output:"\u03B2", tex:null},
{input:"chi",    tag:"mi", output:"\u03C7", tex:null},
{input:"delta",  tag:"mi", output:"\u03B4", tex:null},
{input:"Delta",  tag:"mo", output:"\u0394", tex:null},
{input:"epsi",   tag:"mi", output:"\u03B5", tex:"epsilon"},
{input:"varepsilon", tag:"mi", output:"\u025B", tex:null},
{input:"eta",    tag:"mi", output:"\u03B7", tex:null},
{input:"gamma",  tag:"mi", output:"\u03B3", tex:null},
{input:"Gamma",  tag:"mo", output:"\u0393", tex:null},
{input:"iota",   tag:"mi", output:"\u03B9", tex:null},
{input:"kappa",  tag:"mi", output:"\u03BA", tex:null},
{input:"lambda", tag:"mi", output:"\u03BB", tex:null},
{input:"Lambda", tag:"mo", output:"\u039B", tex:null},
{input:"mu",     tag:"mi", output:"\u03BC", tex:null},
{input:"nu",     tag:"mi", output:"\u03BD", tex:null},
{input:"omega",  tag:"mi", output:"\u03C9", tex:null},
{input:"Omega",  tag:"mo", output:"\u03A9", tex:null},
{input:"phi",    tag:"mi", output:"\u03C6", tex:null},
{input:"varphi", tag:"mi", output:"\u03D5", tex:null},
{input:"Phi",    tag:"mo", output:"\u03A6", tex:null},
{input:"pi",     tag:"mi", output:"\u03C0", tex:null},
{input:"Pi",     tag:"mo", output:"\u03A0", tex:null},
{input:"psi",    tag:"mi", output:"\u03C8", tex:null},
{input:"rho",    tag:"mi", output:"\u03C1", tex:null},
{input:"sigma",  tag:"mi", output:"\u03C3", tex:null},
{input:"Sigma",  tag:"mo", output:"\u03A3", tex:null},
{input:"tau",    tag:"mi", output:"\u03C4", tex:null},
{input:"theta",  tag:"mi", output:"\u03B8", tex:null},
{input:"vartheta", tag:"mi", output:"\u03D1", tex:null},
{input:"Theta",  tag:"mo", output:"\u0398", tex:null},
{input:"upsilon", tag:"mi", output:"\u03C5", tex:null},
{input:"xi",     tag:"mi", output:"\u03BE", tex:null},
{input:"Xi",     tag:"mo", output:"\u039E", tex:null},
{input:"zeta",   tag:"mi", output:"\u03B6", tex:null},

//binary operation symbols
{input:"*",  tag:"mo", output:"\u22C5", tex:"cdot"},
{input:"**", tag:"mo", output:"\u22C6", tex:"star"},
{input:"//", tag:"mo", output:"/", tex:null},
{input:"\\\\", tag:"mo", output:"\\", tex:"backslash"},
{input:"xx", tag:"mo", output:"\u00D7", tex:"times"},
{input:"-:", tag:"mo", output:"\u00F7", tex:"divide"},
{input:"@",  tag:"mo", output:"\u2218", tex:"circ"},
{input:"o+", tag:"mo", output:"\u2295", tex:"oplus"},
{input:"ox", tag:"mo", output:"\u2297", tex:"otimes"},
{input:"o.", tag:"mo", output:"\u2299", tex:"odot"},
{input:"sum", tag:"mo", output:"\u2211", tex:null, underover:"true"},
{input:"prod", tag:"mo", output:"\u220F", tex:null, underover:"true"},
{input:"^^",  tag:"mo", output:"\u2227", tex:"wedge"},
{input:"^^^", tag:"mo", output:"\u22C0", tex:"bigwedge", underover:"true"},
{input:"vv",  tag:"mo", output:"\u2228", tex:"vee"},
{input:"vvv", tag:"mo", output:"\u22C1", tex:"bigvee", underover:"true"},
{input:"nn",  tag:"mo", output:"\u2229", tex:"cap"},
{input:"nnn", tag:"mo", output:"\u22C2", tex:"bigcap", underover:"true"},
{input:"uu",  tag:"mo", output:"\u222A", tex:"cup"},
{input:"uuu", tag:"mo", output:"\u22C3", tex:"bigcup", underover:"true"},

//binary relation symbols
{input:"!=",  tag:"mo", output:"\u2260", tex:"ne"},
{input:"lt",  tag:"mo", output:"<", tex:null},
{input:"<=",  tag:"mo", output:"\u2264", tex:"le"},
{input:"lt=", tag:"mo", output:"\u2264", tex:"leq"},
{input:">=",  tag:"mo", output:"\u2265", tex:"ge"},
{input:"geq", tag:"mo", output:"\u2265", tex:null},
{input:"-<",  tag:"mo", output:"\u227A", tex:"prec"},
{input:"-lt", tag:"mo", output:"\u227A", tex:null},
{input:">-",  tag:"mo", output:"\u227B", tex:"succ"},
{input:"in",  tag:"mo", output:"\u2208", tex:null},
{input:"!in", tag:"mo", output:"\u2209", tex:"notin"},
{input:"sub", tag:"mo", output:"\u2282", tex:"subset"},
{input:"sup", tag:"mo", output:"\u2283", tex:"supset"},
{input:"sube", tag:"mo", output:"\u2286", tex:"subseteq"},
{input:"supe", tag:"mo", output:"\u2287", tex:"supseteq"},
{input:"-=",  tag:"mo", output:"\u2261", tex:"equiv"},
{input:"~=",  tag:"mo", output:"\u2245", tex:"cong"},
{input:"~~",  tag:"mo", output:"\u2248", tex:"approx"},
{input:"prop", tag:"mo", output:"\u221D", tex:"propto"},

//logical symbols
{input:"and", tag:"mtext", output:"and", tex:null, space:"1ex"},
{input:"or",  tag:"mtext", output:"or", tex:null, space:"1ex"},
{input:"not", tag:"mo", output:"\u00AC", tex:"neg"},
{input:"=>",  tag:"mo", output:"\u21D2", tex:"implies"},
{input:"if",  tag:"mo", output:"if", tex:null, space:"1ex"},
{input:"<=>", tag:"mo", output:"\u21D4", tex:"iff"},
{input:"AA",  tag:"mo", output:"\u2200", tex:"forall"},
{input:"EE",  tag:"mo", output:"\u2203", tex:"exists"},
{input:"_|_", tag:"mo", output:"\u22A5", tex:"bot"},
{input:"TT",  tag:"mo", output:"\u22A4", tex:"top"},
{input:"|-",  tag:"mo", output:"\u22A2", tex:"vdash"},
{input:"|=",  tag:"mo", output:"\u22A8", tex:"models"},

//grouping brackets
{input:"(", tag:"mo", output:"(", tex:null, leftBracket:true},
{input:")", tag:"mo", output:")", tex:null, rightBracket:true},
{input:"[", tag:"mo", output:"[", tex:null, leftBracket:true},
{input:"]", tag:"mo", output:"]", tex:null, rightBracket:true},
{input:"{", tag:"mo", output:"{", tex:null, leftBracket:true},
{input:"}", tag:"mo", output:"}", tex:null, rightBracket:true},
{input:"(:", tag:"mo", output:"\u2329", leftBracket:true, tex:"langle"},
{input:":)", tag:"mo", output:"\u232A", rightBracket:true, tex:"rangle"},
{input:"{:", tag:"mo", output:"{:", tex:null, leftBracket:true, invisible:true},
{input:":}", tag:"mo", output:":}", tex:null, rightBracket:true, invisible:true},

//miscellaneous symbols
{input:"int",  tag:"mo", output:"\u222B", tex:null},
{input:"oint", tag:"mo", output:"\u222E", tex:null},
//{input:"dx",   tag:"mi", output:"dx", tex:null},
{input:"del",  tag:"mo", output:"\u2202", tex:"partial"},
{input:"grad", tag:"mo", output:"\u2207", tex:"nabla"},
{input:"+-",   tag:"mo", output:"\u00B1", tex:"pm"},
{input:"O/",   tag:"mo", output:"\u2205", tex:"emptyset"},
{input:"oo",   tag:"mo", output:"\u221E", tex:"infty"},
{input:"aleph", tag:"mo", output:"\u2135", tex:null},
{input:"...",  tag:"mo", output:"...", tex:"ldots"},
{input:"\\ ",  tag:"mo", output:"\u00A0", tex:null},
{input:"quad", tag:"mo", output:"\u00A0\u00A0", tex:null},
{input:"qquad", tag:"mo", output:"\u00A0\u00A0\u00A0\u00A0", tex:null},
{input:"cdots", tag:"mo", output:"\u22EF", tex:null},
{input:"diamond", tag:"mo", output:"\u22C4", tex:null},
{input:"square", tag:"mo", output:"\u25A1", tex:null},
{input:"|_", tag:"mo", output:"\u230A", tex:"lfloor"},
{input:"_|", tag:"mo", output:"\u230B", tex:"rfloor"},
{input:"|~", tag:"mo", output:"\u2308", tex:"lceiling"},
{input:"~|", tag:"mo", output:"\u2309", tex:"rceiling"},
{input:"CC",  tag:"mo", output:"\u2102", tex:null},
{input:"NN",  tag:"mo", output:"\u2115", tex:null},
{input:"QQ",  tag:"mo", output:"\u211A", tex:null},
{input:"RR",  tag:"mo", output:"\u211D", tex:null},
{input:"ZZ",  tag:"mo", output:"\u2124", tex:null},

//standard functions
{input:"lim",  tag:"mo", output:"lim", tex:null, underover:"true"},
{input:"sin",  tag:"mo", output:"sin", tex:null},
{input:"cos",  tag:"mo", output:"cos", tex:null},
{input:"tan",  tag:"mo", output:"tan", tex:null},
{input:"sinh", tag:"mo", output:"sinh", tex:null},
{input:"cosh", tag:"mo", output:"cosh", tex:null},
{input:"tanh", tag:"mo", output:"tanh", tex:null},
{input:"cot",  tag:"mo", output:"cot", tex:null},
{input:"sec",  tag:"mo", output:"sec", tex:null},
{input:"csc",  tag:"mo", output:"csc", tex:null},
{input:"log",  tag:"mo", output:"log", tex:null},
{input:"ln",   tag:"mo", output:"ln", tex:null},
{input:"det",  tag:"mo", output:"det", tex:null},
{input:"dim",  tag:"mo", output:"dim", tex:null},
{input:"mod",  tag:"mo", output:"mod", tex:null},
{input:"gcd",  tag:"mo", output:"gcd", tex:null},
{input:"lcm",  tag:"mo", output:"lcm", tex:null},
{input:"min",  tag:"mo", output:"min", tex:null, underover:"true"},
{input:"max",  tag:"mo", output:"max", tex:null, underover:"true"},

//arrows
{input:"uarr", tag:"mo", output:"\u2191", tex:"uparrow"},
{input:"darr", tag:"mo", output:"\u2193", tex:"downarrow"},
{input:"rarr", tag:"mo", output:"\u2192", tex:"rightarrow"},
{input:"->",   tag:"mo", output:"\u2192", tex:"to"},
{input:"larr", tag:"mo", output:"\u2190", tex:"leftarrow"},
{input:"harr", tag:"mo", output:"\u2194", tex:"leftrightarrow"},
{input:"rArr", tag:"mo", output:"\u21D2", tex:"Rightarrow"},
{input:"lArr", tag:"mo", output:"\u21D0", tex:"Leftarrow"},
{input:"hArr", tag:"mo", output:"\u21D4", tex:"Leftrightarrow"},

//commands with argument
sqrt, root, frac, div, sub, sup,
{input:"hat", tag:"mover", output:"\u005E", tex:null, unary:true, acc:true},
{input:"bar", tag:"mover", output:"\u00AF", tex:"overline", unary:true, acc:true},
{input:"vec", tag:"mover", output:"\u2192", tex:null, unary:true, acc:true},
{input:"dot", tag:"mover", output:".", tex:null, unary:true, acc:true},
{input:"ddot", tag:"mover", output:"..", tex:null, unary:true, acc:true},
{input:"ul", tag:"munder", output:"\u0332", tex:"underline", unary:true, acc:true},
mtext, mbox, quote,
{input:"bb", tag:"mstyle", atname:"fontweight", atval:"bold", output:"bb", tex:null, unary:true},
{input:"mathbf", tag:"mstyle", atname:"fontweight", atval:"bold", output:"mathbf", tex:null, unary:true},
{input:"sf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"sf", tex:null, unary:true},
{input:"mathsf", tag:"mstyle", atname:"fontfamily", atval:"sans-serif", output:"mathsf", tex:null, unary:true},
{input:"bbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"bbb", tex:null, unary:true, codes:bbb},
{input:"mathbb", tag:"mstyle", atname:"mathvariant", atval:"double-struck", output:"mathbb", tex:null, unary:true, codes:bbb},
{input:"cc",  tag:"mstyle", atname:"mathvariant", atval:"script", output:"cc", tex:null, unary:true, codes:cal},
{input:"mathcal", tag:"mstyle", atname:"mathvariant", atval:"script", output:"mathcal", tex:null, unary:true, codes:cal},
{input:"tt",  tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"tt", tex:null, unary:true},
{input:"mathtt", tag:"mstyle", atname:"fontfamily", atval:"monospace", output:"mathtt", tex:null, unary:true},
{input:"fr",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"fr", tex:null, unary:true, codes:frk},
{input:"mathfrak",  tag:"mstyle", atname:"mathvariant", atval:"fraktur", output:"mathfrak", tex:null, unary:true, codes:frk}
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
      texsymbols[texsymbols.length] = 
        {input:symbols[i].tex, tag:"mo", output:symbols[i].output};
  symbols = symbols.concat(texsymbols);
  symbols.sort(compareNames);
  for (i=0; i<symbols.length; i++) names[i] = symbols[i].input;
}

function myCreateElementXHTML(t) {
  if (isIE) return document.createElement(t);
  else return document.createElementNS("http://www.w3.org/1999/xhtml",t);
}

function myCreateElementMathML(t) {
  if (isIE) return document.createElement("mml:"+t);
  else return document.createElementNS("http://www.w3.org/1998/Math/MathML",t);
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
  return {input:str.slice(0,k-1), tag:tagst, output:st};
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
V ::= [A-Za-z] | greek letters | numbers
O ::= other constant symbols
U ::= sqrt | text | bb | other unary symbols for font commands
B ::= frac | root                    binary symbols
L ::= ( | [ | { | (: | {:            left brackets
R ::= ) | ] | } | :) | :}            right brackets
S ::= VS | O | LER | US | BSS        simple expression
E ::= SE | S/S | S_S | S^S | S_S^S   expression
Each terminal symbol is translated into a corresponding mathml node.*/

function parseSexpr(str) { //parses str and returns [node,tailstr]
  var symbol, node, result, i, st, newFrag = document.createDocumentFragment();
  str = removeCharsAndBlanks(str,0);
  symbol = getSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || typeof symbol.rightBracket == "boolean" && symbol.rightBracket)
    return [null,str];
  if (typeof symbol.leftBracket == "boolean" && symbol.leftBracket) {//read (expr+)
    str = removeCharsAndBlanks(str,symbol.input.length); 
    result = parseExpr(str);
    if (typeof symbol.invisible == "boolean" && symbol.invisible) node = createMmlNode("mrow",result[0]);
    else {
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      node = createMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1]];
  }
  else if (typeof symbol.unary == "boolean" && symbol.unary) {
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
  } else {
    str = removeCharsAndBlanks(str,symbol.input.length); 
    if (typeof symbol.binary == "boolean" && symbol.binary) {
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
    } else if (typeof symbol.infix == "boolean" && symbol.infix) {
      return [createMmlNode("mo",document.createTextNode(symbol.output)),str];
    } else if (typeof symbol.space != "undefined") {
      node = myCreateElementMathML("mspace");
      node.setAttribute("width",symbol.space);
      newFrag.appendChild(node);
      newFrag.appendChild(
        createMmlNode(symbol.tag,document.createTextNode(symbol.output)));
      node = myCreateElementMathML("mspace");
      node.setAttribute("width",symbol.space);
      newFrag.appendChild(node);
      return [createMmlNode("mrow",newFrag),str];
    } else return [createMmlNode(symbol.tag,        //its a constant
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
    if (typeof symbol.infix == "boolean" && symbol.infix) {
      str = removeCharsAndBlanks(str,symbol.input.length);
      result = parseSexpr(str);
      removeBrackets(result[0]);
      str = result[1];
      if (symbol == div) removeBrackets(node);
      if (symbol == sub) {
        sym2 = getSymbol(str);
        underover = (typeof sym1.underover == "boolean" && sym1.underover);
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
  } while ((typeof symbol.rightBracket != "boolean" || !symbol.rightBracket) && !(symbol==null) && symbol.output!="");
  if (typeof symbol.rightBracket == "boolean" && symbol.rightBracket) {
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
  var node = myCreateElementMathML("mstyle");
  node.setAttribute("mathcolor",mathcolor);
  if (displaystyle) node.setAttribute("displaystyle","true");
  node.appendChild(parseExpr(str)[0]);
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

function processNode(n) {
  var mtch, str, arr;
  if (n.childNodes.length == 0 && n.nodeType!=8 &&
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
      if (arr.length>1 || mtch)
        n.parentNode.replaceChild(strarr2docFrag(arr,n.nodeType==8),n);
    }
  } else if (n.nodeName!="math") for (var i=0; i<n.childNodes.length; i++)
      processNode(n.childNodes[i]);
}

function translate() {
  initSymbols();
  var body = document.getElementsByTagName("body")[0];
  processNode(body);
}
