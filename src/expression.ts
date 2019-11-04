import ExpressionBinary from "./expression-binary";
import ExpressionUnary from "./expression-unary";
import ExpressionLiteral from "./expression-literal";
import ExpressionGrouping from "./expression-grouping";

export interface Visitor<T> {
  visitExpressionBinary(exp: ExpressionBinary): T;
  visitExpressionUnary(exp: ExpressionUnary): T;
  visitExpressionLiteral(exp: ExpressionLiteral): T;
  visitExpressionGrouping(exp: ExpressionGrouping): T;
}

export default abstract class Expression {
  abstract accept<T>(visitor: Visitor<T>): T;
}
