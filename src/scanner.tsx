import Token from "./token";
import TokenType from "./token-type";
import { Literal } from "./types";
import errorReporter from "./error-handling";

type ReservedWordsMap = {
  [word: string]: TokenType;
};

const reservedWordsMap: ReservedWordsMap = {
  and: TokenType.AND,
  class: TokenType.CLASS,
  else: TokenType.ELSE,
  false: TokenType.FALSE,
  for: TokenType.FOR,
  fun: TokenType.FUN,
  if: TokenType.IF,
  nil: TokenType.NIL,
  or: TokenType.OR,
  print: TokenType.PRINT,
  return: TokenType.RETURN,
  super: TokenType.SUPER,
  this: TokenType.THIS,
  true: TokenType.TRUE,
  var: TokenType.VAR,
  while: TokenType.WHILE
};

export default class Scanner {
  private source: string;
  private tokens: Array<Token> = [];
  private start: number = 0;
  private current: number = 0;
  private line: number = 1;

  constructor(source: string) {
    this.source = source;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));

    return this.tokens;
  }

  isAtEnd() {
    return this.current > this.source.length;
  }

  scanToken() {
    let c = this.advance();
    switch (c) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN, null);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN, null);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE, null);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE, null);
        break;
      case ",":
        this.addToken(TokenType.COMMA, null);
        break;
      case ".":
        this.addToken(TokenType.DOT, null);
        break;
      case "-":
        this.addToken(TokenType.MINUS, null);
        break;
      case "+":
        this.addToken(TokenType.PLUS, null);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON, null);
        break;
      case "*":
        this.addToken(TokenType.STAR, null);
        break;
      case "!":
        this.addToken(
          this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG,
          null
        );
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL,
          null
        );
        break;
      case "<":
        this.addToken(
          this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS,
          null
        );
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER,
          null
        );
        break;
      case "/":
        if (this.match("/")) {
          // a comment goes until the end of line
          while (this.peek() !== "\n" && !this.isAtEnd()) {
            this.advance();
          }
        } else {
          this.addToken(TokenType.SLASH, null);
        }
        break;
      case "":
      case " ":
      case "\r":
      case "\t":
        // Ignore whitespace.
        break;
      case "\n":
        this.line++;
        break;
      case '"':
        this.scanString();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.scanNumber();
        break;
      default:
        if (this.isAlpha(c)) {
          this.scanIndentifier();
        } else {
          errorReporter.error(
            this.line,
            `Unexpected character ${c} in ${this.source.substring(
              this.start,
              this.current
            )}`
          );
        }
    }
  }

  advance() {
    this.current++;
    return this.source.charAt(this.current - 1);
  }

  match(expectedChar: string) {
    if (this.isAtEnd()) return false;

    let nextChar = this.source[this.current];

    if (nextChar === expectedChar) {
      this.current++;
      return true;
    }

    return false;
  }

  peek() {
    if (this.isAtEnd()) return "\0";
    return this.source[this.current];
  }

  peekNext() {
    if (this.current + 1 > this.source.length) return "\0";
    return this.source[this.current + 1];
  }

  scanString() {
    while (this.peek() !== '"' && this.isAtEnd() === false) {
      if (this.peek() === "\n") this.line++;
      this.advance();
    }

    if (this.isAtEnd()) {
      errorReporter.error(this.line, "Unterminated string.");
      return;
    }

    // The closing ""
    this.advance();

    this.addToken(
      TokenType.STRING,
      this.source.substring(this.start + 1, this.current - 1)
    );
  }

  scanNumber() {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    // Look for a fractional part.
    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      // Consume the "."
      this.advance();

      while (this.isDigit(this.peek())) this.advance();
    }

    this.addToken(
      TokenType.NUMBER,
      parseFloat(this.source.substring(this.start, this.current))
    );
  }

  // reserved words are just identifiers
  scanIndentifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const text = this.source.substring(this.start, this.current);
    const type = reservedWordsMap[text] || TokenType.IDENTIFIER;

    this.addToken(type, null);
  }

  isDigit(c: string) {
    return c >= "0" && c <= "9";
  }

  isAlpha(c: string) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
  }

  isAlphaNumeric(c: string) {
    return this.isAlpha(c) || this.isDigit(c);
  }

  addToken(type: TokenType, literal: Literal) {
    let text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }
}
