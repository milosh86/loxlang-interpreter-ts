import Scanner from "../scanner";
import Token from "../token";
import TokenType from "../token-type";

describe("Scanner", () => {
  test("single char lexemes", () => {
    let scanner = new Scanner(`
        {(.,)};
    `);
    let tokens = scanner.scanTokens();
    expect(tokens.length).toBe(8);
    expect(tokens[0]).toEqual(new Token(TokenType.LEFT_BRACE, "{", null, 2));
    expect(tokens[1]).toEqual(new Token(TokenType.LEFT_PAREN, "(", null, 2));
    expect(tokens[2]).toEqual(new Token(TokenType.DOT, ".", null, 2));
    expect(tokens[3]).toEqual(new Token(TokenType.COMMA, ",", null, 2));
    expect(tokens[4]).toEqual(new Token(TokenType.RIGHT_PAREN, ")", null, 2));
    expect(tokens[5]).toEqual(new Token(TokenType.RIGHT_BRACE, "}", null, 2));
    expect(tokens[6]).toEqual(new Token(TokenType.SEMICOLON, ";", null, 2));
    expect(tokens[7]).toEqual(new Token(TokenType.EOF, "", null, 3));
  });

  test("single line comment", () => {
    let scanner = new Scanner(`
        // this is just a comment
        // no tokens are generated
    `);
    let tokens = scanner.scanTokens();

    expect(tokens.length).toBe(1);
    expect(tokens[0]).toEqual(new Token(TokenType.EOF, "", null, 4));
  });

  test("multi line comment", () => {
    let scanner = new Scanner(`
        /*
         this is just a comment
         no tokens are generated
         */
    `);
    let tokens = scanner.scanTokens();

    expect(tokens.length).toBe(1);
    expect(tokens[0]).toEqual(new Token(TokenType.EOF, "", null, 6));
  });

  test("jsdoc comment", () => {
    let scanner = new Scanner(`
        /**
         * @param someParam
         * @class
         * 
         */
    `);
    let tokens = scanner.scanTokens();

    expect(tokens.length).toBe(1);
    expect(tokens[0]).toEqual(new Token(TokenType.EOF, "", null, 7));
  });

  test("string literal", () => {
    let scanner = new Scanner(`
        var s = "Hello!";
    `);
    let tokens = scanner.scanTokens();

    expect(tokens.length).toBe(6);
    expect(tokens[0]).toEqual(new Token(TokenType.VAR, "var", null, 2));
    expect(tokens[1]).toEqual(new Token(TokenType.IDENTIFIER, "s", null, 2));
    expect(tokens[2]).toEqual(new Token(TokenType.EQUAL, "=", null, 2));
    expect(tokens[3]).toEqual(
      new Token(TokenType.STRING, '"Hello!"', "Hello!", 2)
    );
    expect(tokens[4]).toEqual(new Token(TokenType.SEMICOLON, ";", null, 2));
    expect(tokens[5]).toEqual(new Token(TokenType.EOF, "", null, 3));
  });

  test("number literal", () => {
    let scanner = new Scanner(`
        var num = 123;
    `);
    let tokens = scanner.scanTokens();

    expect(tokens.length).toBe(6);
    expect(tokens[0]).toEqual(new Token(TokenType.VAR, "var", null, 2));
    expect(tokens[1]).toEqual(new Token(TokenType.IDENTIFIER, "num", null, 2));
    expect(tokens[2]).toEqual(new Token(TokenType.EQUAL, "=", null, 2));
    expect(tokens[3]).toEqual(new Token(TokenType.NUMBER, "123", 123, 2));
    expect(tokens[4]).toEqual(new Token(TokenType.SEMICOLON, ";", null, 2));
    expect(tokens[5]).toEqual(new Token(TokenType.EOF, "", null, 3));
  });
});
