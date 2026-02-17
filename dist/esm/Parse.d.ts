import { INodeAdapter } from './NodeAdapter.js';
export declare class DOMNodeAdapter implements INodeAdapter {
    private element;
    constructor(element: Node);
    get kind(): string;
    get text(): string;
    get childNodes(): INodeAdapter[];
    removeFirstChild(): void;
    removeLastChild(): void;
    appendChild(child: INodeAdapter): void;
    replaceChild(newChild: INodeAdapter, oldChild: INodeAdapter): void;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | undefined;
    get underlyingNode(): Node;
}
export declare class AsciiMath {
    private parser;
    private domConfig;
    private AMdelimiter1;
    private AMescape1;
    constructor();
    parseMath(input: string): MathMLElement;
    AMprocessNode(n: Element, linebreaks: boolean, spanclassAM: boolean): void;
    processNodeR(n: Node, linebreaks: boolean, latex: boolean): number;
    strarr2docFrag(arr: string[], linebreaks: boolean, latex: boolean): DocumentFragment;
}
export declare const asciimath: AsciiMath;
export default asciimath;
export declare const parseMath: (input: string) => MathMLElement;
export declare const AMprocessNode: (n: Element, linebreaks: boolean, spanclassAM: boolean) => void;
