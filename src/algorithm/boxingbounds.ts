import { Boundries, Point } from "../helpers/types";

export function within(point: Point, boundries: Boundries) {
  return (
    point[0] <= boundries[0][0] &&
    point[0] >= boundries[1][0] &&
    point[1] <= boundries[0][1] &&
    point[1] >= boundries[1][1]
  );
}
