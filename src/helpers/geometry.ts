import { Line, Polygon, Point } from "./types";

export function polygonToLines(polygon: Polygon): Line[] {
  const lines: Line[] = [];
  for (let index = 0; index < polygon.length; index++) {
    lines.push([polygon[index], polygon[(index + 1) % polygon.length]]);
  }
  return lines;
}

export function distanceToLine(point: Point, line: Line): number {
  const [[x1, y1], [x2, y2]] = line;
  const [x0, y0] = point;
  return (
    Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1)) /
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  );
}
