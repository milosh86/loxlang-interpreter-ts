import Scanner from "./scanner";

export function run(source: string) {
  let scanner: Scanner = new Scanner(source);
  let tokens = scanner.scanTokens();
  return tokens.join(" | ");
}
