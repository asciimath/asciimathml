/*
 * AsciiMath DOM Parser
 */
import { AsciiMathParser } from './AsciiMathParser';
export class DOMNodeAdapter {
    constructor(element) {
        this.element = element;
    }
    get kind() {
        if (this.element instanceof Element) {
            return this.element.localName || this.element.nodeName.toLowerCase();
        }
        else {
            return 'textnode';
        }
    }
    get text() {
        return this.element.textContent;
    }
    get childNodes() {
        return Array.from(this.element.childNodes)
            .filter(n => (n.nodeType === 1 || n.nodeType === 3))
            .map(n => new DOMNodeAdapter(n));
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
        this.element.replaceChild(newChild.element, oldChild.element);
    }
    setAttribute(name, value) {
        if (this.element instanceof Element) {
            this.element.setAttribute(name, value);
        }
    }
    getAttribute(name) {
        if (this.element instanceof Element) {
            return this.element.getAttribute(name) || undefined;
        }
    }
    get underlyingNode() {
        return this.element;
    }
}
export class AsciiMath {
    constructor() {
        this.AMdelimiter1 = "`";
        this.AMescape1 = "\\\\`";
        this.domConfig = {
            create: (tag) => {
                const el = document.createElementNS('http://www.w3.org/1998/Math/MathML', tag);
                return new DOMNodeAdapter(el);
            },
            createText: (text) => {
                const textNode = document.createTextNode(text);
                return new DOMNodeAdapter(textNode);
            },
            options: { decimalsign: '.', displaystyle: true }
        };
        this.parser = new AsciiMathParser(this.domConfig);
    }
    parseMath(input) {
        const result = this.parser.mml(input);
        const domElement = result.underlyingNode; // Get the actual DOM element
        const node = document.createElementNS('http://www.w3.org/1998/Math/MathML', 'math');
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
    }
    processNodeR(n, linebreaks, latex) {
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
    }
    strarr2docFrag(arr, linebreaks, latex) {
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
    }
}
// --- Compatibility exports for browser & module users ---
// Create and export a singleton named `asciimath` (keeps the old API)
export const asciimath = new AsciiMath();
export default asciimath;
// Convenience top-level exports (call into the singleton)
export const parseMath = (input) => asciimath.parseMath(input);
export const AMprocessNode = (n, linebreaks, spanclassAM) => asciimath.AMprocessNode(n, linebreaks, spanclassAM);
