import Expression, { Visitor } from "./expression";

export default class ExpressionLiteral extends Expression {
  value: any;

  constructor(value: any) {
    super();
    this.value = value;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitExpressionLiteral(this);
  }
}
