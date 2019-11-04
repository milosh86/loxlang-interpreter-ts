import Expression, { Visitor } from "./expression";
import ExpressionBinary from "./expression-binary";
import ExpressionUnary from "./expression-unary";
import ExpressionLiteral from "./expression-literal";
import ExpressionGrouping from "./expression-grouping";

export default class AstPrinter implements Visitor<string> {
  print(expr: Expression): string {
    return expr.accept(this);
  }

  parenthesize(name: string, ...expressions: Expression[]) {
    return `(${name} ${expressions.map(expr => expr.accept(this)).join(" ")})`;
  }

  visitExpressionBinary(expr: ExpressionBinary): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitExpressionUnary(expr: ExpressionUnary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  visitExpressionLiteral(expr: ExpressionLiteral): string {
    return expr.value;
  }

  visitExpressionGrouping(expr: ExpressionGrouping): string {
    return this.parenthesize("grouping", expr.expression);
  }
}
