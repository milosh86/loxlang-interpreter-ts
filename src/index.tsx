import * as React from "react";
import { render } from "react-dom";
import { run } from "./interpreter";

import "./styles.css";

function App() {
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
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
