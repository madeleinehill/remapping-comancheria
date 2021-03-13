import React from "react";
import { useMap } from "react-leaflet";

import * as turf from "@turf/turf";

export default function ZoomTo({ value, geojson }) {
  const map = useMap();
  const { center, zoomLevel, bbox } = value;

  // if center specified, zoom to it
  if (Array.isArray(center) && center.length === 2) {
    map.flyTo(center, zoomLevel);
    return null;
  }

  // else if bbox specified, zoom to it
  if (Array.isArray(bbox) && bbox.length === 2) {
    map.flyToBounds([
      [bbox[1], bbox[0]],
      [bbox[3], bbox[2]],
    ]);
    return null;
  }

  if (!geojson.length || !geojson[0].features || !geojson[0].features.length) {
    return null;
  }
  // else zoom to bounds of first geojson entity
  const bounds =
    geojson.length > 0 && geojson[0] ? turf.bbox(geojson[0]) : undefined;

  if (!!bounds) {
    map.flyToBounds([
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
    ]);
  }
  return null;
}
