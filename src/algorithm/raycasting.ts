import { max, min } from "../helpers/math";
import { Line, Point, Polygon } from "../helpers/types";
import { polygonToLines } from "../helpers/geometry";

export function pointRayIntersectsLine(point: Point, line: Line): boolean {
  const [maxX, ray] = point;
  const maxY = max(line[0][1], line[1][1]);
  const minY = min(line[0][1], line[1][1]);
  if (ray >= maxY || ray <= minY) return false;
  const minX = min(line[0][0], line[1][0]);
  let slope = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0]);
  if (!Number.isFinite(slope)) {
    return line[0][0] < maxX;
  }
  const lineOffset = line[0][1] - slope * line[0][0];
  const intersection = (ray - lineOffset) / slope;
  return intersection < maxX && intersection > minX;
}

export function pointInPolygon(point: Point, polygon: Polygon): boolean {
  const lines = polygonToLines(polygon);
  let inside = false;
  for (const line of lines) {
    if (pointRayIntersectsLine(point, line)) {
      inside = !inside;
    }
  }
  return inside;
}
