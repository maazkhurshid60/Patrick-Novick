// Safe CSV serialization.
// - Always quotes and doubles embedded quotes so commas/quotes/newlines can't
//   break the row structure.
// - Neutralizes spreadsheet formula injection: a value starting with = + - @
//   (or a control char) is prefixed with a single quote so Excel/Sheets won't
//   execute it as a formula.
export function csvCell(value: unknown): string {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

export function csvRow(cells: unknown[]): string {
  return cells.map(csvCell).join(",");
}
