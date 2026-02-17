export declare const enum TokenType {
    NONE = -1,
    CONST = 0,
    UNARY = 1,
    BINARY = 2,
    INFIX = 3,
    LEFTBRACKET = 4,
    RIGHTBRACKET = 5,
    SPACE = 6,
    UNDEROVER = 7,
    DEFINITION = 8,
    LEFTRIGHT = 9,
    TEXT = 10,
    UNARYUNDEROVER = 15
}
/**
 * Symbol definition interface
 */
export interface Symbol {
    input: string;
    tag: string;
    output: string;
    tex: string | null;
    ttype: TokenType;
    acc?: boolean;
    func?: boolean;
    codes?: number[];
    invisible?: boolean;
    rewriteleftright?: string[];
    atname?: string;
    atval?: string;
    notexcopy?: boolean;
}
export declare const AMcal: number[];
export declare const AMfrk: number[];
export declare const AMbbb: number[];
export declare const AMbb: number[];
export declare const AMsf: number[];
export declare const AMtt: number[];
export declare const AMquote: Symbol;
/**
 * Main symbol table for AsciiMath
 */
export declare const AMsymbols: Symbol[];
