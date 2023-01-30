export type Point = [x: number, y: number];
export type Line = [Point, Point];
export type Polygon = Point[];

export type Boundries = [
  [maxLongitude: number, maxLatitude: number],
  [minLongitude: number, minLatitude: number]
];

export interface GeofencedArea {
  title: string;
  boundries: Boundries;
  polygon: [number, number][];
}

export interface GeofenceData {
  title: string;
  boundries: Boundries;
  areas: GeofencedArea[];
}

export interface ParsedOutput {
  "?xml": string;
  kml: Kml;
}

export interface Kml {
  Document: Document;
}

export interface Document {
  name: string;
  description: string;
  Style: Style[];
  StyleMap: StyleMap[];
  Folder: Folder[];
}

export interface Folder {
  name: string;
  Placemark: Placemark[];
}

export interface Placemark {
  name: string;
  styleUrl: string;
  Polygon?: PlacemarkPolygon;
  MultiGeometry?: MultiGeometry;
}

export interface MultiGeometry {
  Polygon: PolygonElement[];
}

export interface PolygonElement {
  outerBoundaryIs: OuterBoundaryIs;
}

export interface OuterBoundaryIs {
  LinearRing: LinearRing;
}

export interface LinearRing {
  tessellate: number;
  coordinates: string;
}

export interface PlacemarkPolygon {
  outerBoundaryIs: OuterBoundaryIs;
  innerBoundaryIs?: OuterBoundaryIs[];
}

export interface Style {
  LineStyle: LineStyle;
  PolyStyle: PolyStyle;
  BalloonStyle: BalloonStyle;
}

export interface BalloonStyle {
  text: Text;
}

export enum Text {
  H3NameH3 = "<h3>$[name]</h3>",
}

export interface LineStyle {
  color: string;
  width: number;
}

export interface PolyStyle {
  color: string;
  fill: number;
  outline: number;
}

export interface StyleMap {
  Pair: Pair[];
}

export interface Pair {
  key: Key;
  styleUrl: string;
}

export enum Key {
  Highlight = "highlight",
  Normal = "normal",
}
