import { GeofenceData, Point } from "../helpers/types";
import { within } from "./boxingbounds";
import { closestAreaByEdge } from "./closestedge";
import { pointInPolygon } from "./raycasting";

type Result = {
  town: string;
  area: string;
};

/**
 * Uses boundary checking > raycasting > closest edge to check if a point is
 * within any of the given areas
 * @param point The point to check against given geofence data
 * @param data Geofence data to check if the point is within
 * @returns The data that passed the algorithm check
 */
export function check(point: Point, data: GeofenceData[]): Result | null {
  const townsWithin: GeofenceData[] = [];
  for (const { areas, ...rest } of data) {
    if (areas.length > 0) {
      townsWithin.push({ areas: [], ...rest });
    }
    if (within(point, rest.boundries)) {
      for (const area of areas) {
        const isWithin = within(point, area.boundries);
        if (isWithin && pointInPolygon(point, area.polygon)) {
          return {
            town: rest.title,
            area: area.title,
          };
        }
        if (isWithin) {
          townsWithin[townsWithin.length - 1].areas.push(area);
        }
      }
    }
  }
  if (townsWithin.every((town) => town.areas.length === 0)) {
    return null;
  }
  const closest = closestAreaByEdge(
    point,
    townsWithin.filter((town) => town.areas.length > 0)
  );
  return {
    area: closest.areas[0].title,
    town: closest.title,
  };
}
