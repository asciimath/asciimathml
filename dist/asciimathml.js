"use strict";
var asciimath = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ts/Parse.ts
  var Parse_exports = {};
  __export(Parse_exports, {
    AMprocessNode: () => AMprocessNode,
    AsciiMath: () => AsciiMath,
    DOMNodeAdapter: () => DOMNodeAdapter,
    asciimath: () => asciimath,
    default: () => Parse_default,
    parseMath: () => parseMath
  });

  // ts/AsciiMathSymbols.ts
  var AMcal = [119964, 8492, 119966, 119967, 8496, 8497, 119970, 8459, 8464, 119973, 119974, 8466, 8499, 119977, 119978, 119979, 119980, 8475, 119982, 119983, 119984, 119985, 119986, 119987, 119988, 119989, 119990, 119991, 119992, 119993, 8495, 119995, 8458, 119997, 119998, 119999, 12e4, 120001, 120002, 120003, 8500, 120005, 120006, 120007, 120008, 120009, 120010, 120011, 120012, 120013, 120014, 120015];
  var AMfrk = [120068, 120069, 8493, 120071, 120072, 120073, 120074, 8460, 8465, 120077, 120078, 120079, 120080, 120081, 120082, 120083, 120084, 8476, 120086, 120087, 120088, 120089, 120090, 120091, 120092, 8488, 120094, 120095, 120096, 120097, 120098, 120099, 120100, 120101, 120102, 120103, 120104, 120105, 120106, 120107, 120108, 120109, 120110, 120111, 120112, 120113, 120114, 120115, 120116, 120117, 120118, 120119];
  var AMbbb = [120120, 120121, 8450, 120123, 120124, 120125, 120126, 8461, 120128, 120129, 120130, 120131, 120132, 8469, 120134, 8473, 8474, 8477, 120138, 120139, 120140, 120141, 120142, 120143, 120144, 8484, 120146, 120147, 120148, 120149, 120150, 120151, 120152, 120153, 120154, 120155, 120156, 120157, 120158, 120159, 120160, 120161, 120162, 120163, 120164, 120165, 120166, 120167, 120168, 120169, 120170, 120171, 120792];
  var AMbb = [119808, 119834, 120782];
  var AMsf = [120224, 120250, 120802];
  var AMtt = [120432, 120458, 120822];
  var AMquote = { input: '"', tag: "mtext", output: "mbox", tex: null, ttype: 10 /* TEXT */ };
  var AMsymbols = [
    // Greek symbols
    { input: "alpha", tag: "mi", output: "\u03B1", tex: null, ttype: 0 /* CONST */ },
    { input: "beta", tag: "mi", output: "\u03B2", tex: null, ttype: 0 /* CONST */ },
    { input: "chi", tag: "mi", output: "\u03C7", tex: null, ttype: 0 /* CONST */ },
    { input: "delta", tag: "mi", output: "\u03B4", tex: null, ttype: 0 /* CONST */ },
    { input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: 0 /* CONST */ },
    { input: "epsi", tag: "mi", output: "\u03B5", tex: "epsilon", ttype: 0 /* CONST */ },
    { input: "varepsilon", tag: "mi", output: "\u025B", tex: null, ttype: 0 /* CONST */ },
    { input: "eta", tag: "mi", output: "\u03B7", tex: null, ttype: 0 /* CONST */ },
    { input: "gamma", tag: "mi", output: "\u03B3", tex: null, ttype: 0 /* CONST */ },
    { input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: 0 /* CONST */ },
    { input: "iota", tag: "mi", output: "\u03B9", tex: null, ttype: 0 /* CONST */ },
    { input: "kappa", tag: "mi", output: "\u03BA", tex: null, ttype: 0 /* CONST */ },
    { input: "lambda", tag: "mi", output: "\u03BB", tex: null, ttype: 0 /* CONST */ },
    { input: "Lambda", tag: "mo", output: "\u039B", tex: null, ttype: 0 /* CONST */ },
    { input: "lamda", tag: "mi", output: "\u03BB", tex: null, ttype: 0 /* CONST */ },
    { input: "Lamda", tag: "mo", output: "\u039B", tex: null, ttype: 0 /* CONST */ },
    { input: "mu", tag: "mi", output: "\u03BC", tex: null, ttype: 0 /* CONST */ },
    { input: "nu", tag: "mi", output: "\u03BD", tex: null, ttype: 0 /* CONST */ },
    { input: "omega", tag: "mi", output: "\u03C9", tex: null, ttype: 0 /* CONST */ },
    { input: "Omega", tag: "mo", output: "\u03A9", tex: null, ttype: 0 /* CONST */ },
    { input: "phi", tag: "mi", output: "\u03D5", tex: null, ttype: 0 /* CONST */ },
    { input: "varphi", tag: "mi", output: "\u03C6", tex: null, ttype: 0 /* CONST */ },
    { input: "Phi", tag: "mo", output: "\u03A6", tex: null, ttype: 0 /* CONST */ },
    { input: "pi", tag: "mi", output: "\u03C0", tex: null, ttype: 0 /* CONST */ },
    { input: "Pi", tag: "mo", output: "\u03A0", tex: null, ttype: 0 /* CONST */ },
    { input: "psi", tag: "mi", output: "\u03C8", tex: null, ttype: 0 /* CONST */ },
    { input: "Psi", tag: "mi", output: "\u03A8", tex: null, ttype: 0 /* CONST */ },
    { input: "rho", tag: "mi", output: "\u03C1", tex: null, ttype: 0 /* CONST */ },
    { input: "sigma", tag: "mi", output: "\u03C3", tex: null, ttype: 0 /* CONST */ },
    { input: "Sigma", tag: "mo", output: "\u03A3", tex: null, ttype: 0 /* CONST */ },
    { input: "tau", tag: "mi", output: "\u03C4", tex: null, ttype: 0 /* CONST */ },
    { input: "theta", tag: "mi", output: "\u03B8", tex: null, ttype: 0 /* CONST */ },
    { input: "vartheta", tag: "mi", output: "\u03D1", tex: null, ttype: 0 /* CONST */ },
    { input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: 0 /* CONST */ },
    { input: "upsilon", tag: "mi", output: "\u03C5", tex: null, ttype: 0 /* CONST */ },
    { input: "xi", tag: "mi", output: "\u03BE", tex: null, ttype: 0 /* CONST */ },
    { input: "Xi", tag: "mo", output: "\u039E", tex: null, ttype: 0 /* CONST */ },
    { input: "zeta", tag: "mi", output: "\u03B6", tex: null, ttype: 0 /* CONST */ },
    // Binary operation symbols
    { input: "*", tag: "mo", output: "\u22C5", tex: "cdot", ttype: 0 /* CONST */ },
    { input: "**", tag: "mo", output: "\u2217", tex: "ast", ttype: 0 /* CONST */ },
    { input: "***", tag: "mo", output: "\u22C6", tex: "star", ttype: 0 /* CONST */ },
    { input: "//", tag: "mo", output: "/", tex: null, ttype: 0 /* CONST */ },
    { input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: 0 /* CONST */ },
    { input: "setminus", tag: "mo", output: "\\", tex: null, ttype: 0 /* CONST */ },
    { input: "xx", tag: "mo", output: "\xD7", tex: "times", ttype: 0 /* CONST */ },
    { input: "|><", tag: "mo", output: "\u22C9", tex: "ltimes", ttype: 0 /* CONST */ },
    { input: "><|", tag: "mo", output: "\u22CA", tex: "rtimes", ttype: 0 /* CONST */ },
    { input: "|><|", tag: "mo", output: "\u22C8", tex: "bowtie", ttype: 0 /* CONST */ },
    { input: "-:", tag: "mo", output: "\xF7", tex: "div", ttype: 0 /* CONST */ },
    { input: "divide", tag: "mo", output: "-:", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "@", tag: "mo", output: "\u2218", tex: "circ", ttype: 0 /* CONST */ },
    { input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: 0 /* CONST */ },
    { input: "o-", tag: "mo", output: "\u2296", tex: "ominus", ttype: 0 /* CONST */ },
    { input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: 0 /* CONST */ },
    { input: "o.", tag: "mo", output: "\u2299", tex: "odot", ttype: 0 /* CONST */ },
    { input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "prod", tag: "mo", output: "\u220F", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: 0 /* CONST */ },
    { input: "^^^", tag: "mo", output: "\u22C0", tex: "bigwedge", ttype: 7 /* UNDEROVER */ },
    { input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: 0 /* CONST */ },
    { input: "vvv", tag: "mo", output: "\u22C1", tex: "bigvee", ttype: 7 /* UNDEROVER */ },
    { input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: 0 /* CONST */ },
    { input: "nnn", tag: "mo", output: "\u22C2", tex: "bigcap", ttype: 7 /* UNDEROVER */ },
    { input: "uu", tag: "mo", output: "\u222A", tex: "cup", ttype: 0 /* CONST */ },
    { input: "uuu", tag: "mo", output: "\u22C3", tex: "bigcup", ttype: 7 /* UNDEROVER */ },
    { input: "dag", tag: "mo", output: "\u2020", tex: "dagger", ttype: 0 /* CONST */ },
    { input: "ddag", tag: "mo", output: "\u2021", tex: "ddagger", ttype: 0 /* CONST */ },
    // Binary relation symbols
    { input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: 0 /* CONST */ },
    { input: ":=", tag: "mo", output: ":=", tex: null, ttype: 0 /* CONST */ },
    { input: "lt", tag: "mo", output: "<", tex: null, ttype: 0 /* CONST */ },
    { input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: 0 /* CONST */ },
    { input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: 0 /* CONST */ },
    { input: "gt", tag: "mo", output: ">", tex: null, ttype: 0 /* CONST */ },
    { input: "mlt", tag: "mo", output: "\u226A", tex: "ll", ttype: 0 /* CONST */ },
    { input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: 0 /* CONST */ },
    { input: "gt=", tag: "mo", output: "\u2265", tex: "geq", ttype: 0 /* CONST */ },
    { input: "mgt", tag: "mo", output: "\u226B", tex: "gg", ttype: 0 /* CONST */ },
    { input: "-<", tag: "mo", output: "\u227A", tex: "prec", ttype: 0 /* CONST */ },
    { input: "-lt", tag: "mo", output: "\u227A", tex: null, ttype: 0 /* CONST */ },
    { input: ">-", tag: "mo", output: "\u227B", tex: "succ", ttype: 0 /* CONST */ },
    { input: "-<=", tag: "mo", output: "\u2AAF", tex: "preceq", ttype: 0 /* CONST */ },
    { input: ">-=", tag: "mo", output: "\u2AB0", tex: "succeq", ttype: 0 /* CONST */ },
    { input: "in", tag: "mo", output: "\u2208", tex: null, ttype: 0 /* CONST */ },
    { input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: 0 /* CONST */ },
    { input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: 0 /* CONST */ },
    { input: "!sub", tag: "mo", output: "\u2284", tex: "not\\subset", ttype: 0 /* CONST */ },
    { input: "notsubset", tag: "mo", output: "!sub", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: 0 /* CONST */ },
    { input: "!sup", tag: "mo", output: "\u2285", tex: "not\\supset", ttype: 0 /* CONST */ },
    { input: "notsupset", tag: "mo", output: "!sup", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "sube", tag: "mo", output: "\u2286", tex: "subseteq", ttype: 0 /* CONST */ },
    { input: "!sube", tag: "mo", output: "\u2288", tex: "not\\subseteq", ttype: 0 /* CONST */ },
    { input: "notsubseteq", tag: "mo", output: "!sube", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "supe", tag: "mo", output: "\u2287", tex: "supseteq", ttype: 0 /* CONST */ },
    { input: "!supe", tag: "mo", output: "\u2289", tex: "not\\supseteq", ttype: 0 /* CONST */ },
    { input: "notsupseteq", tag: "mo", output: "!supe", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: 0 /* CONST */ },
    { input: "!-=", tag: "mo", output: "\u2262", tex: "not\\equiv", ttype: 0 /* CONST */ },
    { input: "notequiv", tag: "mo", output: "!-=", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: 0 /* CONST */ },
    { input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: 0 /* CONST */ },
    { input: "~", tag: "mo", output: "\u223C", tex: "sim", ttype: 0 /* CONST */ },
    { input: "prop", tag: "mo", output: "\u221D", tex: "propto", ttype: 0 /* CONST */ },
    // Logical symbols
    { input: "and", tag: "mtext", output: "and", tex: null, ttype: 6 /* SPACE */ },
    { input: "or", tag: "mtext", output: "or", tex: null, ttype: 6 /* SPACE */ },
    { input: "not", tag: "mo", output: "\xAC", tex: "neg", ttype: 0 /* CONST */ },
    { input: "=>", tag: "mo", output: "\u21D2", tex: "implies", ttype: 0 /* CONST */ },
    { input: "if", tag: "mo", output: "if", tex: null, ttype: 6 /* SPACE */ },
    { input: "<=>", tag: "mo", output: "\u21D4", tex: "iff", ttype: 0 /* CONST */ },
    { input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: 0 /* CONST */ },
    { input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: 0 /* CONST */ },
    { input: "_|_", tag: "mo", output: "\u22A5", tex: "bot", ttype: 0 /* CONST */ },
    { input: "TT", tag: "mo", output: "\u22A4", tex: "top", ttype: 0 /* CONST */ },
    { input: "|--", tag: "mo", output: "\u22A2", tex: "vdash", ttype: 0 /* CONST */ },
    { input: "|==", tag: "mo", output: "\u22A8", tex: "models", ttype: 0 /* CONST */ },
    // Grouping brackets
    { input: "(", tag: "mo", output: "(", tex: "left(", ttype: 4 /* LEFTBRACKET */ },
    { input: ")", tag: "mo", output: ")", tex: "right)", ttype: 5 /* RIGHTBRACKET */ },
    { input: "[", tag: "mo", output: "[", tex: "left[", ttype: 4 /* LEFTBRACKET */ },
    { input: "]", tag: "mo", output: "]", tex: "right]", ttype: 5 /* RIGHTBRACKET */ },
    { input: "{", tag: "mo", output: "{", tex: null, ttype: 4 /* LEFTBRACKET */ },
    { input: "}", tag: "mo", output: "}", tex: null, ttype: 5 /* RIGHTBRACKET */ },
    { input: "|", tag: "mo", output: "|", tex: null, ttype: 9 /* LEFTRIGHT */ },
    { input: ":|:", tag: "mo", output: "|", tex: null, ttype: 0 /* CONST */ },
    { input: "|:", tag: "mo", output: "|", tex: null, ttype: 4 /* LEFTBRACKET */ },
    { input: ":|", tag: "mo", output: "|", tex: null, ttype: 5 /* RIGHTBRACKET */ },
    { input: "(:", tag: "mo", output: "\u2329", tex: "langle", ttype: 4 /* LEFTBRACKET */ },
    { input: ":)", tag: "mo", output: "\u232A", tex: "rangle", ttype: 5 /* RIGHTBRACKET */ },
    { input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: 4 /* LEFTBRACKET */ },
    { input: ">>", tag: "mo", output: "\u232A", tex: null, ttype: 5 /* RIGHTBRACKET */ },
    { input: "{:", tag: "mo", output: "{:", tex: null, ttype: 4 /* LEFTBRACKET */, invisible: true },
    { input: ":}", tag: "mo", output: ":}", tex: null, ttype: 5 /* RIGHTBRACKET */, invisible: true },
    // Miscellaneous symbols
    { input: "int", tag: "mo", output: "\u222B", tex: null, ttype: 0 /* CONST */ },
    { input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: 8 /* DEFINITION */ },
    { input: "oint", tag: "mo", output: "\u222E", tex: null, ttype: 0 /* CONST */ },
    { input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: 0 /* CONST */ },
    { input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: 0 /* CONST */ },
    { input: "+-", tag: "mo", output: "\xB1", tex: "pm", ttype: 0 /* CONST */ },
    { input: "-+", tag: "mo", output: "\u2213", tex: "mp", ttype: 0 /* CONST */ },
    { input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: 0 /* CONST */ },
    { input: "oo", tag: "mo", output: "\u221E", tex: "infty", ttype: 0 /* CONST */ },
    { input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: 0 /* CONST */ },
    { input: "...", tag: "mo", output: "...", tex: "ldots", ttype: 0 /* CONST */ },
    { input: ":.", tag: "mo", output: "\u2234", tex: "therefore", ttype: 0 /* CONST */ },
    { input: ":'", tag: "mo", output: "\u2235", tex: "because", ttype: 0 /* CONST */ },
    { input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: 0 /* CONST */ },
    { input: "/_\\", tag: "mo", output: "\u25B3", tex: "triangle", ttype: 0 /* CONST */ },
    { input: "'", tag: "mo", output: "\u2032", tex: "prime", ttype: 0 /* CONST */ },
    { input: "tilde", tag: "mover", output: "~", tex: null, ttype: 1 /* UNARY */, acc: true },
    { input: "\\ ", tag: "mo", output: "\xA0", tex: null, ttype: 0 /* CONST */ },
    { input: "frown", tag: "mo", output: "\u2322", tex: null, ttype: 0 /* CONST */ },
    { input: "quad", tag: "mo", output: "\xA0\xA0", tex: null, ttype: 0 /* CONST */ },
    { input: "qquad", tag: "mo", output: "\xA0\xA0\xA0\xA0", tex: null, ttype: 0 /* CONST */ },
    { input: "cdots", tag: "mo", output: "\u22EF", tex: null, ttype: 0 /* CONST */ },
    { input: "vdots", tag: "mo", output: "\u22EE", tex: null, ttype: 0 /* CONST */ },
    { input: "ddots", tag: "mo", output: "\u22F1", tex: null, ttype: 0 /* CONST */ },
    { input: "diamond", tag: "mo", output: "\u22C4", tex: null, ttype: 0 /* CONST */ },
    { input: "square", tag: "mo", output: "\u25A1", tex: null, ttype: 0 /* CONST */ },
    { input: "|__", tag: "mo", output: "\u230A", tex: "lfloor", ttype: 0 /* CONST */ },
    { input: "__|", tag: "mo", output: "\u230B", tex: "rfloor", ttype: 0 /* CONST */ },
    { input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: 0 /* CONST */ },
    { input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: 0 /* CONST */ },
    { input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: 0 /* CONST */ },
    { input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: 0 /* CONST */ },
    { input: "QQ", tag: "mo", output: "\u211A", tex: null, ttype: 0 /* CONST */ },
    { input: "RR", tag: "mo", output: "\u211D", tex: null, ttype: 0 /* CONST */ },
    { input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: 0 /* CONST */ },
    { input: "f", tag: "mi", output: "f", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "g", tag: "mi", output: "g", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "hbar", tag: "mo", output: "\u210F", tex: null, ttype: 0 /* CONST */ },
    // Standard functions
    { input: "lim", tag: "mo", output: "lim", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "sin", tag: "mo", output: "sin", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "cos", tag: "mo", output: "cos", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "tan", tag: "mo", output: "tan", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "sinh", tag: "mo", output: "sinh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "cosh", tag: "mo", output: "cosh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "tanh", tag: "mo", output: "tanh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "cot", tag: "mo", output: "cot", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "sec", tag: "mo", output: "sec", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "csc", tag: "mo", output: "csc", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arcsin", tag: "mo", output: "arcsin", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arccos", tag: "mo", output: "arccos", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arctan", tag: "mo", output: "arctan", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arcsec", tag: "mo", output: "arcsec", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arccsc", tag: "mo", output: "arccsc", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "arccot", tag: "mo", output: "arccot", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "coth", tag: "mo", output: "coth", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "sech", tag: "mo", output: "sech", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "csch", tag: "mo", output: "csch", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "exp", tag: "mo", output: "exp", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "abs", tag: "mo", output: "abs", tex: null, ttype: 1 /* UNARY */, rewriteleftright: ["|", "|"] },
    { input: "norm", tag: "mo", output: "norm", tex: null, ttype: 1 /* UNARY */, rewriteleftright: ["\u2225", "\u2225"] },
    { input: "floor", tag: "mo", output: "floor", tex: null, ttype: 1 /* UNARY */, rewriteleftright: ["\u230A", "\u230B"] },
    { input: "ceil", tag: "mo", output: "ceil", tex: null, ttype: 1 /* UNARY */, rewriteleftright: ["\u2308", "\u2309"] },
    { input: "log", tag: "mo", output: "log", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "ln", tag: "mo", output: "ln", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "det", tag: "mo", output: "det", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "dim", tag: "mo", output: "dim", tex: null, ttype: 0 /* CONST */ },
    { input: "mod", tag: "mo", output: "mod", tex: null, ttype: 0 /* CONST */ },
    { input: "gcd", tag: "mo", output: "gcd", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "lcm", tag: "mo", output: "lcm", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "lub", tag: "mo", output: "lub", tex: null, ttype: 0 /* CONST */ },
    { input: "glb", tag: "mo", output: "glb", tex: null, ttype: 0 /* CONST */ },
    { input: "min", tag: "mo", output: "min", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "max", tag: "mo", output: "max", tex: null, ttype: 7 /* UNDEROVER */ },
    { input: "Sin", tag: "mo", output: "Sin", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Cos", tag: "mo", output: "Cos", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Tan", tag: "mo", output: "Tan", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Arcsin", tag: "mo", output: "Arcsin", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Arccos", tag: "mo", output: "Arccos", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Arctan", tag: "mo", output: "Arctan", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Sinh", tag: "mo", output: "Sinh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Cosh", tag: "mo", output: "Cosh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Tanh", tag: "mo", output: "Tanh", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Cot", tag: "mo", output: "Cot", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Sec", tag: "mo", output: "Sec", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Csc", tag: "mo", output: "Csc", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Log", tag: "mo", output: "Log", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Ln", tag: "mo", output: "Ln", tex: null, ttype: 1 /* UNARY */, func: true },
    { input: "Abs", tag: "mo", output: "abs", tex: null, ttype: 1 /* UNARY */, notexcopy: true, rewriteleftright: ["|", "|"] },
    // Arrows
    { input: "uarr", tag: "mo", output: "\u2191", tex: "uparrow", ttype: 0 /* CONST */ },
    { input: "darr", tag: "mo", output: "\u2193", tex: "downarrow", ttype: 0 /* CONST */ },
    { input: "rarr", tag: "mo", output: "\u2192", tex: "rightarrow", ttype: 0 /* CONST */ },
    { input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: 0 /* CONST */ },
    { input: ">->", tag: "mo", output: "\u21A3", tex: "rightarrowtail", ttype: 0 /* CONST */ },
    { input: "->>", tag: "mo", output: "\u21A0", tex: "twoheadrightarrow", ttype: 0 /* CONST */ },
    { input: ">->>", tag: "mo", output: "\u2916", tex: "twoheadrightarrowtail", ttype: 0 /* CONST */ },
    { input: "|->", tag: "mo", output: "\u21A6", tex: "mapsto", ttype: 0 /* CONST */ },
    { input: "larr", tag: "mo", output: "\u2190", tex: "leftarrow", ttype: 0 /* CONST */ },
    { input: "harr", tag: "mo", output: "\u2194", tex: "leftrightarrow", ttype: 0 /* CONST */ },
    { input: "rArr", tag: "mo", output: "\u21D2", tex: "Rightarrow", ttype: 0 /* CONST */ },
    { input: "lArr", tag: "mo", output: "\u21D0", tex: "Leftarrow", ttype: 0 /* CONST */ },
    { input: "dArr", tag: "mo", output: "\u21D3", tex: "Downarrow", ttype: 0 /* CONST */ },
    { input: "hArr", tag: "mo", output: "\u21D4", tex: "Leftrightarrow", ttype: 0 /* CONST */ },
    { input: "rightleftharpoons", tag: "mo", output: "\u21CC", tex: null, ttype: 0 /* CONST */ },
    // Commands with argument
    { input: "sqrt", tag: "msqrt", output: "sqrt", tex: null, ttype: 1 /* UNARY */ },
    { input: "root", tag: "mroot", output: "root", tex: null, ttype: 2 /* BINARY */ },
    { input: "frac", tag: "mfrac", output: "/", tex: null, ttype: 2 /* BINARY */ },
    { input: "/", tag: "mfrac", output: "/", tex: null, ttype: 3 /* INFIX */ },
    { input: "stackrel", tag: "mover", output: "stackrel", tex: null, ttype: 2 /* BINARY */ },
    { input: "overset", tag: "mover", output: "stackrel", tex: null, ttype: 2 /* BINARY */ },
    { input: "underset", tag: "munder", output: "stackrel", tex: null, ttype: 2 /* BINARY */ },
    { input: "_", tag: "msub", output: "_", tex: null, ttype: 3 /* INFIX */ },
    { input: "^", tag: "msup", output: "^", tex: null, ttype: 3 /* INFIX */ },
    { input: "hat", tag: "mover", output: "^", tex: null, ttype: 1 /* UNARY */, acc: true },
    { input: "bar", tag: "mover", output: "\xAF", tex: "overline", ttype: 1 /* UNARY */, acc: true },
    { input: "vec", tag: "mover", output: "\u2192", tex: null, ttype: 1 /* UNARY */, acc: true },
    { input: "dot", tag: "mover", output: ".", tex: null, ttype: 1 /* UNARY */, acc: true },
    { input: "ddot", tag: "mover", output: "..", tex: null, ttype: 1 /* UNARY */, acc: true },
    { input: "overarc", tag: "mover", output: "\u23DC", tex: "overparen", ttype: 1 /* UNARY */, acc: true },
    { input: "ul", tag: "munder", output: "\u0332", tex: "underline", ttype: 1 /* UNARY */, acc: true },
    { input: "ubrace", tag: "munder", output: "\u23DF", tex: "underbrace", ttype: 15 /* UNARYUNDEROVER */, acc: true },
    { input: "obrace", tag: "mover", output: "\u23DE", tex: "overbrace", ttype: 15 /* UNARYUNDEROVER */, acc: true },
    { input: "text", tag: "mtext", output: "text", tex: null, ttype: 10 /* TEXT */ },
    { input: "mbox", tag: "mtext", output: "mbox", tex: null, ttype: 10 /* TEXT */ },
    { input: "color", tag: "mstyle", output: "color", tex: null, ttype: 2 /* BINARY */ },
    { input: "id", tag: "mrow", output: "id", tex: null, ttype: 2 /* BINARY */ },
    { input: "class", tag: "mrow", output: "class", tex: null, ttype: 2 /* BINARY */ },
    { input: "cancel", tag: "menclose", output: "cancel", tex: null, ttype: 1 /* UNARY */ },
    AMquote,
    { input: "bb", tag: "mstyle", atname: "mathvariant", atval: "bold", output: "bb", tex: null, ttype: 1 /* UNARY */, codes: AMbb },
    { input: "mathbf", tag: "mstyle", atname: "mathvariant", atval: "bold", output: "mathbf", tex: null, ttype: 1 /* UNARY */, codes: AMbb },
    { input: "sf", tag: "mstyle", atname: "mathvariant", atval: "sans-serif", output: "sf", tex: null, ttype: 1 /* UNARY */, codes: AMsf },
    { input: "mathsf", tag: "mstyle", atname: "mathvariant", atval: "sans-serif", output: "mathsf", tex: null, ttype: 1 /* UNARY */, codes: AMsf },
    { input: "bbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "bbb", tex: null, ttype: 1 /* UNARY */, codes: AMbbb },
    { input: "mathbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "mathbb", tex: null, ttype: 1 /* UNARY */, codes: AMbbb },
    { input: "cc", tag: "mstyle", atname: "mathvariant", atval: "script", output: "cc", tex: null, ttype: 1 /* UNARY */, codes: AMcal },
    { input: "mathcal", tag: "mstyle", atname: "mathvariant", atval: "script", output: "mathcal", tex: null, ttype: 1 /* UNARY */, codes: AMcal },
    { input: "tt", tag: "mstyle", atname: "mathvariant", atval: "monospace", output: "tt", tex: null, ttype: 1 /* UNARY */, codes: AMtt },
    { input: "mathtt", tag: "mstyle", atname: "mathvariant", atval: "monospace", output: "mathtt", tex: null, ttype: 1 /* UNARY */, codes: AMtt },
    { input: "fr", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "fr", tex: null, ttype: 1 /* UNARY */, codes: AMfrk },
    { input: "mathfrak", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "mathfrak", tex: null, ttype: 1 /* UNARY */, codes: AMfrk }
  ];

  // ts/AsciiMathParser.ts
  var AsciiMathParser = class {
    /**
     * @constructor
     * @param {IParseOptions} configuration A parser configuration.
     */
    constructor(configuration) {
      this.configuration = configuration;
      /**
       * Current nesting depth for tracking brackets
       *
       * @type {number}
       */
      __publicField(this, "nestingDepth", 0);
      /**
       * Previous symbol type
       *
       * @type {TokenType}
       */
      __publicField(this, "previousSymbol", -1 /* NONE */);
      /**
       * Current symbol type
       *
       * @type {TokenType}
       */
      __publicField(this, "currentSymbol", -1 /* NONE */);
      /**
       * Sorted array of symbol names for binary search
       *
       * @type {string[]}
       */
      __publicField(this, "symbolNames", []);
      /**
       * Symbol table including TeX aliases
       *
       * @type {Symbol[]}
       */
      __publicField(this, "symbols", []);
      /**
       * Decimal sign character
       *
       * @type {string}
       */
      __publicField(this, "decimalsign", ".");
      /**
       * Display style (for limits)
       *
       * @type {boolean}
       */
      __publicField(this, "displaystyle", true);
      __publicField(this, "TokenTypeMap", {
        CONST: 0 /* CONST */,
        UNARY: 1 /* UNARY */,
        BINARY: 2 /* BINARY */,
        INFIX: 3 /* INFIX */,
        LEFTBRACKET: 4 /* LEFTBRACKET */,
        RIGHTBRACKET: 5 /* RIGHTBRACKET */,
        SPACE: 6 /* SPACE */,
        UNDEROVER: 7 /* UNDEROVER */,
        DEFINITION: 8 /* DEFINITION */,
        LEFTRIGHT: 9 /* LEFTRIGHT */,
        TEXT: 10 /* TEXT */,
        UNARYUNDEROVER: 15 /* UNARYUNDEROVER */
      });
      this.decimalsign = configuration.options.decimalsign;
      this.displaystyle = configuration.options.displaystyle;
      this.initSymbols();
    }
    /**
     * Initialize the symbol table
     */
    initSymbols() {
      var _a, _b, _c;
      this.symbols = [...AMsymbols];
      if (this.configuration.options.additionalSymbols) {
        for (const sym of this.configuration.options.additionalSymbols) {
          const ttypeUpper = (_a = sym.ttype) == null ? void 0 : _a.toUpperCase();
          if (ttypeUpper && ttypeUpper in this.TokenTypeMap && sym.input && sym.tag && sym.output) {
            this.symbols.push(__spreadProps(__spreadValues({}, sym), {
              ttype: this.TokenTypeMap[ttypeUpper],
              tex: (_b = sym.tex) != null ? _b : null
            }));
          }
        }
      }
      const symlen = this.symbols.length;
      for (let i = 0; i < symlen; i++) {
        if (this.symbols[i].tex) {
          this.symbols.push({
            input: (_c = this.symbols[i].tex) != null ? _c : "",
            tag: this.symbols[i].tag,
            output: this.symbols[i].output,
            tex: null,
            ttype: this.symbols[i].ttype,
            acc: this.symbols[i].acc || false
          });
        }
      }
      this.refreshSymbols();
    }
    /**
     * Refresh the symbol name list (sort and extract names)
     */
    refreshSymbols() {
      this.symbols.sort((a, b) => a.input > b.input ? 1 : -1);
      this.symbolNames = this.symbols.map((s) => s.input);
    }
    /**
     * Remove n characters and any following blanks from the string
     *
     * @param {string} str The string to process
     * @param {number} n Number of characters to remove
     * @returns {string} The processed string
     */
    removeCharsAndBlanks(str, n) {
      let st;
      if (str.charAt(n) === "\\" && str.charAt(n + 1) !== "\\" && str.charAt(n + 1) !== " ") {
        st = str.slice(n + 1);
      } else {
        st = str.slice(n);
      }
      let i = 0;
      while (i < st.length && st.charCodeAt(i) <= 32) {
        i++;
      }
      return st.slice(i);
    }
    /**
     * Binary search for position where str appears or would be inserted
     *
     * @param {string[]} arr Sorted array
     * @param {string} str String to find
     * @param {number} n Starting position
     * @returns {number} Position index
     */
    position(arr, str, n) {
      if (n === 0) {
        let h;
        let m;
        n = -1;
        h = arr.length;
        while (n + 1 < h) {
          m = n + h >> 1;
          if (arr[m] < str) {
            n = m;
          } else {
            h = m;
          }
        }
        return h;
      } else {
        let i;
        for (i = n; i < arr.length && arr[i] < str; i++) ;
        return i;
      }
    }
    /**
     * Get the maximal initial substring of str that appears in symbol names
     *
     * @param {string} str Input string
     * @returns {Symbol | null} The matched symbol or null
     */
    getSymbol(str) {
      let k = 0;
      let j = 0;
      let mk = -1;
      let st;
      let tagst;
      let match = "";
      let more = true;
      for (let i = 1; i <= str.length && more; i++) {
        st = str.slice(0, i);
        j = k;
        k = this.position(this.symbolNames, st, j);
        if (k < this.symbolNames.length && str.slice(0, this.symbolNames[k].length) === this.symbolNames[k]) {
          match = this.symbolNames[k];
          mk = k;
          i = match.length;
        }
        more = k < this.symbolNames.length && str.slice(0, this.symbolNames[k].length) >= this.symbolNames[k];
      }
      this.previousSymbol = this.currentSymbol;
      if (match !== "") {
        this.currentSymbol = this.symbols[mk].ttype;
        return this.symbols[mk];
      }
      this.currentSymbol = 0 /* CONST */;
      k = 1;
      st = str.slice(0, 1);
      let integ = true;
      while ("0" <= st && st <= "9" && k <= str.length) {
        st = str.slice(k, k + 1);
        k++;
      }
      if (st === this.decimalsign) {
        st = str.slice(k, k + 1);
        if ("0" <= st && st <= "9") {
          integ = false;
          k++;
          while ("0" <= st && st <= "9" && k <= str.length) {
            st = str.slice(k, k + 1);
            k++;
          }
        }
      }
      if (integ && k > 1 || k > 2) {
        st = str.slice(0, k - 1);
        tagst = "mn";
      } else {
        k = 2;
        st = str.slice(0, 1);
        tagst = "A" > st || st > "Z" ? "a" > st || st > "z" ? "mo" : "mi" : "mi";
      }
      if (st === "-" && str.charAt(1) !== " " && this.previousSymbol === 3 /* INFIX */) {
        this.currentSymbol = 3 /* INFIX */;
        return { input: st, tag: tagst, output: st, tex: null, ttype: 1 /* UNARY */, func: true };
      }
      return { input: st, tag: tagst, output: st, tex: null, ttype: 0 /* CONST */ };
    }
    /**
     * Append, unwrapping if needed
     * Since INodeAdapters don't have document fragments,
     * we'll treat inferredMrow as a fragment here, so 
     * its children get appended instead of the inferredMrow itself.
     *
     * @param {INodeAdapter} toappend The node to append
     * @param {INodeAdapter} node The node to append to
     */
    appendUnwrap(toappend, node) {
      if (toappend.kind === "inferredMrow") {
        for (const child of toappend.childNodes) {
          node.appendChild(child);
        }
      } else {
        node.appendChild(toappend);
      }
    }
    /**
     * Remove brackets from a node if it's an mrow with bracket children
     *
     * @param {INodeAdapter} node The node to remove brackets from
     */
    removeBrackets(node) {
      if (!node || !node.childNodes || node.childNodes.length === 0) {
        return;
      }
      if (node.kind === "mrow" || node.kind === "inferredMrow") {
        const first = node.childNodes[0];
        if (node.childNodes.length > 1 && node.childNodes[1].kind === "mtable") {
          return;
        }
        const last = node.childNodes[node.childNodes.length - 1];
        if (first && first.childNodes[0]) {
          const text = first.childNodes[0].text;
          if (text === "(" || text === "[" || text === "{") {
            node.removeFirstChild();
          }
        }
        if (last && last.childNodes[0]) {
          const text = last.childNodes[0].text;
          if (text === ")" || text === "]" || text === "}") {
            node.removeLastChild();
          }
        }
      }
    }
    /**
     * Parse a simple expression
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    parseSexpr(str) {
      var _a, _b;
      let symbol;
      let node;
      let result;
      let result2;
      let i;
      let st;
      let newFrag;
      str = this.removeCharsAndBlanks(str, 0);
      symbol = this.getSymbol(str);
      if (symbol === null || symbol.ttype === 5 /* RIGHTBRACKET */ && this.nestingDepth > 0) {
        return [null, str];
      }
      symbol = symbol;
      if (symbol.ttype === 8 /* DEFINITION */) {
        str = symbol.output + this.removeCharsAndBlanks(str, symbol.input.length);
        symbol = this.getSymbol(str);
      }
      if (symbol === null) {
        return [null, str];
      }
      symbol = symbol;
      switch (symbol.ttype) {
        case 7 /* UNDEROVER */:
        case 0 /* CONST */:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          node = this.configuration.create(symbol.tag);
          node.appendChild(this.configuration.createText(symbol.output));
          return [node, str];
        case 4 /* LEFTBRACKET */:
          this.nestingDepth++;
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          result = this.parseExpr(str, true);
          this.nestingDepth--;
          if (symbol.invisible) {
            node = this.configuration.create("mrow");
            if (result[0]) {
              this.appendUnwrap(result[0], node);
            }
          } else {
            const mo = this.configuration.create("mo");
            mo.appendChild(this.configuration.createText(symbol.output));
            node = this.configuration.create("mrow");
            node.appendChild(mo);
            if (result[0]) {
              this.appendUnwrap(result[0], node);
            }
          }
          return [node, result[1]];
        case 10 /* TEXT */:
          if (symbol !== AMquote) {
            str = this.removeCharsAndBlanks(str, symbol.input.length);
          }
          if (str.charAt(0) === "{") {
            i = str.indexOf("}");
          } else if (str.charAt(0) === "(") {
            i = str.indexOf(")");
          } else if (str.charAt(0) === "[") {
            i = str.indexOf("]");
          } else if (symbol === AMquote) {
            i = str.slice(1).indexOf('"') + 1;
          } else {
            i = 0;
          }
          if (i === -1) i = str.length;
          st = str.slice(1, i);
          node = this.configuration.create("mrow");
          if (st.charAt(0) === " ") {
            const mspace = this.configuration.create("mspace");
            mspace.setAttribute("width", "1ex");
            node.appendChild(mspace);
          }
          const mtext = this.configuration.create(symbol.tag);
          mtext.appendChild(this.configuration.createText(st));
          node.appendChild(mtext);
          if (st.charAt(st.length - 1) === " ") {
            const mspace = this.configuration.create("mspace");
            mspace.setAttribute("width", "1ex");
            node.appendChild(mspace);
          }
          str = this.removeCharsAndBlanks(str, i + 1);
          return [node, str];
        case 15 /* UNARYUNDEROVER */:
        case 1 /* UNARY */:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          result = this.parseSexpr(str);
          if (result[0] == null) {
            if (symbol.tag == "mi" || symbol.tag == "mo") {
              node = this.configuration.create(symbol.tag);
              node.appendChild(this.configuration.createText(symbol.output));
              return [node, str];
            } else {
              result[0] = this.configuration.create("mi");
            }
          }
          if (symbol.func) {
            st = str.charAt(0);
            if (st === "^" || st === "_" || st === "/" || st === "|" || st === "," || symbol.input.length === 1 && symbol.input.match(/\w/) && st !== "(") {
              node = this.configuration.create(symbol.tag);
              node.appendChild(this.configuration.createText(symbol.output));
              return [node, str];
            } else {
              const mo = this.configuration.create(symbol.tag);
              mo.appendChild(this.configuration.createText(symbol.output));
              node = this.configuration.create("mrow");
              node.appendChild(mo);
              this.appendUnwrap(result[0], node);
              return [node, result[1]];
            }
          }
          this.removeBrackets(result[0]);
          if (symbol.input === "sqrt") {
            node = this.configuration.create(symbol.tag);
            this.appendUnwrap(result[0], node);
            return [node, result[1]];
          } else if (symbol.rewriteleftright) {
            const mo1 = this.configuration.create("mo");
            mo1.appendChild(
              this.configuration.createText(symbol.rewriteleftright[0])
            );
            const mo2 = this.configuration.create("mo");
            mo2.appendChild(
              this.configuration.createText(symbol.rewriteleftright[1])
            );
            node = this.configuration.create("mrow");
            node.appendChild(mo1);
            this.appendUnwrap(result[0], node);
            node.appendChild(mo2);
            return [node, result[1]];
          } else if (symbol.input === "cancel") {
            node = this.configuration.create(symbol.tag);
            this.appendUnwrap(result[0], node);
            node.setAttribute("notation", "updiagonalstrike");
            return [node, result[1]];
          } else if (symbol.acc) {
            node = this.configuration.create(symbol.tag);
            this.appendUnwrap(result[0], node);
            const accnode = this.configuration.create("mo");
            accnode.appendChild(this.configuration.createText(symbol.output));
            if (symbol.tag == "mover" && symbol.ttype === 1 /* UNARY */) {
              accnode.setAttribute("accent", "true");
            } else if (symbol.tag == "munder" && symbol.ttype === 1 /* UNARY */) {
              accnode.setAttribute("accentunder", "true");
            }
            accnode.setAttribute("stretchy", "true");
            if (symbol.input === "vec") {
              const r0 = result[0];
              if (r0.kind === "mrow" && r0.childNodes.length === 1 && r0.childNodes[0].childNodes[0] && ((_a = r0.childNodes[0].childNodes[0].text) == null ? void 0 : _a.length) === 1 || r0.childNodes[0] && ((_b = r0.childNodes[0].text) == null ? void 0 : _b.length) === 1) {
                accnode.setAttribute("stretchy", "false");
              }
            }
            node.appendChild(accnode);
            return [node, result[1]];
          } else {
            if (symbol.codes) {
              this.AMmapChars(result[0], symbol.codes);
            }
            return [result[0], result[1]];
          }
        case 2 /* BINARY */:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          result = this.parseSexpr(str);
          if (result[0] == null) {
            node = this.configuration.create("mo");
            node.appendChild(this.configuration.createText(symbol.input));
            return [node, str];
          }
          this.removeBrackets(result[0]);
          result2 = this.parseSexpr(result[1]);
          if (result2[0] == null) {
            node = this.configuration.create("mo");
            node.appendChild(this.configuration.createText(symbol.input));
            return [node, str];
          }
          this.removeBrackets(result2[0]);
          if (["color", "class", "id"].indexOf(symbol.input) >= 0) {
            if (str.charAt(0) === "{") {
              i = str.indexOf("}");
            } else if (str.charAt(0) === "(") {
              i = str.indexOf(")");
            } else if (str.charAt(0) === "[") {
              i = str.indexOf("]");
            } else {
              i = 1;
            }
            st = str.slice(1, i);
            node = this.configuration.create(symbol.tag);
            this.appendUnwrap(result2[0], node);
            if (symbol.input === "color") {
              node.setAttribute("mathcolor", st);
            } else if (symbol.input === "class") {
              node.setAttribute("class", st);
            } else if (symbol.input === "id") {
              node.setAttribute("id", st);
            }
            return [node, result2[1]];
          }
          newFrag = this.configuration.create("inferredMrow");
          if (symbol.input === "root" || symbol.output === "stackrel") {
            newFrag.appendChild(result2[0]);
          }
          this.appendUnwrap(result[0], newFrag);
          if (symbol.input === "frac") {
            this.appendUnwrap(result2[0], newFrag);
          }
          node = this.configuration.create(symbol.tag);
          this.appendUnwrap(newFrag, node);
          return [node, result2[1]];
        case 3 /* INFIX */:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          node = this.configuration.create("mo");
          node.appendChild(this.configuration.createText(symbol.output));
          return [node, str];
        case 6 /* SPACE */:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          node = this.configuration.create("mrow");
          const mspace1 = this.configuration.create("mspace");
          mspace1.setAttribute("width", "1ex");
          node.appendChild(mspace1);
          const mtext2 = this.configuration.create(symbol.tag);
          mtext2.appendChild(this.configuration.createText(symbol.output));
          node.appendChild(mtext2);
          const mspace2 = this.configuration.create("mspace");
          mspace2.setAttribute("width", "1ex");
          node.appendChild(mspace2);
          return [node, str];
        case 9 /* LEFTRIGHT */:
          this.nestingDepth++;
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          result = this.parseExpr(str, false);
          this.nestingDepth--;
          st = "";
          if (result[0] && result[0].childNodes.length > 0 && result[0].childNodes[result[0].childNodes.length - 1]) {
            const lastChild = result[0].childNodes[result[0].childNodes.length - 1];
            if (lastChild.kind === "mo" && lastChild.childNodes[0] && lastChild.childNodes[0].text) {
              st = lastChild.childNodes[0].text;
            }
          }
          if (st === "|" && str.charAt(0) !== "," && result[0]) {
            const mo = this.configuration.create("mo");
            mo.appendChild(this.configuration.createText(symbol.output));
            node = this.configuration.create("mrow");
            node.appendChild(mo);
            this.appendUnwrap(result[0], node);
            return [node, result[1]];
          } else {
            const mo = this.configuration.create("mo");
            mo.appendChild(this.configuration.createText("\u2223"));
            node = this.configuration.create("mrow");
            node.appendChild(mo);
            return [node, str];
          }
        default:
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          node = this.configuration.create(symbol.tag);
          node.appendChild(this.configuration.createText(symbol.output));
          return [node, str];
      }
    }
    fromCodePoint(codePoint) {
      if (codePoint <= 65535) {
        return String.fromCharCode(codePoint);
      }
      codePoint -= 65536;
      var high = 55296 + (codePoint >> 10);
      var low = 56320 + (codePoint & 1023);
      return String.fromCharCode(high, low);
    }
    /*
    * Map characters in a node according to codemap
    * for font changes like double-struck, bold, etc.
    *
    * @param {INodeAdapter} node The node to process
    * @param {number[]} codemap The code mapping array
    */
    AMmapChars(node, codemap) {
      const tag = node.kind;
      if (tag == "mi" || tag == "mo" || tag == "mn") {
        const st = node.childNodes[0].text;
        let newst = "";
        for (let j = 0; j < st.length; j++) {
          if (st.charCodeAt(j) > 64 && st.charCodeAt(j) < 91) {
            if (codemap.length == 3) {
              newst += this.fromCodePoint(codemap[0] + st.charCodeAt(j) - 65);
            } else {
              newst += this.fromCodePoint(codemap[st.charCodeAt(j) - 65]);
            }
          } else if (st.charCodeAt(j) > 96 && st.charCodeAt(j) < 123) {
            if (codemap.length == 3) {
              newst += this.fromCodePoint(codemap[1] + st.charCodeAt(j) - 97);
            } else {
              newst += this.fromCodePoint(codemap[st.charCodeAt(j) - 71]);
            }
          } else if (st.charCodeAt(j) > 47 && st.charCodeAt(j) < 58 && (codemap.length == 3 || codemap.length == 53)) {
            newst += this.fromCodePoint((codemap.length == 3 ? codemap[2] : codemap[52]) + st.charCodeAt(j) - 48);
          } else {
            newst += st.charAt(j);
          }
        }
        node.replaceChild(this.configuration.createText(newst), node.childNodes[0]);
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          this.AMmapChars(node.childNodes[i], codemap);
        }
      }
    }
    /**
     * Parse an intermediate expression (handles subscripts and superscripts)
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    parseIexpr(str) {
      let symbol;
      let sym1;
      let sym2;
      let node;
      let result;
      let underover;
      str = this.removeCharsAndBlanks(str, 0);
      sym1 = this.getSymbol(str);
      result = this.parseSexpr(str);
      if (result[0] === null) {
        return [null, str];
      }
      node = result[0];
      str = result[1];
      symbol = this.getSymbol(str);
      if (symbol === null || sym1 == null) {
        return [null, str];
      }
      symbol = symbol;
      sym1 = sym1;
      if (symbol.ttype === 3 /* INFIX */ && symbol.input !== "/") {
        str = this.removeCharsAndBlanks(str, symbol.input.length);
        result = this.parseSexpr(str);
        if (result[0] == null) {
          const box = this.configuration.create("mo");
          box.appendChild(this.configuration.createText("\u25A1"));
          result[0] = box;
        } else {
          this.removeBrackets(result[0]);
        }
        str = result[1];
        underover = sym1.ttype === 7 /* UNDEROVER */ || sym1.ttype === 15 /* UNARYUNDEROVER */;
        if (symbol.input === "_") {
          sym2 = this.getSymbol(str);
          if (sym2 !== null && sym2.input === "^") {
            str = this.removeCharsAndBlanks(str, sym2.input.length);
            const res2 = this.parseSexpr(str);
            if (res2[0] === null) {
              return [null, str];
            }
            this.removeBrackets(res2[0]);
            str = res2[1];
            const tag = underover ? "munderover" : "msubsup";
            const lastnode = node;
            node = this.configuration.create(tag);
            this.appendUnwrap(lastnode, node);
            this.appendUnwrap(result[0], node);
            this.appendUnwrap(res2[0], node);
            const mrow = this.configuration.create("mrow");
            mrow.appendChild(node);
            node = mrow;
          } else {
            const tag = underover ? "munder" : "msub";
            const lastnode = node;
            node = this.configuration.create(tag);
            this.appendUnwrap(lastnode, node);
            this.appendUnwrap(result[0], node);
          }
        } else if (symbol.input === "^" && underover) {
          const lastnode = node;
          node = this.configuration.create("mover");
          this.appendUnwrap(lastnode, node);
          this.appendUnwrap(result[0], node);
        } else {
          const lastnode = node;
          node = this.configuration.create(symbol.tag);
          this.appendUnwrap(lastnode, node);
          this.appendUnwrap(result[0], node);
        }
        if (sym1.func) {
          sym2 = this.getSymbol(str);
          if (sym2 !== null && sym2.ttype !== 3 /* INFIX */ && sym2.ttype !== 5 /* RIGHTBRACKET */ && (sym1.input.length > 1 || sym2.ttype === 4 /* LEFTBRACKET */)) {
            result = this.parseIexpr(str);
            if (result[0] === null) {
              return [null, str];
            }
            const mrow = this.configuration.create("mrow");
            this.appendUnwrap(node, mrow);
            this.appendUnwrap(result[0], mrow);
            node = mrow;
            str = result[1];
          }
        }
      }
      return [node, str];
    }
    /**
     * Parse a full expression
     *
     * @param {string} str The string to parse
     * @param {boolean} rightbracket Whether we're inside brackets
     * @returns {ParseResult} [node, remaining string]
     */
    parseExpr(str, rightbracket) {
      let symbol;
      let node;
      let result;
      const newFrag = this.configuration.create("inferredMrow");
      do {
        str = this.removeCharsAndBlanks(str, 0);
        result = this.parseIexpr(str);
        node = result[0];
        str = result[1];
        symbol = this.getSymbol(str);
        if (node !== null && symbol !== null && symbol.ttype === 3 /* INFIX */ && symbol.input === "/") {
          str = this.removeCharsAndBlanks(str, symbol.input.length);
          result = this.parseIexpr(str);
          if (result[0] === null) {
            const box = this.configuration.create("mo");
            box.appendChild(this.configuration.createText("\u25A1"));
            result[0] = box;
          } else {
            this.removeBrackets(result[0]);
          }
          str = result[1];
          this.removeBrackets(node);
          const frac = this.configuration.create(symbol.tag);
          this.appendUnwrap(node, frac);
          this.appendUnwrap(result[0], frac);
          newFrag.appendChild(frac);
          symbol = this.getSymbol(str);
        } else if (node !== null) {
          this.appendUnwrap(node, newFrag);
        }
      } while (symbol !== null && (symbol.ttype !== 5 /* RIGHTBRACKET */ && (symbol.ttype !== 9 /* LEFTRIGHT */ || rightbracket) || this.nestingDepth === 0) && symbol.output !== "");
      if (symbol !== null && (symbol.ttype === 5 /* RIGHTBRACKET */ || symbol.ttype === 9 /* LEFTRIGHT */)) {
        const len = newFrag.childNodes.length;
        if (len > 0 && newFrag.childNodes[len - 1].kind === "mrow" && newFrag.childNodes[len - 1].childNodes.length > 0) {
          const lastMrow = newFrag.childNodes[len - 1];
          const lastChild = lastMrow.childNodes[lastMrow.childNodes.length - 1];
          const firstChild = lastMrow.childNodes[0];
          if (lastChild && lastChild.childNodes.length > 0 && firstChild && firstChild.childNodes.length > 0) {
            const right = lastChild.childNodes[0].text;
            const left = firstChild.childNodes[0].text;
            if (right === ")" || right === "]") {
              if (left === "(" && right === ")" && symbol.output !== "}" || left === "[" && right === "]") {
                const pos = [];
                let matrix = true;
                const m = newFrag.childNodes.length;
                let i, j;
                for (i = 0; matrix && i < m; i = i + 2) {
                  pos[i] = [];
                  node = newFrag.childNodes[i];
                  if (matrix) {
                    matrix = node.kind === "mrow" && // current el is row
                    node.childNodes.length > 0 && (i === m - 1 || // last row, or next el is comma
                    newFrag.childNodes[i + 1] && newFrag.childNodes[i + 1].kind === "mo" && newFrag.childNodes[i + 1].childNodes[0].text === ",") && // row starts and ends with left/right brackets
                    node.childNodes[0].childNodes[0].text === left && node.childNodes[node.childNodes.length - 1].childNodes[0].text === right;
                  }
                  if (matrix) {
                    for (j = 0; j < node.childNodes.length; j++) {
                      if (node.childNodes[j].childNodes.length > 0 && node.childNodes[j].childNodes[0].text === ",") {
                        pos[i][pos[i].length] = j;
                      }
                    }
                  }
                  if (matrix && i > 1) {
                    matrix = pos[i].length === pos[i - 2].length;
                  }
                }
                matrix = matrix && (pos.length > 1 || pos[0].length > 0);
                const columnlines = [];
                if (matrix) {
                  const table = this.configuration.create("inferredMrow");
                  for (i = 0; i < m; i = i + 2) {
                    const row = this.configuration.create("inferredMrow");
                    let frag = this.configuration.create("inferredMrow");
                    node = newFrag.childNodes[0];
                    const n = node.childNodes.length;
                    let k = 0;
                    node.removeFirstChild();
                    for (j = 1; j < n - 1; j++) {
                      if (typeof pos[i][k] !== "undefined" && j === pos[i][k]) {
                        node.removeFirstChild();
                        if (node.childNodes[0] && node.childNodes[0].kind === "mrow" && node.childNodes[0].childNodes.length === 1 && node.childNodes[0].childNodes[0].childNodes.length > 0 && node.childNodes[0].childNodes[0].childNodes[0].text === "\u2223") {
                          if (i === 0) {
                            columnlines.push("solid");
                          }
                          node.removeFirstChild();
                          node.removeFirstChild();
                          j += 2;
                          k++;
                        } else if (i === 0) {
                          columnlines.push("none");
                        }
                        const mtd2 = this.configuration.create("mtd");
                        for (const child of frag.childNodes) {
                          mtd2.appendChild(child);
                        }
                        row.appendChild(mtd2);
                        frag = this.configuration.create("inferredMrow");
                        k++;
                      } else {
                        frag.appendChild(node.childNodes[0]);
                      }
                    }
                    const mtd = this.configuration.create("mtd");
                    for (const child of frag.childNodes) {
                      mtd.appendChild(child);
                    }
                    row.appendChild(mtd);
                    if (i === 0) {
                      columnlines.push("none");
                    }
                    if (newFrag.childNodes.length > 2) {
                      newFrag.removeFirstChild();
                      newFrag.removeFirstChild();
                    }
                    const mtr = this.configuration.create("mtr");
                    for (const child of row.childNodes) {
                      mtr.appendChild(child);
                    }
                    table.appendChild(mtr);
                  }
                  node = this.configuration.create("mtable");
                  node.setAttribute("columnlines", columnlines.join(" "));
                  if (typeof symbol.invisible === "boolean" && symbol.invisible) {
                    node.setAttribute("columnalign", "left");
                  }
                  for (const child of table.childNodes) {
                    node.appendChild(child);
                  }
                  newFrag.replaceChild(node, newFrag.childNodes[0]);
                }
              }
            }
          }
        }
        str = this.removeCharsAndBlanks(str, symbol.input.length);
        console.log(symbol);
        if (!symbol.invisible) {
          const mo = this.configuration.create("mo");
          mo.appendChild(this.configuration.createText(symbol.output));
          newFrag.appendChild(mo);
        }
      }
      return [newFrag, str];
    }
    /**
     * Main parse method - returns the MML tree
     *
     * @returns {INodeAdapter} The parsed MML node
     */
    mml(_string) {
      this.nestingDepth = 0;
      let str = _string.replace(/&nbsp;/g, "");
      str = str.replace(/&gt;/g, ">");
      str = str.replace(/&lt;/g, "<");
      const frag = this.parseExpr(str.replace(/^\s+/g, ""), false)[0];
      if (frag === null) {
        return null;
      }
      const node = this.configuration.create("mstyle");
      this.appendUnwrap(frag, node);
      if (this.displaystyle) {
        node.setAttribute("displaystyle", "true");
      }
      return node;
    }
  };

  // ts/Parse.ts
  var DOMNodeAdapter = class _DOMNodeAdapter {
    constructor(element) {
      this.element = element;
    }
    get kind() {
      if (this.element instanceof Element) {
        return this.element.localName || this.element.nodeName.toLowerCase();
      } else {
        return "textnode";
      }
    }
    get text() {
      return this.element.textContent;
    }
    get childNodes() {
      return Array.prototype.slice.call(this.element.childNodes).filter(function(n) {
        return n.nodeType === 1 || n.nodeType === 3;
      }).map(function(n) {
        return new _DOMNodeAdapter(n);
      });
    }
    removeFirstChild() {
      if (this.element instanceof Element) {
        const first = this.element.firstElementChild;
        if (first) {
          this.element.removeChild(first);
        }
      }
    }
    removeLastChild() {
      if (this.element instanceof Element) {
        const last = this.element.lastElementChild;
        if (last) {
          this.element.removeChild(last);
        }
      }
    }
    appendChild(child) {
      this.element.appendChild(child.element);
    }
    replaceChild(newChild, oldChild) {
      this.element.replaceChild(
        newChild.element,
        oldChild.element
      );
    }
    setAttribute(name, value) {
      if (this.element instanceof Element) {
        this.element.setAttribute(name, value);
      }
    }
    getAttribute(name) {
      if (this.element instanceof Element) {
        return this.element.getAttribute(name) || void 0;
      }
    }
    get underlyingNode() {
      return this.element;
    }
  };
  var AsciiMath = class {
    constructor() {
      __publicField(this, "parser");
      __publicField(this, "domConfig");
      __publicField(this, "AMdelimiter1", "`");
      __publicField(this, "AMescape1", "\\\\`");
      this.domConfig = {
        create: (tag) => {
          const el = document.createElementNS("http://www.w3.org/1998/Math/MathML", tag);
          return new DOMNodeAdapter(el);
        },
        createText: (text) => {
          const textNode = document.createTextNode(text);
          return new DOMNodeAdapter(textNode);
        },
        options: { decimalsign: ".", displaystyle: true }
      };
      this.parser = new AsciiMathParser(this.domConfig);
    }
    parseMath(input) {
      const result = this.parser.mml(input);
      const domElement = result.underlyingNode;
      const node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
      node.appendChild(domElement);
      return node;
    }
    AMprocessNode(n, linebreaks, spanclassAM) {
      var frag, st;
      if (spanclassAM != null) {
        frag = document.getElementsByTagName("span");
        for (var i = 0; i < frag.length; i++)
          if (frag[i].className == "AM") {
            this.processNodeR(frag[i], linebreaks, false);
          }
      } else {
        try {
          st = n.innerHTML;
        } catch (err) {
        }
        if (st == null || /amath\b|\\begin{a?math}/i.test(st) || st.indexOf(this.AMdelimiter1 + " ") != -1 || st.slice(-1) == this.AMdelimiter1 || st.indexOf(this.AMdelimiter1 + "<") != -1 || st.indexOf(this.AMdelimiter1 + "\n") != -1) {
          this.processNodeR(n, linebreaks, false);
        }
      }
    }
    processNodeR(n, linebreaks, latex) {
      var mtch, str, arr, frg, i;
      if (n.childNodes.length == 0) {
        if ((n.nodeType != 8 || linebreaks) && n.parentNode !== null && n.parentNode.nodeName != "form" && n.parentNode.nodeName != "FORM" && n.parentNode.nodeName != "textarea" && n.parentNode.nodeName != "TEXTAREA") {
          str = n.nodeValue;
          if (!(str == null)) {
            str = str.replace(/\r\n\r\n/g, "\n\n");
            str = str.replace(/\x20+/g, " ");
            str = str.replace(/\s*\r\n/g, " ");
            if (latex) {
              mtch = str.indexOf("$") == -1 ? false : true;
              str = str.replace(/([^\\])\$/g, "$1 $");
              str = str.replace(/^\$/, " $");
              arr = str.split(" $");
              for (i = 0; i < arr.length; i++)
                arr[i] = arr[i].replace(/\\\$/g, "$");
            } else {
              mtch = false;
              str = str.replace(
                new RegExp(this.AMescape1, "g"),
                function() {
                  mtch = true;
                  return "AMescape1";
                }
              );
              arr = str.split(this.AMdelimiter1);
              str = arr.join(this.AMdelimiter1);
              arr = str.split(this.AMdelimiter1);
              for (i = 0; i < arr.length; i++)
                arr[i] = arr[i].replace(/this.AMescape1/g, this.AMdelimiter1);
            }
            if (arr.length > 1 || mtch) {
              frg = this.strarr2docFrag(arr, n.nodeType == 8, latex);
              var len = frg.childNodes.length;
              n.parentNode.replaceChild(frg, n);
              return len - 1;
            }
          }
        } else return 0;
      } else if (n.nodeName != "math") {
        for (i = 0; i < n.childNodes.length; i++) {
          i += this.processNodeR(n.childNodes[i], linebreaks, latex);
        }
      }
      return 0;
    }
    strarr2docFrag(arr, linebreaks, latex) {
      var newFrag = document.createDocumentFragment();
      var expr = false;
      for (var i = 0; i < arr.length; i++) {
        if (expr) {
          newFrag.appendChild(this.parseMath(arr[i]));
        } else {
          var arri = linebreaks ? arr[i].split("\n\n") : [arr[i]];
          newFrag.appendChild(document.createElement("span").appendChild(document.createTextNode(arri[0])));
          for (var j = 1; j < arri.length; j++) {
            newFrag.appendChild(document.createElement("p"));
            newFrag.appendChild(document.createElement("span").appendChild(document.createTextNode(arri[j])));
          }
        }
        expr = !expr;
      }
      return newFrag;
    }
  };
  var asciimath = new AsciiMath();
  var Parse_default = asciimath;
  var parseMath = (input) => asciimath.parseMath(input);
  var AMprocessNode = (n, linebreaks, spanclassAM) => asciimath.AMprocessNode(n, linebreaks, spanclassAM);
  return __toCommonJS(Parse_exports);
})();
