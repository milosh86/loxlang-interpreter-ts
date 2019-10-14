interface ErrorReporter {
  error(line: number, message: string): void;
  hadError: boolean;
}

export function error(line: number, message: string) {
  report(line, "", message);
}

function report(line: number, where: string, message: string) {
  console.error(`[line ${line}] Error${where}: ${message}`);
}

const errorReporter = {
  error,
  hadError: false
};

export default errorReporter;
