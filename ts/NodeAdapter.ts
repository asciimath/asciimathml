/*
 * AsciiMath Node Adapter
 */

export interface INodeAdapter {
  kind: string;
  text: string | null;
  childNodes: INodeAdapter[];
  removeFirstChild(): void;
  removeLastChild(): void;
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | number | boolean | undefined;
  appendChild(child: INodeAdapter): void;
  replaceChild(newChild: INodeAdapter, oldChild: INodeAdapter): void;
}

export interface IParseOptions<T extends INodeAdapter> {
  create(tag: string, children?: T[]): T;
  createText(text: string): T;
  options: {
    decimalsign?: string;
    listseparator?: string;
    displaystyle?: boolean;
    addmathvariant?: boolean;
    additionalSymbols?: AdditionalSymbol[];
  };
}

export interface AdditionalSymbol {
  input: string;
  tag: string;
  output: string;
  tex: string | null;
  ttype: string;
  acc?: boolean;
  func?: boolean;
  codes?: string;
  invisible?: boolean;
  rewriteleftright?: string[];
  atname?: string;
  atval?: string;
  notexcopy?: boolean;
}