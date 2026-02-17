"use strict";
/*
 * AsciiMath DOM Parser
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMprocessNode = exports.parseMath = exports.asciimath = exports.AsciiMath = exports.DOMNodeAdapter = void 0;
var AsciiMathParser_js_1 = require("./AsciiMathParser.js");
var DOMNodeAdapter = /** @class */ (function () {
    function DOMNodeAdapter(element) {
        this.element = element;
    }
    Object.defineProperty(DOMNodeAdapter.prototype, "kind", {
        get: function () {
            if (this.element instanceof Element) {
                return this.element.localName || this.element.nodeName.toLowerCase();
            }
            else {
                return 'textnode';
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DOMNodeAdapter.prototype, "text", {
        get: function () {
            return this.element.textContent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DOMNodeAdapter.prototype, "childNodes", {
        get: function () {
            return Array.prototype.slice.call(this.element.childNodes)
                .filter(function (n) { return n.nodeType === 1 || n.nodeType === 3; })
                .map(function (n) { return new DOMNodeAdapter(n); });
        },
        enumerable: false,
        configurable: true
    });
    DOMNodeAdapter.prototype.removeFirstChild = function () {
        if (this.element instanceof Element) {
            var first = this.element.firstElementChild;
            if (first) {
                this.element.removeChild(first);
            }
        }
    };
    DOMNodeAdapter.prototype.removeLastChild = function () {
        if (this.element instanceof Element) {
            var last = this.element.lastElementChild;
            if (last) {
                this.element.removeChild(last);
            }
        }
    };
    DOMNodeAdapter.prototype.appendChild = function (child) {
        this.element.appendChild(child.element);
    };
    DOMNodeAdapter.prototype.replaceChild = function (newChild, oldChild) {
        this.element.replaceChild(newChild.element, oldChild.element);
    };
    DOMNodeAdapter.prototype.setAttribute = function (name, value) {
        if (this.element instanceof Element) {
            this.element.setAttribute(name, value);
        }
    };
    DOMNodeAdapter.prototype.getAttribute = function (name) {
        if (this.element instanceof Element) {
            return this.element.getAttribute(name) || undefined;
        }
    };
    Object.defineProperty(DOMNodeAdapter.prototype, "underlyingNode", {
        get: function () {
            return this.element;
        },
        enumerable: false,
        configurable: true
    });
    return DOMNodeAdapter;
}());
exports.DOMNodeAdapter = DOMNodeAdapter;
var AsciiMath = /** @class */ (function () {
    function AsciiMath() {
        this.AMdelimiter1 = "`";
        this.AMescape1 = "\\\\`";
        this.domConfig = {
            create: function (tag) {
                var el = document.createElementNS('http://www.w3.org/1998/Math/MathML', tag);
                return new DOMNodeAdapter(el);
            },
            createText: function (text) {
                var textNode = document.createTextNode(text);
                return new DOMNodeAdapter(textNode);
            },
            options: { decimalsign: '.', displaystyle: true }
        };
        this.parser = new AsciiMathParser_js_1.AsciiMathParser(this.domConfig);
    }
    AsciiMath.prototype.parseMath = function (input) {
        var result = this.parser.mml(input);
        var domElement = result.underlyingNode; // Get the actual DOM element
        var node = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math');
        node.appendChild(domElement);
        return node;
    };
    AsciiMath.prototype.AMprocessNode = function (n, linebreaks, spanclassAM) {
        var frag, st;
        if (spanclassAM != null) {
            frag = document.getElementsByTagName("span");
            for (var i = 0; i < frag.length; i++)
                if (frag[i].className == "AM") {
                    this.processNodeR(frag[i], linebreaks, false);
                }
        }
        else {
            try {
                st = n.innerHTML; // look for AMdelimiter on page
            }
            catch (err) { }
            if (st == null || /amath\b|\\begin{a?math}/i.test(st) ||
                st.indexOf(this.AMdelimiter1 + " ") != -1 || st.slice(-1) == this.AMdelimiter1 ||
                st.indexOf(this.AMdelimiter1 + "<") != -1 || st.indexOf(this.AMdelimiter1 + "\n") != -1) {
                this.processNodeR(n, linebreaks, false);
            }
        }
    };
    AsciiMath.prototype.processNodeR = function (n, linebreaks, latex) {
        var mtch, str, arr, frg, i;
        if (n.childNodes.length == 0) {
            if ((n.nodeType != 8 || linebreaks) &&
                n.parentNode !== null &&
                n.parentNode.nodeName != "form" && n.parentNode.nodeName != "FORM" &&
                n.parentNode.nodeName != "textarea" && n.parentNode.nodeName != "TEXTAREA" /*&&
            n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE"*/) {
                str = n.nodeValue;
                if (!(str == null)) {
                    str = str.replace(/\r\n\r\n/g, "\n\n");
                    str = str.replace(/\x20+/g, " ");
                    str = str.replace(/\s*\r\n/g, " ");
                    if (latex) {
                        // DELIMITERS:
                        mtch = (str.indexOf("\$") == -1 ? false : true);
                        str = str.replace(/([^\\])\$/g, "$1 \$");
                        str = str.replace(/^\$/, " \$"); // in case \$ at start of string
                        arr = str.split(" \$");
                        for (i = 0; i < arr.length; i++)
                            arr[i] = arr[i].replace(/\\\$/g, "\$");
                    }
                    else {
                        mtch = false;
                        str = str.replace(new RegExp(this.AMescape1, "g"), function () { mtch = true; return "AMescape1"; });
                        /*str = str.replace(/\\?end{?a?math}?/i,
                                function(){automathrecognize = false; mtch = true; return ""});
                        str = str.replace(/amath\b|\\begin{a?math}/i,
                                function(){automathrecognize = true; mtch = true; return ""});*/
                        arr = str.split(this.AMdelimiter1);
                        /*if (automathrecognize)
                            for (i=0; i<arr.length; i++)
                            if (i%2==0) arr[i] = AMautomathrec(arr[i]);*/
                        str = arr.join(this.AMdelimiter1);
                        arr = str.split(this.AMdelimiter1);
                        for (i = 0; i < arr.length; i++) // this is a problem ************
                            arr[i] = arr[i].replace(/this.AMescape1/g, this.AMdelimiter1);
                    }
                    if (arr.length > 1 || mtch) {
                        frg = this.strarr2docFrag(arr, n.nodeType == 8, latex);
                        var len = frg.childNodes.length;
                        n.parentNode.replaceChild(frg, n);
                        return len - 1;
                    }
                }
            }
            else
                return 0;
        }
        else if (n.nodeName != "math") {
            for (i = 0; i < n.childNodes.length; i++) {
                i += this.processNodeR(n.childNodes[i], linebreaks, latex);
            }
        }
        return 0;
    };
    AsciiMath.prototype.strarr2docFrag = function (arr, linebreaks, latex) {
        var newFrag = document.createDocumentFragment();
        var expr = false;
        for (var i = 0; i < arr.length; i++) {
            if (expr) {
                newFrag.appendChild(this.parseMath(arr[i]));
            }
            else {
                var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
                newFrag.appendChild(document.createElement("span").
                    appendChild(document.createTextNode(arri[0])));
                for (var j = 1; j < arri.length; j++) {
                    newFrag.appendChild(document.createElement("p"));
                    newFrag.appendChild(document.createElement("span").
                        appendChild(document.createTextNode(arri[j])));
                }
            }
            expr = !expr;
        }
        return newFrag;
    };
    return AsciiMath;
}());
exports.AsciiMath = AsciiMath;
// --- Compatibility exports for browser & module users ---
// Create and export a singleton named `asciimath` (keeps the old API)
exports.asciimath = new AsciiMath();
exports.default = exports.asciimath;
// Convenience top-level exports (call into the singleton)
var parseMath = function (input) { return exports.asciimath.parseMath(input); };
exports.parseMath = parseMath;
var AMprocessNode = function (n, linebreaks, spanclassAM) { return exports.asciimath.AMprocessNode(n, linebreaks, spanclassAM); };
exports.AMprocessNode = AMprocessNode;
