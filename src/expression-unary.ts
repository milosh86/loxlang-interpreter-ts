import Token from "./token";
import Expression, { Visitor } from "./expression";

export default class ExpressionUnary extends Expression {
  operator: Token;
  right: Expression;

  constructor(operator: Token, right: Expression) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitExpressionUnary(this);
  }
}
