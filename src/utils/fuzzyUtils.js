import * as PIXI from "pixi.js";

export const shapeDefaults = {
  fill: 0x3388ff,
  fillOpacity: 0.5,
  strokeWeight: undefined,
  stroke: 0x3388ff,
  strokeOpacity: 1,
  blurIntensity: 0,
};

export const drawPolygon = ({ shape, project, scale }) => {
  const { positions, instance } = shape;

  const {
    fill,
    fillOpacity,
    strokeWeight,
    stroke,
    strokeOpacity,
    blurIntensity,
  } = {
    ...shapeDefaults,
    ...shape.properties,
  };

  instance.clear();
  if (strokeWeight !== undefined) {
    instance.lineStyle(strokeWeight / scale, stroke, strokeOpacity);
  }

  const projectedPolygon = positions.map((coords, index) => {
    return project(coords);
  });

  instance.beginFill(fill, fillOpacity);
  projectedPolygon.forEach(function (coord, index) {
    if (index === 0) instance.moveTo(coord.x, coord.y);
    else instance.lineTo(coord.x, coord.y);
  });
  instance.endFill();

  const blurfilter = new PIXI.filters.BlurFilter();
  instance.filters = [blurfilter];
  blurfilter.blur = blurIntensity * scale;
};

export const drawOverlay = ({ shapes, utils }) => {
  const map = utils.getMap();

  if (!map) {
    return;
  }

  const container = utils.getContainer();
  const renderer = utils.getRenderer();
  const project = utils.latLngToLayerPoint;
  const scale = utils.getScale();

  shapes.forEach((shape) => {
    drawPolygon({ shape, project, scale });
  });

  renderer.render(container);
};

// takes any geojson and returns all embedded polygons as array
export const parseGeojson = (geo, properties = {}) => {
  if (geo.type === "FeatureCollection") {
    return geo.features.map((f) => parseGeojson(f)).flat();
  }
  if (geo.type === "Feature") {
    return parseGeojson(geo.geometry, geo.properties);
  }
  // not tested
  if (geo.type === "GeometryCollection") {
    return geo.geometries.map((f) => parseGeojson(f, properties)).flat();
  }
  // not tested
  if (geo.type === "MultiPolygon") {
    geo.coordinates.map((f) =>
      parseGeojson({ type: "Polygon", coordinates: f }, properties).flat(),
    );
  }
  if (geo.type === "Polygon") {
    return [
      {
        positions: geo.coordinates[0].map((c) => ({ lat: c[1], lng: c[0] })),
        properties: properties,
      },
    ];
  }
  return [];
};
