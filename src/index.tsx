import * as React from "react";
import { render } from "react-dom";

import Expression from "./expression";
import Token from "./token";
import TokenType from "./token-type";
import ExpressionBinary from "./expression-binary";
import ExpressionUnary from "./expression-unary";
import ExpressionLiteral from "./expression-literal";
import ExpressionGrouping from "./expression-grouping";
import AstPrinter from "./ast-printer";

import { run } from "./interpreter";

import "./styles.css";

function App() {
  let expression: Expression = new ExpressionBinary(
    new ExpressionUnary(
      new Token(TokenType.MINUS, "-", null, 1),
      new ExpressionLiteral(123)
    ),
    new Token(TokenType.STAR, "*", null, 1),
    new ExpressionGrouping(new ExpressionLiteral(45.67))
  );

  let astPrinter = new AstPrinter();

  return (
    <div className="App">
      <h1>Loxlang Interpreter</h1>
      <code>
        // Your first Lox program!
        <br />
        print "Hello, world!";
      </code>
      <h2>Result:</h2>
      <code>
        {run(`
      // Your first Lox program!
      print "Hello, world!";
      // this is a comment
      (( )){} // grouping stuff
      !*+-/=<> <= == // operators
      /*some multi
      line comment, and it might 
      contain * or **

      lw


      */=
      class {
      }
      `)}
      </code>

      <h2>Pretty Print</h2>
      <code>{astPrinter.print(expression)}</code>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
