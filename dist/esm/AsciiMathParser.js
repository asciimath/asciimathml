/*
 * AsciiMath Parser
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { AMsymbols, AMquote, } from './AsciiMathSymbols.js';
/**
 * The main AsciiMath Parser class.
 */
var AsciiMathParser = /** @class */ (function () {
    /**
     * @constructor
     * @param {IParseOptions} configuration A parser configuration.
     */
    function AsciiMathParser(configuration) {
        var _a;
        this.configuration = configuration;
        /**
         * Current nesting depth for tracking brackets
         *
         * @type {number}
         */
        this.nestingDepth = 0;
        /**
         * Previous symbol type
         *
         * @type {TokenType}
         */
        this.previousSymbol = -1 /* TokenType.NONE */;
        /**
         * Current symbol type
         *
         * @type {TokenType}
         */
        this.currentSymbol = -1 /* TokenType.NONE */;
        /**
         * Sorted array of symbol names for binary search
         *
         * @type {string[]}
         */
        this.symbolNames = [];
        /**
         * Symbol table including TeX aliases
         *
         * @type {Symbol[]}
         */
        this.symbols = [];
        /**
         * Decimal sign character
         *
         * @type {string}
         */
        this.decimalsign = '.';
        /**
         * Display style (for limits)
         *
         * @type {boolean}
         */
        this.displaystyle = true;
        this.TokenTypeMap = {
            CONST: 0 /* TokenType.CONST */,
            UNARY: 1 /* TokenType.UNARY */,
            BINARY: 2 /* TokenType.BINARY */,
            INFIX: 3 /* TokenType.INFIX */,
            LEFTBRACKET: 4 /* TokenType.LEFTBRACKET */,
            RIGHTBRACKET: 5 /* TokenType.RIGHTBRACKET */,
            SPACE: 6 /* TokenType.SPACE */,
            UNDEROVER: 7 /* TokenType.UNDEROVER */,
            DEFINITION: 8 /* TokenType.DEFINITION */,
            LEFTRIGHT: 9 /* TokenType.LEFTRIGHT */,
            TEXT: 10 /* TokenType.TEXT */,
            UNARYUNDEROVER: 15 /* TokenType.UNARYUNDEROVER */
        };
        this.decimalsign = configuration.options.decimalsign;
        this.displaystyle = configuration.options.displaystyle;
        this.initSymbols((_a = configuration.options) === null || _a === void 0 ? void 0 : _a.additionalSymbols);
    }
    /**
     * Initialize the symbol table
     */
    AsciiMathParser.prototype.initSymbols = function (additionalSymbols) {
        var e_1, _a;
        var _b, _c;
        // Copy base symbols
        this.symbols = __spreadArray([], __read(AMsymbols), false);
        try {
            for (var _d = __values(additionalSymbols !== null && additionalSymbols !== void 0 ? additionalSymbols : []), _e = _d.next(); !_e.done; _e = _d.next()) {
                var sym = _e.value;
                var ttypeUpper = sym.ttype.toUpperCase();
                if (ttypeUpper && (ttypeUpper in this.TokenTypeMap) && sym.input && sym.tag && sym.output) {
                    this.symbols.push(__assign(__assign({}, sym), { ttype: this.TokenTypeMap[ttypeUpper], tex: (_b = sym.tex) !== null && _b !== void 0 ? _b : null }));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Add TeX aliases
        var symlen = this.symbols.length;
        for (var i = 0; i < symlen; i++) {
            if (this.symbols[i].tex) {
                this.symbols.push({
                    input: (_c = this.symbols[i].tex) !== null && _c !== void 0 ? _c : '',
                    tag: this.symbols[i].tag,
                    output: this.symbols[i].output,
                    tex: null,
                    ttype: this.symbols[i].ttype,
                    acc: this.symbols[i].acc || false,
                });
            }
        }
        this.refreshSymbols();
    };
    /**
     * Refresh the symbol name list (sort and extract names)
     */
    AsciiMathParser.prototype.refreshSymbols = function () {
        this.symbols.sort(function (a, b) { return (a.input > b.input ? 1 : -1); });
        this.symbolNames = this.symbols.map(function (s) { return s.input; });
    };
    /**
     * Remove n characters and any following blanks from the string
     *
     * @param {string} str The string to process
     * @param {number} n Number of characters to remove
     * @returns {string} The processed string
     */
    AsciiMathParser.prototype.removeCharsAndBlanks = function (str, n) {
        var st;
        if (str.charAt(n) === '\\' && str.charAt(n + 1) !== '\\' && str.charAt(n + 1) !== ' ') {
            st = str.slice(n + 1);
        }
        else {
            st = str.slice(n);
        }
        var i = 0;
        while (i < st.length && st.charCodeAt(i) <= 32) {
            i++;
        }
        return st.slice(i);
    };
    /**
     * Binary search for position where str appears or would be inserted
     *
     * @param {string[]} arr Sorted array
     * @param {string} str String to find
     * @param {number} n Starting position
     * @returns {number} Position index
     */
    AsciiMathParser.prototype.position = function (arr, str, n) {
        if (n === 0) {
            var h = void 0;
            var m = void 0;
            n = -1;
            h = arr.length;
            while (n + 1 < h) {
                m = (n + h) >> 1;
                if (arr[m] < str) {
                    n = m;
                }
                else {
                    h = m;
                }
            }
            return h;
        }
        else {
            var i = void 0;
            for (i = n; i < arr.length && arr[i] < str; i++)
                ;
            return i;
        }
    };
    /**
     * Get the maximal initial substring of str that appears in symbol names
     *
     * @param {string} str Input string
     * @returns {Symbol | null} The matched symbol or null
     */
    AsciiMathParser.prototype.getSymbol = function (str) {
        var k = 0;
        var j = 0;
        var mk = -1;
        var st;
        var tagst;
        var match = '';
        var more = true;
        for (var i = 1; i <= str.length && more; i++) {
            st = str.slice(0, i);
            j = k;
            k = this.position(this.symbolNames, st, j);
            if (k < this.symbolNames.length &&
                str.slice(0, this.symbolNames[k].length) === this.symbolNames[k]) {
                match = this.symbolNames[k];
                mk = k;
                i = match.length;
            }
            more =
                k < this.symbolNames.length &&
                    str.slice(0, this.symbolNames[k].length) >= this.symbolNames[k];
        }
        this.previousSymbol = this.currentSymbol;
        if (match !== '') {
            this.currentSymbol = this.symbols[mk].ttype;
            return this.symbols[mk];
        }
        // Check for number
        this.currentSymbol = 0 /* TokenType.CONST */;
        k = 1;
        st = str.slice(0, 1);
        var integ = true;
        while ('0' <= st && st <= '9' && k <= str.length) {
            st = str.slice(k, k + 1);
            k++;
        }
        if (st === this.decimalsign) {
            st = str.slice(k, k + 1);
            if ('0' <= st && st <= '9') {
                integ = false;
                k++;
                while ('0' <= st && st <= '9' && k <= str.length) {
                    st = str.slice(k, k + 1);
                    k++;
                }
            }
        }
        if ((integ && k > 1) || k > 2) {
            st = str.slice(0, k - 1);
            tagst = 'mn';
        }
        else {
            k = 2;
            st = str.slice(0, 1);
            tagst = 'A' > st || st > 'Z' ? ('a' > st || st > 'z' ? 'mo' : 'mi') : 'mi';
        }
        // Handle minus sign
        if (st === '-' &&
            str.charAt(1) !== ' ' &&
            this.previousSymbol === 3 /* TokenType.INFIX */) {
            this.currentSymbol = 3 /* TokenType.INFIX */;
            return { input: st, tag: tagst, output: st, tex: null, ttype: 1 /* TokenType.UNARY */, func: true };
        }
        return { input: st, tag: tagst, output: st, tex: null, ttype: 0 /* TokenType.CONST */ };
    };
    /**
     * Append, unwrapping if needed
     * Since INodeAdapters don't have document fragments,
     * we'll treat inferredMrow as a fragment here, so
     * its children get appended instead of the inferredMrow itself.
     *
     * @param {INodeAdapter} toappend The node to append
     * @param {INodeAdapter} node The node to append to
     */
    AsciiMathParser.prototype.appendUnwrap = function (toappend, node) {
        var e_2, _a;
        if (toappend.kind === 'inferredMrow') { // 
            try {
                for (var _b = __values(toappend.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    node.appendChild(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            node.appendChild(toappend);
        }
    };
    /**
     * Remove brackets from a node if it's an mrow with bracket children
     *
     * @param {INodeAdapter} node The node to remove brackets from
     */
    AsciiMathParser.prototype.removeBrackets = function (node) {
        if (!node || !node.childNodes || node.childNodes.length === 0) {
            return;
        }
        if (node.kind === 'mrow' || node.kind === 'inferredMrow') {
            var first = node.childNodes[0];
            if (node.childNodes.length > 1 && node.childNodes[1].kind === 'mtable') {
                return; // matrix case, do not remove brackets
            }
            var last = node.childNodes[node.childNodes.length - 1];
            if (first && first.childNodes[0]) {
                var text = first.childNodes[0].text;
                if (text === '(' || text === '[' || text === '{') {
                    node.removeFirstChild();
                }
            }
            if (last && last.childNodes[0]) {
                var text = last.childNodes[0].text;
                if (text === ')' || text === ']' || text === '}') {
                    node.removeLastChild();
                }
            }
        }
    };
    /**
     * Parse a simple expression
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    AsciiMathParser.prototype.parseSexpr = function (str) {
        var _a, _b;
        var symbol;
        var node;
        var result;
        var result2;
        var i;
        var st;
        var newFrag;
        str = this.removeCharsAndBlanks(str, 0);
        symbol = this.getSymbol(str);
        if (symbol === null ||
            (symbol.ttype === 5 /* TokenType.RIGHTBRACKET */ && this.nestingDepth > 0)) {
            return [null, str];
        }
        symbol = symbol; // checked it's not null
        if (symbol.ttype === 8 /* TokenType.DEFINITION */) {
            str = symbol.output + this.removeCharsAndBlanks(str, symbol.input.length);
            symbol = this.getSymbol(str);
        }
        if (symbol === null) {
            return [null, str];
        }
        symbol = symbol; // checked it's not null
        switch (symbol.ttype) {
            case 7 /* TokenType.UNDEROVER */:
            case 0 /* TokenType.CONST */:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                node = this.configuration.create(symbol.tag);
                node.appendChild(this.configuration.createText(symbol.output));
                return [node, str];
            case 4 /* TokenType.LEFTBRACKET */:
                this.nestingDepth++;
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                result = this.parseExpr(str, true);
                this.nestingDepth--;
                if (symbol.invisible) {
                    node = this.configuration.create('mrow');
                    if (result[0]) {
                        this.appendUnwrap(result[0], node);
                    }
                }
                else {
                    var mo = this.configuration.create('mo');
                    mo.appendChild(this.configuration.createText(symbol.output));
                    node = this.configuration.create('mrow');
                    node.appendChild(mo);
                    if (result[0]) {
                        this.appendUnwrap(result[0], node);
                    }
                }
                return [node, result[1]];
            case 10 /* TokenType.TEXT */:
                if (symbol !== AMquote) {
                    str = this.removeCharsAndBlanks(str, symbol.input.length);
                }
                if (str.charAt(0) === '{') {
                    i = str.indexOf('}');
                }
                else if (str.charAt(0) === '(') {
                    i = str.indexOf(')');
                }
                else if (str.charAt(0) === '[') {
                    i = str.indexOf(']');
                }
                else if (symbol === AMquote) {
                    i = str.slice(1).indexOf('"') + 1;
                }
                else {
                    i = 0;
                }
                if (i === -1)
                    i = str.length;
                st = str.slice(1, i);
                node = this.configuration.create('mrow');
                if (st.charAt(0) === ' ') {
                    var mspace = this.configuration.create('mspace');
                    mspace.setAttribute('width', '1ex');
                    node.appendChild(mspace);
                }
                var mtext = this.configuration.create(symbol.tag);
                mtext.appendChild(this.configuration.createText(st));
                node.appendChild(mtext);
                if (st.charAt(st.length - 1) === ' ') {
                    var mspace = this.configuration.create('mspace');
                    mspace.setAttribute('width', '1ex');
                    node.appendChild(mspace);
                }
                str = this.removeCharsAndBlanks(str, i + 1);
                return [node, str];
            case 15 /* TokenType.UNARYUNDEROVER */:
            case 1 /* TokenType.UNARY */:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                result = this.parseSexpr(str);
                if (result[0] == null) {
                    if (symbol.tag == "mi" || symbol.tag == "mo") {
                        node = this.configuration.create(symbol.tag);
                        node.appendChild(this.configuration.createText(symbol.output));
                        return [node, str];
                    }
                    else {
                        result[0] = this.configuration.create('mi');
                    }
                }
                if (symbol.func) {
                    st = str.charAt(0);
                    if (st === '^' ||
                        st === '_' ||
                        st === '/' ||
                        st === '|' ||
                        st === ',' ||
                        (symbol.input.length === 1 &&
                            symbol.input.match(/\w/) &&
                            st !== '(')) {
                        node = this.configuration.create(symbol.tag);
                        node.appendChild(this.configuration.createText(symbol.output));
                        return [node, str];
                    }
                    else {
                        var mo = this.configuration.create(symbol.tag);
                        mo.appendChild(this.configuration.createText(symbol.output));
                        node = this.configuration.create('mrow');
                        node.appendChild(mo);
                        this.appendUnwrap(result[0], node);
                        return [node, result[1]];
                    }
                }
                this.removeBrackets(result[0]);
                if (symbol.input === 'sqrt') {
                    node = this.configuration.create(symbol.tag);
                    this.appendUnwrap(result[0], node);
                    return [node, result[1]];
                }
                else if (symbol.rewriteleftright) {
                    var mo1 = this.configuration.create('mo');
                    mo1.appendChild(this.configuration.createText(symbol.rewriteleftright[0]));
                    var mo2 = this.configuration.create('mo');
                    mo2.appendChild(this.configuration.createText(symbol.rewriteleftright[1]));
                    node = this.configuration.create('mrow');
                    node.appendChild(mo1);
                    this.appendUnwrap(result[0], node);
                    node.appendChild(mo2);
                    return [node, result[1]];
                }
                else if (symbol.input === 'cancel') {
                    node = this.configuration.create(symbol.tag);
                    this.appendUnwrap(result[0], node);
                    node.setAttribute('notation', 'updiagonalstrike');
                    return [node, result[1]];
                }
                else if (symbol.acc) {
                    node = this.configuration.create(symbol.tag);
                    this.appendUnwrap(result[0], node);
                    var accnode = this.configuration.create('mo');
                    accnode.appendChild(this.configuration.createText(symbol.output));
                    if (symbol.tag == 'mover' && symbol.ttype === 1 /* TokenType.UNARY */) {
                        accnode.setAttribute('accent', 'true');
                    }
                    else if (symbol.tag == 'munder' && symbol.ttype === 1 /* TokenType.UNARY */) {
                        accnode.setAttribute('accentunder', 'true');
                    }
                    accnode.setAttribute('stretchy', 'true');
                    // Special handling for vec with single character base
                    if (symbol.input === 'vec') {
                        var r0 = result[0];
                        if ((r0.kind === 'mrow' &&
                            r0.childNodes.length === 1 &&
                            r0.childNodes[0].childNodes[0] &&
                            ((_a = r0.childNodes[0].childNodes[0].text) === null || _a === void 0 ? void 0 : _a.length) === 1) ||
                            (r0.childNodes[0] &&
                                ((_b = r0.childNodes[0].text) === null || _b === void 0 ? void 0 : _b.length) === 1)) {
                            accnode.setAttribute('stretchy', 'false');
                        }
                    }
                    node.appendChild(accnode);
                    return [node, result[1]];
                }
                else {
                    /*
                    // old Font change command
                    if (symbol.codes) {
                      for (i = 0; i < result[0].childNodes.length; i++) {
                        const child = result[0].childNodes[i];
                        if (child.kind === 'mi' || result[0].kind === 'mi') {
                          const textNode =
                            result[0].kind === 'mi'
                              ? result[0].childNodes[0]
                              : child.childNodes[0];
                          if (textNode && (textNode as any).text) {
                            st = (textNode as any).text;
                            let newst = '';
                            for (let j = 0; j < st.length; j++) {
                              const code = st.charCodeAt(j);
                              if (code > 64 && code < 91) {
                                newst += String.fromCodePoint(symbol.codes[code - 65]);
                              } else if (code > 96 && code < 123) {
                                newst += String.fromCodePoint(symbol.codes[code - 71]);
                              } else {
                                newst += st.charAt(j);
                              }
                            }
                            const newNode = this.configuration.create('mo');
                            newNode.appendChild(this.configuration.createText(newst));
                            if (result[0].kind === 'mi') {
                              result[0] = newNode;
                            } else {
                              result[0].childNodes[i] = newNode;
                            }
                          }
                        }
                      }
                    }
                    node = this.configuration.create(symbol.tag);
                    this.appendUnwrap(result[0], node);
                    if (symbol.atname && symbol.atval) {
                      node.setAttribute(symbol.atname, symbol.atval);
                    }
                    return [node, result[1]];
                    */
                    // New Font change method
                    if (symbol.codes) {
                        this.AMmapChars(result[0], symbol.codes);
                    }
                    return [result[0], result[1]];
                }
            case 2 /* TokenType.BINARY */:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                result = this.parseSexpr(str);
                if (result[0] == null) {
                    node = this.configuration.create('mo');
                    node.appendChild(this.configuration.createText(symbol.input));
                    return [node, str];
                }
                this.removeBrackets(result[0]);
                result2 = this.parseSexpr(result[1]);
                if (result2[0] == null) {
                    node = this.configuration.create('mo');
                    node.appendChild(this.configuration.createText(symbol.input));
                    return [node, str];
                }
                this.removeBrackets(result2[0]);
                if (['color', 'class', 'id'].indexOf(symbol.input) >= 0) {
                    if (str.charAt(0) === '{') {
                        i = str.indexOf('}');
                    }
                    else if (str.charAt(0) === '(') {
                        i = str.indexOf(')');
                    }
                    else if (str.charAt(0) === '[') {
                        i = str.indexOf(']');
                    }
                    else {
                        i = 1;
                    }
                    st = str.slice(1, i);
                    node = this.configuration.create(symbol.tag);
                    this.appendUnwrap(result2[0], node);
                    if (symbol.input === 'color') {
                        node.setAttribute('mathcolor', st);
                    }
                    else if (symbol.input === 'class') {
                        node.setAttribute('class', st);
                    }
                    else if (symbol.input === 'id') {
                        node.setAttribute('id', st);
                    }
                    return [node, result2[1]];
                }
                newFrag = this.configuration.create('inferredMrow');
                if (symbol.input === 'root' || symbol.output === 'stackrel') {
                    newFrag.appendChild(result2[0]);
                }
                this.appendUnwrap(result[0], newFrag);
                if (symbol.input === 'frac') {
                    this.appendUnwrap(result2[0], newFrag);
                }
                node = this.configuration.create(symbol.tag);
                this.appendUnwrap(newFrag, node);
                return [node, result2[1]];
            case 3 /* TokenType.INFIX */:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                node = this.configuration.create('mo');
                node.appendChild(this.configuration.createText(symbol.output));
                return [node, str];
            case 6 /* TokenType.SPACE */:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                node = this.configuration.create('mrow');
                var mspace1 = this.configuration.create('mspace');
                mspace1.setAttribute('width', '1ex');
                node.appendChild(mspace1);
                var mtext2 = this.configuration.create(symbol.tag);
                mtext2.appendChild(this.configuration.createText(symbol.output));
                node.appendChild(mtext2);
                var mspace2 = this.configuration.create('mspace');
                mspace2.setAttribute('width', '1ex');
                node.appendChild(mspace2);
                return [node, str];
            case 9 /* TokenType.LEFTRIGHT */:
                this.nestingDepth++;
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                result = this.parseExpr(str, false);
                this.nestingDepth--;
                st = '';
                if (result[0] &&
                    result[0].childNodes.length > 0 &&
                    result[0].childNodes[result[0].childNodes.length - 1]) {
                    var lastChild = result[0].childNodes[result[0].childNodes.length - 1];
                    if (lastChild.kind === 'mo' &&
                        lastChild.childNodes[0] &&
                        lastChild.childNodes[0].text) {
                        st = lastChild.childNodes[0].text;
                    }
                }
                if (st === '|' && str.charAt(0) !== ',' && result[0]) { // its an absolute value subterm
                    var mo = this.configuration.create('mo');
                    mo.appendChild(this.configuration.createText(symbol.output));
                    node = this.configuration.create('mrow');
                    node.appendChild(mo);
                    this.appendUnwrap(result[0], node);
                    return [node, result[1]];
                }
                else { // the "|" is a \mid so use unicode 2223 (divides) for spacing
                    var mo = this.configuration.create('mo');
                    mo.appendChild(this.configuration.createText('\u2223'));
                    node = this.configuration.create('mrow');
                    node.appendChild(mo);
                    return [node, str];
                }
            default:
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                node = this.configuration.create(symbol.tag);
                node.appendChild(this.configuration.createText(symbol.output));
                return [node, str];
        }
    };
    AsciiMathParser.prototype.fromCodePoint = function (codePoint) {
        if (codePoint <= 0xFFFF) {
            // Basic Multilingual Plane - fromCharCode works fine
            return String.fromCharCode(codePoint);
        }
        // Supplementary planes - convert to surrogate pair
        codePoint -= 0x10000;
        var high = 0xD800 + (codePoint >> 10);
        var low = 0xDC00 + (codePoint & 0x3FF);
        return String.fromCharCode(high, low);
    };
    /*
    * Map characters in a node according to codemap
    * for font changes like double-struck, bold, etc.
    *
    * @param {INodeAdapter} node The node to process
    * @param {number[]} codemap The code mapping array
    */
    AsciiMathParser.prototype.AMmapChars = function (node, codemap) {
        var tag = node.kind;
        if (tag == "mi" || tag == "mo" || tag == "mn") {
            var st = node.childNodes[0].text;
            var newst = "";
            for (var j = 0; j < st.length; j++) {
                if (st.charCodeAt(j) > 64 && st.charCodeAt(j) < 91) {
                    if (codemap.length == 3) {
                        newst += this.fromCodePoint(codemap[0] + st.charCodeAt(j) - 65);
                    }
                    else {
                        newst += this.fromCodePoint(codemap[st.charCodeAt(j) - 65]);
                    }
                }
                else if (st.charCodeAt(j) > 96 && st.charCodeAt(j) < 123) {
                    if (codemap.length == 3) {
                        newst += this.fromCodePoint(codemap[1] + st.charCodeAt(j) - 97);
                    }
                    else {
                        newst += this.fromCodePoint(codemap[st.charCodeAt(j) - 71]);
                    }
                }
                else if (st.charCodeAt(j) > 47 && st.charCodeAt(j) < 58 && (codemap.length == 3 || codemap.length == 53)) {
                    newst += this.fromCodePoint((codemap.length == 3 ? codemap[2] : codemap[52]) + st.charCodeAt(j) - 48);
                }
                else {
                    newst += st.charAt(j);
                }
            }
            node.replaceChild(this.configuration.createText(newst), node.childNodes[0]);
        }
        else {
            for (var i = 0; i < node.childNodes.length; i++) {
                this.AMmapChars(node.childNodes[i], codemap);
            }
        }
    };
    /**
     * Parse an intermediate expression (handles subscripts and superscripts)
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    AsciiMathParser.prototype.parseIexpr = function (str) {
        var symbol;
        var sym1;
        var sym2;
        var node;
        var result;
        var underover;
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
        if (symbol.ttype === 3 /* TokenType.INFIX */ && symbol.input !== '/') {
            str = this.removeCharsAndBlanks(str, symbol.input.length);
            result = this.parseSexpr(str);
            if (result[0] == null) {
                var box = this.configuration.create('mo');
                box.appendChild(this.configuration.createText('\u25A1'));
                result[0] = box;
            }
            else {
                this.removeBrackets(result[0]);
            }
            str = result[1];
            underover =
                sym1.ttype === 7 /* TokenType.UNDEROVER */ ||
                    sym1.ttype === 15 /* TokenType.UNARYUNDEROVER */;
            if (symbol.input === '_') {
                sym2 = this.getSymbol(str);
                if (sym2 !== null && sym2.input === '^') {
                    str = this.removeCharsAndBlanks(str, sym2.input.length);
                    var res2 = this.parseSexpr(str);
                    if (res2[0] === null) {
                        return [null, str];
                    }
                    this.removeBrackets(res2[0]);
                    str = res2[1];
                    var tag = underover ? 'munderover' : 'msubsup';
                    var lastnode = node;
                    node = this.configuration.create(tag);
                    this.appendUnwrap(lastnode, node);
                    this.appendUnwrap(result[0], node);
                    this.appendUnwrap(res2[0], node);
                    var mrow = this.configuration.create('mrow');
                    mrow.appendChild(node);
                    node = mrow;
                }
                else {
                    var tag = underover ? 'munder' : 'msub';
                    var lastnode = node;
                    node = this.configuration.create(tag);
                    this.appendUnwrap(lastnode, node);
                    this.appendUnwrap(result[0], node);
                }
            }
            else if (symbol.input === '^' && underover) {
                var lastnode = node;
                node = this.configuration.create('mover');
                this.appendUnwrap(lastnode, node);
                this.appendUnwrap(result[0], node);
            }
            else {
                var lastnode = node;
                node = this.configuration.create(symbol.tag);
                this.appendUnwrap(lastnode, node);
                this.appendUnwrap(result[0], node);
            }
            if (sym1.func) {
                sym2 = this.getSymbol(str);
                if (sym2 !== null &&
                    sym2.ttype !== 3 /* TokenType.INFIX */ &&
                    sym2.ttype !== 5 /* TokenType.RIGHTBRACKET */ &&
                    (sym1.input.length > 1 || sym2.ttype === 4 /* TokenType.LEFTBRACKET */)) {
                    result = this.parseIexpr(str);
                    if (result[0] === null) {
                        return [null, str];
                    }
                    var mrow = this.configuration.create('mrow');
                    this.appendUnwrap(node, mrow);
                    this.appendUnwrap(result[0], mrow);
                    node = mrow;
                    str = result[1];
                }
            }
        }
        return [node, str];
    };
    /**
     * Parse a full expression
     *
     * @param {string} str The string to parse
     * @param {boolean} rightbracket Whether we're inside brackets
     * @returns {ParseResult} [node, remaining string]
     */
    AsciiMathParser.prototype.parseExpr = function (str, rightbracket) {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
        var symbol;
        var node;
        var result;
        var newFrag = this.configuration.create('inferredMrow');
        do {
            str = this.removeCharsAndBlanks(str, 0);
            result = this.parseIexpr(str);
            node = result[0];
            str = result[1];
            symbol = this.getSymbol(str);
            if (node !== null && symbol !== null &&
                symbol.ttype === 3 /* TokenType.INFIX */ && symbol.input === '/') {
                str = this.removeCharsAndBlanks(str, symbol.input.length);
                result = this.parseIexpr(str);
                if (result[0] === null) {
                    var box = this.configuration.create('mo');
                    box.appendChild(this.configuration.createText('\u25A1'));
                    result[0] = box;
                }
                else {
                    this.removeBrackets(result[0]);
                }
                str = result[1];
                this.removeBrackets(node);
                var frac = this.configuration.create(symbol.tag);
                this.appendUnwrap(node, frac);
                this.appendUnwrap(result[0], frac);
                newFrag.appendChild(frac);
                symbol = this.getSymbol(str);
            }
            else if (node !== null) {
                this.appendUnwrap(node, newFrag);
            }
        } while (symbol !== null &&
            ((symbol.ttype !== 5 /* TokenType.RIGHTBRACKET */ &&
                (symbol.ttype !== 9 /* TokenType.LEFTRIGHT */ || rightbracket)) ||
                this.nestingDepth === 0) &&
            symbol.output !== '');
        if (symbol !== null && (symbol.ttype === 5 /* TokenType.RIGHTBRACKET */ ||
            symbol.ttype === 9 /* TokenType.LEFTRIGHT */)) {
            // Matrix detection logic
            var len = newFrag.childNodes.length;
            if (len > 0 &&
                newFrag.childNodes[len - 1].kind === 'mrow' &&
                newFrag.childNodes[len - 1].childNodes.length > 0) {
                var lastMrow = newFrag.childNodes[len - 1];
                var lastChild = lastMrow.childNodes[lastMrow.childNodes.length - 1];
                var firstChild = lastMrow.childNodes[0];
                if (lastChild &&
                    lastChild.childNodes.length > 0 &&
                    firstChild &&
                    firstChild.childNodes.length > 0) {
                    var right = lastChild.childNodes[0].text;
                    var left = firstChild.childNodes[0].text;
                    if (right === ')' || right === ']') {
                        if ((left === '(' && right === ')' && symbol.output !== '}') ||
                            (left === '[' && right === ']')) {
                            var pos = []; // positions of commas
                            var matrix = true;
                            var m = newFrag.childNodes.length;
                            var i = void 0, j = void 0;
                            for (i = 0; matrix && i < m; i = i + 2) {
                                pos[i] = [];
                                node = newFrag.childNodes[i];
                                if (matrix) {
                                    matrix =
                                        node.kind === 'mrow' && // current el is row
                                            node.childNodes.length > 0 &&
                                            (i === m - 1 || // last row, or next el is comma
                                                (newFrag.childNodes[i + 1] &&
                                                    newFrag.childNodes[i + 1].kind === 'mo' &&
                                                    newFrag.childNodes[i + 1].childNodes[0].text === ',')) && // row starts and ends with left/right brackets
                                            node.childNodes[0].childNodes[0].text === left &&
                                            node.childNodes[node.childNodes.length - 1].childNodes[0].text === right;
                                }
                                if (matrix) {
                                    // record positions of commas
                                    for (j = 0; j < node.childNodes.length; j++) {
                                        if (node.childNodes[j].childNodes.length > 0 &&
                                            node.childNodes[j].childNodes[0].text === ',') {
                                            pos[i][pos[i].length] = j;
                                        }
                                    }
                                }
                                if (matrix && i > 1) {
                                    // check that number of commas matches previous row
                                    matrix = pos[i].length === pos[i - 2].length;
                                }
                            }
                            // At least two rows or two columns
                            matrix = matrix && (pos.length > 1 || pos[0].length > 0);
                            var columnlines = [];
                            if (matrix) {
                                var table = this.configuration.create('inferredMrow');
                                for (i = 0; i < m; i = i + 2) {
                                    var row = this.configuration.create('inferredMrow');
                                    var frag = this.configuration.create('inferredMrow');
                                    node = newFrag.childNodes[0]; // <mrow>(-,-,...,-,-)</mrow>
                                    var n = node.childNodes.length;
                                    var k = 0;
                                    node.removeFirstChild(); // remove (
                                    for (j = 1; j < n - 1; j++) {
                                        if (typeof pos[i][k] !== 'undefined' && j === pos[i][k]) {
                                            node.removeFirstChild(); // remove ,
                                            if (node.childNodes[0] &&
                                                node.childNodes[0].kind === 'mrow' &&
                                                node.childNodes[0].childNodes.length === 1 &&
                                                node.childNodes[0].childNodes[0].childNodes.length > 0 &&
                                                node.childNodes[0].childNodes[0].childNodes[0].text === '\u2223') {
                                                // is columnline marker - skip it
                                                if (i === 0) {
                                                    columnlines.push('solid');
                                                }
                                                node.removeFirstChild(); // remove mrow
                                                node.removeFirstChild(); // remove ,
                                                j += 2;
                                                k++;
                                            }
                                            else if (i === 0) {
                                                columnlines.push('none');
                                            }
                                            var mtd_1 = this.configuration.create('mtd');
                                            try {
                                                for (var _e = (e_3 = void 0, __values(frag.childNodes)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                                    var child = _f.value;
                                                    mtd_1.appendChild(child);
                                                }
                                            }
                                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                            finally {
                                                try {
                                                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                                                }
                                                finally { if (e_3) throw e_3.error; }
                                            }
                                            row.appendChild(mtd_1);
                                            frag = this.configuration.create('inferredMrow'); // reset frag
                                            k++;
                                        }
                                        else {
                                            frag.appendChild(node.childNodes[0]);
                                        }
                                    }
                                    var mtd = this.configuration.create('mtd');
                                    try {
                                        for (var _g = (e_4 = void 0, __values(frag.childNodes)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            var child = _h.value;
                                            mtd.appendChild(child);
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    row.appendChild(mtd);
                                    if (i === 0) {
                                        columnlines.push('none');
                                    }
                                    if (newFrag.childNodes.length > 2) {
                                        newFrag.removeFirstChild(); // remove <mrow>)</mrow>
                                        newFrag.removeFirstChild(); // remove <mo>,</mo>
                                    }
                                    var mtr = this.configuration.create('mtr');
                                    try {
                                        for (var _j = (e_5 = void 0, __values(row.childNodes)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                            var child = _k.value;
                                            mtr.appendChild(child);
                                        }
                                    }
                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                    finally {
                                        try {
                                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                        }
                                        finally { if (e_5) throw e_5.error; }
                                    }
                                    table.appendChild(mtr);
                                }
                                node = this.configuration.create('mtable');
                                node.setAttribute('columnlines', columnlines.join(' '));
                                if (typeof symbol.invisible === 'boolean' &&
                                    symbol.invisible) {
                                    node.setAttribute('columnalign', 'left');
                                }
                                try {
                                    for (var _l = __values(table.childNodes), _m = _l.next(); !_m.done; _m = _l.next()) {
                                        var child = _m.value;
                                        node.appendChild(child);
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                                newFrag.replaceChild(node, newFrag.childNodes[0]);
                            }
                        }
                    }
                }
            }
            str = this.removeCharsAndBlanks(str, symbol.input.length);
            if (!symbol.invisible) {
                var mo = this.configuration.create('mo');
                mo.appendChild(this.configuration.createText(symbol.output));
                newFrag.appendChild(mo);
            }
        }
        return [newFrag, str];
    };
    /**
     * Main parse method - returns the MML tree
     *
     * @returns {INodeAdapter} The parsed MML node
     */
    AsciiMathParser.prototype.mml = function (_string) {
        this.nestingDepth = 0;
        // Cleanup
        var str = _string.replace(/&nbsp;/g, '');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&lt;/g, '<');
        var frag = this.parseExpr(str.replace(/^\s+/g, ''), false)[0];
        if (frag === null) {
            return null;
        }
        var node = this.configuration.create('mstyle');
        this.appendUnwrap(frag, node);
        if (this.displaystyle) {
            node.setAttribute('displaystyle', 'true');
        }
        return node;
    };
    return AsciiMathParser;
}());
export { AsciiMathParser };
