import { INodeAdapter, IParseOptions } from './NodeAdapter.js';
/**
 * The main AsciiMath Parser class.
 */
export declare class AsciiMathParser {
    configuration: IParseOptions<INodeAdapter>;
    /**
     * Current nesting depth for tracking brackets
     *
     * @type {number}
     */
    private nestingDepth;
    /**
     * Previous symbol type
     *
     * @type {TokenType}
     */
    private previousSymbol;
    /**
     * Current symbol type
     *
     * @type {TokenType}
     */
    private currentSymbol;
    /**
     * Sorted array of symbol names for binary search
     *
     * @type {string[]}
     */
    private symbolNames;
    /**
     * Symbol table including TeX aliases
     *
     * @type {Symbol[]}
     */
    private symbols;
    /**
     * Decimal sign character
     *
     * @type {string}
     */
    private decimalsign;
    /**
     * Display style (for limits)
     *
     * @type {boolean}
     */
    private displaystyle;
    /**
     * @constructor
     * @param {IParseOptions} configuration A parser configuration.
     */
    constructor(configuration: IParseOptions<INodeAdapter>);
    private TokenTypeMap;
    /**
     * Initialize the symbol table
     */
    private initSymbols;
    /**
     * Refresh the symbol name list (sort and extract names)
     */
    private refreshSymbols;
    /**
     * Remove n characters and any following blanks from the string
     *
     * @param {string} str The string to process
     * @param {number} n Number of characters to remove
     * @returns {string} The processed string
     */
    private removeCharsAndBlanks;
    /**
     * Binary search for position where str appears or would be inserted
     *
     * @param {string[]} arr Sorted array
     * @param {string} str String to find
     * @param {number} n Starting position
     * @returns {number} Position index
     */
    private position;
    /**
     * Get the maximal initial substring of str that appears in symbol names
     *
     * @param {string} str Input string
     * @returns {Symbol | null} The matched symbol or null
     */
    private getSymbol;
    /**
     * Append, unwrapping if needed
     * Since INodeAdapters don't have document fragments,
     * we'll treat inferredMrow as a fragment here, so
     * its children get appended instead of the inferredMrow itself.
     *
     * @param {INodeAdapter} toappend The node to append
     * @param {INodeAdapter} node The node to append to
     */
    private appendUnwrap;
    /**
     * Remove brackets from a node if it's an mrow with bracket children
     *
     * @param {INodeAdapter} node The node to remove brackets from
     */
    private removeBrackets;
    /**
     * Parse a simple expression
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    private parseSexpr;
    private fromCodePoint;
    private AMmapChars;
    /**
     * Parse an intermediate expression (handles subscripts and superscripts)
     *
     * @param {string} str The string to parse
     * @returns {ParseResult} [node, remaining string]
     */
    private parseIexpr;
    /**
     * Parse a full expression
     *
     * @param {string} str The string to parse
     * @param {boolean} rightbracket Whether we're inside brackets
     * @returns {ParseResult} [node, remaining string]
     */
    private parseExpr;
    /**
     * Main parse method - returns the MML tree
     *
     * @returns {INodeAdapter} The parsed MML node
     */
    mml(_string: string): INodeAdapter | null;
}
