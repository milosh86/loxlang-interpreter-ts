import Token from "./token";
import Expression, { Visitor } from "./expression";

export default class ExpressionBinary extends Expression {
  left: Expression;
  right: Expression;
  operator: Token;

  constructor(left: Expression, operator: Token, right: Expression) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitExpressionBinary(this);
  }
}
