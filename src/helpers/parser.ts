import assert from "assert";
import { XMLParser } from "fast-xml-parser";
import { max, min } from "./math";
import { Boundries, GeofenceData, Kml, ParsedOutput } from "./types";

/**
 * Parses the KML file into GeofenceData and builds boundaries
 * for each of the given areas and towns inside the KML file
 * @param data Raw KML file content
 * @returns Built geofence data ready for usage
 */
export function buildGeofenceDataFromKml(
  data: string | Buffer
): GeofenceData[] {
  let kml: Kml;
  try {
    const parser = new XMLParser();
    const parsed = parser.parse(data);
    assert(!!parsed.kml);
    kml = parsed.kml as Kml;
  } catch {
    throw new Error("Invalid KML file!");
  }
  return kml.Document.Folder.map((folder) => {
    const areas = folder.Placemark.map((placemark) => {
      let polygon: [number, number][] = [];
      if (placemark.MultiGeometry) {
        placemark.Polygon = placemark.MultiGeometry.Polygon.sort(
          (a, b) =>
            b.outerBoundaryIs.LinearRing.coordinates.length -
            a.outerBoundaryIs.LinearRing.coordinates.length
        ).at(0);
      }
      assert(
        !!placemark.Polygon,
        "Failed to find polygon after assumed correction"
      );
      polygon = placemark
        .Polygon!.outerBoundaryIs.LinearRing.coordinates.split(/\s*\n\s*/g)
        .map<[number, number]>(
          (val) =>
            val
              .split(/\s*,\s*/g)
              .map((raw) => parseFloat(raw))
              .slice(0, 2) as [number, number]
        );
      const longitudes = polygon.map(([longitude]) => longitude);
      const latitudes = polygon.map(([_, longitude]) => longitude);
      const boundries: Boundries = [
        [max(...longitudes), max(...latitudes)],
        [min(...longitudes), min(...latitudes)],
      ];
      return {
        title: placemark.name,
        boundries,
        polygon,
      };
    });
    const longitudes = areas.flatMap(({ boundries }) => [
      boundries[0][0],
      boundries[1][0],
    ]);
    const latitudes = areas.flatMap(({ boundries }) => [
      boundries[0][1],
      boundries[1][1],
    ]);
    const boundries: Boundries = [
      [max(...longitudes), max(...latitudes)],
      [min(...longitudes), min(...latitudes)],
    ];
    return {
      title: folder.name,
      boundries,
      areas,
    };
  });
}
