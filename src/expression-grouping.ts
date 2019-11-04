import Expression, { Visitor } from "./expression";

export default class ExpressionGrouping extends Expression {
  expression: Expression;

  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitExpressionGrouping(this);
  }
}
