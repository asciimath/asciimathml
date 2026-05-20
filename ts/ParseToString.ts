/*
 * AsciiMath Parser to HTML using a lite DOM, suitable for node
 */

import { INodeAdapter, IParseOptions } from './NodeAdapter.js';
import { AsciiMathParser } from './AsciiMathParser.js';

// AMNode Adapted from contribution by Tom Berend in https://github.com/asciimath/asciimathml/pull/164
export class AMNode {
    nodeName: string
    nodeValue: string = ''  // DOM allows NULL, but not important
    parent: AMNode | null = null

    childNodes: AMNode[] = [] 

    attributes: { [key: string]: any } = {}
    style: { [key: string]: any } = { fontWeight: '', fontStyle: '' }
    unique: symbol

    constructor(t: string, content = '') {
        this.nodeName = t
        this.nodeValue = content
        this.unique = Symbol()
    }

    appendChild(frag: AMNode): AMNode {
        if (frag.parent !== null) {           // if frag was part of another frag, we remove it (appendChild is a move, not a copy)
            frag.parent.removeChild(frag)
        }
        frag.parent = this

        this.childNodes.push(frag)  // includes any frag children
        
        return frag
    }

    setAttribute(key: string, value: any): AMNode {
        this.attributes[key] = value
        return this
    }

    getAttribute(key: string): string | undefined {
        return this.attributes[key];
    }

    get firstChild(): AMNode {
        if (this.childNodes.length > 0)
            return this.childNodes[0]
        throw new Error('No firstChild available')
    }

    get lastChild(): AMNode {
        if (this.childNodes.length > 0)
            return this.childNodes.at(-1)!
        throw new Error('No lastChild available')
    }

    hasChildNodes(): boolean {
        return this.childNodes.length > 0
    }

    replaceChild(newChild: AMNode, oldChild: AMNode): AMNode {
        for (let i = 0; i < this.childNodes.length; i++) {
            if (oldChild.unique === this.childNodes[i].unique) {
                this.childNodes[i] = newChild  // just reassigns the pointer
            }
        }
        oldChild.parent = null
        return oldChild
    }

    removeChild(node: AMNode): AMNode {
        let removed = false
        for (let i = 0; i < this.childNodes.length; i++) {
            if (node.unique == this.childNodes[i].unique) { // ||
                this.childNodes.splice(i, 1)    // preserves iterator sequence
                removed = true
            }
        }
        if (!removed)
            throw new Error(`Failed to execute 'removeChild'. The node to be removed is not a child of this node.)`)

        node.parent = null
        return node
    }

    /** turn a tree of AMNodes into an HTML string */
    flatten(): string {
        let html = ''

        if (this.nodeName !== '#text' && this.nodeName !== '') {
            let style = ''
            if (this.style.fontWeight !== '' || this.style.fontStyle !== '')
                style = ` style = "${(this.style.fontWeight !== '') ? 'font-weight: ' + this.style.fontWeight + ';' : ''}${(this.style.fontStyle !== '') ? ' font-style: ' + this.style.fontStyle + ';' : ''}"`

            let attributes = ''
            for (let [key, value] of Object.entries(this.attributes))
                attributes += ` ${key}= "${value}"`

            html += `<${this.nodeName}${attributes}${style}>`
        }
        if (this.hasChildNodes() && this.firstChild.nodeName == '#text') {
            html += this.firstChild.nodeValue
        } else if (this.hasChildNodes()) {
            for (let i = 0; i < this.childNodes.length; i++) {
                html += this.childNodes[i].flatten()
            }
        }
        html += `</${this.nodeName}>`

        return html
    }
}

export class AMNodeAdapter implements INodeAdapter {
    constructor(private element: AMNode) {}
  
    get kind() { 
        if (this.element.nodeName !== '#text') {
            return this.element.nodeName; 
        } else {
            return 'text';
        }
    }
    get text() {
        return this.element.nodeValue;
    }
    get childNodes(): INodeAdapter[] {
        return Array.prototype.slice.call(this.element.childNodes)
        .map(function(n) { return new AMNodeAdapter(n); });
    }

    get firstChild(): INodeAdapter | undefined {
        if (this.element.childNodes.length === 0) {
            return undefined;
        } else {
            return new AMNodeAdapter(this.element.childNodes[0]);
        }
    }
    get lastChild(): INodeAdapter | undefined {
        if (this.element.childNodes.length === 0) {
            return undefined;
        } else {
            return new AMNodeAdapter(this.element.childNodes[this.element.childNodes.length - 1]);
        }
    }

    hasChildNodes(): boolean {
        return this.element.hasChildNodes();
    }

    removeFirstChild(): void {
        this.element.removeChild(this.element.firstChild);
    }
    removeLastChild(): void {
       this.element.removeChild(this.element.lastChild);
    }

    appendChild(child: INodeAdapter): void {
        this.element.appendChild((child as AMNodeAdapter).element);
    }
  
    replaceChild(newChild: INodeAdapter, oldChild: INodeAdapter): void {
        this.element.replaceChild(
            (newChild as AMNodeAdapter).element,
            (oldChild as AMNodeAdapter).element
        );
    }
  
    setAttribute(name: string, value: string): void {
        this.element.setAttribute(name, value);
    }
  
    getAttribute(name: string): string | undefined {
        return this.element.getAttribute(name) || undefined;
    }

    setStyle(prop: string, value: string): void {
        this.element.style[prop] = value;
    }
  
    get underlyingNode() { 
        return this.element; 
    }
}



export class AsciiMath {
    private parser: AsciiMathParser;
    private domConfig: IParseOptions<AMNodeAdapter>;
    private AMdelimiter1 = "`";
    private AMescape1 = "\\\\`";

    constructor(options?: Partial<typeof this.domConfig.options>) {  
        this.domConfig = {
            create: (tag) => {
                const el = new AMNode(tag);
                return new AMNodeAdapter(el);
            },
            createText: (text) => {
                const textNode = new AMNode('#text', text);
                return new AMNodeAdapter(textNode);
            },
            options: {
                decimalsign: '.', 
                listseparator: ',',
                displaystyle: true, 
                useCSS: true,
                addmathvariant: false,
                ...options 
            }
        };
        this.parser = new AsciiMathParser(this.domConfig);
    }
    public setdecimal(input: string) {
        this.domConfig.options.decimalsign = input;
        this.parser = new AsciiMathParser(this.domConfig);
    }
    public setlistseparator(input: string) {
        this.domConfig.options.listseparator = input;
        this.parser = new AsciiMathParser(this.domConfig);
    }

    public parseMath(input: string) {
        const result = this.parser.mml(input);
        const amnode = (result as AMNodeAdapter).underlyingNode; // Get the actual AMNode element
        return '<math>'+amnode.flatten()+'</math>';
    }
}

// --- Compatibility exports for browser & module users ---
// Create and export a singleton named `asciimath` (keeps the old API)
export const asciimath = new AsciiMath();
export default asciimath;

// Convenience top-level exports (call into the singleton)
export const parseMath = (input: string) => asciimath.parseMath(input);
export const setdecimal = (input: string) => asciimath.setdecimal(input);
export const setlistseparator = (input: string) => asciimath.setlistseparator(input);