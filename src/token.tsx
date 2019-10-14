import TokenType from "./token-type";
import { Literal } from "./types";

export default class Token {
  type: TokenType;
  lexeme: string;
  literal: Literal;
  line: number;

  constructor(type: TokenType, lexeme: string, literal: Literal, line: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return TokenType[this.type] + " " + this.lexeme + " " + this.literal;
  }
}
