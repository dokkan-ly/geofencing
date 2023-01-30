export function min(...values: number[]) {
  return values.sort((a, b) => a - b).at(0) || 0;
}

export function max(...values: number[]) {
  return values.sort((a, b) => b - a).at(0) || 0;
}
