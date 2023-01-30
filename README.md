# Geofencing
## Description
Uses bound checking > ray casting > closest edge to check whether a given location is within a given polygon of geofenced area

## Usage
```typescript
import fs from "fs";
import {buildGeofenceDataFromKml, check} from "@dokkan-ly/geofencing";

const raw = fs.readFileSync("/path/to/map.kml");
const data = buildGeofenceDataFromKml(raw);

const point = [13.231134, 32.114234];
const area = check(point, data);

if (area) {
    console.log(area); // output: {town: "Some town", area: "Some area"}
} else {
    console.log("Not found!");
}
```