import { GeofenceData, Point } from "../helpers/types";
import { polygonToLines, distanceToLine } from "../helpers/geometry";

export function closestAreaByEdge(
  point: Point,
  data: GeofenceData[]
): GeofenceData {
  let closest = data[0];
  let distance: number = Number.POSITIVE_INFINITY;
  for (let i = 0; i < closest.areas.length; i++) {
    const area = closest.areas[i];
    const lines = polygonToLines(area.polygon);
    for (const line of lines) {
      const d = distanceToLine(point, line);
      if (d < distance) {
        distance = d;
        closest = {
          ...closest,
          areas: [area],
        };
      }
    }
  }
  for (let i = 1; i < data.length; i++) {
    const town = data[i];
    for (let i = 0; i < town.areas.length; i++) {
      const area = town.areas[i];
      const lines = polygonToLines(area.polygon);
      for (const line of lines) {
        const d = distanceToLine(point, line);
        if (d < distance) {
          distance = d;
          closest = {
            title: town.title,
            boundries: town.boundries,
            areas: [area],
          };
        }
      }
    }
  }
  return closest;
}
